import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT;

// PostgreSQL configuration
const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Ждём пока база данных запустится
while (true) {
  try {
    await pool.query(
      'CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, description TEXT NOT NULL)'
    );
    break;
  } catch (error) {}
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

// Routes
app.get('/api/todos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/todos', async (req, res) => {
  const { description } = req.body;
  const { rows } = await pool.query('INSERT INTO todos (description) VALUES ($1) RETURNING *', [
    description,
  ]);
  res.json(rows[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port} 🤗🤗🤗`);
});
