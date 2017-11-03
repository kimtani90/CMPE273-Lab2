var express = require('express');
var router = express.Router();
var User = require('../models/User');
var File = require('../models/Files');
var Group = require('../models/Groups');
var UserLog = require('../models/UserLog');


router.get('/getgroups', function (req, res) {

    var email=req.session.email;

    Group.find( {$or : [{'owner' : email},{'members':email}] }, function (err, group) {

        if (err) {
            throw err;
        }

        if(!groupsArr){
            res.send({status: 401});
        }
        else {

            res.send({"groups": group.groups, "status": 201});
        }

    });


});


router.post('/delete', function (req, res) {

    var groupname = req.body.groupname;
   /* var isfile = req.body.isfile;
    var filepath= req.body.filepath;*/
    var email=req.session.email;

    var log={
        'groupname':groupname,
        'action':'Delete Group',
        'actiontime': new Date()
    };


    Group.remove({'groupname':groupname},function(err){
        if(err){
            throw err;
            res.send({status: 401});
        }
        else{

            UserLog.update({'user': req.session.email}, {$push: {grouplog:log}}, function (err) {
                if (err) {
                    throw err;

                }
                else {

                    res.send({"status": 204, message: "Deleted Successfully!"});
                }

            });

        }

    });
});

router.post('/addgroup', function (req, res) {

    var groupname = req.body.groupname;

    var membercount = 0;

    /* var isfile = req.body.isfile;
     var filepath= req.body.filepath;*/
    var email=req.session.email;

    var log={
        'groupname':groupname,
        'action':'Add Group',
        'actiontime': new Date()
    };

    var newgroup=new Group();
        newgroup.groupname = filename;
        newgroup.membercount = membercount;
        newgroup.owner = owner;

    newgroup.save(function (err) {

        if(err){
            console.log(err)
            res.send({"status":401});
        }
        else {
            UserLog.update({'user': email}, {$push: {grouplog:log}}, function (err) {
                if (err) {
                    throw err;
                    console.log("Error inserting last login....")
                }
                else {

                    res.send({"status": 204});
                }

            });
        }
    });
});


module.exports = router;
