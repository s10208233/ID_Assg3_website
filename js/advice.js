$("#adv").click(function(){
    $("#start").hide();
    $("#advDiv").empty();
    $("#load").show();
    $("#adv").hide();
    $("#aff").hide();
    fetch("https://api.adviceslip.com/advice")
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
        $("#advDiv").append("<h3 style='text-align:center'>"+data.slip.advice+"</h3>")
        $("#advDiv").hide();
        setTimeout(function(){
        $("#advDiv").show();
        $("#adv").show();   
        $("#load").hide(); 
        $("#aff").show();      
        },5000)
    })
    .catch((error)=>{
        console.log(error)
    })  
})

$("#aff").click(function(){
    $("#start").hide();
    $("#advDiv").empty();
    $("#load").show();
    $("#adv").hide();
    $("#aff").hide();
    fetch("https://dulce-affirmations-api.herokuapp.com/affirmation")
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
        $("#advDiv").append("<h3 style='text-align:center'>"+data[0].phrase+"</h3>")
        $("#advDiv").hide();
        setTimeout(function(){
        $("#advDiv").show();
        $("#adv").show();   
        $("#load").hide(); 
        $("#aff").show();      
        },5000)
    })
    .catch((error)=>{
        console.log(error)
    })  
})