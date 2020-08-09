const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Home page
router.get('/', (req, res) => res.render('store',{title:'GameStore'}));
//Profile page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
	title:'My Profile',
	name: req.user.lastName
}));


module.exports = router;