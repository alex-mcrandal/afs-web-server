/*
File:           adminUser.js
Author:         Alex McRandal
Email:          amcranda@heidelberg.edu
Project:        CPS 342
*/

/*
AdminUser.js handles all admin functionalities.
*/


//---------POST Request Functions--------

//Send event data to the server to be stored
function addGroupEvent(){

    var errorFunc = function(e){
        window.alert(`Error sending request: ${e}`);
    };

    var successFunc = function(res){
        window.alert(`Success: ${res}`);
    };

    $.ajax({
        url: "/admin/user/functions/add-event",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $("#eventAdder").serialize(),
        success: function(data){
            successFunc(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorFunc("When sending request");
        }
    });

}//End addGroupEvent()

//Send event data to the server to be removed
function removeGroupEvent(){

    var errorFunc = function(e){
        window.alert(`Error sending request: ${e}`);
    };

    var successFunc = function(res){
        window.alert(`Success: ${res}`);
    };

    $.ajax({
        url: "/admin/user/functions/remove-event",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $("#eventRemover").serialize(),
        success: function(data){
            successFunc(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorFunc("When sending request");
        }
    });

}//End removeGroupEvent()

//Send email data to the server to be delivered
function sendGroupEmail(){

    var errorFunc = function(e){
        window.alert(`Error sending request: ${e}`);
    };

    var successFunc = function(res){
        window.alert(`Success: ${res}`);
    };

    $.ajax({
        url: "/admin/user/functions/send-email",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $("#emailer").serialize(),
        success: function(data){
            successFunc(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorFunc("When sending request");
        }
    });

}//End removeGroupEvent()

//---------End POST Request Functions--------


//Add event listeners to DOM objects
function addListeners(){

    //Panel Listeners
    $('#eventsPanel').click(function(){
        $("#eventsFunc").toggle();
    });
    $('#emailPanel').click(function(){
        $("#emailFunc").toggle();
    });
    $('#aboutPanel').click(function(){
        $("#aboutFunc").toggle();
    });

    //Button Listeners
    $('#submitEvent').click(function(){
        addGroupEvent();
    });
    $('#removeEvent').click(function(){
        removeGroupEvent();
    });
    $('#sendEmail').click(function(){
        sendGroupEmail();
    });

}//End addListeners()

//Initialize admin user functionality
function init(){
    addListeners();
}//End init()

$(document).ready(init());