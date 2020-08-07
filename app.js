const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Mongo DB connected successfully'))
	.catch(err => console.log(err));


//EJS

app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({ extended: false }));


//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`server started on port ${PORT}`));