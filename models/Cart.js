module.exports = function Cart(oldCart){
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;

	this.add = function(item,id){
		let storedItem = this.items[id];
		if(!storedItem){
			storedItem = this.items[id] = {item:item , qty:0 , price:0};
		}
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.totalQty++;
		this.totalPrice += storedItem.item.price;
	};
	this.generateArray = function (){
		let arr = [];
		for(let id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	};

};
// const mongoose = require('mongoose');

// const CartSchema = new mongoose.Schema({

// 	inventory: {
// 		games: [{
// 			title: {
// 				type: String,
// 				default: ''
// 			},
// 			cdkey: {
// 				type: String,
// 				default: ''
// 			},
// 			_id:false,
// 			picture:{
// 				type:String
// 			}
// 		}]
// 	},
// 	total: {
// 		type: Number,
// 		required: true
// 	}
// });


// const Cart = mongoose.model('Cart', CartSchema);

// module.exports = Cart;
