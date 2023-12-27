// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create connection
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

// Connect to MySQL
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Create table
app.get("/create", function(req, res) {
  let sql = "CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), comment VARCHAR(255))";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send("Table created");
  });
});

// Insert data
app.post("/add", urlencodedParser, function(req, res) {
  let sql = "INSERT INTO comments (name, comment) VALUES ('" + req.body.name + "', '" + req.body.comment + "')";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Data inserted");
    res.send("Data inserted");
  });
});

// Select data
app.get("/select", function(req, res) {
  let sql = "SELECT * FROM comments";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Update data
app.put("/update", urlencodedParser, function(req, res) {
  let sql = "UPDATE comments SET comment = '" + req.body.comment + "' WHERE id = " + req.body.id;
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Data updated");
    res.send("Data updated");
  });
});

// Delete data
app.delete("/delete/:id", function(req, res) {
  let sql = "DELETE FROM comments WHERE id = " + req.params.id;
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Data deleted");
    res.send("Data deleted");
  });
});

// Listen to port 3000
app.listen(3000, function() {
  console.log("Listening to port 3000");
});