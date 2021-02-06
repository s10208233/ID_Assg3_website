
async function getAnimeBaguette(){
    $("#api-content").empty();
    $("#api-content").append("\
        <div class='anime-baguette-container'>\
        </div>\
        ")
    for (i = 0; i < 3; i++){
        await fetch("https://api.computerfreaker.cf/v1/baguette").then(res=>res.json())
    .then(data=>{
        $(".anime-baguette-container").append("\
        <div>\
        <img src='"+ data["url"] +"'>\
        </div>\
        ")
    })
    }
}