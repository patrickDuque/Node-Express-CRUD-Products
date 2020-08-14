const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../../controllers/usersController');
const ordersController = require('../../controllers/ordersController');
const productsController = require('../../controllers/productsController');

// Helpers
const upload = require('../../helpers/multer');
const authentication = require('../../helpers/authentication');

// Routes
// Auth
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.delete('/auth/:userId', userController.deleteUser);

// Orders
router.get('/orders/', authentication, ordersController.getOrders);
router.get('/orders/:orderId', authentication, ordersController.getOrderById);
router.post('/orders/', authentication, ordersController.postOrder);
router.delete('/orders/:orderId', authentication, ordersController.deleteOrder);
router.put('/orders/:orderId', authentication, ordersController.editOrder);

// Products
router.get('/products/', productsController.getProducts);
router.get('/products/:productId', productsController.getProductById);
router.post('/products/', authentication, upload.single('productImage'), productsController.postProduct);
router.delete('/products/:productId', authentication, productsController.deleteProduct);
router.put('/products/:productId', authentication, productsController.editProduct);

module.exports = router;
