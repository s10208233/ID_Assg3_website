




var value = 0;
var botValue = 0;

let imgSrc1 = "";
let imgSrc2 = "";
let imgSrc3 = "";
let imgSrc4 = "";

let outcome ="";
var playerBool = "false";
var botBool = "false";

//starting the blackjack game
$("#deckbtn").click(async function main(){
    
    
    $("#winner").hide();
    $("#tie").hide();
    $("#error").hide();
    $("#loser").hide();
    $("#deckbtn").hide();
    $("#skip").show();
    $("#draw").show();
    $("#botHand").hide();
    $("#playerHand").append('<h1>Your hand</h1>');
    $("#botHand").append("<h1>Opponent's hand</h1>");  

    await fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=4")
    .then(response=>{
        if (response.ok) {
        return response.json();
    }
    else {
        $("#error").show();
        $("#skip").hide();
        $("#draw").hide();
        $("#deckbtn").show();
        //error catching    
    }
    })
    .then(data=>{
        console.log(data)
        if (data.success == "false"){
            alert("The deck ran out of cards please draw again!")   
            fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/shuffle/")
        }
        imgSrc1 = data.cards[0].image;
        imgSrc2 = data.cards[1].image;
        imgSrc3 = data.cards[2].image;
        imgSrc4 = data.cards[3].image;
        //the api sometimes returns strings hence it needs to be converted into int
        //conversion for player
        
        if ((data.cards[0].value == "ACE") && (Number.isInteger(parseInt(data.cards[1].value)) == false )){
            value = 21;
            playerBool = "true";
        }
        else if ((data.cards[1].value == "ACE") && (Number.isInteger(parseInt(data.cards[0].value)) == false )){
            value = 21;
            playerBool = "true";
        }
        else if ((data.cards[0].value == "ACE") && (parseInt(data.cards[1].value) == 10 )){
            value = 21;
            playerBool = "true";
        }
        else if ((data.cards[1].value == "ACE") && (parseInt(data.cards[0].value) == 10 )){
            value = 21;
            playerBool = "true";
        }
        else if ((data.cards[1].value == "ACE") && (Number.isInteger(parseInt(data.cards[0].value)) == true )){
            value = 11 + parseInt(data.cards[0].value);
            playerBool = "true";
        }
        else if ((data.cards[0].value == "ACE") && (Number.isInteger(parseInt(data.cards[1].value)) == true )){
            value = 11 + parseInt(data.cards[1].value);
            playerBool = "true";
        }
        else if (Number.isInteger(parseInt(data.cards[0].value)) == false && Number.isInteger(parseInt(data.cards[1].value)) == true ){
            value = 10 + parseInt(data.cards[1].value);
            console.log('1')
        }
        else if (Number.isInteger(parseInt(data.cards[0].value)) == true && Number.isInteger(parseInt(data.cards[1].value)) == false ){
            value = parseInt(data.cards[0].value) + 10;
            console.log('2')
        }
        else if (Number.isInteger(parseInt(data.cards[0].value)) == false && Number.isInteger(parseInt(data.cards[1].value)) == false ){
            value = 20;
            console.log('3')
        }
        else{
            value = parseInt(data.cards[0].value) + parseInt(data.cards[1].value)
            console.log('4')
        };
        
        //conversion for bot
        
        if ((data.cards[2].value == "ACE") && (Number.isInteger(parseInt(data.cards[3].value)) == false )){
            botValue = 21;
            botBool = "true";
        }
        else if ((data.cards[3].value == "ACE") && (Number.isInteger(parseInt(data.cards[2].value)) == false )){
            botValue = 21;
            botBool = "true";
        }
        else if ((data.cards[2].value == "ACE") && (parseInt(data.cards[3].value) == 10 )){
            botValue = 21;
            botBool = "true";
        }
        else if ((data.cards[3].value == "ACE") && (parseInt(data.cards[2].value) == 10 )){
            botValue = 21;
            botBool = "true";
        }
        else if ((data.cards[3].value == "ACE") && (Number.isInteger(parseInt(data.cards[2].value)) == true )){
            botValue = 11 + parseInt(data.cards[2].value);
            botBool = "true";
        }
        else if ((data.cards[2].value == "ACE") && (Number.isInteger(parseInt(data.cards[3].value)) == true )){
            botValue = 11 + parseInt(data.cards[3].value);
            botBool = "true";
        }
        else if (Number.isInteger(parseInt(data.cards[2].value)) == false && Number.isInteger(parseInt(data.cards[3].value)) == true ){
            botValue = 10 + parseInt(data.cards[3].value);
            console.log('1')
        }
        else if (Number.isInteger(parseInt(data.cards[2].value)) == true && Number.isInteger(parseInt(data.cards[3].value)) == false ){
            botValue = parseInt(data.cards[2].value) + 10;
            console.log('2')
        }
        else if (Number.isInteger(parseInt(data.cards[2].value)) == false && Number.isInteger(parseInt(data.cards[3].value)) == false ){
            botValue = 20;
            console.log('3')
        }
        else{
            botValue = parseInt(data.cards[2].value) + parseInt(data.cards[3].value)
            console.log('4')
        }

        //append the images to show the player his/her card
        $("#playerHand").append("<img src='"+imgSrc1+"'>");
        $("#playerHand").append("<img src='"+imgSrc2+"'>");
        $("#botHand").append("<img src='"+imgSrc3+"'>");
        $("#botHand").append("<img src='"+imgSrc4+"'>");
        console.log("player: "+value)
        console.log("bot: "+botValue)
    })
    .catch((error)=>{
        console.log(error)
    })  
})

//function to draw a card from the deck
$("#draw").click(async function draw(){
    await fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=1")
    .then(response=>{
        if (response.ok) {
        return response.json();
    }
    else {
        //error catching      
    }
    })
    .then(data=>{
        if (playerBool === "false"){
            if (data.cards[0].value == "ACE"){
                value = value + 1;
            }
            else if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                value = value + 10;
            }
            else{
                value = value + parseInt(data.cards[0].value)
            }
        }
        else if (playerBool === "true"){
            if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                value = value;
                playerBool = "false";
            }
            else{
                value = value + parseInt(data.cards[0].value) - 10;
                playerBool = "false";
            }
        }
        else{
            value = value + parseInt(data.cards[0].value) 
        }
        
        
        console.log("final: " + value)
        $("#playerHand").append("<img src='"+data.cards[0].image+"'>")
        botDrawing();
    })
})


function botDrawing(){
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (botValue > 16 && botValue < 19){
        if (getRandomInt(0,1) == 1){
            fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=1")
            .then(response=>{
                if (response.ok) {
                return response.json();
            }
            else {
                //error catching    
            }
            })
            .then(data=>{

                if (botBool === "false"){
                    if (data.cards[0].value == "ACE"){
                        botValue = BotValue + 1;
                    }
                    else if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                        botValue = botValue + 10;
                    }
                    else{
                        botValue = botValue + parseInt(data.cards[0].value)
                    }
                }
                else if (botBool === "true"){
                    if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                        botValue = botValue;
                        botBool = "false";
                    }
                    else{
                        botValue = botValue + parseInt(data.cards[0].value) - 10;
                        botBool = "false";
                    }   
                }
                else{
                    botValue = botValue + parseInt(data.cards[0].value) 
                }
            
            
                $("#botHand").append("<img src='"+data.cards[0].image+"'>");
                console.log("final bot: "+botValue)
            })

        }
    }
    else if (botValue < 16){
        fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=1")
        .then(response=>{
            if (response.ok) {
            return response.json();
        }
        else {
            //error catching    
        }
        })
        .then(data=>{

        if (botBool === "false"){
            if (data.cards[0].value == "ACE"){
                botValue = BotValue + 1;
            }
            else if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                botValue = botValue + 10;
            }
            else{
                botValue = botValue + parseInt(data.cards[0].value)
            };
        }
        else if (botBool === "true"){
            if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                botValue = botValue;
                botBool = false;
            }
            else{
                botValue = botValue + parseInt(data.cards[0].value) - 10;
                botBool = false;
            }   
        }
        else{
            botValue = botValue + parseInt(data.cards[0].value) 
        }
        
        
            $("#botHand").append("<img src='"+data.cards[0].image+"'>");
            console.log("final bot: "+botValue)
        })
        
    }
}


//function to skip or pass which ends the round
$("#skip").click(function skip(){
    
    botDrawing();
    
    

    setTimeout(function(){
        $("#botHand").show();
 
        if (value >= 16 && value <= 21 && value > botValue){
            // console.log("skip: "+value);
            // console.log("YOu win")
            console.log("w/l: "+1);
            alert("You won the round!");
            outcome = "win"
            $("#deckbtn").show();
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }
        else if ((value < 16 || value > 21) && (botValue < 16 || botValue > 21)){
            alert("Its a tie!");
            outcome = "tie"
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if(botValue < 16 || botValue > 21){
            alert("You won the round!");
            outcome = "win"
            $("#deckbtn").show();
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if (value >= 16 && value < 21 && value < botValue){
            alert("You lost the round!");
            outcome = "lost"
            console.log("w/l: "+2);
            $("#deckbtn").show();
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }
        else if(value === botValue){
            alert("Its a tie!");
            outcome = "tie"
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if(value < 16 || value > 21){
            alert("You lost the round!");
            outcome = "lost"
            console.log("w/l: "+3);
            $("#deckbtn").show();
            $("#draw").hide();
            $("#skip").hide();
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }

        $("#deckbtn").hide();
        setTimeout(function(){
            $('#playerHand').empty();
            $('#botHand').empty();
            $("#deckbtn").show();
            if (outcome == "win"){
                $("#winner").show();   
            }
            else if(outcome == "tie"){
                $("#tie").show();
            }
            else{
                $("#loser").show();
            }
        }, 3000);
    },1000);
    
    
    
    fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/shuffle/") 
})
    


    

// document.getElementById('deckbtn').addEventListener('click', function thisfunction(){
//     if ( document.getElementById('api-content') != null){
//         document.getElementById('api-content').remove();
//     }

//     fetch(url)
//     .then(response=>{
//         if (response.ok) {
//         return response.json();
//     }
//     else {
//         //error catching
//         alert("The breed you searched for is not available! Try again!")
//     }
//     })
//     .then(data=>{
//     let results = data.cards.image;
//     let img = document.createElement('img')
//     img.src = results;
//     document.getElementById('api-content').appendChild(img)
    
//     })
//     .catch((error)=>{
//     console.log(error)
//     })  
// });

