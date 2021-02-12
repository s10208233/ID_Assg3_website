function APOC(){
    $("start").hide();
    $('#api-content').empty();
    $("#api-content").append('<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_Q2FX6B.json"  background="transparent"  speed="1"  style="margin:auto;width: 300px; height: 300px;"  loop  autoplay></lottie-player>');
    fetch("https://api.nasa.gov/planetary/apod?api_key=Ej1PTXMfCnc8NPfky2OYSqjzkwnZNDdJRjeAOtQ0")
    .then(res=>res.json())
    .then(data=>{
        $('#api-content').empty();
        if (data['media_type'] == 'video'){
            $("#api-content").append('<iframe width="100%" height="500px"src="'+data["url"]+'"></iframe>')
        }
        else{
            $("#api-content").append("<img style='width:100%;' src='"+ data["url"] +"'>")
        }
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

var photosLength = 0;
var MRPdata = null;
function MRP(btnChoice){
    $('#api-content').empty();
    $("#api-content").append('<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_Q2FX6B.json"  background="transparent"  speed="1"  style="margin:auto;width: 300px; height: 300px;"  loop  autoplay></lottie-player>');
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Ej1PTXMfCnc8NPfky2OYSqjzkwnZNDdJRjeAOtQ0")
    .then(res=>res.json())
    .then(data=>{
        $('#api-content').empty();
        if (btnChoice == "MRPstart"){
            photosLength = 0;
        }
        if (btnChoice == "MRPnext"){
            photosLength ++;
        }
        if (btnChoice == "MRPprev"){
            if(photosLength == 0){
                photosLength = 0;
            }
            else{
                photosLength --;
            }
        }
        if (btnChoice == 'MRPrand'){
            photosLength =  Math.floor(Math.random() * data['photos'].length);
        }
        MRPdata = data;
        console.log(photosLength);
        $('#api-content').append("\
        <img style='width:100%;' src='"+ data['photos'][photosLength]["img_src"] +"'>\
        <div class='api-content-message'>\
        <h2 style='font-weight:bold;'>"+data['photos'][photosLength]['rover']['name']+"</h2>\
        <p>"+data['photos'][photosLength]['camera']['full_name']+"</p><p>\
        Launch Date: "+data['photos'][photosLength]['rover']['launch_date']+"<br>\
        Landing Date: "+data['photos'][photosLength]['rover']['landing_date']+"</p>\
        <button id='MRPprev' onclick='MRP(this.id)' class='btn btn-primary' style='margin-right:25px'>Previous</button>\
        <button id='MRPrand' onclick='MRP(this.id)' class='btn btn-primary' style='margin-right:25px'>Random</button>\
        <button id='MRPnext' onclick='MRP(this.id)' class='btn btn-primary'>Next</button>\
        </div>\
        ");
    })
}