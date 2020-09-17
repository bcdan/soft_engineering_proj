const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('GET /admin', () => {
	it('request admin page without being logged in', async (done) => {
		//because of the asynchronous nature, we need
		//to use the done function to ends the test

		const response = await request.get('/admin');
		expect(response.status).toBe(302); // if not logged in redirect
		console.log(response.headers);
		expect(response.headers['location']).toBe('/users/login');

		// usage of the done function
		done();
	});
});

describe('GET /users/register', () => {
	// Tal's opinion: it should not redirect and rather return the page with a status 400
	it('Should redirect to login', async (done) => {
		const response = await request.post('/users/login').send({ username: 'Tal', password: '123456' });
		expect(response.status).toBe(302);
		expect(response.headers['content-type']).toContain('text/plain');
		done();
	});
});