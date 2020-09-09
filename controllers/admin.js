const Game = require('../models/Game');
const User = require('../models/User');


exports.getProductForm = (req, res) => {
	res.render('add-product', { title: 'Add Product' , status: req.user });
};

exports.getAdminPage = (req, res) => {
	res.render('admin', { title: 'Admin Page', name: req.user.firstName, status: req.user  });
};

//post game
exports.postProduct = (async (req, res) => {
	const game = new Game({
		game_id: req.body.game_id,
		title: req.body.title,
		picture: req.body.picture,
		price: req.body.price,
		description: req.body.description
	});
	try {
		//const newGame = await game.save(); ------> optional
		await game.save();
		req.flash('success_msg','Game added');
		res.status(201).redirect('/admin/games');

	} catch (err) {
		res.status(400).json({ message: err.message });

	}
});

//get all games
exports.getAllGames = (async (req, res) => {
	try {
		const games = await Game.find();
		const gameArray = [];
		games.forEach(agame => {
			gameArray.push(agame);
		});
		
		res.render('games-manager', { title: 'Admin game list', products: gameArray, status: req.user });



	} catch (err) {
		res.status(500).json({ message: err.message });

	}


});

//get one game
exports.getSingleGame = (async (req, res,) => {
	await getGame(req, res);
	res.send(res.game);
});


exports.getEditProductPage = (async (req, res) => {
	await getGame(req, res);
	res.render('edit-product', { title: 'Edit', product: res.game, status: req.user });
});
//Update one game
exports.editGame = (async (req, res) => {
	await getGame(req, res);

	if (req.body.title != null) {
		res.game.title = req.body.title;
	}
	if (req.body.cdkey != null) {
		res.game.cdkey = req.body.cdkey;
	}
	if (req.body.picture != null) {
		res.game.picture = req.body.picture;
	}
	if (req.body.price != null) {
		res.game.price = req.body.price;
	}
	if (req.body.description != null) {
		res.game.description = req.body.description;
	}
	try {
		await res.game.save();
		//res.json(updatedGame);
		req.flash('success_msg','Game updated');
		res.redirect('/admin/games');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});



//Delete one game
exports.deleteGame = (async (req, res) => {
	try {
		await getGame(req, res);
		await res.game.remove();
		//res.json({ message: 'Deleted game' });
		req.flash('error_msg','Game deleted');
		res.redirect('/admin/games');
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}

});

// exports.adminFillInventory = (async (req,res)=>{
// 	req.flash('success_msg','Game inventory filled');
// 	res.redirect('/admin/games');	
// });

exports.fillInventory =(async (req, res) =>{
	let game;
	const defaultAmount = 10;
	try{
		await getGame(req,res);
		game = res.game;
		
		if(game == null)
			return res.status(404).json({msg: 'Couldnt find game'});
	}catch(err){
		return res.status(500).json({ msg: err.message });
	}
	game=generateKeys(game,defaultAmount);
	await res.game.save();
});

exports.viewInventory = (async (req,res)=>{
	let game;
	try{
		await getGame(req,res);
		game = res.game;
		if(game == null)
			return res.status(404).json({msg: 'Couldnt find game'});
	}catch(err){
		return res.status(500).json({ msg: err.message });
	}
	res.render('inventory-admin', { title: game.title, products: game.inventory ,id:game.id, status: req.user});

});




exports.getUsersList = (async (req,res)=>{
	try {
		const users = await User.find();
		const usersArr = [];
		users.forEach(auser => {
			usersArr.push(auser);
		});
		res.render('users-list', { title: 'Users list', users: usersArr , status: req.user});


	} catch (err) {
		res.status(500).json({ message: err.message });

	}
});


exports.getUser = (async (req,res)=>{
	await getUser(req, res);
	res.send(res.user);
});

function generateKeys(game,howMany){
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
	let blockLen = 5;
	let numOfBlocks = 3; 
	let keysToGenerate = howMany;
	for(let k=0;k<keysToGenerate;k++){
		let keyString= '';
		keyString += game.game_id+'-';
		for(let i=0;i<numOfBlocks;i++){
			for(let j=0;j<blockLen;j++){
				let rnum = Math.floor(Math.random()* chars.length);
				keyString+= chars.substring(rnum,rnum+1);
			}
			if(i!=numOfBlocks-1)
				keyString+='-';
		}
		game.inventory.push({cdkey:keyString});
	}
	return game;

}

exports.changeRole = (async (req,res)=>{
	await getUser(req, res);
	try {
		res.user.role == true ? (res.user.role=false) : (res.user.role=true);
		await res.user.save();
		req.flash('success_msg','Role changed');
		res.redirect('/admin/get-users');
	} catch (err) {
		res.status(400).json({ message: err.message });
	}	

});


// Function that finds a game in the DB
async function getGame(req, res) {
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
//Finds a user in DB by ID
async function getUser(req,res){
	let user;
	try{
		user = await User.findById(req.params.id);
		if(user == null){
			return res.status(404).json({msg: 'Cannot find user'});
		}
	}catch(err){
		return res.status(500).json({msg:err.message});
	}
	res.user=user;
}

