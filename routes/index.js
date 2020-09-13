const express = require('express');
const router = express.Router();
const shopController = require('../controllers/index');
const { ensureAuthenticated } = require('../config/auth');
const {getGame,fillInventory} = require('./middlewares');

//Home page
router.get('/', shopController.getShop); // Home page / general store

//get game page
router.get('/game/:id', getGame,shopController.getGamePage); // single game page 

//Profile page
router.get('/dashboard', ensureAuthenticated, shopController.getDashboard); 

//Payment page
router.get('/payment/:id', ensureAuthenticated, getGame, shopController.getGamePayment); 

//post-Payment page
router.post('/payment/:id', ensureAuthenticated,getGame, fillInventory , shopController.postGamePayment); 

//get-add to cart with ID - > adds an item to cart
router.get('/add-to-cart/:id',ensureAuthenticated,getGame,shopController.addToCart);

router.get('/cart',ensureAuthenticated,shopController.getCart);

module.exports = router;