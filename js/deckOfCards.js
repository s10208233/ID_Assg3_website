const url = "https://deckofcardsapi.com/api/deck/p5q1v30wa33c/draw/?count=1"

async function thisfunction(){
    let imgSrc = "";

    $('#api-content').empty();
    await fetch(url)
    .then(response=>{
        if (response.ok) {
        return response.json();
    }
    else {
        //error catching
        alert("The breed you searched for is not available! Try again!")
    }
    })
    .then(data=>{
        console.log(data.cards[0].image)
        imgSrc = data.cards[0].image;
    
    })
    .catch((error)=>{
    console.log(error)
    })  

    $("#api-content").append("<img src='"+imgSrc+"'>")

}
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

