var startQuizButton = document.getElementById("#startButton");
var answerA = document.getElementById("#a")
var answerB = document.getElementById("#b")
var answerC = document.getElementById("#c")
var answerD = document.getElementById("#d")
var quizSection=document.getElementById('#quiz')
var questionsEl=document.getElementById('#questions')
var resultEl=document.getElementById('#result')
var endGameSection=document.getElementById('#endGame')
var endScoreEl=document.getElementById('#endScore')
var quizTimer=document.getElementById('#timer')
var firstPageSection=document.getElementById('#firstPage')
var highScoreContainer=document.getElementById('#highScoreContainer')
var highScore=document.getElementById('#highScore')
var highScoreName=document.getElementById('#names')
var highScoreShowName=document.getElementById('#highScoreShowName')
var highScoreShow=document.getElementById('#highScoreRank')
var endGameButton=document.getElementById('#endButton')
var submitButton=document.getElementById('#submitName')

var quizQuestions = [{
    question: "2+8=?",
    answerA: "4",
    answerB: "8",
    answerC: "12",
    answerD: "None of the above",
    correctAnswer: "d"},
   {
    question: "10/10=?",
    answerA: "0",
    answerB: "1",
    answerC: "2",
    answerD: "3",
    correctAnswer: "b"},
   {
    question: "5x5=?",
    answerA: "5",
    answerB: "15",
    answerC: "25",
    answerD: "35",
    correctAnswer: "c"},
    ];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 20;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time remaining: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
}
function showScore(){
    clearInterval(timerInterval);
    highScoreName.value = "";
    endScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}
submitButton.addEventListener("click", function highscore(){
    
    
    if(highScoreName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
            
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

function generateHighscores(){
    highScoreShowName.innerHTML = "";
    highScoreShow.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highScoreShowName.appendChild(newNameSpan);
        highScoreShow.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    quizSection.style.display = "none"
    endGameSection.style.display = "none";
    highscoreContainer.style.display = "flex";
    highScore.style.display = "block";
    endGameButton.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highScoreShowName.textContent = "";
    highScoreShow.textContent = "";
}

function replayQuiz(){
    highScoreContainer.style.display = "none";
    endGameSection.style.display = "none";
    quizSection.style.display = "flex";
    timeLeft = 20;
    score = 0;
    currentQuestionIndex = 0;
}

function goForAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);