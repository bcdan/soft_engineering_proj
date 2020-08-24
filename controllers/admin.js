const Game = require('../models/Game');

exports.getProductForm = (req, res) => {
	res.render('add-product', { title: 'Add Product' });
};

exports.getAdminPage = (req, res) => {
	res.render('admin', { title: 'Admin Page' });
};

//post game
exports.postProduct = (async (req, res) => {
	const game = new Game({
		game_id: req.body.game_id,
		title: req.body.title,
		cdkey: req.body.cdkey,
		picture: req.body.picture,
		price: req.body.price,
		description: req.body.description
	});
	try {
		//const newGame = await game.save(); ------> optional
		await game.save();
		res.status(201).redirect('/admin');
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
		//res.json(games);
		//res.send(gameArray);
		res.render('admin-games', { title: 'Admin game list', products: gameArray });


	} catch (err) {
		res.status(500).json({ message: err.message });

	}


});

//get one game
exports.getSingleGame = (async (req, res,) => {
	await getGame(req, res);
	res.send(res.game);
});


//Update one game
exports.updateGame = (async (req, res) => {
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
	try {
		const updatedGame = await res.game.save();
		res.json(updatedGame);
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
		res.redirect('/admin/games');
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}

});

// Function that finds a game in the DB
async function getGame(req, res) {
	let game;
	try {
		game = await Game.findById(req.params.id); // maybe change to ID and not game_id
		if (game == null) {
			return res.status(404).json({ msg: 'Cannot find game' });
		}
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}

	res.game = game;
}

