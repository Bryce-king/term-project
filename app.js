const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));

// Database connection
mongoose.connect('mongodb://localhost:27017/tv-web-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const ratingRouter = require('./routes/rating');
const repRouter = require('./routes/rep');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/rating', ratingRouter);
app.use('/rep', repRouter);

app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});