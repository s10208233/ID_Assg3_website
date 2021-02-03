const url = "https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=4"

$("#draw").hide();
$("#skip").hide();
$("#api-content").append('<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_9ngjlC.json" id="winner" background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>');
$("#winner").hide();
$("#api-content").append('<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_YVvJHa.json" id="loser" background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>');
$("#loser").hide();


var playerDiv = document.createElement("DIV");
playerDiv.id = "playerHand";
var botDiv = document.createElement("DIV");
botDiv.id = "botHand";
$("#api-content").append(playerDiv);
$("#api-content").append(botDiv);
console.log();
var value = 0;
var botValue = 0;

let imgSrc1 = "";
let imgSrc2 = "";
let imgSrc3 = "";
let imgSrc4 = "";
var botDraw = "";
let outcome ="";



$("#deckbtn").click(async function main(){
    $("#winner").hide();
    $("#loser").hide();
    $("#deckbtn").hide();
    $("#skip").show();
    $("#draw").show();
    await fetch(url)
    .then(response=>{
        if (response.ok) {
        return response.json();
    }
    else {
        //error catching    
    }
    })
    .then(data=>{
        console.log(data)
        if (data.success == false){
            alert("The deck ran out of cards please draw again!")   
            fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/shuffle/")
        }
        imgSrc1 = data.cards[0].image;
        imgSrc2 = data.cards[1].image;
        imgSrc3 = data.cards[2].image;
        imgSrc4 = data.cards[3].image;
        if (Number.isInteger(parseInt(data.cards[0].value)) == false && Number.isInteger(parseInt(data.cards[1].value)) == true ){
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
        }

        if (Number.isInteger(parseInt(data.cards[2].value)) == false && Number.isInteger(parseInt(data.cards[3].value)) == true ){
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
        $("#playerHand").append("<img src='"+imgSrc1+"'>");
        $("#playerHand").append("<img src='"+imgSrc2+"'>");
        console.log("player: "+value)
        console.log("bot: "+botValue)
    })
    .catch((error)=>{
        console.log(error)
    })  
})


$("#draw").click(function draw(){

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
        
        if (Number.isInteger(parseInt(data.cards[0].value)) == false){
            value = value + 10;
        }
        else{
            value = value + parseInt(data.cards[0].value)
        }
        console.log("final: " + value)
        $("#playerHand").append("<img src='"+(data.cards[0].image+"'>"))
        // botDraw = data.cards[1].image
    })
})


$("#skip").click(function skip(){

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // if (getRandomInt(0,1) == 1){
    //     fetch("https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=1")
    //     .then(response=>{
    //         if (response.ok) {
    //         return response.json();
    //     }
    //     else {
    //         //error catching    
    //     }
    //     })
    //     .then(data=>{
    //     botValue = botValue + parseInt(data.cards[0].value)
    //     console.log(data.cards[0].value)
    //     console.log("final bot: "+botValue)
    //     })
    // }

    $("#botHand").append("<img src='"+imgSrc3+"'>");
    $("#botHand").append("<img src='"+imgSrc4+"'>");
    if (botDraw != ""){
        $("#botHand").append("<img src='"+botDraw+"'>");
    }
    
    
    
    if (value >= 16 && value <= 21 && value > botValue){
        // console.log("skip: "+value);
        // console.log("YOu win")
        console.log("w/l: "+1);
        alert("You Win this round!");
        outcome = "win"
        $("#deckbtn").show();
        $("#draw").hide();
        $("#skip").hide();
        imgSrc3 = "";
        imgSrc4 = "";
        ;
        
    }
    else if (value > 16 && value < 21 && value < botValue){
        alert("You lost this round!");
        outcome = "lost"
        console.log("w/l: "+2);
        $("#deckbtn").show();
        $("#draw").hide();
        $("#skip").hide();
        imgSrc3 = "";
        imgSrc4 = "";
        
        
    }
    else if(value < 16 || value > 21){
        alert("You lost this round!");
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
        else{
            $("#loser").show();
        }
    }, 3000);
    
    
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

