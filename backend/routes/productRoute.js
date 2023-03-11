const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');

const auth = require('../middleware/authMiddleware');
const { upload } = require('../utils/uploadFile');

router.post('/', auth, upload.single('image'), createProduct);
router.patch('/:id', auth, upload.single('image'), updateProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
