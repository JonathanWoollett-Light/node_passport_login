const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const passport = require('passport');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);


const db_username = process.argv[2];
const db_password = process.argv[3];
console.log(db_username,db_password)

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${db_username}:${db_password}@cluster0.wwsrh.mongodb.net/local?retryWrites=true&w=majority`,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.set('view engine', 'ejs');

// Express body parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config()
// console.log(process.env)

// Express session
app.use(
  session({
    secret: process.env.AUTH_SALT,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// // Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// Routes
app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));

app.listen(process.env.SERVER_PORT, console.log(`Running on  ${process.env.SERVER_PORT}`));
