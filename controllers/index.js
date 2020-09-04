//const adminController = require('./admin');
exports.getShop = ((req, res) => {
	//const games = adminController.getAllGames;
	res.render('store', { title: 'GameStore' });
});
exports.getGamePage = ((req,res) => {
	res.render('game', { title: 'Game' });
});
exports.getDashboard = ((req,res)=>{
	res.render('dashboard',{
		title: 'My profile',
		name: req.user.firstName,
		role: req.user.role
	});
});