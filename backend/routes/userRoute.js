const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');

const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getUser', auth, getUser);
router.get('/loginStatus', loginStatus);
router.patch('/updateUser', auth, updateUser);
router.patch('/updatePassword', auth, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);

module.exports = router;
