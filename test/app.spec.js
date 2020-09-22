const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
jest.setTimeout(30000);

describe('POST /users/', () => {
	it('POST /user/login (invalid)', async () => {
		const response = await request(app).post('/users/login').send({ email: 'invalid', password: '123456' });
		expect(response.status).toBe(500);
		expect(response.headers['content-type']).toContain('text/html');
	});
	it('POST /user/register', async () => {
		const response = await request(app).post('/users/register').send( {
			firstName: 'test', 
			lastName: 'test', 
			email: 'test@test',
			password: '123456',
			password2: '123456'
		});
		expect(response.status).toBe(200);
	});
	it('POST /user/login (valid)', async () => {
		const response = await request(app).post('/users/login/').send({
			email: 'test@test',
			password: '123456'
		});
		expect(response.headers['location']).toBe('/dashboard');
	});
});

describe('GET /admin/', () => {
	it('GET /admin/ (invalid)', async () => {
		const response = await request(app).get('/admin');
		expect(response.status).toBe(302); // if not logged in redirect
		expect(response.headers['location']).toBe('/users/login');
		// usage of the done function
	});
	it('GET /admin/ (valid)', async () => { 
		const response = await request(app).post('/users/login').send({ email: 'sinos@gmail.com', password: '12341234'});
		expect(response.status).toBe(302);
		expect(response.headers['location']).toBe('/dashboard');
	});
});

afterAll(async () => {
	await mongoose.disconnect();
});