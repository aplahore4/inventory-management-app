const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('Not authorized.');
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    req.userId = id;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized.');
  }
});

module.exports = auth;
