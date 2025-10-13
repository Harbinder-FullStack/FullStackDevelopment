const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Initialise express object
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// initialise DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'library'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/savebook', requestHandler);

function requestHandler (req, res)  {
  const { bookno, title, author, price } = req.body;

  const sql = 'INSERT INTO books (bookno, title, author, price) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [bookno, title, author, price], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.send(`<p>Book number already exists.</p><a href="/addbook.html">Go back</a>`);
      }
      return res.send(`<p>Error: ${err.message}</p><a href="/addbook.html">Go back</a>`);
    }
    res.send(`<p>Record Saved.</p><a href="/addbook.html">Go to Home Page</a>`);
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
