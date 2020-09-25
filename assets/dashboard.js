/* eslint-disable no-undef */
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	inventory();

}

function inventory(){
	fetch('/dashboard/inventory')
		.then(response => response.json())
		.then(json => {
			let myInventory = json.inventory.games;
			myInventory.sort(function(strA,strB){
				if(strA.title<strB.title){
					return -1;
				}
				if(strA.title>strB.title){
					return 1;
				}
				return 0;
			});

			var result = [];

			for (var i = 0; i < myInventory.length; i++) {
				var data = myInventory[i];
				var found=false;
				for(var j=0; j<result.length; j++) {
					if(result[j].title === data.title) {
						found=true;
						result[j].cdkey.push(data.cdkey);
						break;
					}
				}
				if(!found) {
					result.push({title:data.title,cdkey:[data.cdkey]});
				}
			}
			addToModal(result);


		})
		.catch(error => console.log(error));

}


function addToModal(result){
	console.log(result);
	for(let	i = 0 ; i<result.length; i++){
		$('.modal-body').append('<p>'+result[i].title+'</p>');
	}

}
