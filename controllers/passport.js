
// setting dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
const db = require('../models')

console.log("use local strategy before find user")


// setting the passport.js using LocalStrategy constructor
// LocalStrutegu allows you to create local login using local database
passport.use(new LocalStrategy(
    // callback function for the local strategy
    // passport catches and uses login and password from login form
    // after User makes post request/submmites the form
    function(username, password, done) {
        // sequilize looks for the user in the database by username
        db.User.find({ username: username }) // sequelize uses promices 
       .then(user => {
            if (!user) { 
                return done(null, false, {message: 'Unknown User'}) 
            } else {
                // if user exists we need to compare the password
                // from the login form and the encrypted password stored 
                // in the database associated with the username
                // and again with the bcrypt is better to use the promices 
                // because it takes time to decrypt/encrypt rassword and compare them
                bcrypt.compare(password, user[0].password).then(function(res) { 
                    // bcrypt.compare() returns true/false if "login" password and password in database match/missmatches
                    if (res) {
                        // if we have a match use callback function to send user
                        // and start/create user session
                        done(null, user)
                    } else {
                        // if not => send the error message to the front-end 
                        // to let user know that login failed and password is incorrect
                        done(null, false, {message: 'Invalid password'})
                    }
                })
            }
       })
    })
)

// serializeUser determines, which data of the user object should be stored in the session

passport.serializeUser(function(user, done) {
    done(null, user[0]._id);
  });

// passport.deserializeUser is invoked on every request by passport.session. 
// It enables us to load additional user information on every request. 
// This user object is attached to the request 
// as req.user making it accessible in our request handling.
passport.deserializeUser(function(id, done) {
    db.User.findById(id).then((user) =>{
        console.log("user inside of deser", user)
        var userSession = {
            id: user._id,
            name: user.username
        }
        if (user) {
            done(null, userSession);
        } else {
            done(user.errors, null);
        }
    }).catch(err => console.log(err));
});

module.exports = passport