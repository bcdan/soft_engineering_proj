const express = require('express');
const router = express.Router();
const shopController = require('../controllers/index');
const { ensureAuthenticated } = require('../config/auth');

//Home page
router.get('/', (req, res) => res.render('store',{title:'GameStore'}));
router.get('/', shopController.getShop);
router.get('/game', (req, res) => res.render('game', { title: 'Game' }));
//Profile page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
	title: 'My Profile',
	name: req.user.firstName,
	role: req.user.role
}));


module.exports = router;