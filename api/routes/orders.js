const express = require('express');

const Order = require('../models/orders');
const Product = require('../models/products');
const { findById } = require('../models/products');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('product').select('product _id quantity productName');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error fetching orders', error: error.message } });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      const order = new Order({
        quantity : +quantity,
        product  : productId
      });
      const newOrder = await order.save();
      res.status(201).json({ message: 'Order added', order: newOrder });
    } else {
      res.status(404).json({ message: `No product with product id ${productid}` });
    }
  } catch (error) {
    res.status(500).json({ error: { message: 'Error adding order', error: error.message } });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id).populate('product').select('product _id quantity');
    if (order) {
      return res.status(200).json({ order });
    } else {
      return res.status(404).json({ message: 'No order found' });
    }
  } catch (error) {
    res.status(500).json({ error: { message: 'Error fetching order', error: error.message } });
  }
});

router.delete('/:orderId', async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findByIdAndDelete(id);
    res.status(201).json({ message: 'Deleted order', order });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting order', error: error.message } });
  }
});

router.put('/:orderId', async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findByIdAndUpdate(id, { quantity: req.body.quantity });
    res.status(201).json({ message: 'Edited order', order });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting order', error: error.message } });
  }
});

module.exports = router;
