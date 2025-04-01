
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();


function generateOTP() {
  return crypto.randomBytes(3).toString('hex'); // 6-character OTP
}


function verifyOTP(storedOTP, enteredOTP) {
  return storedOTP === enteredOTP;
}


async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  });

  console.log('OTP sent: %s', info.messageId);
}

module.exports = { generateOTP, verifyOTP, sendOTPEmail };
