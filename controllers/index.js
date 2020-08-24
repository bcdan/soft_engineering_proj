const adminController = require('./admin');
exports.getShop = ((req, res) => {
	//const games = adminController.getAllGames;
	res.render('store', { title: 'GameStore' });
});