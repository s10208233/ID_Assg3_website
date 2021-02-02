// window.onload = function(){
//     $("#api-control-cards").hide();
// };

function test(buttonId){
    $("#api-control-cards").hide();
    console.log(buttonId)
    if (buttonId == "api-cards"){
        $("#api-control-cards").show();
    }
}