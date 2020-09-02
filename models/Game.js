const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	game_id: {
		type: Number,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	inventory: [{
		cdkey: {
			type: String,
			default: ''
		},
		_id:false
	}],
	picture: {
		type: String,
		require: true

	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: false
	}
});


const Game = mongoose.model('Game', GameSchema);

module.exports = Game;