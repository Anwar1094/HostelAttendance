const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // The SMTP server for Gmail (example, change it if using another provider)
  port: 587,  // Port for sending emails (587 for TLS, 465 for SSL)
  secure: false,  // Use TLS (true for port 465, false for 587)
  auth: {
    user: 'doraemon.89071@gmail.com',  // Your email address
    pass: 'lcge wnxk prvi swar',   // Your email password (or App password if using Gmail)
  },
});

const otp = Math.floor(Math.random()*1000000)
// Email data
const mailOptions = {
  from: 'Hii Doraemon!" <doraemon.89071@gmail.com>',  // Sender address
  to: 'windows10945@gmail.com',  // Recipient address
  subject: 'One-Time Password from Hostel-Attandance-Manager',  // Subject line
  text: 'One Time Password for logining in Hostel-Attandance-Manager: !'+otp,  // Plain text body
  html: '<p>One Time Password for logining in Hostel-Attandance-Manager!</p>'+otp,  // HTML body (optional)
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});