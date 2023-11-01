const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;

// PostgreSQL configuration
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'docker-todos',
  password: 'postgres',
  port: 5432,
});

// create table if not exists
pool
  .query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, description TEXT NOT NULL)')
  .catch((error) => {});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', async (req, res) => {
  const { rows: todos } = await pool.query('SELECT * FROM todos');

  const todoList = todos.map((todo) => `<li>${todo.description}</li>`).join('');

  const html = `
      <html>
        <head>
          <title>Todo List</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        </head>
        <body class="container fs-3">
          <h1>Todo List</h1>
          <form class="input-group mb-3 w-50" method="POST" action="/todos">
              <input type="text" class="form-control" placeholder="Description" aria-label="Description" name="description" aria-describedby="submit" autofocus>
              <button class="btn btn-primary" type="submit" id="submit">Add</button>
          </form>
          <ul>
            ${todoList}
          </ul>
        </body>
      </html>
    `;
  res.send(html);
});

app.post('/todos', async (req, res) => {
  const { description } = req.body;
  await pool.query('INSERT INTO todos (description) VALUES ($1)', [description]);
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
