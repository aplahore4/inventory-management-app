const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/uploadFile');
const cloudinary = require('cloudinary');

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  if (!name || !sku || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error('Please enter all the fields.');
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Inventory Management App',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Image could not be uploaded.');
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fleType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const product = await Product.create({
    name,
    sku,
    category,
    quantity,
    price,
    description,
    user: req.userId,
    image: fileData,
  });

  return res.status(200).json(product);

  res.send('Product created.');
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.userId }).sort('-createdAt');

  return res.status(200).json(products);

  res.send('Get products.');
});

const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.find({ _id: id, user: req.userId });

  if (!product) {
    res.status(400);
    throw new Error('No product found.');
  }

  return res.status(200).json(product);

  res.send('Get a single product.');
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.deleteOne({ _id: id, user: req.userId });

  if (!product) {
    res.status(400);
    throw new Error('No product found.');
  }

  return res.status(200).json(product);

  res.send('Product deleted.');
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct };
