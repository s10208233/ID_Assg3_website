// window.onload = function(){
//     $("#api-control-cards").hide();
// };
function clearModal(){
    $('#api-content').empty();
    $('#api-content').append('<p style="text-align: center;">Press a button below to make your first request!</p>');
}

function test(buttonId){
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