var express = require("express");
var app = express();
var bodyParse = require('body-parser');
var session = require('express-session')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
// middleware facebook
app.use(bodyParse.json());
app.use(session({
  secret : 'da illest developer',
  resave: true,
  saveUninitialized: true
}));


var FACEBOOK_APP_ID = '335211334063947',
    FACEBOOK_APP_SECRET = '9141ff8f7c856f07fb67fc18df442c9e';


var fbOpts = { 
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    //profileFields:['emails']
}

var fbCallback = function(accessToken, refreshToken, profile, cb) {
console.log(accessToken, refreshToken, profile);
return cb(err, user);
};

passport.use(new FacebookStrategy(fbOpts, fbCallback)); 


app.route('/')
.get(passport.authenticate('facebook'));

app.route('/auth/facebook/callback')
.get(passport.authenticate('facebook',function(err,user,info){
    console.log(err,user,info);
}));

app.listen(8080);