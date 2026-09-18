import { Pool } from 'pg';

// Bypass Node's strict SSL certificate chain validation for serverless environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
      const { rows } = await pool.query(
        'SELECT * FROM users ORDER BY id DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      const countResult = await pool.query('SELECT COUNT(*) FROM users');
      const totalUsers = parseInt(countResult.rows[0].count);

      return res.status(200).json({
        users: rows,
        totalPages: Math.ceil(totalUsers / limit) || 1,
        currentPage: page
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
      const { rows } = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}