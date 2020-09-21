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
	//res.render('storetest', {layout:'shopping-cart', title: 'GameStore', products: gameList });
	res.render('store', {title: 'GameStore', products: gameList });
});

exports.getGamePage = (req,res) => {
	res.render('game', { title: res.game.title, game: res.game });
};

exports.getCheckoutPage = (req,res) => {
	if(!req.session.cart){
		return res.redirect('/cart');
	}
	let cart = new Cart(req.session.cart);
	res.render('shopping/checkout', { layout:'shopping/checkout-layout',title: 'Checkout', total:cart.totalPrice });
};

exports.postCheckoutPage = (async(req,res) => {
	let removed ;
	for(let i =0 ;i<res.dbGames.length;i++){
		removed= res.dbGames[i];
		req.user.inventory.games.push({cdkey:removed.inventory.pop().cdkey ,title: removed.title});
		await res.dbGames[i].save();
		await req.user.save();	
	}

	// res.render('shopping/payment-confirm', { title: 'Confirm-Payment', games: res.dbGames });
	res.render('404',{title:'404'});
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
	//req.flash('success_msg', 'Added to cart!');
	res.redirect('/');
});

exports.getCart = ((req,res)=>{
	if(!req.session.cart){
		return res.render('shopping/cart',{layout:'shopping/cart-layout',title:'My Cart',products:null});
	}
	let cart = new Cart(req.session.cart);
	let arr = cart.generateArray();
	res.render('shopping/cart',{layout:'shopping/cart-layout',title:'My Cart',products:arr,totalPrice:cart.totalPrice});
});
