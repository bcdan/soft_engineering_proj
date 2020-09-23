// /* eslint-disable no-undef */


// if (document.readyState == 'loading') {
// 	document.addEventListener('DOMContentLoaded', ready);
// } else {
// 	ready();
// }



// function ready() {
// 	// reduce();
// 	// remove();
	
// }

// function reduce(){
// 	// eslint-disable-next-line no-unused-vars
// 	$('.text-dark.reduce').each(function(_index){
// 		$(this).on('click',function(e){
// 			e.preventDefault();
// 			let gameId = $(this).attr('href');
// 			alert('reduced by one!');
// 			$.ajax({
// 				type:'GET',
// 				url:gameId,
// 			});
// 			let currentAmount = parseInt($('.badge').text())-1;
// 			$('.badge').text(currentAmount);
// 		});
// 	});


// }

// function remove(){
// // eslint-disable-next-line no-unused-vars
// 	$('.text-dark.remove').each(function(_index){
// 		$(this).on('click',function(e){
// 			e.preventDefault();
// 			let gameId = $(this).attr('href');
// 			alert('Removed!');
// 			$.ajax({
// 				type:'GET',
// 				url:gameId,
// 			});
// 			let currentAmount = parseInt($('.badge').text())+1;
// 			$('.badge').text(currentAmount);
// 		});
// 	});
// }