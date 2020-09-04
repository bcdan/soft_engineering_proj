const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');


// Login Page
router.get('/login', UsersController.getLoginPage );


// Register Page
router.get('/register', UsersController.getRegisterPage );

// Register
router.post('/register', UsersController.registerUser);

//login handle
router.post('/login', UsersController.handleLogin);

//logout handle
router.get('/logout', UsersController.handleLogout);


module.exports = router;
