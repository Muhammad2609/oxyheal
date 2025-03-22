const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const AWS = require('aws-sdk');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;
app.use(cors());

// Database connection details
const db = mysql.createPool({
  host: 'oxyhealdb.cjhnuxaepwr5.eu-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Oxyheal123',
  database: 'oxyhealdb'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add a simple GET route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/userlist', (req, res) => {
  db.query('SELECT * FROM oxyhealdb.user', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error fetching user list');
    }

    res.send(results);
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

                                                                            // User-related APIs

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// create user
app.post('/newuser', (req, res) => {
  console.log(req.body);
  const { first_name, last_name, age, email, phone_number, password } = req.body;
 
  // Check if required parameters are provided
  if (!first_name || !last_name || !age || !email || !phone_number || !password) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }
 
  const query = `INSERT INTO user (first_name, last_name, age, email, phone_number, password) VALUES (?, ?, ?,?, ?, ?)`;
 
  db.query(query, [first_name, last_name, age, email, phone_number,password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error registering user');
    }
 
    res.status(201).send('User registered successfully');
    console.log(query);
  });
});
 
/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

    // Delete user
    app.delete('/newuserdelete', (req, res) => {
      const { email, password } = req.body;
    
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password parameter.' });
      }
    
      const checkUserQuery = 'SELECT * FROM user WHERE email = ? AND password = ?';
      db.query(checkUserQuery, [email, password], (checkErr, checkResults) => {
        if (checkErr) {
          console.error('Error checking user:', checkErr);
          return res.status(500).json({
            error: 'Error checking user',
            details: checkErr,
          });
        }
    
        if (checkResults.length === 0) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
    
        const deleteUserQuery = 'DELETE FROM user WHERE email = ?';
        db.query(deleteUserQuery, [email], (deleteErr, deleteResults) => {
          if (deleteErr) {
            console.error('Error deleting user:', deleteErr);
            return res.status(500).json({
              error: 'Error deleting user',
              details: deleteErr,
            });
          }
    
          res.status(200).json({ success: true, message: 'User deleted successfully' });
        });
      });
    });
/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

        //update user

        app.post('/updateuser', (req, res) => {
          const { first_name, last_name, age, phone_number, email, user_id } = req.body;
      
          // Check if required parameters are provided
          if (!user_id || !first_name || !last_name || !age || !phone_number || !email) {
              return res.status(400).json({ error: 'Missing required parameters.' });
          }
      
          const query = 'UPDATE user SET first_name = ?, last_name = ?, age = ?, phone_number = ?, email = ? WHERE user_id = ?';
          
          db.query(query, [first_name, last_name, age, phone_number, email, user_id], (err, results) => {
              if (err) {
                  console.error('Error querying the database:', err);
                  return res.status(500).send('Error updating user details');
              }
      
        
            res.status(201).send('User details updated successfully');
          });
        });

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

    //authenticate user
app.post('/authenticate', (req, res) => {
  const {email, password } = req.body;

  // Check if required parameters are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

 
  const query = `SELECT * FROM user WHERE email = ? AND password = ?`;

  db.query(query, [email,password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error authenticating user');
    }

    if (results.length > 0) {
      // User authenticated successfully
      res.status(201).send('User authenticated successfully');
    } else {
      // User not found or authentication failed
      res.status(401).send('Authentication failed');
    }
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
                                                                    // Appointment-related APIs
/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// Appointment creation

app.post('/newappointment', (req, res) => {
  console.log('Received request body:', req.body);

  const {
    date,
    time,
    special_requirements,
    reason,
    therapy_type,
    session_length,
    payment_option,
    user_email,
  } = req.body;

  console.log('Extracted parameters:', date, time, special_requirements, reason, therapy_type,session_length, payment_option, user_email);

  // Check if required parameters are provided
  if (!date || !time || !special_requirements || !reason || !therapy_type ||!session_length || !payment_option || !user_email) {
    console.error('Missing required parameters:', req.body);
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const query = `INSERT INTO appointment (date, time, special_requirements, reason, therapy_type,session_length, payment_option, user_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [date, time, special_requirements, reason, therapy_type, session_length, payment_option, user_email], (err, results) => {
    if (err) {
      console.error('Error executing query:', query);
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);
      return res.status(500).send('Error creating appointment');
    }

    console.log('Appointment created successfully');
    res.status(201).send('Appointment created successfully');
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//Get appointment list
app.get('/appointmentlist', (req, res) => {
  db.query('SELECT * FROM oxyhealdb.appointment', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error fetching appointment list');
    }

    res.send(results);
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// Appointment delete API
app.delete('/deleteappointment', (req, res) => {
  const {
      user_email,
      therapy_type,
      date,
      time
  } = req.body;

  console.log('Received deletion request for:', user_email, therapy_type, date, time);

  if (!user_email || !therapy_type || !date || !time) {
      return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const query = `
      DELETE FROM oxyhealdb.appointment
      WHERE user_email = ? AND therapy_type = ? AND date = ? AND time = ?
  `;

  db.query(query, [user_email, therapy_type, date, time], (err, results) => {
      if (err) {
          console.error('Error querying the database:', err);
          return res.status(500).send('Error deleting appointment');
      }

      if (results.affectedRows === 0) {
          return res.status(404).send('No matching appointments found for cancellation');
      }

      console.log('Appointment deleted successfully');
      res.status(200).send('Appointment deleted successfully');
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// Appointment update API
app.put('/updateappointment/:appointment_id', (req, res) => {
  const appointmentId = parseInt(req.params.appointment_id, 10);

  // Check if appointmentId is a valid number
  if (isNaN(appointmentId)) {
    console.log('Invalid appointmentId:', req.params.appointment_id);
    return res.status(400).json({ error: 'Invalid appointment_id parameter.' });
  }

  const { user_id, date, time, special_requirements, reason, status, session_length } = req.body;

  // Check if required parameters are provided
  if (!user_id || !date || !time || !special_requirements || !reason || !status || !session_length) {
    console.log('Invalid parameters');
    return res.status(400).json({ error: 'Missing or invalid required parameters.' });
  }

  const query = `
    UPDATE appointment
    SET user_id = ?, date = ?, time = ?, special_requirements = ?, reason = ?, status = ?, session_length = ?
    WHERE appointment_id = ?
  `;

  db.query(query, [user_id, date, time, special_requirements, reason, status, session_length, appointmentId], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error updating appointment');
    }

    // Check if the appointment was found and updated
    if (results.affectedRows === 0) {
      console.log('Appointment not found');
      return res.status(404).send('Appointment not found');
    }

    // Send a success response without detailed logging
    console.log('Appointment updated successfully');
    res.status(200).send('Appointment updated successfully');
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// Fetch upcoming appointments API
app.get('/upcomingappointments/:user_email', (req, res) => {
  const userEmail = req.params.user_email;

  // Check if userEmail is provided
  if (!userEmail) {
    console.log('Missing userEmail parameter');
    return res.status(400).json({ error: 'Missing userEmail parameter.' });
  }

  // Get the current date
  const currentDate = new Date().toISOString().split('T')[0];

  // Query to fetch upcoming appointments for the user
  const query = `
    SELECT *
    FROM appointment
    WHERE user_email = ? AND date >= ?
    ORDER BY date ASC
  `;

  db.query(query, [userEmail, currentDate], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Error fetching upcoming appointments');
    }

    // Send the list of upcoming appointments
    res.status(200).json(results);
  });
});

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// AWS API

AWS.config.update({
  accessKeyId: 'AKIARXIK5PD24FOUMRWB',          
  secretAccessKey: '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', 
  region: 'eu-west-2',   
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

app.post('/send-confirmation-email', (req, res) => {
  const userEmail = req.body.email;

  const sesParams = {
      Destination: {
        ToAddresses: [userEmail],
      },
      Message: {
          Body: {
              Html: {
                Data: 'Thank you for your payment! Your transaction was successful. To change your appointment please click here: <a href="http://18.132.13.38:3000/cancelAppointment.html">Cancel Appointment</a>',
              },
          },
          Subject: {
              Data: 'Thank You for Booking Oxygen Therapy with Oxyheal!',
          },
      },
      Source: 'oxyhealltd@gmail.com',
  };

  ses.sendEmail(sesParams, function (err, data) {
      if (err) {
          console.error('Error sending email:', err);
          res.status(500).json({ error: 'Error sending email' });
      } else {
          console.log('Email sent:', data);
          res.json({ message: 'Email sent successfully' });
      }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});