const Game = require('../models/Game');
const { fillInventory } = require('./admin');

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
	res.render('store', { title: 'GameStore', products: gameList });
});

exports.getGamePage = (async(req,res) => {
	await getGame(req,res);						
	res.render('game', { title: res.game.title, game: res.game });
});

exports.getGamePayment = (async(req,res) => {
	await getGame(req,res);						
	res.render('payment', { title: 'Payment', game: res.game });
});

exports.postGamePayment = (async(req,res) => {
	try{
		await getGame(req, res);
		if(res.game.inventory.length == 1 || res.game.inventory.length == 0) await fillInventory(req, res); 
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
	let s = res.game.inventory.pop();
	req.user.inventory.games.push({cdkey:s.cdkey ,title: res.game.title});
	await res.game.save();
	await req.user.save();
	res.render('payment-confirm', { title: 'Confirm-Payment', game: res.game });
});

exports.getDashboard = ((req,res)=>{
	res.render('dashboard',{
		title: 'My profile',
		name: req.user.firstName,
		role: req.user.role,
		inventory:req.user.inventory
	});
});

//get game by id
async function getGame(req, res){
	let game;
	try {
		game = await Game.findById(req.params.id);
		if (game == null) {
			return res.status(404).json({ msg: 'Cannot find game' });
		}
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}

	res.game = game;
}