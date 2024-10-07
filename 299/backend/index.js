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
        cb(null, 'uploads'); // Save files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp for unique filename
    }
});

const upload = multer({ storage: storage });

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Registration route
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
    ward,
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
    profile_picture = req.file.path;
  } else {
    return res.status(400).json({ error: 'Please upload a profile picture.' });
  }

  db.query('SELECT * FROM voter WHERE nid_no = ?', [nid_no], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database query error.' });
    if (result.length > 0) return res.status(400).json({ error: 'National ID already registered.' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password.' });

      const sql = `INSERT INTO voter 
    (fname, lname, email, phone_number, gender, father_name, mother_name, nid_no, dob, blood_group, home, ward, post_office, postal_code, city, country, password, profile_picture)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const values = [
    fname, lname, email, phone_number, gender, father_name, mother_name, nid_no, dob,
    blood_group, home, ward, post_office, postal_code, city, country, hashedPassword, profile_picture
];

console.log('SQL Query:', sql);
console.log('Values:', values);  // Add this line to log values

db.query(sql, values, (err, result) => {
    if (err) {
        console.error('Database insert error:', err);  // Log the error
        return res.status(500).json({ error: 'Database insert error.' });
    }
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
        ward, 
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
        blood_group = ?,phone_number = ?, home = ?, ward = ?, post_office = ?, postal_code = ?, 
        city = ?, country = ? ${profilePicturePath ? ', profile_picture = ?' : ''} 
    `;

    const values = [fname, father_name, mother_name, dob, blood_group,phone_number, home, ward, post_office, postal_code, city, country];

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
                 home, ward, post_office, postal_code, city, country, profile_picture 
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
      
      // Prepare the response without the password
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
          ward: result[0].ward,
          post_office: result[0].post_office,
          postal_code: result[0].postal_code,
          city: result[0].city,
          country: result[0].country,
          phone_number: result[0].phone_number,
          profile_picture: result[0].profile_picture,
          new_password: '********' // Show password as asterisks
      };

      return res.json({ result: userResponse });  // Send back the modified result to the frontend
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
app.post('/register_admin', (req, res) => {
  const { admin_id, fname, lname, password } = req.body;

  // Check if any field is missing
  if (!admin_id || !fname || !lname || !password) {
      return res.status(400).json({ status: 'error', message: 'Please fill in all required fields.' });
  }

  // SQL query to insert new administrator
  const sql = 'INSERT INTO administrator (admin_id, fname, lname, password, confirm_password) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [admin_id, fname, lname, password, password], (err, result) => {
      if (err) {
          return res.status(500).json({ status: 'error', message: 'Database error: ' + err });
      }
      return res.json({ status: 'success', message: 'Administrator registered successfully!' });
  });
});

app.post('/login_admin', (req, res) => {
  const { admin_id, password } = req.body;

  // Check if both fields are filled
  if (!admin_id || !password) {
      return res.status(400).json({ status: 'error', message: 'Please enter both admin ID and password.' });
  }

  // SQL query to check if admin_id and password match
  const sql = 'SELECT * FROM administrator WHERE admin_id = ? AND password = ?';

  db.query(sql, [admin_id, password], (err, result) => {
      if (err) {
          return res.status(500).json({ status: 'error', message: 'Database error: ' + err });
      }

      if (result.length > 0) {
          // If a match is found, login is successful
          return res.json({ status: 'success', message: 'Login successful!' });
      } else {
          // No match, login failed
          return res.json({ status: 'error', message: 'Invalid admin ID or password.' });
      }
  });
});
// Candidate count route
// Candidate count route
app.post('/candidate_count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM candidate'; // Remove NID filtering for total count
  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).json({ status: 'error', message: 'Database error: ' + err });
      }
      return res.json({ status: 'success', count: result[0].count });
  });
});

// Voter count route
app.post('/voter_count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS count FROM voter'; // Remove NID filtering for total count
  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).json({ status: 'error', message: 'Database error: ' + err });
      }
      return res.json({ status: 'success', count: result[0].count });
  });
});
app.post('/get_candidates', (req, res) => {
  db.query('SELECT * FROM candidate', (err, results) => {
      if (err) {
          return res.status(500).json({ status: 'error', message: err.message });
      }
      res.json({ status: 'success', result: results });
  });
});
app.post('/get_voters', (req, res) => {
  let sql = 'SELECT id, nid_no, fname, lname, ward, city,profile_picture FROM voter';
  db.query(sql, (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error fetching data' });
      } else {
          res.send({ result });
      }
  });
});

app.post('/add_candidate', upload.single('profile_picture'), (req, res) => {
  const { nid_no, fname, lname, ward, city } = req.body;
  const profilePicture = req.file ? req.file.filename : null;  // Get uploaded file name

  // Check if all fields are provided
  if (!nid_no || !fname || !lname || !ward || !city) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Query to check if the NID is already registered
  const checkNidQuery = 'SELECT * FROM candidate WHERE nid_no = ?';

  db.query(checkNidQuery, [nid_no], (err, results) => {
    if (err) {
      console.error('Error while checking NID:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // If the NID already exists, return an error
    if (results.length > 0) {
      return res.status(400).json({ error: 'NID number already registered' });
    }

    // Insert the new candidate into the database
    const insertQuery = `
      INSERT INTO candidate (nid_no, fname, lname, ward, city, profile_picture) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [nid_no, fname, lname, ward, city, profilePicture], (err, result) => {
      if (err) {
        console.error('Error while registering candidate:', err);
        return res.status(500).json({ error: 'Failed to register candidate' });
      }

      // Respond with a success message
      res.json({ message: 'Candidate registered successfully!' });
    });
  });
});



app.get('/candidate', (req, res) => {
  res.json(candidate);
});

app.post('/candidate/get_candidate', (req, res) => {
  const candidateId = req.body.id;

  if (!candidateId) {
      return res.status(400).send({ message: 'Candidate ID is required' });
  }

  const sql = 'SELECT * FROM candidate WHERE nid_no = ?';
  db.query(sql, [candidateId], (err, result) => {
      if (err) {
          console.error('Error fetching candidate data:', err);
          return res.status(500).send({ message: 'Error fetching candidate data' });
      }

      if (result.length > 0) {
          res.send({ result: result[0] });
      } else {
          res.send({ message: 'No candidate found' });
      }
  });
});

// API to update candidate data
app.post('/candidate/update_candidate', upload.single('profile_picture'), async (req, res) => {
  const { id, fname, lname, nid_no, ward_no, city, new_password } = req.body;

  if (!id) {
      return res.status(400).send({ message: 'Candidate ID is required' });
  }

  let query = `UPDATE candidate SET fname = ?, lname = ?, nid_no = ?, ward_no = ?, city = ?`;
  const values = [fname, lname, nid_no, ward_no, city];

  // Handle profile picture upload
  if (req.file) {
      query += ', profile_picture = ?';
      values.push(req.file.filename);
  }

  // Handle new password if provided
  if (new_password) {
      const hashedPassword = await bcrypt.hash(new_password, 10);
      query += ', password = ?';
      values.push(hashedPassword);
  }

  query += ' WHERE nid_no = ?';
  values.push(id);

  db.query(query, values, (err, result) => {
      if (err) {
          console.error('Error updating candidate:', err);
          return res.status(500).send({ message: 'Error updating candidate' });
      }

      res.send({ success: true, message: 'Candidate updated successfully' });
  });
});

// API to delete candidate data
app.delete('/candidate/delete_candidate', (req, res) => {
  const candidateId = req.body.id;

  if (!candidateId) {
      return res.status(400).send({ message: 'Candidate ID is required' });
  }

  // Get candidate data to delete profile picture
  db.query('SELECT profile_picture FROM candidate WHERE nid_no = ?', [candidateId], (err, result) => {
      if (err) {
          console.error('Error fetching candidate for deletion:', err);
          return res.status(500).send({ message: 'Error fetching candidate' });
      }

      if (result.length === 0) {
          return res.status(404).send({ message: 'Candidate not found' });
      }

      const profilePicture = result[0].profile_picture;

      // Delete candidate from database
      db.query('DELETE FROM candidate WHERE nid_no = ?', [candidateId], (err, result) => {
          if (err) {
              console.error('Error deleting candidate:', err);
              return res.status(500).send({ message: 'Error deleting candidate' });
          }

          // Delete profile picture from server if it exists
          if (profilePicture && fs.existsSync(`uploads/${profilePicture}`)) {
              fs.unlink(`uploads/${profilePicture}`, (err) => {
                  if (err) {
                      console.error('Error deleting profile picture:', err);
                  }
              });
          }

          res.send({ success: true, message: 'Candidate deleted successfully' });
      });
  });
});

// Search voter by nid_no
app.post('/search_voter', (req, res) => {
  const { nid_no } = req.body;

  // Query the voter table to check if the nid_no exists
  const sql = 'SELECT nid_no FROM voter WHERE nid_no = ?';
  
  db.query(sql, [nid_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length > 0) {
      return res.json({
        message: 'Login successful',
        user: { nid_no: nid_no }  // Return just the nid_no if needed
      });
    } else {
      return res.status(401).json({ error: 'Invalid NID No.' });
    }
  });
});

// Search candidate by nid_no
app.post('/search_candidate', (req, res) => {
  const { nid_no } = req.body;

  // Query the candidate table to check if the nid_no exists
  const sql = 'SELECT nid_no FROM candidate WHERE nid_no = ?';
  
  db.query(sql, [nid_no], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length > 0) {
      return res.json({
        message: 'Login successful',
        user: { nid_no: nid_no }  // Return just the nid_no if needed
      });
    } else {
      return res.status(401).json({ error: 'Invalid NID No.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





