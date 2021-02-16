//show the list of ppl that submmited a contact
get();
//after the user fill in it will post to restdb
$("#contactSubmit").click(function(){
    let fullName = $("#fullName").val();
    let email = $("#email").val();
    let userName = $("#userName").val();
    let feedback = $("#feedback").val();

    var jsondata = {"fullName": fullName,"email": email, "userName": userName, "feedback": feedback};
    console.log(jsondata)
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://aitacontact-3ef7.restdb.io/rest/aitacontact",
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "602922a45ad3610fb5bb5ffc",
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
    console.log(response);
    document.getElementById("form").reset();
    alert("Your feedback has been submitted! Thank you.")
    });

    $.ajax(settings).fail(function(){
        alert("Please fill in all the blank spaces or enter email in the correct format!")
        document.getElementById("form").reset();
    });

    get();
});
//to update the container to show the list of ppl 
function get(){
    let content = "";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://aitacontact-3ef7.restdb.io/rest/aitacontact",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "602922a45ad3610fb5bb5ffc",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        for (var i = 0; i < response.length; i++){

        content = `${content}<tr id='${response[i]._id}'>
        <td>${response[i].userName}</td>
        <td>${response[i].email}</td>
        </tr>`;
        $("#contact-list tbody").html(content);
        }
        

        $("#total-contacts").html(response.length);
    });


}


