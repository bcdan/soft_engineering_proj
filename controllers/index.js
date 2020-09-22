/* eslint-disable no-unused-vars */
const Game = require('../models/Game');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

//Render shop
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
	res.render('store', {title: 'GameStore', products: gameList });
});

//GET single game page
exports.getGamePage = (req,res) => {
	res.render('game', { title: res.game.title, game: res.game });
};


//GET Paymentpage - checkout
exports.getCheckoutPage = (req,res) => {
	if(!req.session.cart){
		return res.redirect('/cart');
	}
	let cart = new Cart(req.session.cart);
	res.render('shopping/checkout', { layout:'shopping/shopping-layouts/checkout-layout',title: 'Checkout', total:cart.totalPrice });
};


// POST Payment page - checkout
exports.postCheckoutPage = (async(req,res) => {
	let gameInCart ;
	for(let i =0 ;i<res.dbGames.length;i++){
		gameInCart= res.dbGames[i];
		while(gameInCart.qty--){
			req.user.inventory.games.push({cdkey:gameInCart.game.inventory.pop().cdkey ,title: gameInCart.game.title});
		}
		await res.dbGames[i].game.save();
		await req.user.save();	
	}
	let order = new Order({
		user : req.user,
		cart : req.session.cart,
		address : 'random address for now',
		name : 'random name',
		paymentId : 999
	});
	order.save((err, result) => {
		req.session.cart = null;
		res.render('shopping/thankyou', { title: 'Thank you!' });
	});

	// res.render('shopping/payment-confirm', { title: 'Confirm-Payment', games: res.dbGames });
});

exports.getDashboard = ((req,res)=>{
	res.render('dashboard',{
		title: 'My profile',
		name: req.user.firstName,
		inventory:req.user.inventory
	});
});
//
exports.addToCart = ((req,res)=>{
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.add(res.game,res.game.id);
	req.session.cart = cart;
	//req.flash('success_msg', 'Added to cart!');
	res.redirect('/');
});

exports.getCart = ((req,res)=>{
	if(!req.session.cart){
		return res.render('shopping/cart',{layout:'shopping/shopping-layouts/cart-layout',title:'My Cart',products:null});
	}
	let cart = new Cart(req.session.cart);
	let arr = cart.generateArray();
	res.render('shopping/cart',{layout:'shopping/shopping-layouts/cart-layout',title:'My Cart',products:arr,totalPrice:cart.totalPrice});
});
