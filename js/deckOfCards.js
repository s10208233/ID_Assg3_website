



//initialising values to use
var value = 0;
var botValue = 0;
var id = "";
let imgSrc1 = "";
let imgSrc2 = "";
let imgSrc3 = "";
let imgSrc4 = "";

let outcome ="";
var playerBool = 0;
var botBool = 0;

//starting the blackjack game
$("#deckbtn").click(async function main(){
    //hiding and showing correct buttons
    $("#startdeck").hide();
    $("#winner").hide();
    $("#tie").hide();
    $("#error").hide();
    $("#loser").hide();
    $("#deckbtn").hide();
    $("#skip").show();
    $("#draw").show();
    $("#botHand").hide();
    $("#playerHand").append('<h3>Your hand</h3>');
    $("#botHand").append("<h3>Opponent's hand</h3>");  
    
    //api fetch
    await fetch("https://deckofcardsapi.com/api/deck/"+ id + "/draw/?count=4")
    .then(response=>{
        if (response.ok) {
            return response.json();
        
    }
    else {
        $("#playerHand").empty();
        $("#botHand").empty();
        $("#error").show();
        $("#skip").hide();
        $("#draw").hide();
        $("#deckbtn").show();
        //error catching 
            fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(response => {
                if (response.ok) {
                    return response.json();

                }
                else {
                    //error catching 
                }
            })
            .then(data => {
                console.log(data)
                alert("The deck is outdated please refresh the page!")
                id = data.deck_id
           
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
        //checking whether the cards is correct value
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
        //this is to check whether the drawn card is a ACE
        if (Boolean(playerBool) == false){
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
        else {
            if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                value = value;
                playerBool = 0;
            }
            else{
                value = value + parseInt(data.cards[0].value) - 10;
                playerBool = 0;
            }
        }
        
        
        
        console.log("final: " + value)
        $("#playerHand").append("<img src='"+data.cards[0].image+"'>")
        botDrawing();
    })
})

//The bot will randomly draw cards to make it feel more like playing against a real player
function botDrawing(){
    //random number function
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //the bot will draw randomly
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

                if (Boolean(botBool) == false){
                    if (data.cards[0].value == "ACE"){
                        botValue = botValue + 1;
                    }
                    else if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                        botValue = botValue + 10;
                    }
                    else{
                        botValue = botValue + parseInt(data.cards[0].value)
                    }
                }
                else{
                    if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                        botValue = botValue;
                        botBool = 0;
                    }
                    else{
                        botValue = botValue + parseInt(data.cards[0].value) - 10;
                        botBool = 0;
                    }   
                }
                
            
            
                $("#botHand").append("<img src='"+data.cards[0].image+"'>");
                console.log("final bot: "+botValue)
            })

        }
    }
    //the bot will have to draw if the value is < 16
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

        if (Boolean(botBool) == false){
            if (data.cards[0].value == "ACE"){
                botValue = botValue + 1;
            }
            else if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                botValue = botValue + 10;
            }
            else{
                botValue = botValue + parseInt(data.cards[0].value)
            };
        }
        else{
            if (Number.isInteger(parseInt(data.cards[0].value)) == false){
                botValue = botValue;
                botBool = 0;
            }
            else{
                botValue = botValue + parseInt(data.cards[0].value) - 10;
                botBool = 0;
            }   
        }
        
        
            $("#botHand").append("<img src='"+data.cards[0].image+"'>");
            console.log("final bot: "+botValue)
        })
        
    }
}


//function to skip or pass which ends the round
$("#skip").click(function skip(){
    $("#skip").hide();
    $("#draw").hide();
    botDrawing();
    
    
    //timeout needed so the values are calculated correctly
    setTimeout(function(){
        $("#botHand").show();
        //this is to check and show whether the player has won or lost
        if (value >= 16 && value <= 21 && value > botValue){
            // console.log("skip: "+value);
            // console.log("YOu win")
            console.log("w/l: "+1);
            alert("You won the round!");
            outcome = "win"
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }
        else if ((value < 16 || value > 21) && (botValue < 16 || botValue > 21)){
            alert("Its a tie!");
            outcome = "tie"
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if(botValue < 16 || botValue > 21){
            alert("You won the round!");
            outcome = "win"
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if (value >= 16 && value < 21 && value < botValue){
            alert("You lost the round!");
            outcome = "lost"
            console.log("w/l: "+2);
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }
        else if(value === botValue){
            alert("Its a tie!");
            outcome = "tie"
            imgSrc3 = "";
            imgSrc4 = "";
        }
        else if(value < 16 || value > 21){
            alert("You lost the round!");
            outcome = "lost"
            console.log("w/l: "+3);
            imgSrc3 = "";
            imgSrc4 = "";
            
            
        }

        //after a round the screen will reset and show correct buttons for player to play again
        setTimeout(function(){
            $('#playerHand').empty();
            $('#botHand').empty();
            
            if (outcome == "win"){
                $("#winner").show();   
                setTimeout(function(){
                    $('#winner').hide();
                    $("#startdeck").show();
                    $("#deckbtn").show();
                },3000)
            }
            else if(outcome == "tie"){
                $("#tie").show();
                setTimeout(function(){
                    $('#tie').hide();
                    $("#startdeck").show();
                    $("#deckbtn").show();
                },3000)
            }
            else{
                $("#loser").show();
                setTimeout(function(){
                    $('#loser').hide();
                    $("#startdeck").show();
                    $("#deckbtn").show();
                },3000)
            }
            
        }, 3000);
    },1000);
    
    
    
    fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/shuffle/") 
})
    


    

