window.onload = function(){
    if (sessionStorage.getItem("signedIn") == false || sessionStorage.getItem("signedIn") == null){
        $("#sign-out").hide();
        $("#sign-in").hide();
    }
    else{
        $("#sign-out").show();
        $("#sign-in").hide();
    }
};

function openAPI(buttonId){
    $("#api-control-cards").hide();
    $("#api-control-nasa").hide();
    $("#api-control-dog").hide();
    $("#api-control-trivia").hide();
    $("#api-control-advice").hide();
    $("#api-control-baguette").hide();
    var triviaData = null;
    console.log(buttonId)
    if (buttonId == "api-cards"){
        $("#ModalLabel").html("Deck of Cards API")
        $("#api-content").empty();
        $("#api-content").append('<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_9ngjlC.json" id="winner" background="transparent" speed="1"  style="width: 300px; height: 300px; margin: auto;"  loop  autoplay></lottie-player>');
        $("#winner").hide();
        $("#api-content").append('<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_YVvJHa.json" id="loser" background="transparent"  speed="1"  style="width: 300px; height: 300px; margin: auto;"  loop  autoplay></lottie-player>');
        $("#loser").hide();
        $("#api-content").append('<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_yriifcob.json" id="tie" background="transparent"  speed="1"  style="width: 300px; height: 300px; margin: auto;"  loop  autoplay></lottie-player>');
        $("#tie").hide();
        $("#api-content").append('<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_ho8hW5.json" id="error" background="transparent"  speed="1"  style="width: 300px; height: 300px; margin: auto;"  loop  autoplay></lottie-player>');
        $("#error").hide();
        $("#draw").hide();
        $("#skip").hide();
        $("#deckbtn").show();
        $("#api-content").append('<div id="playerHand"></div>');  
        $("#api-content").append('<div id="botHand"></div>');
        $("#api-control-cards").show();
        
        
    }
    if (buttonId == "api-nasa"){
        $("#ModalLabel").html("Nasa API")
        $('#api-content').empty();
        $("#api-control-nasa").show();
    }
    if (buttonId == "api-dog"){
        $("#ModalLabel").html("Dog API") 
        $('#api-content').empty();
        $("#idoggo").show();
        $("#api-content").append('<div id="doggoDiv"></div>');
        $("#next").hide();
        $("#prev").hide();
        $("#api-control-dog").show();
    }
    if (buttonId == "api-trivia"){
        $("#ModalLabel").html("Extremely Difficult Trivias");
        $("#api-content").empty();
        $("#api-control-trivia").show();
    }
    if (buttonId == "api-baguette"){
        $("#ModalLabel").html("Totally Not Hentai");
        $("#api-content").empty();
        $("#api-control-baguette").show();
    }
    if (buttonId == "api-advice"){
        $("#ModalLabel").html("Advice & Affirmation API")
        $('#api-content').empty();
        $("#api-control-advice").show();
        $("#api-content").append('<div id="advDiv"></div>');
    }
    

}

// SIGN IN DATA
var userData = null;
let userDataAPIsettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://interactivedev-34c7.restdb.io/rest/aita-user",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "601f96113f9eb665a1689212",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(userDataAPIsettings).done(function (response) {
    console.log(response);
    userData = response
  });

//   ON CLICK SIGN IN
function signIn(){
    if (document.getElementById("sign-in-email").value == "" || document.getElementById("sign-in-password").value == ""){
        alert("Please complete the fields before signing in.");
    }
    else{
        for (i = 0; i < userData.length; i++){
            if(userData[i].email == document.getElementById("sign-in-email").value && userData[i].password == document.getElementById("sign-in-password").value){
            $("#sign-out").hide();
            sessionStorage.setItem("signedIn",true);
            $("#sign-in").hide();
            $("#sign-out").show();
            $("#sign-in-out").click();
            return;
            }
        }
        alert("Invalid account, user does not exist.")
    }
}

// ON CLICK SIGN OUT
function signOut(){
    sessionStorage.setItem("signedIn",false);
    $("#sign-in").show();
    $("#sign-out").hide();
    $("#sign-in-out").click();
}