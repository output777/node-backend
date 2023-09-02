const express = require('express');
const db = require('../db');

const app = express();
const PORT = 3000;

app.get('/create-table', async (req, res) => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    )
  `;

  try {
    const result = await db.query(createTableSQL);
    res.send('Table created successfully');
  } catch (error) {
    res.send(`Error in creating table: ${error}`);
  }
});

app.get('/user', async (req, res) => {
  const selectSQL = `SELECT * FROM users`;

  try {
    const [rows, fields] = await db.query(selectSQL);
    res.json(rows);
  } catch (error) {
    res.send(`Error in fetching data: ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
