const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_SERVER_PORT = 587;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const FRONTEND_URL_DEV = 'http://localhost:3000';
const FRONTEND_URL_PRODUCTION = 'http://localhost:3000';

module.exports = {
  MONGO_URL,
  NODE_ENV,
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
  FRONTEND_URL,
  PORT,
  EMAIL_SERVER_PORT,
  CLOUDINARY_URL,
  FRONTEND_URL_DEV,
  FRONTEND_URL_PRODUCTION,
};
