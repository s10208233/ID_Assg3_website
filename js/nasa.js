function APOC(){
    $("#api-content").empty();
    fetch("https://api.nasa.gov/planetary/apod?api_key=Ej1PTXMfCnc8NPfky2OYSqjzkwnZNDdJRjeAOtQ0")
    .then(res=>res.json())
    .then(data=>{
        $("#api-content").append("<img style='width:100%;' src='"+ data["url"] +"'>")
        $("#api-content").append("\
        <div class='api-content-message'>\
        <h2 style='font-weight:bold;'>"+data['title']+"</h2>\
        <p>"+data['explanation']+"</p>\
        <p>\
        Copyright: "+data["copyright"]+"<br>\
        Date: "+data['date']+"<br>\
        </p>\
        </div>\
        ")
    })
}