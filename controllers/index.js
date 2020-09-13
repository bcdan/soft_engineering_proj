const Game = require('../models/Game');
const Cart = require('../models/Cart');

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

exports.getGamePage = (req,res) => {
	res.render('game', { title: res.game.title, game: res.game });
};

exports.getGamePayment = (req,res) => {
	res.render('payment', { title: 'Payment', game: res.game  });
};

exports.postGamePayment = (async(req,res) => {
	let game;
	let s = res.game.inventory.pop();
	req.user.inventory.games.push({cdkey:s.cdkey ,title: res.game.title});
	await res.game.save();
	await req.user.save();
	game = res.game;
	res.render('payment-confirm', { title: 'Confirm-Payment', game: game  });
});

exports.getDashboard = ((req,res)=>{
	res.render('dashboard',{
		title: 'My profile',
		name: req.user.firstName,
		inventory:req.user.inventory
	});
});

exports.addToCart = ((req,res)=>{
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.add(res.game,res.game.id);
	req.session.cart = cart;
	console.log(req.session.cart);
	res.redirect('/');
});

exports.getCart = ((req,res)=>{
	if(!req.session.cart){
		return res.render('shopping-cart',{title:'My Cart',products:null});
	}
	let cart = new Cart(req.session.cart);
	let arr = cart.generateArray();
	console.log(arr);
	res.render('shopping-cart',{title:'My Cart',products:arr,totalPrice:cart.totalPrice});
});
