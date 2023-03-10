const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Token = require('../models/tokenModel');
const sendEmail = require('../utils/sendEmail');
const { JWT_SECRET, FRONTEND_URL, EMAIL_USER } = require('../config');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, bio, password, photo } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the required fields.');
  }
  if (password.length < 6 || password.length > 8) {
    res.status(400);
    throw new Error('Password must be between 6 and 8 characters.');
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('Email already registered.');
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    const { _id, name, email, phone, bio, photo } = newUser;
    const token = generateToken(_id);

    return res
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
      })
      .status(201)
      .json({ _id, name, email, phone, bio, photo });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }

  res.send('Register user');
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter email and password.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found.');
  }
  const { _id, name, phone, bio, photo } = user;
  const isPassword = await bcrypt.compare(password, user.password);

  if (user && isPassword) {
    const token = generateToken(_id);
    return res
      .status(200)
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
      })
      .json({ _id, name, email, phone, bio, photo });
  } else {
    res.status(400);
    throw new Error('Invalid email or password.');
  }
  res.send('Login user');
});

const logout = asyncHandler(async (req, res) => {
  return res
    .cookie('token', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: 'Successfully logout.' });

  res.send('Logout');
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (user) {
    const { _id, email, name, phone, bio, photo } = user;
    return res.status(200).json({ _id, name, email, phone, bio, photo });
  } else {
    res.status(400);
    throw new Error('User not found.');
  }
  res.send('User data.');
});

const loginStatus = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    const verify = jwt.verify(token, JWT_SECRET);

    if (verify) {
      return res.json(true);
    }
  } catch {
    return res.json(false);
  }
  res.send('Login Status');
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(400);
    throw new Error('User not found.');
  }

  const { email, name, phone, bio, photo } = user;

  user.email = email;
  user.name = req.body.name || name;
  user.phone = req.body.phone || phone;
  user.bio = req.body.bio || bio;
  user.photo = req.body.photo || photo;

  const updatedUser = await user.save();

  return res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    photo: updatedUser.photo,
    phone: updatedUser.phone,
    bio: updatedUser.bio,
  });

  res.send('User updated.');
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error('Please enter old and new password.');
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(400).json('User not found.');
  }

  const isPassword = await bcrypt.compare(oldPassword, user.password);

  if (!password) {
    res.status(400);
    throw new Error('Old password in incorrect.');
  }
  user.password = password;
  user.save();
  res.status(200).send('Password changed successfully.');
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User does not exists.');
  }

  let token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString('hex') + user._id;

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 15 * (60 * 1000),
  }).save();

  const resetUrl = `${FRONTEND_URL}/resetpassword/${resetToken}`;
  console.log(resetToken);

  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password.</p>
  <p>This reset link is valid for only 15 minutes.</p>

  <a href="${resetUrl}">${resetUrl}</a>

  <p>Regards</p>
  <p>Devise Tech x Team</p>
  `;

  const subject = 'Password reset request';
  const to = user.email;
  const from = EMAIL_USER;

  try {
    await sendEmail(to, from, subject, message);
    return res
      .status(200)
      .json({ success: true, message: 'Reset email sent.' });
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error('Email not sent, please try again.');
  }
  res.send('Forgot password.');
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  const hashedToken = await crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or expired token.');
  }

  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  return res
    .status(200)
    .json({ message: 'Password reset successfully, please login.' });

  res.send('Reset password.');
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
};
