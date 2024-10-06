// Need to install
// npm install mysql
// npm install express
// npm install cors
// npm install body-parser
// npm install bcrypt
// npm install nodemon
// to open node post-end-point.js or nodemon index.js


const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for profile picture upload
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'digitaldemocracy'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Registration route
app.post('/add_voter', upload.single('profile_picture'), (req, res) => {
  const {
    fname,
    lname,
    email,
    phone_number,
    gender,
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

  if (!fname || !lname || !email || !nid_no || !password || !phone_number) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  let profile_picture;
  if (req.file) {
    profile_picture = `uploads/${req.file.filename}`;  // Save only the relative path
  } else {
    return res.status(400).json({ error: 'Please upload a profile picture.' });
  }

  db.query('SELECT * FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query error.' });
    if (result.length > 0) return res.status(400).json({ error: 'National ID already registered.' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password.' });

      const sql = `INSERT INTO voter 
        (fname, lname, email, phone_number, gender, father_name, mother_name, nid_no, dob, blood_group, home, road, post_office, postal_code, city, country, password, profile_picture)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        fname, lname, email, phone_number, gender, father_name, mother_name, nid_no, dob,
        blood_group, home, road, post_office, postal_code, city, country, hashedPassword, profile_picture
      ];
      console.log('SQL Query:', sql);
      console.log('Values:', values);  // Add this line to log values
      db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database insert error.' });
        res.status(201).json({ message: 'Registration successful' });
      });
    });
  });
});

// User login check route
app.post('/user_check', (req, res) => {
  const { nid_no, phone_number, city, password } = req.body;

  if (!nid_no || !phone_number || !city || !password) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  const query = 'SELECT * FROM voter WHERE nid_no = ? AND phone_number = ? AND city = ?';
  db.query(query, [nid_no, phone_number, city], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Error validating password' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const userData = {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone_number: user.phone_number,
        city: user.city,
        profile_picture: user.profile_picture
      };

      return res.json({ message: 'Login successful', user: userData });
    });
  });
});


app.post('/update_user', upload.single('profile_picture'), async (req, res) => {
    const { 
        fname, 
        father_name, 
        mother_name, 
        nid_no, 
        phone_number,
        dob, 
        blood_group, 
        home, 
        road, 
        post_office, 
        postal_code, 
        city, 
        country, 
        new_password 
    } = req.body;

    console.log('Received new password:', new_password);  // Check if the password is received

    const profilePicturePath = req.file ? req.file.filename : null;

    let query = `
        UPDATE voter SET fname = ?, father_name = ?, mother_name = ?, dob = ?, 
        blood_group = ?,phone_number = ?, home = ?, road = ?, post_office = ?, postal_code = ?, 
        city = ?, country = ? ${profilePicturePath ? ', profile_picture = ?' : ''} 
    `;

    const values = [fname, father_name, mother_name, dob, blood_group,phone_number, home, road, post_office, postal_code, city, country];

    // Hash new password if provided
    if (new_password) {
        try {
            const hashedPassword = await bcrypt.hash(new_password, 10);
            console.log('Hashed password:', hashedPassword);  // Check if hashing works
            query += `, password = ?`;
            values.push(hashedPassword);
        } catch (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Password hashing error' });
        }
    }

    if (profilePicturePath) {
        values.push(profilePicturePath);
    }

    query += ` WHERE nid_no = ?`;
    values.push(nid_no);

    console.log('Query:', query);  // Log the query
    console.log('Values:', values);  // Log the values

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database update error:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        return res.json({ success: true });
    });
});


// Get user data by NID
app.post('/home_page/nid', (req, res) => {
  const { nid_no } = req.body;
  console.log(`Received NID: ${nid_no}`);

  const query = `SELECT fname, lname, nid_no, phone_number, id, father_name, mother_name, dob, blood_group, 
                 home, road, post_office, postal_code, city, country, profile_picture, password 
                 FROM voter WHERE nid_no = ?`;

  db.query(query, [nid_no], (err, result) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: 'Database query error' });
      }
      if (result.length === 0) {
          console.log('No user found for the provided NID');
          return res.status(404).json({ error: 'User not found' });
      }

      console.log('Query result:', result);  // This will print the entire result to the terminal
      console.log('First result:', result[0]);  // This will print the first result object (user data) to the terminal
      
      // Prepare the response with the password (not recommended)
      const userResponse = {
          fname: result[0].fname,
          lname: result[0].lname,
          id_no: result[0].id,  // Map the 'id' field from the database to 'id_no' for the front-end
          nid_no: result[0].nid_no,
          father_name: result[0].father_name,
          mother_name: result[0].mother_name,
          dob: result[0].dob,
          blood_group: result[0].blood_group,
          home: result[0].home,
          road: result[0].road,
          post_office: result[0].post_office,
          postal_code: result[0].postal_code,
          city: result[0].city,
          country: result[0].country,
          phone_number: result[0].phone_number,
          profile_picture: result[0].profile_picture,
          password: result[0].password // Sending the hashed password (not secure)
      };

      return res.json({ result: userResponse });
  });
});


// Delete user profile
app.post('/delete_user', (req, res) => {
  const { nid_no } = req.body;

  // Get user data to delete profile picture from the server
  db.query('SELECT profile_picture FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Database query error' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      const profilePicture = result[0].profile_picture;

      // Delete user from database
      db.query('DELETE FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Database delete error' });
          }

          // Delete profile picture from server if it exists
          if (profilePicture && fs.existsSync(`uploads/${profilePicture}`)) {
              fs.unlink(`uploads/${profilePicture}`, (err) => {
                  if (err) {
                      console.error('Error deleting profile picture:', err);
                  }
              });
          }

          return res.json({ success: true });
      });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





