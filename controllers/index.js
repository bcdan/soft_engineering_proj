const Game = require('../models/Game');

//get games 
exports.getShop = (async(req, res) => {
	const gameList = [];
	try {
		const games = await Game.find();
		games.forEach(agame => {
			gameList.push(agame);
		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
	res.render('store', { title: 'GameStore', products: gameList ,status : req.user});
});

exports.getGamePage = (req,res) => {
	res.render('game', { title: res.game.title, game: res.game });
};

exports.getGamePayment = (req,res) => {
	res.render('payment', { title: 'Payment', game: res.game });
};

exports.postGamePayment = (async(req,res) => {
	let game;
	let s = res.game.inventory.pop();
	req.user.inventory.games.push({cdkey:s.cdkey ,title: res.game.title});
	await res.game.save();
	await req.user.save();
	game=res.game;
	res.render('payment-confirm', { title: 'Confirm-Payment', game: game });
});

exports.getDashboard = ((req,res)=>{
	res.render('dashboard',{
		title: 'My profile',
		name: req.user.firstName,
		role: req.user.role,
		inventory:req.user.inventory
	});
});
