const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { ensureAuthenticatedAdmin } = require('../config/auth');

router.get('/add-product', ensureAuthenticatedAdmin, adminController.getProductForm);
router.get('/', ensureAuthenticatedAdmin, adminController.getAdminPage);
router.get('/games', ensureAuthenticatedAdmin, adminController.getAllGames);
router.post('/add-product', ensureAuthenticatedAdmin, adminController.postProduct);
router.get('/games/:id', ensureAuthenticatedAdmin, adminController.getSingleGame);
router.get('/edit-product/:id', ensureAuthenticatedAdmin, adminController.getEditProductPage);
router.get('/fill-product/:id', ensureAuthenticatedAdmin, adminController.fillInventory);
router.get('/view-inventory/:id',ensureAuthenticatedAdmin,adminController.viewInventory);
router.post('/edit-product/:id', ensureAuthenticatedAdmin, adminController.editGame);
router.post('/delete-product/:id', ensureAuthenticatedAdmin, adminController.deleteGame);


module.exports = router;