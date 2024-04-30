// routes/userRoutes.js
const multer = require('multer');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/product.controller');
const { createUser, getUsers, editUser, login } = require('../controllers/auth/auth.controller');
const { createOrder, getOrders, editOrder } = require('../controllers/order/order');

const { authmiddleware } = require('../utils/middleware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/');
    },
    filename: function (req, file, cb) {
        console.log('start')
      // Use Date.now() to ensure unique file names
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize Multer with storage configuration
const upload = multer({ storage: storage });
// Routes for user-related endpoints
router.get('/products', productController.getProducts);
router.get('/product/delete/:id', productController.deleteProduct);
router.post('/product/create', productController.createProduct);
router.post('/product/:id', productController.editProduct);

router.get('/orders', getOrders);
router.post('/order/create', createOrder);
router.post('/order/:id', editOrder);

router.get('/users', getUsers );
router.post('/user/create', createUser);
router.post('/user/login', login);
router.post('/user/:id', editUser);
router.get('/user/verify', authmiddleware, (req, res)=>{
   res.send(req.user)
});



module.exports = router;
