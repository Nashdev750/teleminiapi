// routes/userRoutes.js
const multer = require('multer');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/product.controller');
const { createUser, getUsers, editUser, login } = require('../controllers/auth/auth.controller');
const { createOrder, getOrders, editOrder, getOrder, deleteOrder } = require('../controllers/order/order');
const path = require('path');

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
router.get('/order/:id', getOrder);
router.post('/order/create', createOrder);
router.post('/order/:id', editOrder);
router.get('/order/delete/:id', deleteOrder);

router.get('/users', getUsers );
router.post('/user/create', createUser);
router.post('/user/login', login);
router.post('/user/:id', editUser);
router.get('/user/verify', authmiddleware, (req, res)=>{
   res.send(req.user)
});

router.get('/public/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const directoryPath = path.join(__dirname, '../public');  // Adjust the path according to your setup
  const imagePath = path.join(directoryPath, imageName);

  // Send the image file
  res.sendFile(imagePath, (err) => {
      if (err) {
          console.log(err);
          res.status(404).send(err.message);
      }
  });
});




module.exports = router;
