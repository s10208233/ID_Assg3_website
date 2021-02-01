const url = "https://deckofcardsapi.com/api/deck/fzfkkq2wdrzg/draw/?count=1"

document.getElementById('deckbtn').addEventListener('click', function thisfunction(){
    if ( document.getElementById('api-content') != null){
        document.getElementById('api-content').remove();
    }

    fetch(url)
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
    let results = data.cards.image;
    let img = document.createElement('img')
    img.src = results;
    document.getElementById('api-content').appendChild(img)
    
    })
    .catch((error)=>{
    console.log(error)
    })  
});

