// Libraries
const express = require('express');
const multer = require('multer');

// Schema
const Product = require('../models/products');

const router = express.Router();
const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename    : (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter });

router.get('/', async (req, res) => {
  try {
    const productList = await Product.find().select('name price _id productImage');
    res.status(200).json({ products: productList });
  } catch (error) {
    res.status(500).json({ error: { message: 'Something went wrong', error } });
  }
});

router.post('/', upload.single('productImage'), async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!req.file) {
      return res.status(500).json({ message: 'Please upload a valid image' });
    }
    if (price <= 0) {
      return res.json({ error: { message: 'Price cannot be 0' } });
    }

    const product = new Product({
      name         : name,
      price        : +price,
      productImage : req.file.filename
    });
    const newProduct = await product.save();
    res.status(201).json({ result: newProduct });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error adding products', error: error.message } });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({ result: product });
    } else {
      res.status(404).json({ message: 'No product found' });
    }
  } catch (error) {
    res.status(404).json({ error: { message: 'No product found', error: error.message } });
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const deletedItem = await Product.findByIdAndDelete(id);
    res.status(201).json({ message: `Deleted product ${deletedItem.name}`, product: deletedItem });
  } catch (error) {
    res.status(400).json({ error: { message: 'Error deleting product', error: error.message } });
  }
});

router.put('/:productId', async (req, res) => {
  try {
    const id = req.params.productId;
    const { name, price } = req.body;
    if (!name || name.length <= 0) {
      return res.status(500).json({ error: { message: 'Name cannot be blank' } });
    } else if (price <= 0 || !price) {
      return res.status(500).json({ error: { message: 'Price cannot be blank' } });
    }
    const editedProduct = await Product.update({ _id: id }, { $set: { name, price: +price } });
    res.status(201).json({ message: 'Edited Product' });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error editing product', error: error.message } });
  }
});

module.exports = router;
