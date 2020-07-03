
let startGame_btn = document.getElementById('startPage');
startGame_btn.addEventListener('click', function () {
    loadStartPage();
});

let option_btn = document.getElementById('optionPage');
option_btn.addEventListener('click', function () {
    loadOptionPage();
});
//---------------------------------Questions Logic goes below this line------------------------------//
function questionPage() {
    let gameTimer = 20;
    let countDown = 0;
    let questionNum = 0;
    let rightAnswer = 0;
    let wrongAnswer = 0;
    let totalNumQuestions = 20;
    //let firstTime = true;

    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');

    let question = document.getElementById('question');
    let timerHTML = document.getElementById('timer');
    let myScore = document.getElementById('score');
    let msg = document.getElementById('endmsg');

    function loadJSON() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'trivia.json', true);
        xhr.responseType = 'text';
        xhr.overrideMimeType("application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                triviaQ = JSON.parse(xhr.responseText);
                triviaQ = triviaQ.trivia;
                console.log(triviaQ);
            }
        }
        xhr.send();
    }

    //response = JSON.parse(xhttp.responseText);
    //currentRound = response.trivia;
    //for(let i = 0; i<20; i++) {
    // let q = Math.floor(Math.random() * response.trivia.length);
    //triviaq.push(currentRound[q]);
    //currentRound.splice(q,1);
    //}

    a1.addEventListener('click', function (e) {
        //alert(e.toElement.id);
        console.log(e.toElement.id);
        checkAnswer(e.toElement.id);
    });

    a2.addEventListener('click', function (e) {
        //alert('you clicked 2');
        console.log(e.toElement.id);
        checkAnswer(e.toElement.id);
    });

    a3.addEventListener('click', function (e) {
        //alert('you clicked 3');
        console.log(e.toElement.id);
        checkAnswer(e.toElement.id);
    });

    a4.addEventListener('click', function (e) {
        //alert('you clicked 4');
        console.log(e.toElement.id);
        checkAnswer(e.toElement.id);
    });

    //function randomPick(){
    //var qNum = Math.floor((Math.random() * 20) + 1);
    //}

    function loadQuestion() {
        document.getElementById('a1').style.visibility = 'visible';
        document.getElementById('a2').style.visibility = 'visible';
        document.getElementById('a3').style.visibility = 'visible';
        document.getElementById('a4').style.visibility = 'visible';

        if (questionNum == 20) {
            msg.innerHTML = 'Alright!'
            question.innerText = 'You got ' + '' + rightAnswer + '' + ' correct!';
            document.getElementById('timer').style.visibility = 'hidden';
            document.getElementById('score').style.visibility = 'hidden';
            document.getElementById('questionsLeft').style.visibility = 'hidden';
            document.getElementById('timer').disabled = true;
            hideBtn();
            setTimeout(loadEndPage, 3000);
        }
        else {
            clearInterval(countDown);
            gameTimer = 20;
            timerHTML.innerText = gameTimer;
            //Start the clock
            countDown = setInterval(myTimer, 1000);
            //we are going to load the questions for the first question
            questionNum++;
            question.innerHTML = triviaQ[questionNum].question;
            a1.innerHTML = triviaQ[questionNum].a1;
            a2.innerHTML = triviaQ[questionNum].a2;
            a3.innerHTML = triviaQ[questionNum].a3;
            a4.innerHTML = triviaQ[questionNum].a4;
        }
        //if (firstTime == true) {
        //Start the clock
        // countDown = setInterval(myTimer, 1000);
        // firstTime = false;
        //}
        //if(questionNum >= totalNumQuestions) {
        //loadEndPage();    
    }
    //right answerImage
    function rightPic() {
        document.getElementById('changeImage').setAttribute('src', 'images/bettakumayupogood.gif')
        document.getElementById('question').innerText = 'CORRECT!';
    }

    //wrong answerImage
    function wrongPic() {
        document.getElementById('changeImage').setAttribute('src', 'images/bettakumaangry.gif')
        document.getElementById('question').innerText = 'WRONG!';
    }

    function mainPic() {
        setTimeout(function () {
            document.getElementById('changeImage').setAttribute('src', 'images/gamePage.png')
        }, 2000);
    }

    function hideBtn() {
        document.getElementById('a1').style.visibility = 'hidden';
        document.getElementById('a2').style.visibility = 'hidden';
        document.getElementById('a3').style.visibility = 'hidden';
        document.getElementById('a4').style.visibility = 'hidden';
    }

    function mainColor() {
        setTimeout(function () {
            document.getElementById('a1').style.visibility = 'visible';
            document.getElementById('a2').style.visibility = 'visible';
            document.getElementById('a3').style.visibility = 'visible';
            document.getElementById('a4').style.visibility = 'visible';
        }, 2000);
    }

    function block() {
        document.getElementById("a1").disabled = true;
        document.getElementById("a2").disabled = true;
        document.getElementById("a3").disabled = true;
        document.getElementById("a4").disabled = true;
    }

    function unblock() {
        setTimeout(function () {
            document.getElementById("a1").disabled = false;
            document.getElementById("a2").disabled = false;
            document.getElementById("a3").disabled = false;
            document.getElementById("a4").disabled = false;
        }, 2000);
    }

    function checkAnswer(answer) {
        var newTotal = (totalNumQuestions--) - 1;

        if (answer == triviaQ[questionNum].correctA) {
            rightAnswer++;
            rightPic();
            mainPic();
            mainColor();
        }
        else {
            wrongAnswer++;
            wrongPic();
            mainPic();
            mainColor();
        }
        hideBtn();
        block();
        unblock();

        //Display score
        myScore.innerText = 'Score: ' + '' + rightAnswer;
        document.getElementById('questionsLeft').innerText = newTotal + ' left';
        //function showScore(){
        //document.getElementById('score').innerText = rightAnswer +'' + '/20';
        //}
        //showScore();
        //update Score
        //how to get to the next question
        //add one to question Numn

        setTimeout(function () {
            loadQuestion();
        }, 2000);
    }
    //---------------------------------------------------Game Timer----------------------------------------------------------------------//
    function myTimer() {
        if (gameTimer > 0) {
            gameTimer--;
            timerHTML.innerText = gameTimer;
        }
        else {
            question.innerHTML = 'TIMES UP!';
            setTimeout(loadQuestion, 1000);
            // questionNum++;
            // //setTimeout(loadGameOverPage, 2000);
            // question.innerHTML = triviaQ[questionNum].question;
            // a1.innerHTML = triviaQ[questionNum].a1;
            // a2.innerHTML = triviaQ[questionNum].a2;
            // a3.innerHTML = triviaQ[questionNum].a3;
            // a4.innerHTML = triviaQ[questionNum].a4;
            
        }
    }
    
    loadJSON();
    setTimeout(loadQuestion, 1000);
}
//-----------------------------Questions logic goes above this line -----------------------------------//
///------------------------------Load Game Over Screen----------------------------//
function loadGameOverPage() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'gameOver.html', true);
    xhr.responseType = 'text';
    xhr.onload = function () {

        if (xhr.status === 200) {
            let endScreenPage = document.getElementById('changeMe');
            endScreenPage.innerHTML = xhr.responseText;
        }
        document.getElementById('title').style.backgroundColor = 'darkgrey';
        document.getElementById('titlePage').addEventListener('click', function () {
            loadTitlePage();
        });
    }
    xhr.send();
}
//----------------------------------lOAD Start Page Here---------------------------------//
function loadStartPage() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'start.html', true);
    xhr.responseType = 'text';
    // xhr.overrideMimeType("application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var startPage = document.getElementById('changeMe');
            startPage.innerHTML = xhr.responseText;
        }
        document.getElementById('title').style.backgroundColor = "#00b7ff";
        //create button addEventListener here
        document.getElementById('startGame').addEventListener('click', function () {
            loadQuestionsPage();
        });
        document.getElementById('titlePage').addEventListener('click', function () {
            loadTitlePage();
        });
    }
    xhr.send();
}
//--------------------------------------Load Question Page Here---------------------------------//
function loadQuestionsPage() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'questions.html', true);
    xhr.responseType = 'text';
    // xhr.overrideMimeType("application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var startPage = document.getElementById('changeMe');
            startPage.innerHTML = xhr.responseText;
            questionPage();
        }
        document.getElementById('title').style.backgroundColor = "#5bbd23";
    }
    xhr.send();
}
//---------------------------------------------Load Option Page-------------------------------------------------------//

function loadOptionPage() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'option.html', true);
    xhr.responseType = 'text';

    // xhr.overrideMimeType("application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            var startPage = document.getElementById('changeMe');
            startPage.innerHTML = xhr.responseText;
            //optionPage();
        }
        document.getElementById('title').style.backgroundColor = "#b700ff";
        document.getElementById('startPage').addEventListener('click', function () {
            loadStartPage();
        });
        document.getElementById('titlePage').addEventListener('click', function () {
            loadTitlePage();
        });
        document.getElementById('muteSound').addEventListener('click', function () {
            enableMute();
        });
        document.getElementById('unmuteSound').addEventListener('click', function () {
            disableMute();
        });
    }
    xhr.send();
}
//---------------------------------------------------Load index Page----------------------------------------------------------//
function loadTitlePage() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'index.html', true);
    xhr.responseType = 'text';
    // xhr.overrideMimeType("application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var startPage = document.getElementById('changeMe');
            startPage.innerHTML = xhr.responseText;
        }
        document.getElementById('title').style.backgroundColor = "#eeeeee";
        document.getElementById('startPage').addEventListener('click', function () {
            loadStartPage();
        });
        document.getElementById('optionPage').addEventListener('click', function () {
            loadOptionPage();
        });
    }
    xhr.send();
}
//--------------------------------------------Load End Screen------------------------------------------------------------------//
function loadEndPage() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'endScreen.html', true);
    xhr.responseType = 'text';
    // xhr.overrideMimeType("application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {
            var startPage = document.getElementById('changeMe');
            startPage.innerHTML = xhr.responseText;
        }
        document.getElementById('title').style.backgroundColor = "orange";
        document.getElementById('startGame').addEventListener('click', function () {
            loadQuestionsPage();
        });
        document.getElementById('titlePage').addEventListener('click', function () {
            loadTitlePage();
        });
    }
    xhr.send();
}
//-----------------------------------------------Play Music-------------------------------------------------------//
var audio = new Audio('music/music.mp3');
audio.play();
//----------------------------------------------Mute Music-----------------------------------------------//
function enableMute() {
    audio.muted = true;
}
//---------------------------------------------Unmute Sound-------------------------------------------------//
function disableMute() {
    audio.muted = false;
}
