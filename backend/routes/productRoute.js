const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require('../controllers/productController');

const auth = require('../middleware/authMiddleware');
const { upload } = require('../utils/uploadFile');

router.post('/', auth, upload.single('image'), createProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
