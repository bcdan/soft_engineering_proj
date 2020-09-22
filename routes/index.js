const express = require('express');
const router = express.Router();
const shopController = require('../controllers/index');
const { ensureAuthenticated } = require('../config/auth');
const {getGame, fillInventory, getGamesFromCart} = require('./middlewares');

//Home page
router.get('/', shopController.getShop); // Home page / general store

//get game page
router.get('/game/:id', getGame,shopController.getGamePage); // single game page 

//Profile page
router.get('/dashboard', ensureAuthenticated, shopController.getDashboard); 

//Payment/checkout page
router.get('/checkout/', ensureAuthenticated,  shopController.getCheckoutPage); 

//Post payment / checkout page
router.post('/checkout/', ensureAuthenticated, getGamesFromCart,fillInventory,shopController.postCheckoutPage); 

//GET add to cart with ID - > adds an item to cart
router.get('/add-to-cart/:id',ensureAuthenticated,getGame,shopController.addToCart);

//GET cart review page
router.get('/cart',ensureAuthenticated,shopController.getCart);

module.exports = router;