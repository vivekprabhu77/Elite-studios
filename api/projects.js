import mysql from 'mysql2/promise';

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || 'test';
const DB_PORT = parseInt(process.env.DB_PORT || '4000', 10);
const DB_SSL = process.env.DB_SSL === 'true' || (DB_HOST && DB_HOST.includes('tidbcloud.com'));

let pool;

function getDbPool() {
  if (pool) return pool;
  if (!DB_HOST || !DB_USER) {
    return null;
  }
  const sslConfig = DB_SSL ? { minVersion: 'TLSv1.2', rejectUnauthorized: false } : undefined;
  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });
  return pool;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const db = getDbPool();
  if (!db) {
    return res.status(503).json({ error: 'Database environment variables not configured on Vercel.' });
  }

  try {
    if (req.method === 'GET') {
      const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { title, client, category, year, src, website_url, websiteUrl } = req.body || {};
      const urlToSave = website_url || websiteUrl || null;

      if (!title || !client || !src) {
        return res.status(400).json({ error: 'Title, client, and image src are required' });
      }

      const [result] = await db.query(
        'INSERT INTO projects (title, client, category, year, type, src, website_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, client, category || 'Website Design & Development', year || '2026', 'image', src, urlToSave]
      );

      const [newRow] = await db.query('SELECT * FROM projects WHERE id = ?', [result.insertId]);
      return res.status(201).json(newRow[0] || { id: result.insertId, title, client, src });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ error: 'Project ID is required' });
      }
      await db.query('DELETE FROM projects WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Project deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('[Serverless TiDB Error]', error);
    return res.status(500).json({ error: error.message || 'Internal Database Error' });
  }
}
