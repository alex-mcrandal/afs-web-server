/*
File:           server.js
Author:         Alex McRandal
Email:          amcranda@heidelberg.edu
Project:        CPS 342
*/

/*
This module is mainly responsible for listening to client requests and 
responding with the appropiate file or information.
*/

//Import statements
const https = require('https');         //Listening to web requests and responding
const fs = require('fs');               //Working with the local file system
const express = require('express');     //Utility package for creating server applications
const path = require('path');           //Module for creating file paths
const httpMsgs = require('http-msgs');  //Utility for responding to POST requests
const qString = require('querystring'); //Parses query strings into objects
const emailer = require('./server_modules/emailer.js');
const { json } = require('express');

//Create an object containing the directory for the encryption keys
const options = {
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),      //private key
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem'))     //public key
};

//Initiate a server application
const app = express();


//--------Serving Static Files


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use(express.static(path.join(__dirname, 'private')));


//End: Serving Static Files


//--------Web Page Requests--------


//Callback function when user requests the admin page
app.get('/admin/3i4UThG3Q95pEur', function(req, res){
    res.sendFile(path.join(__dirname, 'private', 'admin.html'));
});

//Callback function when the user requests the home page
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'public', 'webpages', 'index.html'));
});


//End: Web Page Requests


//--------CSS Requests--------


app.get('/admin/css', function (req, res){
    res.sendFile(path.join(__dirname, 'private', 'admin.css'));
});


//End: Css Requests


//--------JS Requests--------


app.get('/admin/js', function (req, res){
    res.sendFile(path.join(__dirname, 'private', 'admin.js'));
});

app.get('/adminuser/js', function (req, res){
    res.sendFile(path.join(__dirname, 'private', 'adminUser.js'));
});

app.get('/index/js', function (req, res){
    res.sendFile(path.join(__dirname, 'public', 'webpages', 'index.js'));
});


//End: JS Requests


//--------POST Request--------

//Admin log-in attempt
app.post('/admin/user/oEiUbnge8ty3498HeiurGh3497tye9iuRh', function (req, res){
    let data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function(){
        let dataObj = qString.parse(data);

        if (dataObj.username == 'admin' && dataObj.password == 'admin'){
            res.sendFile(path.join(__dirname, 'private', 'adminUser.html'));
        }
        else{
            res.send('Login Error');
        }
    });
});

//Admin add event
app.post('/admin/user/functions/add-event', function (req, res){
    let data = '';
    req.on('data', function(chunk){
        data += chunk;
    });

    req.on('end', function (){
        console.log(data);
        //TODO: give event a unique id
        //TODO: store data to a database
        res.send('Data sent to server successfully!');
    })
});

//Admin remove event
app.post('/admin/user/functions/remove-event', function (req, res){
    let data = '';
    req.on('data', function(chunk){
        data += chunk;
    });

    req.on('end', function (){
        console.log(data);
        //TODO: remove data from database
        res.send('Data sent to server successfully!');
    })
});

//Admin send email
app.post('/admin/user/functions/send-email', function (req, res){
    let data = '';
    req.on('data', function(chunk){
        data += chunk;
    });

    req.on('end', function (){
        let dataPieces = data.split("&");
        let subjectLine = dataPieces[0].split("=")[1];
        let message = dataPieces[1].split("=")[1];

        subjectLine = subjectLine.replace(/\+/g, " ");
        message = message.replace(/\+/g, " ");

        //Create the receivers formatted string
        let receivers = "";
        let dataObj = JSON.parse(fs.readFileSync(path.join(__dirname, "/Storage/" + "DB.txt"), "utf-8"));

        receivers += dataObj.emails[0];
        for(let i = 1; i < dataObj.emails.length; i++){
            receivers += ", " + dataObj.emails[i];
        }

        emailer.sendEmail(receivers, subjectLine, message);

        res.send('Data sent to server successfully!');
    })
});

//User email signup
app.post('/newsletter/forms/submission', function (req, res){
    let data = '';
    req.on('data', function(chunk){
        data += chunk;
    });

    req.on('end', function (){
        storeUserData(data);
    })
});


//End: POST Request


//--------Helper Functions--------


//Converts a data string received from a client to JSON notation
function storeUserData(_dataStr){
    let valuePairs = _dataStr.split("&");
    writeToEmailStorage(valuePairs[1].split("=")[1])
    
}//end parseUserData(string)

//Write to json file for storage
function writeToEmailStorage(_email){
    fs.readFile(path.join(__dirname, "/Storage/" + "DB.txt"), "utf-8", (err, data) => {
        if (err) throw err;

        let dataObj = JSON.parse(data);
        dataObj.emails.push(_email.replace(/%40/g, "@"));
        fs.writeFile(path.join(__dirname, "/Storage/" + "DB.txt"), JSON.stringify(dataObj), (err) => {
            if (err) throw err;
        });
    });
}//End writeToEmailStorage(string)


//End Helper Functions


//Initialize txt file storage
var jsonObj = '{"emails":[]}';
fs.writeFile(path.join(__dirname, "/Storage/" + "DB.txt"), jsonObj, (err) => {
    if (err) throw err;
});

//Create a server listening on port 443 and tell the admin the server started
https.createServer(options, app).listen(443, () => console.log("Server started on port 443..."));