const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');

describe('GET /admin', () => {
	it('request admin page without being logged in', async () => {
		const response = await request(app).get('/admin');
		expect(response.status).toBe(302); // if not logged in redirect
		expect(response.headers['location']).toBe('/users/login');
		// usage of the done function
	});
});

describe('GET /users/register', () => {
	// Tal's opinion: it should not redirect and rather return the page with a status 400
	it('Should redirect to login', async () => {
		const response = await request(app).post('/users/login').send({ username: 'Tal', password: '123456' });
		expect(response.status).toBe(302);
		expect(response.headers['content-type']).toContain('text/plain');
	});
});

afterAll(async () => {
	await mongoose.disconnect();
});