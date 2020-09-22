const app = require('../app');
const request = require('supertest');
const agent = request.agent(app);
const mongoose = require('mongoose');
const Game = require('../models/Game');

jest.setTimeout(30000);

describe('Admin authentication', () => {	
	it('Create admin session', async () => { 
		jest.setTimeout(30000);
		await agent.post('/users/login').send({email: 'sinos@gmail.com', password: '12341234'}).expect(302)
			.then(res => {
				const cookie = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
				agent.jar.setCookies(cookie);
			});
	});
});

describe('CRUD testing on Games', () => {
	const testGame = { 
		game_id: 5554,
		title: 'title',
		picture: 'picture',
		price: 15,
		description: 'description'
	};
	it('Authenticating admin session', async () => {
		await agent.get('/admin/').expect(200);
	});
	it('Adds a game to DB', async () => {
		const response = await agent.post('/admin/add-product/').send(testGame);
		expect(response.status).toBe(302);
	});
	it('Looks for added game in DB', async () => {
		let existing = Game.findOne( { game_id: testGame.game_id } );
		expect(existing).toBeDefined;
	});
});

afterAll(async () => {
	await mongoose.disconnect();
});