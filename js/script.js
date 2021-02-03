// window.onload = function(){
//     $("#api-control-cards").hide();
// };

function openAPI(buttonId){
    $("#api-control-cards").hide();
    $("#api-control-nasa").hide();
    console.log(buttonId)
    if (buttonId == "api-cards"){
        $('#api-content').empty();
        $("#api-control-cards").show();
    }
    else if (buttonId == "api-nasa"){
        $('#api-content').empty();
        $("#api-control-nasa").show();
    }
    

}