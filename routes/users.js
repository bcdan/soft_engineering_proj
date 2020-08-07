const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');


//Login page
router.get('/login', (req, res) => res.render('login'));

//Register page
router.get('/register', (req, res) => res.render('register'));

//Register handle
router.post('/register', (req, res) => {
	const { firstName, lastName, email, password, password2 } = req.body; // TODO:add date of birth
	let errors = [];
	//Check required fields
	if (!firstName || !lastName || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all fields!' });
	}
	//Check passwords match
	if (password !== password2) {
		errors.push({ msg: 'Passwords do not match' });
	}
	//Check pass length
	if (password.length < 1) {
		errors.push({ msg: 'Pass must be at least 1 character long' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			firstName,
			email,
			password,
			password2
		});
	} else {
		const newUser = new User({
			firstName,
			lastName,
			email,
			password
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then(user => {
						// req.flash(
						// 	'success_msg',
						// 	'You are now registered and can log in'
						// );
						res.redirect('/users/login');
					})
					.catch(err => console.log(err));
			});
		});
	}
});

module.exports = router;