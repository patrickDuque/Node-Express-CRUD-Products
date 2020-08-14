const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../../controllers/usersController');
const ordersController = require('../../controllers/ordersController');
const productsController = require('../../controllers/productsController');

// Helpers
const upload = require('../../helpers/multer');

// Routes
// Auth
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.delete('/auth/:userId', userController.deleteUser);

// Orders
router.get('/orders/', ordersController.getOrders);
router.post('/orders/', ordersController.postOrder);
router.get('/orders/:orderId', ordersController.getOrderById);
router.delete('/orders/:orderId', ordersController.deleteOrder);
router.put('/orders/:orderId', ordersController.editOrder);

// Products
router.get('/products/', productsController.getProducts);
router.post('/products/', upload.single('productImage'), productsController.postProduct);
router.get('/products/:productId', productsController.getProductById);
router.delete('/products/:productId', productsController.deleteProduct);
router.put('/products/:productId', productsController.editProduct);

module.exports = router;
