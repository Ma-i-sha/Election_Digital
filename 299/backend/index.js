// Need to install
// npm install mysql
// npm install express
// npm install cors
// npm install body-parser
//npm install bcrypt
// npm install nodemon
// to open node post-end-point.js or nodemon index.js




const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');


const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
   
  database: 'digitaldemocracy'
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


app.post('/user_check', (req, res) => {
  const { nid_no, password } = req.body;


  if (!nid_no || !password) {
    return res.status(400).json({ error: 'NID No and Password are required.' });
  }


  // Check if the user exists
  connection.query('SELECT * FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error.' });
    }


    if (result.length === 0) {
      return res.status(400).json({ error: 'No user found with this NID No.' });
    }


    const user = result[0];


    // Compare the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords.' });
      }


      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password.' });
      }


      res.json({ message: 'Login successful', user });
    });
  });
});


app.post('/add_voter', (req, res) => {
  const {
    name,
    father_name,
    mother_name,
    nid_no,
    dob,
    blood_group,
    home,
    road,
    post_office,
    postal_code,
    city,
    country,
    password
  } = req.body;


  if (!name || !father_name || !mother_name || !nid_no || !dob || !password) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }


  // Check if the National ID already exists
  connection.query('SELECT * FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error.' });
    }


    if (result.length > 0) {
      return res.status(400).json({ error: 'National ID already registered.' });
    }


    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password.' });
      }


      const sql = `
        INSERT INTO voter
        (name, father_name, mother_name, nid_no, dob, blood_group, home, road, post_office, postal_code, city, country, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        name, father_name, mother_name, nid_no, dob, blood_group, home,
        road, post_office, postal_code, city, country, hashedPassword
      ];


      connection.query(sql, values, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database insert error.' });
        }
        res.json({ message: 'User registered successfully!' });
      });
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



