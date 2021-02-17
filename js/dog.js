//click button to fetch img
$("#idoggo").click(function dog(){
    $("#api-content").empty();
    $("#api-content").append('<div id="doggoDiv"></div>');
    $("#start").hide();
    $("#idoggo").hide();
    $("#next").show();
    $("#prev").show();
    dogArray = [];
    count = 0;
    fetch("https://dog.ceo/api/breeds/image/random")
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
        //fetch and push the img link into a array
        dogArray.push(data.message)
        $("#doggoDiv").append("<img src='"+dogArray[count]+"'>")
    })
    .catch((error)=>{
        console.log(error)
    })  
    //fetch the next photo
    $("#next").click(async function(){

        if (count+1 == dogArray.length){
            $("#api-content").empty();
            $("#api-content").append('<div id="doggoDiv"></div>');
            count++;
            await fetch("https://dog.ceo/api/breeds/image/random")
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
                dogArray.push(data.message)
                $("#doggoDiv").append("<img src='"+dogArray[count]+"'>")
            })
            .catch((error)=>{
                console.log(error)
            })  
        }
        else{
            $("#doggoDiv").empty();
            count++;
            $("#doggoDiv").append("<img src='"+dogArray[count]+"'>")
        }
        
    
    })
    //shows the previous img using the array
    $("#prev").click(function(){
        if (count > 0){
            $("#doggoDiv").empty();
            count--;
            $("#doggoDiv").append("<img src='"+dogArray[count]+"'>")

        }
        else{
            alert("There are no previous images!")
            $("#doggoDiv").empty();
            $("#idoggo").show();
            $("#next").hide();
            $("#prev").hide();
            $("#start").show();

        }
        
    })
})