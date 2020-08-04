const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../data/database');

const JWT_SECRET = 'some long secret';
const COOKIE_NAME = 'jwt-access-token';

router.post('/login', (req, res) => {
	// make sure request body exist
	if (!req.body) {
		return res.sendStatus(400);
	}

	// make sure user exists and passwords match
	// note: this is a bad practice to store raw passwords
	const { username, password } = req.body;
	if (!db.exists(`/users/${username}`)) {
		return res.sendStatus(400);
	}

	const user = db.getData(`/users/${username}`);
	if (user.password !== password) {
		return res.sendStatus(400);
	}

	// create a jwt token for the user
	const payload = { username: user.username, joined: user.joined };
	const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
	// set cookie for the client with the jwt
	res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });
	res.redirect('/');
});

router.post('/register', (req, res) => {
	// make sure request body exist
	if (!req.body) {
		return res.sendStatus(400);
	}
	// make sure user does not exist
	const { username, password, passwordConfirm, email, firstname, lastname, birthday } = req.body;
	if (db.exists(`/users/${username}`)) {
		return res.sendStatus(400);
	}

	//if pass != confirm pass
	if (password !== passwordConfirm) {
		return res.sendStatus(400);
	}
	//if email already registered
	const allUsers = db.getData('/users/');
	for (let k in allUsers) {
		if (k[email] == '1234@gg') {
			console.log(`Bitch ${k[username]}`);
		}
	}



	// create a new user record in the json db
	const user = {
		username,
		password,
		email,
		firstname,
		lastname,
		birthday,
		joined: new Date().toISOString(),
	};
	db.push(`/users/${username}`, user);

	// create a jwt token for the user
	const payload = { username: user.username, joined: user.joined };
	const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

	// set cookie for the client with the jwt
	res.cookie(COOKIE_NAME, accessToken, { httpOnly: true });

	res.redirect('/');
});

router.get('/logout', (req, res) => {
	// remove the cookie to perform a logout
	res.clearCookie(COOKIE_NAME);
	res.redirect('/');
});
module.exports = router;
