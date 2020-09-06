const express = require('express');
const router = express.Router();
const shopController = require('../controllers/index');
const { ensureAuthenticated } = require('../config/auth');

//Home page
router.get('/', shopController.getShop); 

//get game page
router.get('/game/:id', shopController.getGamePage); // single game page -> add ejs stuff

//Profile page
router.get('/dashboard', ensureAuthenticated, shopController.getDashboard); //add inventory view per user
//todo : add payment route


module.exports = router;