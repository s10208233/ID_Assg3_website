const questionMarkLottie = '<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_tHEtXH.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;margin:auto;"  loop  autoplay></lottie-player>';
const correctAnswerLottie = '<lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_x0qiw13f.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px; margin:auto;"  autoplay></lottie-player>'
const wrongAnswerLottie = '<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_y8t1nosz.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px; margin:auto;"    autoplay></lottie-player>';

var triviaData = null;

function randomTrivia(){
    triviaData = null;
    $("#api-content").empty();
    fetch("https://jservice.io/api/random").then(res=>res.json())
    .then(data=>{
        triviaData = data;
        $("#api-content").append("\
        <div id='lottie-container'>"+questionMarkLottie+"</div>\
        <div class='api-content-message'>\
        <h2 style='font-weight:bold;text-align:center'>"+data[0]['question']+"</h2>\
        </div>\
        <input id='trivia-user-answer' class='random-trivia-input' type='text' placeholder='Answer'></input>\
        <div class ='trivia-quiz-control'>\
        <button onclick='skipTrivia()' class='random-trivia-skip' style='font-weight:bold;'>Skip</button>\
        <button onclick='submitTrivia()' class='random-trivia-submit' style='font-weight:bold;'>Confirm</button>\
        </div>\
        ");

    })
}

function skipTrivia(){
    $('.trivia-quiz-control').hide()
    $('.random-trivia-input').prop("disabled",true);
    $(".api-content-message").append("\
    <p style='text-align:center;margin-top:25px'>Correct Answer<br>"+triviaData[0]['answer']+"</p>\
    ");
}

function submitTrivia(){
    let rawAnswer = triviaData[0]['answer'];
    let refineAnswer = '';
    for (let i = 0; i < rawAnswer.length; i++) {
        if (rawAnswer[i] == "\`" || rawAnswer[i] == '"'){
            continue;
        }
        if (rawAnswer[i] == "<"){
            if (rawAnswer[i+3] == ">"){
                i+3;
                continue;
            }
            if (rawAnswer[i+2] == ">"){
                i+2;
                continue;
            }
        }
        refineAnswer += rawAnswer[i];
    }
    console.log(rawAnswer);
    console.log(refineAnswer);
    $('.trivia-quiz-control').hide()
    $('.random-trivia-input').css("color",'white');
    $('.random-trivia-input').prop("disabled",true);
    let userAnswer = document.getElementById("trivia-user-answer").value;
    if(userAnswer == refineAnswer || userAnswer == refineAnswer.toLowerCase()){
        $('#lottie-container').empty()
        $('#lottie-container').append(correctAnswerLottie);
    }
    else{
        $('#lottie-container').empty()
        $(".api-content-message").append("\
        <p style='text-align:center;margin-top:25px'>Correct Answer<br>"+triviaData[0]['answer']+"</p>");
        $('#lottie-container').append(wrongAnswerLottie);
    }

}