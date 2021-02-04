$("#idoggo").click(async function dog(){
    $("#idoggo").hide();
    $("#next").show();
    $("#prev").show();
    dogArray = [];
    count = 0;

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

    $("#next").click(async function(){

        if (count+1 == dogArray.length){
            $("#doggoDiv").empty();
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
    $("#prev").click(function(){
        if (count > 0){
            $("#doggoDiv").empty();
            count--;
            $("#doggoDiv").append("<img src='"+dogArray[count]+"' style='margin:0;'>")

        }
        else{
            alert("There are no previous images!")
            $("#doggoDiv").empty();
            $("#idoggo").show();
            $("#next").hide();
            $("#prev").hide();

        }
        
    })
})