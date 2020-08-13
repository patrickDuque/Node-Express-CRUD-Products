// Libraries
const express = require('express');
const mongoose = require('mongoose');

// Schema
const Product = require('../models/products');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({ products: productList });
  } catch (error) {
    res.status(500).json({ error: { message: 'Something went wrong', error } });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({
      _id   : new mongoose.Types.ObjectId(),
      name  : name,
      price : +price
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
    const editedProduct = await Product.update({ _id: id }, { $set: { name, price: +price } });
    res.status(201).json({ message: 'Edited Product' });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error editing product', error: error.message } });
  }
});

module.exports = router;
