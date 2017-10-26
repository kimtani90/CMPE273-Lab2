var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mysql = require('./mysql');
var fs = require('fs');
var User = require('../models/User');
var File = require('../models/Files');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var splitedemail = req.session.email.split('.')[0];
        cb(null, './public/uploads/'+splitedemail)
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
        cb(null, file.originalname)


    }
});

var upload = multer({storage:storage});



router.get('/',  function (req, res) {


    console.log(req.query.filedata);
    var filedata=req.query.filedata;

    console.log(filedata);

    fs.readFile("/home/kimtani90/PersonalDocs/AboutMe.odt", function (err, data) {

        if(err){
            console.log(err);
        }

        else{
            res.contentType(mime.lookup("/home/kimtani90/PersonalDocs/AboutMe.odt"));
            console.log(data)
            res.send(data);
        }

    });
   // res.download(filedata.filepath, filedata.filename);


});

router.post('/delete', function (req, res) {
    console.log(req.session.email)
    console.log(req.body);
    var filename = req.body.filename;
    var isfile = req.body.isfile;
    var filepath= req.body.filepath;
    var email=req.session.email;

    File.findOne({'filepath':filepath, 'owner':email}, function(err, file){
        if(err){
            throw err;
            res.send({status: 401});
        }

        if(file){

            if (isfile == 'F') {
                try {
                    fs.rmdirSync(filepath)
                }
                catch (err) {
                    execQuery = 'F';
                    res.send({"status": 401, "message": "Folder is not empty!"});
                }

            }
            else {
                fs.unlinkSync(filepath);

            }

            file.remove(function(err){
                if(err){
                    throw err;
                    res.send({status: 401});
                }
                else{
                    res.send({"status": 204, message: "Deleted Successfully!"});
                }

            });

        }

        else{
            res.send({"status": 402, message: "You need admin rights to delete the file/folder!"});
        }
    });

});

router.post('/upload', upload.single('file'), function (req, res) {
    console.log(req.session.email)
    var splitedemail = req.session.email.split('.')[0];
    console.log(req.body);
    var filename = req.file.filename;
    var filepath = './public/uploads/'+splitedemail+'/'+req.file.filename;
    var fileparent = req.body.fileparent;
    var isfile = req.body.isfile;

    if(fileparent)
        filepath=fileparent+'/'+filename


    var filedata={
        'filename': filename,
        'filepath':filepath,
        'fileparent': fileparent,
        'isfile': isfile,
        'owner':req.session.email,
        'sharedcount':0
    };

    var newfile=new File();
        newfile.filename = filename,
        newfile.filepath = filepath,
        newfile.fileparent = fileparent,
        newfile.isfile = isfile,
        newfile.owner = req.session.email,
        newfile.sharedcount = 0



    var log={
        'filename':filename,
        'filepath':filepath,
        'isfile':isfile,
        'action':'Upload File',
        'actiontime': new Date()
    };

    newfile.save(function (err) {

        if(err){
            console.log(err)
            res.send({"status":401});
        }
        else {
            User.update({'email': req.session.email}, {$push: {userlog:log}}, function (err) {
                if (err) {
                    throw err;
                    console.log("Error inserting last login....")
                }
                else {

                    res.send({"filedata": filedata, "status": 204});
                }

            });
        }
    });
});



router.post('/makefolder', function (req, res) {
console.log(req.body)
    var splitedemail = req.session.email.split('.')[0];

    var filename = req.body.foldername;

    var filepath = './public/uploads/'+splitedemail+'/'+filename;
    var fileparent = req.body.fileparent;
    var isfile = req.body.isfile;


    var folderdata={
        'filename': filename,
        'filepath':filepath,
        'fileparent': fileparent,
        'isfile': isfile,
        'owner':req.session.email,
        'sharedcount':0
    };

    var newfolder=new File();
        newfolder.filename = filename,
        newfolder.filepath = filepath,
        newfolder.fileparent = fileparent,
        newfolder.isfile = isfile,
        newfolder.owner = req.session.email,
        newfolder.sharedcount = 0

    var log={
        'filename':filename,
        'filepath':filepath,
        'isfile':isfile,
        'action':'Create Folder',
        'actiontime': new Date()
    };

    var dir = './public/uploads/'+splitedemail+'/'+filename;

    if (!fs.existsSync(dir)){

        fs.mkdirSync(dir);
    }

    newfolder.save( function (err) {

        if(err){
            console.log(err)
            res.send({"status":401});
        }
        else {

            User.update({'email': req.session.email}, {$push: {userlog:log}}, function (err) {
                if (err) {
                    throw err;
                    console.log("Error inserting last login....")
                }
                else {

                    res.send({"folderdata":folderdata, "status":204});
                }

            });
        }

    });

});



router.post('/sharefile', function (req, res) {

    console.log(req.body);
    var userEmail=req.session.email;
    var shareEmail= req.body.shareEmail;

    var file=req.body.filedata;
    var count = file.sharedcount;
    var filename = file.filename;
    var filepath = file.filepath;
    var fileparent = file.fileparent;
    var isfile = file.isfile;

    var log={
        'filename':filename,
        'filepath':filepath,
        'isfile':isfile,
        'action':'Share File',
        'actiontime': new Date()
    };


    File.update({'filepath':filepath}, { $set:{sharedcount:count+1}, $push: {sharedlist: shareEmail}}, function(err){

        if(err){
            throw err;
            res.send({status: 401, email:shareEmail});
        }
        else{

            User.update({'email': req.body.email}, {$push: {userlog:log}}, function (err) {
                if (err) {
                    throw err;
                    console.log("Error inserting last login....")
                }
                else {

                    res.send({"status": 201, "message": "File shared with the user!"});
                }

            });
        }
    });

});



module.exports = router;
