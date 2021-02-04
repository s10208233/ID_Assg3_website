// window.onload = function(){
//     $("#api-control-cards").hide();
// };

function openAPI(buttonId){
    $("#api-control-cards").hide();
    $("#api-control-nasa").hide();
    $("#api-control-dog").hide();
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
    else if (buttonId == "api-nasa"){
        $("#ModalLabel").html("Nasa API")
        $('#api-content').empty();
        $("#api-control-nasa").show();
    }
    else if (buttonId == "api-dog"){
        $("#ModalLabel").html("Dog API") 
        $('#api-content').empty();
        $("#idoggo").show();
        $("#api-content").append('<div id="doggoDiv"></div>');
        $("#next").hide();
        $("#prev").hide();
        $("#api-control-dog").show();
    }
    

}