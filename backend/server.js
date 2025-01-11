const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "root", 
  database: "pet_db",
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});


db.query(
  "CREATE TABLE IF NOT EXISTS pets (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description TEXT, status ENUM('Completed', 'Not Completed') DEFAULT 'Not Completed')",
  (err, result) => {
    if (err) throw err;
    console.log("Tasks table created or already exists");
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the Pets API");
});


app.get("/pets", (req, res) => {
  db.query("SELECT * FROM pets", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/pets", (req, res) => {
  const { name, description, status } = req.body;
  db.query(
    "INSERT INTO pets (name, description, status) VALUES (?, ?, ?)",
    [name, description, status],
    (err, results) => {
      if (err) throw err;
      res.status(201).json({ id: results.insertId, name, description, status });
    }
  );
});

app.put("/pets/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  db.query(
    "UPDATE pets SET name = ?, description = ?, status = ? WHERE id = ?",
    [name, description, status, id],
    (err, results) => {
      if (err) throw err;
      res.json({ id, name, description, status });
    }
  );
});

app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pets WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
