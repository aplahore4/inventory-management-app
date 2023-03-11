const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { EMAIL_USER } = require('../config');
const sendEmail = require('../utils/sendEmail');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(400);
    throw new Error('Please login.');
  }

  const to = EMAIL_USER;
  const from = EMAIL_USER;
  const replyTo = user.email;

  try {
    await sendEmail(to, from, subject, message, replyTo);
    return res
      .status(200)
      .json({ success: true, message: 'Reset email sent.' });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error('Email not sent, please try again.');
  }

  res.send('Contact us.');
});

module.exports = { contactUs };
