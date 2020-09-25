/* eslint-disable no-undef */


if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}



function ready() {

	const toggleButton= document.getElementsByClassName('toggle-button')[0];
	const navbarLinks = document.getElementsByClassName('navbar-links')[0];
	toggleButton.addEventListener('click',()=>{
		navbarLinks.classList.toggle('active');
	});

	// eslint-disable-next-line no-unused-vars
	$('.product-top .overlay-right .btn-primary').each(function(_index){
		$(this).on('click',function(e){
			e.preventDefault();
			let gameId = $(this).attr('href');
			alert('Added to cart!');
			$.ajax({
				async:true,
				type:'GET',
				url:gameId,
			});
			$('.toast').toast('show');
			let currentAmount = parseInt($('.badge').text())+1;
			$('.badge').text(currentAmount);
		});
	});

}
