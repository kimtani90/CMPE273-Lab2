var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var User = require('../models/User');
var crypto = require('crypto');
var fs = require('fs');
var File = require('../models/Files');
var passport = require('passport');
require('./passport')(passport);
var bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res) {

    var email=req.session.email;
    var userdetails={
        firstname: '',
        lastname: '',
        email: '',
        contactno: '',
        interests:'',
        lastlogin:'',
        files :[],
        userlog:[]

    }

    User.findOne({'email': email}, function (err, user) {
        if (err) {
            throw err;

            res.send({status: 401});
        }
        else {

            File.find({ $or: [ {'owner': email}, {'sharedlist': email} ]}, function (err, filesArr) {

                if (err) {
                    throw err;


                }

                if(!user){
                    res.send({status: 401});
                }
                else {

                    userdetails.firstname=user.firstname;
                    userdetails.lastname=user.lastname;
                    userdetails.email=user.email;
                    userdetails.contactno=user.contactno;
                    userdetails.interests=user.interests;
                    userdetails.lastlogin=user.lastlogintime;
                    userdetails.userlog=user.userlog;
                    userdetails.files=filesArr;


                    res.send({"userdetails": userdetails, "status": 201});
                }

            });
        }

    });

});

router.post('/', function (req, res) {

    var reqEmail = req.body.email;
    var reqPassword = req.body.password;

    User.findOne({'email': reqEmail}, function (err, user) {

   // passport.authenticate('login', function(err, user) {

        if (err) {
            throw err;

        }

        if(!user || !bcrypt.compareSync(reqPassword, user.password)){
            console.log('errorr')
            res.send({status: 401});
        }
        else {


            req.session.email = user.email;
            console.log(req.session.email);

            user.update({lastlogintime: new Date()}, function (err) {
                if (err) {
                    throw err;
                    console.log("Error inserting last login....")
                }
                else {

                    console.log("last login inserted....")
                    res.send({"status": 201, "email": user.email});
                }

            });

        }


    });
});

router.post('/signup', function (req, res) {


    var newUser = new User();
    var hash = bcrypt.hashSync(req.body.password, 10);
console.log(hash);
    newUser.password = hash;

    newUser.firstname = req.body.firstName;
    newUser.lastname = req.body.lastName;
    newUser.email = req.body.email;

    console.log(req.body)
    newUser.save(function(err){

        if(err){
            throw err;
            console.log(err)
            res.status(401).json({message: "SignUp failed"});
        }
        else {

            var fs = require('fs');
            var splitemail = req.body.email.split('.')[0];
            var dir = './public/uploads/' + splitemail;

            if (!fs.existsSync(dir)) {

                fs.mkdirSync(dir);
            }
            res.status(201).json({message: "User Details Saved successfully"});
        }

    });


});



router.post('/updateuser', function (req, res) {
console.log(req.body)
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var contact = req.body.contactno;
    var interests = req.body.interests;
    var email = req.session.email;


    User.update({'email':email},{'firstname': firstname, 'lastname':lastname,
                    'contactno':contact, 'interests':interests}, function (err) {
        if(err){
            console.log(err);
            res.status(401).send();
        }
        else
        {

            res.status(201).send();

        }

    });

});


//Logout the user - invalidate the session
router.post('/logout', function (req, res) {

    req.session.destroy();
    console.log('Session destroyed');
    res.status(201).send();

});

module.exports = router;
