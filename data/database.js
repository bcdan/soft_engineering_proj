const { JsonDB } = require('node-json-db');
const path = require('path');

// initialize a json databse file
const db = new JsonDB(path.resolve(__dirname, 'db.json'), true, true);

// seed database with values

if (!db.exists('/visits')) {
	db.push('/visits', 0);
}

if (!db.exists('/users')) {
	db.push('/users', {});
}

module.exports = db;
