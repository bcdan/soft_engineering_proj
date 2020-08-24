const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getProductForm);
router.get('/', adminController.getAdminPage);
router.get('/games', adminController.getAllGames);
router.post('/add-product', adminController.postProduct);
router.get('/games/:id', adminController.getSingleGame);
router.patch('/games/:id', adminController.updateGame);
router.delete('/games/:id', adminController.deleteGame);

module.exports = router;