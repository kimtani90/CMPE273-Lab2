var express = require('express');
var router = express.Router();
var User = require('../models/User');
var File = require('../models/Files');
var Group = require('../models/Groups');
var UserLog = require('../models/UserLog');


router.get('/getgroups', function (req, res) {

    var email=req.session.email;
    var groups = []

    Group.find( {$or : [{'owner' : email},{'members':email}] }, function (err, groupsArr) {

        if (err) {
            throw err;
        }

        if(!groupsArr){
            res.send({status: 401});
        }
        else {
            console.log(groupsArr)
            groups=groupsArr;
            res.send({"groups": groups, "status": 201});
        }

    });


});


router.post('/deletegroup', function (req, res) {

    var groupname = req.body.groupname;
    var owner = req.session.email;


    var log={
        'groupname':groupname,
        'action':'Delete Group',
        'actiontime': new Date()
    };


    Group.remove({'groupname':groupname, 'owner': owner},function(err){
        if(err){
            throw err;
            res.send({status: 401, message: "Error deleting group!"});
        }
        else{

            UserLog.update({'user': owner}, {$push: {grouplog:log}}, function (err) {
                if (err) {
                    throw err;

                }
                else {

                    res.send({"status": 201, message: "Group deleted Successfully!"});
                }

            });

        }

    });
});

router.post('/addgroup', function (req, res) {

    console.log(req.body)
    var groupname = req.body.groupname;

    var membercount = 0;

    var email = req.session.email;

    var log = {
        'groupname': groupname,
        'action': 'Add Group',
        'actiontime': new Date()
    };

    var newgroup = new Group();
    newgroup.groupname = groupname;
    newgroup.membercount = membercount;
    newgroup.owner = email;

    var group = {};
    group.groupname = groupname;
    group.membercount = membercount;
    group.owner = email;

    Group.findOne({'groupname': groupname, 'owner': email}, function (err, group) {

        if (err) {
            throw err;
        }

        if (groups) {
            res.send({status: 401, message: "Group name already exists!"});
        }

        else {

            newgroup.save(function (err) {

                if (err) {
                    console.log(err)
                    res.send({"status": 401});
                }
                else {
                    UserLog.update({'user': email}, {$push: {grouplog: log}}, function (err) {
                        if (err) {
                            throw err;
                            console.log("Error inserting last login....")
                        }
                        else {
                            console.log(group);
                            res.send({"status": 201, "group": group, "message": "Group created successfully!"});
                        }

                    });
                }
            });
        }
    });
});


router.get('/getmembers', function (req, res) {

    var email= req.session.email;
    var groupname= req.body.groupname;
    var owner= req.body.owner;

    Group.findOne( {'groupname': groupname, 'owner': owner}, function (err, group) {

        if (err) {
            throw err;
        }

        if(!group){
            res.send({status: 401});
        }
        else {
            console.log(group)

            res.send({"groups": group.members, "status": 201});
        }

    });


});


router.post('/deletemember', function (req, res) {

    var groupname = req.body.groupname;
    var member = req.body.email;
    var owner = req.body.owner;

    var log={
        'groupname':groupname,
        'action':'Delete Member '+member,
        'actiontime': new Date()
    };


    Group.update({'groupname': groupname, 'owner': owner}, {$pull: {'members': member}},function(err){
        if(err){
            throw err;
            res.send({status: 401, message: "Error deleting member!"});
        }
        else{

            UserLog.update({'user': owner}, {$push: {grouplog:log}}, function (err) {
                if (err) {
                    throw err;

                }
                else {

                    res.send({"status": 201, message: "Member deleted Successfully!"});
                }

            });

        }

    });
});

router.post('/addmember', function (req, res) {

    var groupname = req.body.groupname;
    var member = req.body.email;
    var owner = req.body.owner;


    var log={
        'groupname':groupname,
        'action':'Add Member '+member,
        'actiontime': new Date()
    };

    var member = {}


    User.findOne( {'email': member}, function (err, user) {

        if (err) {
            throw err;
        }

        if (!user) {
            res.send({status: 401, message: "User not available on dropbox!"});
        }

        else {

            member.firstname= user.firstname;
            member.lastname=user.lastname;
            member.group=groupname;

            Group.update({'groupname': groupname, 'owner': owner}, {$push: {'members': member}},function(err){
                if(err){
                    throw err;
                    res.send({status: 401, message: "Error adding member!"});
                }
                else{

                    UserLog.update({'user': owner}, {$push: {grouplog:log}}, function (err) {
                        if (err) {
                            throw err;

                        }
                        else {

                            res.send({"status": 201, "member":member, message: "Member added Successfully!"});
                        }

                    });

                }

            });


        }
    })

});


module.exports = router;
