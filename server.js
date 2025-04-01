
const express = require('express');
const bodyParser = require('body-parser');
const { generateOTP, verifyOTP, sendOTPEmail } = require('./otpService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();

  global.otpStore = { email, otp, timestamp: Date.now() };

  await sendOTPEmail(email, otp);
  res.status(200).json({ message: 'OTP sent successfully' });
});


app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  if (global.otpStore && global.otpStore.email === email) {
    const timeDiff = Date.now() - global.otpStore.timestamp;
    if (timeDiff > 5 * 60 * 1000) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (verifyOTP(global.otpStore.otp, otp)) {
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } else {
    return res.status(400).json({ error: 'OTP not generated for this email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
