const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const path = require('path')
const session = require('express-session')
const PORT = process.env.PORT || 3001;
const getTrends = require("./controllers/getTrends")
const intervalsTest = require("./setIntervalTest")

//console.log(getTrends)
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(expressValidator()) should be setted right after the body-parser
app.use(expressValidator())
app.use(cookieParser())

app.use(session({
  secret: 'enigmaticcatlikestunaandchicken',
  saveUninitialized: true,
  resave: true
}))

//passport init
app.use(passport.initialize());
app.use(passport.session());

// connect Flash
app.use(flash())

// Globar vars
app.use(function(req,res, next){
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})


// Serve up static assets

app.use(express.static(__dirname + '/client/build/'))

// Add routes, both API and view
app.use(routes);


setInterval(getTrends , 1000*3600)
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gettrends");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
