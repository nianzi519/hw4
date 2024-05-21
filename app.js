const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/add_product', (req, res) => {
  const { date, name, price } = req.body;
  db.run('INSERT INTO Products (date, name, price) VALUES (?, ?, ?)', [date, name, price], function(err) {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json({ status: 'success', id: this.lastID });
  });
});

app.get('/search_products', (req, res) => {
  const query = req.query.query || '';
  db.all('SELECT date, name, price FROM Products WHERE name LIKE ?', [`%${query}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.json(rows);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
