$("#adv").click(function(){
    $("#advDiv").empty();
    
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
        $("#advDiv").append("<h3>"+data.slip.advice+"</h3>")
    })
    .catch((error)=>{
        console.log(error)
    })  
})

$("#aff").click(function(){
    $("#advDiv").empty();
    
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
        $("#advDiv").append("<h3>"+data[0].phrase+"</h3>")
    })
    .catch((error)=>{
        console.log(error)
    })  
})