// window.onload = function(){
//     $("#api-control-cards").hide();
// };

function test(buttonId){
    $('#api-content').empty();
    $("#api-control-cards").hide();
    $("#api-control-nasa").hide();
    console.log(buttonId)
    if (buttonId == "api-cards"){
        $("#api-control-cards").show();
    }
    if (buttonId == "api-nasa"){
        $("#api-control-nasa").show();
    }
    

}