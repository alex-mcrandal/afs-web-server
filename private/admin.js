/*
File:           admin.js
Author:         Alex McRandal
Email:          amcranda@heidelberg.edu
Project:        CPS 342
*/

/*
Admin.js handles all client functionality for admin users trying 
to log on the backend of the server.
*/

//The button the user presses to submit their credentials
var loginButton;
var testButton;


//--------Event listener functions--------


//Admin log in function
var loginFunc = function callToEndpoint(){

    var errorFunc = function(e){
        window.alert(`Error sending request: ${e}`);
    };

    var successFunc = function(res){
        $("#body").html(res);
    };

    $.ajax({
        url: "/admin/user/oEiUbnge8ty3498HeiurGh3497tye9iuRh",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        data: $("#login").serialize(),
        success: function(data){
            if (data == "Login Error"){
                $("#error").css("display", "block");
            }
            else{
                successFunc(data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorFunc("When sending request");
        }
    });

};//End loginFunc


//End: Event listener functions

//Add event listeners to known DOM elements
function initListeners(){

    loginButton.on("click", loginFunc);

}//End function initListeners()

//Initialize the web page"s functionality
function init(){

    //Find DOM elements
    loginButton = $("#loginEvent");

    //Add event listeners
    initListeners();

}//End function init()

//When the window finishes loading
$(document).ready(init());