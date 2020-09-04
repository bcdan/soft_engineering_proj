const express = require('express');
const router = express.Router();
const shopController = require('../controllers/index');
const { ensureAuthenticated } = require('../config/auth');

//Home page
router.get('/', shopController.getShop);
//get game page
router.get('/game', shopController.getGamePage);
//Profile page
router.get('/dashboard', ensureAuthenticated, shopController.getDashboard);

module.exports = router;