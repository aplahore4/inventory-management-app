const { NODE_ENV } = require('../config');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = errorHandler;
