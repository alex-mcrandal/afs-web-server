/*
File:           index.js
Author:         Alex McRandal
Email:          amcranda@heidelberg.edu
Project:        CPS 342
*/

/*
Index.js handles all client functionality for regular users.
*/

var newsletterBtn;

//Event listener function
var signupFunc = function callToEndpoint(){

    var errorFunc = function(e){
        window.alert(`Error sending request: ${e}`);
    };

    var successFunc = function(res){
        //console.log(res);
    };

    $.ajax({
        url: "/newsletter/forms/submission",
        method: "POST",
        contentType: "multipart/form-data",
        data: $("#newsletterSignup").serialize(),
        success: function(data){
            successFunc(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            errorFunc("When sending request");
        }
    });

};

//Add event listeners
function initListeners(){
    newsletterBtn.on("click", signupFunc);
}

//Initialize the web page"s functionality
function init(){

    //Find DOM elements
    newsletterBtn = $("#submitNewsletter");

    //Add event listeners
    initListeners();

}//End function init()

//When the window finishes loading
$(document).ready(init());