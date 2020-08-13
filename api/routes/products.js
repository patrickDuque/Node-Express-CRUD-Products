const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'products' });
});

router.get('/:productId', (req, res) => {
  const id = req.params.productId;
  res.status(200).json({ message: `product ${id}` });
});

module.exports = router;
