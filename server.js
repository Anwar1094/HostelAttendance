/* ---------------------------Import Packages--------------------------- */
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer');
const { createPool } = require('mysql');
require('dotenv').config();
const mysql = require('mysql2')
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const path = require('path');
// const fs = require('fs');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')


// Read private and public keys
// const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "private.pem"), "utf8");
// const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "public.pem"), "utf8");

/* .......................Server Setup.......................*/
// Creating server & port
const app = express();
const port = process.env.PORT || 3000;

// Server sends config as JSON
app.get('/config', (req, res) => {
    res.json({
        HOST: process.env.HOST,
        PyHost: process.env.PyHOST,
    });
});


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// By-passing data transfer policy of browser
app.use(cors({
    origin: [process.env.HOST, process.env.PyHOST, process.env.Site],
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.json()) // Json middleware to jsonify respose

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin); // Allow specific origin dynamically
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });


const SECRET_KEY = process.env.SECRET_KEY;
/* ---------------------------Student Page--------------------------- */

/* .......................Sign-in Window....................... */
// Mysql Connection
var pool = createPool({
    host: process.env.DbHOST,
    user: process.env.DbUSER,
    password: process.env.DbPASSWORD,
    database: process.env.DB,
    connectionLimit: 10
})

pool.query('SET time_zone = "+05:09";')
pool.query('Select DATE_FORMAT(NOW(), "%r")', (err, res) => {
    console.log(res)
})
// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // The SMTP server for Gmail 
    port: 587,  // Port for sending emails (587 for TLS, 465 for SSL)
    secure: false,  // Use TLS (true for port 465, false for 587)
    auth: {
        user: 'doraemon.89071@gmail.com',  // Your email address
        pass: 'lcge wnxk prvi swar',   // Your email password
    },
});

/**
 * LOGIN ROUTE - Generates JWT and sets it in HttpOnly Cookie
 */
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     // const user = users.find(u => u.username === username && u.password === password);
//     // if (!user) {
//     //     return res.status(401).json({ error: "Invalid credentials" });
//     // }

//     // Create JWT token
//     const token = jwt.sign({ userId: username }, PRIVATE_KEY, { algorithm: "RS256", expiresIn: "1h" });

//     // Set HttpOnly Cookie
//     res.cookie("token", token, {
//         httpOnly: true,  // Prevents JavaScript access (XSS protection)
//         secure: false,   // Set to true in production (requires HTTPS)
//         sameSite: "Strict" // Protects against CSRF attacks
//         // maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour
//     });

//     res.json({ message: "Login successful" });
// });


// app.get("/getData", (req, res) => {
//     res.json({ message: "Data retrieved successfully!" });
// });

/**
 * PROTECTED ROUTE - Checks JWT in Cookie
 */
// app.post("/protected", (req, res) => {
//     const authHeader = req.headers.Authorization;
//     console.log(req)
//     if (!authHeader) {
//         return res.status(403).json({ error: "No token provided" });
//     }

//     const token = authHeader; // Extract token from header
//     console.log("Received Token:", token);

//     jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: "Invalid token" });
//         }
//         res.json({ message: "Access granted!", userId: decoded.userId });
//     });
// });


/**
 * LOGOUT ROUTE - Clears JWT Cookie
 */
// app.post("/logout", (req, res) => {
//     res.clearCookie("token"); // Remove JWT cookie
//     res.json({ message: "Logged out successfully" });
// });

var otp;
var uId;

app.post('/setuser', (req, res) => {
    const user = req.body.user;
    uId = user;
    return res.status(200).json({ "success": true })
})

/* .......................Sending OTP....................... */

// API for generating and sending otp
app.post('/send-otp', (req, res) => {
    const { userId } = req.body;
    uId = userId
    // Generating otp
    otp = Math.floor(Math.random() * 1000000)
    while (String(otp).length < 6) {
        otp = Math.floor(Math.random() * 1000000)
    }
    // return res.status(200).send({'OTP Sent': true})
    let sqlQuery = `select Name, Email from StudentsData where Student_ID = '${userId}';`
    if (String(userId).startsWith('INVW')) {
        sqlQuery = `select Name, Email from WardensData where User_ID = '${userId}';`
    }
    // Fetch name and emailID to send email to user
    pool.query(sqlQuery, function (err, result, fields) {
        try {
            if (err) {
                console.log(err)
                // return err;
            }
            const [{ Name, Email }] = result
            console.log('OTP sent')
            // return res.status(202).json({'OTP Sent': true})
            if (Email != null) {
                // Email Data
                const mailOptions = {
                    from: `"Doraemon" <doraemon.89071@gmail.com>`,  // Sender address
                    to: Email,  // Recipient address
                    subject: 'One-Time Password from Hostel-Attandance-Manager',  // Subject line
                    text: `Hii ${Name}!\n One Time Password for logining in Hostel-Attandance-Manager: !` + otp,  // Plain text body
                    html: `<p>Hii ${Name}<br>One Time Password for logining in Hostel-Attandance-Manager!</p><h1>${otp}</h1>`,  // HTML body (optional)
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // console.log('Error occurred:', error);
                        return res.status(500).send({ 'OTP Sent': false })
                    } else {
                        console.log('Email sent:', info.response);
                        return res.status(200).send({ 'OTP Sent': true })
                    }
                });
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ 'OTP Sent': false })
        }
    })
})

/* .......................Verifiying OTP....................... */
app.post('/verify-otp', (req, res) => {
    const { OTP } = req.body
    // return res.status(200).json({'msg':'OTP Verified', 'Verified': true})
    // console.log(otp, OTP)
    if (OTP == otp) {
        // console.log(otp, OTP)
        console.log('OTP Verified')
        return res.status(200).send({ 'Verified': true })
    }
    return res.status(500).send({ 'Verified': false })
})

/* .......................Sign In....................... */
// Signin API 
app.post('/signin', (req, res) => {
    const { uid, pswrd } = req.body;
    // Fetch data from mysql
    let sqlQuery = `select * from StudentsData where Student_ID = '${uid}';`
    if (String(uid).startsWith('INVW')) {
        sqlQuery = `select * from WardensData where User_ID = '${uid}';`
    }
    pool.query(sqlQuery, function (err, result) {
        try {
            if (err) {
                return console.log(err);
            }
            const [{ _, Password }] = result
            console.log(result, Password)
            bcrypt.compare(pswrd, Password, (err, results) => {
                if (results) {
                    uId = uid

                    console.log(results)
                    // SECRET_KEY = `${uId}$${Password}@login`;
                    const token = jwt.sign({ userId: uid }, SECRET_KEY, { expiresIn: "1h" });
                    console.log(token);
                    return res.status(200).json({ token });
                } else {
                    return res.status(401).json({ error: "Invalid credentials" });
                }
            })
        } catch (error) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    })

})

/* .......................Logout....................... */
app.get('/logout', (req, res) => {
    uId = null;
})

/* .......................Login Authentication....................... */
app.get("/protected", (req, res) => {
    const token = req.headers["authorization"];
    console.log('run')
    console.log(token, SECRET_KEY)
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.json({ message: "Access granted!", userId: decoded.userId });
    });
});

/* .......................Change Password....................... */
app.post('/change_pswrd', (req, res) => {
    console.log(req.body)
    const { password } = req.body
    if (/[a-z]/.test(password) == false) {
        return res.status(500).json({ 'Msg': 'Password must contain Alphabets!' })
    } else if (/[0-9]/.test(password) == false) {
        return res.status(500).json({ 'Msg': 'Password must contain Numbers!' })
    } else if (/[A-Z]/.test(password) == false) {
        return res.status(500).json({ 'Msg': 'Password must contain Capital Letter!' })
    } else if (/[\W_]/.test(password) == false) {
        return res.status(500).json({ 'Msg': 'Password must contain Speical Characters!' })
    } else if ((password.length >= 8) == false) {
        return res.status(500).json({ 'Msg': 'Password length must be 8!' })
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        // const encodedPswrd = btoa(password);
        let sqlQuery = `update StudentsData set Password='${hashedPassword}' where Student_ID = '${uId}';`
        if (String(uId).startsWith('INVW')) {
            sqlQuery = `update WardensData set Password='${hashedPassword}' where User_ID = '${uId}';`
        }
        pool.query(sqlQuery, function (err, results, fields) {
            if (err) {
                res.status(500).send({ 'msg': 'Error during Password Changed!', 'Changes': false })
                console.error(err)
            }
            return res.status(200).send({ 'msg': 'Password Changed!', 'Changes': true })
        })
    })
})

/* ---------------------------Home Page--------------------------- */
/* .......................FetchAttendance of Student....................... */
// Home Window
app.get("/getData_of_student_attendance_data", (req, res) => {
    pool.query("SELECT Student_ID, Name, Hostel, Room_Number FROM StudentsData;", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        console.log(result)
        const { Student_ID, Name, Hostel, Room_Number } = result[0];
        console.log(Student_ID, Name, Hostel, Room_Number)
        return res.json(result);
    });
})

/* .......................Access Holidays....................... */
app.get("/getData_of_list_of_holidays", (req, res) => {
    pool.query("SELECT * FROM calender", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database Error" });
        } else {
            res.json(results);
        }
    });
});

/* .......................Fetching Students Data....................... */
// Student's Personal Details Window
app.post('/fetch-stu-pd', (req, res) => {
    // console.log(req.body)
    const { currUserID } = req.body;
    // console.log(currUserID)
    pool.query(`SELECT * FROM StudentsData where Student_ID='${currUserID}';`, (err, results) => {
        if (err) return res.status(500).json(err)
        // console.log('Data: ', results)
        return res.status(200).json(results)
    })
})

/* .......................Update Student Data....................... */
app.post('/updateStuDetails', (req, res) => {
    const { data, Student_ID } = req.body;
    // Validation of Fields
    for (let key of Object.entries(data)) {
        if (key[1] == null) {
            return res.status(500).json({ 'err': { 'Title': `${key[0]} Empty!`, 'Msg': `Please fill ${key[0]} field!` } })
        }
    }
    const { DOB, Date_of_Joining } = data
    if (validDate(DOB, 'DOB', 'Please Select Valid Date of Birth!') != true) {
        return res.status(500).json({ 'err': validDate(data['DOB'], 'DOB', 'Please Select Valid Date of Birth!') })
    }
    if (validDate(Date_of_Joining, 'Date_of_Joining', 'Please Select Valid Date of Joining!') != true) {
        return res.status(500).json({ 'err': validDate(data['Date_of_Joining'], 'Date_of_Joining', 'Please Select Valid Date of Joining!') })
    }
    let newData = Object.values(data)
    pool.query(`UPDATE StudentsData SET Name=CASE WHEN Name IS NULL THEN ? ELSE Name END,Gender=CASE WHEN Gender IS NULL THEN ? ELSE Gender END,Fathers_Name=CASE WHEN Fathers_Name IS NULL THEN ? ELSE Fathers_Name END,Mothers_Name=CASE WHEN Mothers_Name IS NULL THEN ? ELSE Mothers_Name END,Student_Mobile_Number=CASE WHEN Student_Mobile_Number IS NULL THEN ? ELSE Student_Mobile_Number END,Fathers_Mobile_Number=CASE WHEN Fathers_Mobile_Number IS NULL THEN ? ELSE Fathers_Mobile_Number END,Email=CASE WHEN Email IS NULL THEN ? ELSE Email END,Adhaar=CASE WHEN Adhaar IS NULL THEN ? ELSE Adhaar END,DOB=CASE WHEN DOB IS NULL THEN ? ELSE DOB END,Date_of_Joining=CASE WHEN Date_of_Joining IS NULL THEN ? ELSE Date_of_Joining END,Course=CASE WHEN Course IS NULL THEN ? ELSE Course END,Year=CASE WHEN Year IS NULL THEN ? ELSE Year END,Hostel=CASE WHEN Hostel IS NULL THEN ? ELSE Hostel END,Room_Number=CASE WHEN Room_Number IS NULL THEN ? ELSE Room_Number END,Room_Type=CASE WHEN Room_Type IS NULL THEN ? ELSE Room_Type END,Country=CASE WHEN Country IS NULL THEN ? ELSE Country END,State=CASE WHEN State IS NULL THEN ? ELSE State END,City=CASE WHEN City IS NULL THEN ? ELSE City END,Postal_Code=CASE WHEN Postal_Code IS NULL THEN ? ELSE Postal_Code END,Address=CASE WHEN Address IS NULL THEN ? ELSE Address END,Warden=CASE WHEN Warden IS NULL THEN ? ELSE Warden END where Student_ID='${Student_ID}';`, newData, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ "Updated": false })
        }
        console.log('Done')
        return res.status(200).json({ "Updated": true })
    });

})

// Endpoint to handle password change
app.post('/changeStudentpassword', (req, res) => {
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old password and new password are required." });
    }

    // Step 1: Retrieve user from the database (replace 'username' with actual user identifier)
    console.log(oldPassword, newPassword, uId)
    pool.query('SELECT Password FROM StudentsData WHERE Student_ID = ?', [uId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        console.log(user)
        // Step 2: Compare the old password with the stored password (hashed)
        bcrypt.compare(oldPassword, user.Password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            // Step 3: Hash the new password
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Step 4: Update the password in the database
                pool.query('UPDATE StudentsData SET Password = ? WHERE Student_ID = ?', [hashedPassword, uId], (err, result) => {
                    if (err) {
                        console.error('Error updating password:', err);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    // Return success response
                    res.status(200).json({ message: 'Password changed successfully!' });
                });
            });
        });
    });
});

/* .......................Upload Profile....................... */
app.post('/uploadProfile', upload.single('file'), async (req, res) => {
    console.log(uId)
    const fileData = req.file
    if (fileData) {
        const { originalname, buffer } = req.file;
        pool.query(`UPDATE StudentsData SET Profile=? WHERE Student_ID='${uId}';`, [buffer], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ 'fail': true })
            }
            return res.status(200).json({ 'success': true })
        })
    }
})

app.get('/setProfile', (req, res) => {
    pool.query(`SELECT Profile from StudentsData Where Student_ID=?`, [uId], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send('DB Error')
        }
        try {
            res.set('Content-Type', 'image/png');
            return res.status(200).send(results[0]['Profile'])
        } catch {
            return res.status(500).send('Server Error')
        }
    })
})

// app.get('/getCountry', (req, res) => {
//     console.log('ID',uId)
//     pool.query('Select Country from StudentsData where Student_ID=?;', uId, (err, result) => {
//         if (err) { return res.status(500).json(err) }
//         return res.status(200).json(result)
//     })
// })
// app.post('/getStates', (req, res) => {
//     const { country } = req.body
//     // console.log(country, req.body)
//     pool.query(`Select states from CountryData where country='${country}';`, (err, result) => {
//         // console.log(result)
//         if (err) { return res.status(500).json(err) }
//         return res.status(200).json(result[0])
//     })
// })

// Mark Attendance Window Script
app.use(bodyParser.json({ limit: '50mb' }));

/* .......................MySQL Connection....................... */
// const connection = mysql.createConnection({
//     host: "sql12.freesqldatabase.com" || process.env.DbHOST,
//     user: "sql12771503" || process.env.DbUSER,
//     password: "hIYpmm9bkn" || process.env.DbPASSWORD,
//     database: "sql12771503" || process.env.DB
// })

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to DB:', err)
//         return;
//     }
//     console.log('Connected to the Mysql Database!')
// })


// Middleware to parse JSON
app.use(bodyParser.json());

/* .......................Save Image to Database....................... */
// Route to save image
app.post('/save-image', (req, res) => {
    const { imageDataUrl, id } = req.body;
    // console.log(req.body)

    pool.query(`Update StudentsData Set Image='${imageDataUrl}' where Student_ID='${id}';`, (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        // console.log('Results:', res.json());
        return res.status(200).json({ 'results': true });
    })
});

function getFormattedTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/* .......................Mark Attendance....................... */
var studentId
app.post('/verifyAttendance', (req, res) => {
    studentId = req.body.Student_Id
    console.log(studentId)
    return res.status(200).json({ 'success': true })
})
app.post('/markAttendance', (req, res) => {
    const { Student_ID } = req.body
    const date = new Date().toISOString().split('T')[0];
    const Time = new Date().toLocaleString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    });
    console.log(studentId, Student_ID)
    if (studentId == Student_ID) {
        pool.query(`Insert Into AttendanceData (TimeStamp, Date, Time, Attendance, Student_ID, Hostel, Room_Number, Day) values ('${getFormattedTimestamp()}', '${date}', '${Time}', 'Present', '${Student_ID}', 'Himgiri','F-16', WEEKDAY(CURDATE()))`, (err, result) => {
            console.log(result)
            if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
            return res.status(200).json({ 'Success': true })
        })
    } else {
        return res.status(500).json({ 'err': { "Title": 'Unauthorised Access!', "Msg": 'You Can\'t Mark Your Attendance In Unauthorised Way!' } })
    }
})

/* .......................Fetch Attendance from database....................... */
// View Attendace Code
function validDate(inputDate, Title, msg) {
    console.log(inputDate)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(inputDate)) {
        console.log(regex.test(inputDate))
        return { 'Title': `${Title} Empty`, 'Msg': msg }
    }
    inputDate = new Date(inputDate)
    const date = new Date()
    if (inputDate.getFullYear() < 1900) {
        console.log(inputDate.getFullYear())
        return { 'Title': `${Title} Invalid Year`, 'Msg': msg }
    } else if (inputDate.getMonth() + 1 < 1 || inputDate.getMonth() + 1 > 12) {
        console.log(inputDate.getMonth())
        return { 'Title': `${Title} Invalid Month`, 'Msg': msg }
    } else if (inputDate.getMonth() + 1 == 2 && inputDate.getDate() > 29) {
        console.log(inputDate.getDate())
        return { 'Title': `${Title} Invalid Day`, 'Msg': msg }
    } else if (inputDate.getDate() <= 0 || inputDate.getDate() > 31) {
        console.log(inputDate.getDate())
        return { 'Title': `${Title} Invalid Day`, 'Msg': msg }
    }
    return true
}

app.post('/fetchAttendance', (req, res) => {
    const { startDate, endDate } = req.body
    if (validDate(startDate, 'From Date', 'Please Select Valid From Date!') != true) {
        return res.status(500).json({ 'err': validDate(startDate, 'From Date', 'Please Select Valid From Date!') })
    } else if (validDate(endDate, 'To Date', 'Please Select Valid To Date!') != true) {
        return res.status(500).json({ 'err': validDate(endDate, 'To Date', 'Please Select Valid To Date!') })
    } else if (startDate > endDate) {
        return res.status(500).json({ 'err': { 'Title': 'From Date Greater than To Date', 'Msg': 'Select Valid Dates!' } })
    }
    pool.query('Select SRNO, Date, Time, Attendance, Day from AttendanceData where Date BETWEEN ? AND ?;', [startDate, endDate], (err, result) => {
        console.log(result)
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
})

/* .......................Complain Window....................... */
// Submit Complain
/* .......................Submit Comlain to Database....................... */
app.post('/submitComplain', upload.single('file'), async (req, res) => {
    let complainData = JSON.parse(req.body.complainData);
    console.log(complainData)
    // complainData = String(complainData).split(',')
    if (validDate(complainData.date, 'Date of Complaint Empty!', 'Please Enter Date of Complaint!') != true) {
        return res.status(500).json({ "err": { 'Title': 'Date of Complaint Empty!', "Msg": 'Please Enter Date of Complaint!' } })
    } else if (complainData.studentId == '') {
        return res.status(500).json({ "err": { 'Title': 'Student ID Empty!', "Msg": 'Please Enter Student ID!' } })
    } else if (complainData.complaintType == '') {
        return res.status(500).json({ "err": { 'Title': 'Complaint Type Empty!', "Msg": 'Please Enter Complaint Type!' } })
    } else if (complainData.warden == '') {
        return res.status(500).json({ "err": { 'Title': 'Warden Name Empty!', "Msg": 'Please Enter Warden Name!' } })
    } else if (complainData.description == '') {
        return res.status(500).json({ "err": { 'Title': 'Description Empty!', "Msg": 'Please Enter Description!' } })
    }
    let newComplainData = Object.values(complainData)
    if (req.file) {
        const { originalname, buffer } = req.file;
        complainData.push(originalname)
        complainData.push(buffer)
        pool.query('Insert into Complaints (Date, Student_ID, complain, Warden_name, Description,filename, filedata) values (?,?,?,?,?,?,?);', newComplainData, (err, result) => {
            if (err) return res.status(500).json(result);
            return res.status(200).json({ 'success': true })
        })
    } else {
        pool.query('Insert into Complaints (Date, Student_ID, complain, Warden_name, Description) values (?,?,?,?,?);', newComplainData, (err, result) => {
            console.log(err)
            if (err) return res.status(500).json(err);
            return res.status(200).json({ 'success': true })
        })
    }
})

/* ----------------------Warden Server----------------------------------*/
// Home
/* .......................Fetch Warden Details....................... */
app.get('/getWardenData', (req, res) => {
    pool.query(`Select User_ID, Name, Hostel_Name FROM WardensData WHERE User_ID=?`, uId, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
})

// Add New Student
/* .......................Add New Student to Database....................... */
app.post('/addNewStudent', (req, res) => {
    const Data = req.body.data
    pool.query('INSERT INTO StudentsData (Student_ID, Name, Student_Mobile_Number, Fathers_Mobile_Number, Email, Adhaar, Hostel, Room_Number) VALUES (?,?,?,?,?,?,?,?)', Data, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err.message)
        }
        return res.status(200).json(result)
    })
})


/* .......................Update Student Details via Warden....................... */
// Update Student Data
app.post('/updateStudentData', (req, res) => {
    const Data = req.body;
    pool.query(`UPDATE StudentsData SET Name=?,Gender=?,Fathers_Name=?,Mothers_Name=?,Student_Mobile_Number=?,Fathers_Mobile_Number=?,Email=?,Adhaar=?,DOB=?,Date_of_Joining=?,Course=?,Year=?,Hostel=?,Room_Number=?,Room_Type=?,Country=?,State=?,City=?,Postal_Code=?,Address=?,Warden=? where Student_ID='${Data[0]}';`, Data.slice(1), (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        return res.status(200).json(results)
    })
})

app.listen(port, () => {
    console.log(`Server Listening at: http://localhost:${port}`)
})