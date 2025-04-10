// // script.js
// const dropdownButton = document.getElementById("dropdownButton");
// const dropdownMenu = document.getElementById("dropdownMenu");

// // dropdownButton.addEventListener("onfocus", );
// function drop() {
//     dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
//   }

// // Close the dropdown if the user clicks outside of it
// window.addEventListener("click", function(event) {
//   if (!event.target.matches('.dropdown-btn')) {
//     if (dropdownMenu.style.display === "block") {
//       dropdownMenu.style.display = "none";
//     }
//   }
// });

// const express = require('express');
// const mysql = require('mysql2/promise');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MySQL connection configuration
// const dbConfig = {
//   host: "sql12.freesqldatabase.com",
//   user: "sql12767954",
//   password: "aa9EipyBay",
//   database: "sql12767954"
// };

// // Set up multer for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload file route
// app.post('/upload', upload.single('file'), async (req, res) => {
//   const { originalname, buffer } = req.file;

//   try {
//     const connection = await mysql.createConnection(dbConfig);

//     // Insert file into the database
//     const query = 'INSERT INTO Files (filename, filedata) VALUES (?, ?)';
//     await connection.execute(query, [originalname, buffer]);

//     res.status(200).send('File uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Error uploading file');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5502', 'http://127.0.01:5500'],   // Adjust based on where your frontend is hosted
    credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow specific origin dynamically
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get('/set-cookie', (req, res) => {
  res.cookie('user', 'JohnDoe', {
      httpOnly: true, // Prevents frontend JS from accessing it
      secure: false, // Set to true in production with HTTPS
      sameSite: 'None'
  });
  res.send('Cookie has been set');
});

// Route to read cookies
app.get('/read-cookies', (req, res) => {
    console.log('Cookies received:', req.cookies);
    res.json(req.cookies);
});

// Start server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
