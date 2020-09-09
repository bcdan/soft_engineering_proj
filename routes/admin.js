const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { ensureAuthenticatedAdmin } = require('../config/auth');
const {getGame,getUser,fillInventory} = require('./middlewares');



//Admin page
router.get('/', ensureAuthenticatedAdmin, adminController.getAdminPage);
//Games list via admin page
router.get('/games', ensureAuthenticatedAdmin, adminController.getAllGames);
//Add product to DB
router.post('/add-product', ensureAuthenticatedAdmin, adminController.postProduct);
//Get a single game from DB by ID
router.get('/games/:id', ensureAuthenticatedAdmin, getGame, adminController.getSingleGame);
//Edit a game by ID
router.get('/edit-product/:id', ensureAuthenticatedAdmin, getGame, adminController.getEditProductPage);
//Fill game's inventory by ID
router.get('/fill-product/:id', ensureAuthenticatedAdmin, getGame, fillInventory, adminController.adminFillInventory);
//View game's inventory by ID
router.get('/view-inventory/:id',ensureAuthenticatedAdmin, getGame, adminController.viewInventory);
//Post-edit game by ID
router.post('/edit-product/:id', ensureAuthenticatedAdmin, getGame, adminController.editGame);
//Delete game by ID
router.post('/delete-product/:id', ensureAuthenticatedAdmin,getGame, adminController.deleteGame);
//Get users list via admin page
router.get('/get-users', ensureAuthenticatedAdmin, adminController.getUsersList);
//Get a single user by ID from DB
router.get('/get-users/:id', ensureAuthenticatedAdmin, getUser, adminController.getUser);
//Change a user's role by ID
router.post('/get-users/:id', ensureAuthenticatedAdmin, getUser, adminController.changeRole);


module.exports = router;