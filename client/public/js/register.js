// listen to form submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = form.children.username.value;
	const password = form.children.password.value;
	const passwordConfirm = form.children.passwordConfirm.value;
	const email = form.children.email.value;
	const firstname = form.children.firstname.value;
	const lastname = form.children.lastname.value;
	const birthday = form.children.date.value;




	fetch('/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password, passwordConfirm, email, firstname, lastname, birthday }),
	})
		.then(res => res.text())
		.then((data) => {
			localStorage.setItem('token', data.access_token);
			location.href = '/';
		}).catch((err) => {
			console.error(err);
		});
});

// disable default behavior
// post request to server with username and password
