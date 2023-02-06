/*
File:           emailer.js
Author:         Alex McRandal
Email:          amcranda@heidelberg.edu
Project:        CPS 342
*/

/*
Emailer provides functions to be exported so that a server can send auto-
mated emails.
*/

//Import statements
const nodemailer = require('nodemailer');

//Send an automated to email to any number of receivers
//@param receiverStr    A single str formated to one person's email or multiple email addresses seperated by commas
//@param subject        Subject line for the email
//@param message        The message to send to the receivers
exports.sendEmail = function (_receiverStr, _subject, _message){
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hu.alliance4sustainability@gmail.com',   //any @gmail.com address
            pass: 'kjatkotttrlmmsld'                        //for the above account, 1) enable 2-step authentication, 2) create an app password for 'mail' on 'windows computer'
        }
    });

    var mailOptions = {
        from: 'hu.alliance4sustainability@gmail.com',      //same email address as transporter.auth.user
        to: _receiverStr,
        subject: _subject,
        text: _message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        }
        /*
        else {
            console.log('Email sent: ' + info.response);
        }
        */
    });
}//End sendEmail(str)