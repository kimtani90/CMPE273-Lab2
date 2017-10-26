var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/User');

module.exports = function(passport) {
    console.log("First in passport")
    passport.use('login', new LocalStrategy(function(email , password, done) {
        console.log('second in pass');
        try {
            console.log(email);
            User.findOne({'email': email, 'password' : password}, function (err, user) {
                  if (user) {
                        console.log("In userr");
                        done(null, {email: email, password: password});

                    } else {
                        console.log("In elsee");
                        done(null, false);
                    }

            });
        }
        catch (e){
            done(e,{});
        }
    }));
};


