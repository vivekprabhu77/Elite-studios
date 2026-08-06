import express from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env if present
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

// Cloudflare R2 Configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'portfolio';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

let r2Client = null;

function getR2Client() {
  if (r2Client) return r2Client;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.warn('[R2 Storage Notice] Cloudflare R2 credentials missing in .env');
    return null;
  }
  try {
    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY
      }
    });
    console.log('[R2 Storage] Initialized Cloudflare R2 S3 Client.');
    return r2Client;
  } catch (err) {
    console.error('[R2 Storage Error] Failed to initialize R2 S3 client:', err.message);
    return null;
  }
}

async function uploadToR2(filePath, mimeType, originalName) {
  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 is not configured.');
  }

  const ext = path.extname(originalName || filePath) || '.jpg';
  const fileKey = `projects/project-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const fileStream = fs.createReadStream(filePath);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
    Body: fileStream,
    ContentType: mimeType || 'image/jpeg'
  });

  await client.send(command);

  let publicUrl = '';
  if (R2_PUBLIC_URL) {
    publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, '')}/${fileKey}`;
  } else {
    publicUrl = `/api/r2-image/${fileKey}`;
  }

  return { fileKey, publicUrl };
}


const app = express();
const PORT = process.env.PORT || 5000;


// Enable CORS for Vite frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve images directly from Cloudflare R2 bucket via server proxy
app.get('/api/r2-image/*', async (req, res) => {
  try {
    const key = req.params[0];
    if (!key) {
      return res.status(400).send('Missing image key');
    }

    const client = getR2Client();
    if (!client) {
      return res.status(503).send('R2 Storage not configured');
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key
    });

    const response = await client.send(command);

    if (response.ContentType) {
      res.setHeader('Content-Type', response.ContentType);
    }
    res.setHeader('Cache-Control', 'public, max-age=31536000');

    response.Body.pipe(res);
  } catch (err) {
    console.error('Error serving R2 image:', err.message);
    res.status(404).send('Image not found in R2 bucket');
  }
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));


// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'project-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// MySQL / TiDB Connection parameters
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'Elitestudios';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_SSL = process.env.DB_SSL === 'true' || DB_HOST.includes('tidbcloud.com') || DB_HOST.includes('render');

let dbPool;

// Initialize Database & Table automatically
async function initDatabase() {
  try {
    const sslConfig = DB_SSL ? { minVersion: 'TLSv1.2', rejectUnauthorized: false } : undefined;

    // 1. If local environment, ensure DB exists
    if (!DB_HOST.includes('tidbcloud.com')) {
      try {
        const rootConnection = await mysql.createConnection({
          host: DB_HOST,
          port: DB_PORT,
          user: DB_USER,
          password: DB_PASSWORD,
          ssl: sslConfig
        });
        await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        await rootConnection.end();
      } catch (err) {
        console.warn('[DB Notice] Could not create database root connection, connecting directly:', err.message);
      }
    }

    // 2. Create pool connected to DB_NAME
    dbPool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      ssl: sslConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // 3. Create projects table if not exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        year VARCHAR(50) DEFAULT '2026',
        type VARCHAR(50) DEFAULT 'image',
        src TEXT NOT NULL,
        website_url VARCHAR(500) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await dbPool.query(createTableQuery);

    // Auto add website_url column if table already existed without it
    try {
      await dbPool.query('ALTER TABLE projects ADD COLUMN website_url VARCHAR(500) DEFAULT NULL;');
    } catch (_err) {
      // Column already exists
    }

    console.log(`[MySQL] Connected to database '${DB_NAME}' and table 'projects' verified.`);
  } catch (err) {
    console.error('[MySQL Error] Could not connect to MySQL Server:', err.message);
    console.log('[MySQL Notice] Make sure XAMPP MySQL module is STARTED in XAMPP Control Panel.');
  }
}

initDatabase();

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// GET /api/projects - Retrieve all projects from MySQL
app.get('/api/projects', async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(503).json({ error: 'MySQL database not connected yet.' });
    }
    const [rows] = await dbPool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects from MySQL:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects - Create a new project with image upload
app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(503).json({ error: 'MySQL database not connected yet. Please start XAMPP MySQL.' });
    }

    const { client, title, category, year, website_url } = req.body;
    let imageUrl = '';

    if (req.file) {
      try {
        console.log(`[R2 Storage] Uploading ${req.file.originalname} to Cloudflare R2 bucket '${R2_BUCKET_NAME}'...`);
        const r2Result = await uploadToR2(req.file.path, req.file.mimetype, req.file.originalname);
        imageUrl = r2Result.publicUrl;
        console.log(`[R2 Storage Success] Uploaded! Public URL: ${imageUrl}`);
      } catch (r2Err) {
        console.error('[R2 Storage Upload Failed]', r2Err.message);
        console.log('[Notice] Falling back to local server file storage.');
        imageUrl = `/uploads/${req.file.filename}`;
      }
    } else if (req.body.src) {
      imageUrl = req.body.src;
    } else {
      return res.status(400).json({ error: 'An image file or image URL is required.' });
    }

    const [result] = await dbPool.query(
      'INSERT INTO projects (client, title, category, year, type, src, website_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [client, title, category, year || '2026', 'image', imageUrl, website_url || null]
    );

    const newProject = {
      id: result.insertId,
      client,
      title,
      category,
      year: year || '2026',
      type: 'image',
      src: imageUrl,
      website_url: website_url || null
    };

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error saving project to MySQL:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/projects/:id - Delete a project from MySQL
app.delete('/api/projects/:id', async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(503).json({ error: 'MySQL database not connected.' });
    }
    const { id } = req.params;
    await dbPool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true, message: `Project ${id} deleted.` });
  } catch (err) {
    console.error('Error deleting project from MySQL:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects/clear-all - Wipe all projects from MySQL
app.post('/api/projects/clear-all', async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(503).json({ error: 'MySQL database not connected.' });
    }
    await dbPool.query('TRUNCATE TABLE projects');
    res.json({ success: true, message: 'All projects removed from MySQL.' });
  } catch (err) {
    console.error('Error clearing MySQL projects:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/health - Check server & DB status
app.get('/api/health', async (req, res) => {
  try {
    if (dbPool) {
      await dbPool.query('SELECT 1');
      return res.json({ status: 'ok', mysql: 'connected', database: DB_NAME });
    }
    res.json({ status: 'warn', mysql: 'disconnected' });
  } catch (err) {
    res.json({ status: 'error', mysql: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
});
