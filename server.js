const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const db = require('./data/database');

const app = express();

const { authorized, parseUser, anonymouse } = require('./middlewares/auth');

app.use((req, res, next) => {
	const visits = db.getData('/visits');
	db.push('/visits', visits + 1);
	next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'client', 'public')));
app.use(parseUser);
app.use(authRouter);
app.get('/register', anonymouse, (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'register.html')));
app.get('/login', anonymouse, (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'login.html')));
app.get('/404', (req, res) => res.status(404).sendFile(path.resolve(__dirname, 'client', '404.html')));
app.get('/protected', authorized, (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'protected.html')));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'home.html')));
app.use('/', (req, res) => res.redirect('/404'));
app.listen(5000);
