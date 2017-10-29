var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/User');
var bcrypt = require('bcrypt');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
                console.log('second in pass');
                try {
                    console.log(email);
                    User.findOne({'email': email}, function (err, user) {
                        if(!user || !bcrypt.compareSync(password, user.password)){
                            console.log('errorr')
                            done(null, false);
                        }
                        else {

                            console.log("In userr");
                            done(null, {email: email});

                        }
                    });
                }
                catch (e){
                    done(e,{});
                }

        }));
};


