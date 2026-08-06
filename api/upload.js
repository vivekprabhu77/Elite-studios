import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Cloudflare R2 Configuration from Vercel Environment Variables
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'portfolio';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

function getR2Client() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY
    }
  });
}

export default async function handler(req, res) {
  // CORS Headers
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, filename, mimeType } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 content' });
    }

    const client = getR2Client();
    if (!client) {
      return res.status(500).json({ error: 'Cloudflare R2 credentials missing in environment variables.' });
    }

    // Strip base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const ext = filename ? filename.substring(filename.lastIndexOf('.')) : '.jpg';
    const fileKey = `projects/project-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext || '.jpg'}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: mimeType || 'image/jpeg'
    });

    await client.send(command);

    let publicUrl = '';
    if (R2_PUBLIC_URL) {
      publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, '')}/${fileKey}`;
    } else {
      publicUrl = `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileKey}`;
    }

    return res.status(200).json({ fileKey, publicUrl });
  } catch (error) {
    console.error('[Cloudflare R2 Serverless Error]', error);
    return res.status(500).json({ error: error.message || 'Failed to upload image to Cloudflare R2' });
  }
}
