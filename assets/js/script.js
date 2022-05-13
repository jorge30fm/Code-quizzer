var questionBank = [
        {
                question:'Javascript is an _________ language?',
                choices: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
                answerAttribute: ['true', 'false', 'false', 'false']
        },
        {
                question: 'Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?',
                choices: ['concat()', 'math()', 'replace()', 'search()'],
                answerAttribute: ['false', 'falser', 'true', 'false']
        },
        {
                question: 'Which of the following function of Array object calls a function for each element in the array?',
                choices: ['concat()', 'every()', 'filter()', 'forEach()'],
                answerAttribute: ['false', 'false', 'false', 'true']        }
];
var landingContent = document.querySelector('#landing-page');
var startButton = document.getElementById('start-button');
var questionSectionEl = document.querySelector('.questionLocation');
var questionPrompt = document.querySelector('.question');
var answerListEl = document.querySelector('.answer-choices');
var questionNumber = 0;
var timeLeft = 10;
var timeStarted = false;
var timer;
var highscoreSection = document.getElementById('highscore-list')
startButton.addEventListener('click', startQuiz)

//hide landing page content when user clicks start quiz button
function startQuiz (event){
        var targetEl = event.target;
        if (targetEl.matches('#start-button')) {
                var displaySetting = landingContent.style.display;
                if (displaySetting === 'block'){
                        landingContent.style.display = 'none';
                };
        }
        displayQuestion(questionNumber);
};
var timerEl = document.getElementById('time-remaining');

//function displays the question on the window
var displayQuestion = function(num){
        if (!timeStarted) {startTimer()};
        questionPrompt.innerHTML = questionBank[num].question;
        for (x = 0; x < questionBank[num].choices.length; x++) {
                var listItem = document.createElement('li')
                listItem.className ='clear';
                var answerOptionEl = document.createElement('button');
                answerOptionEl.classList.add('answer-option', 'btn');

                answerOptionEl.setAttribute('id', questionBank[num].answerAttribute[x]);
                answerOptionEl.innerHTML = questionBank[num].choices[x];
                listItem.appendChild(answerOptionEl);
                answerListEl.appendChild(listItem);

                }
        answerListEl.addEventListener('click', checkCorrect);
};
function startTimer() {
        timeStarted = true;
        timer = setInterval(startCountdown, 1000)
}
var startCountdown = function(){
        if (timeLeft > -1) {
        timerEl.innerHTML = timeLeft;
                if(timeLeft < 11) {
                timerEl.style.color = 'red'
                }
        }
        else {
                saveScore();
                clearInterval(timer);
                clearScreen();
                getName();

        }
        timeLeft -= 1}

var clearScreen = function() {
        var answerItems = document.querySelector('.answer-choices');
        while (answerItems.firstChild) {
        answerItems.removeChild(answerItems.firstChild);}

}
var checkCorrect = function(event) {
        var pickedAnswer = event.target;
       // var pickedAnswerEl = document.querySelector()
       var selectedOptionID = pickedAnswer.getAttribute('id', 'true')
        if (selectedOptionID ===  'true') {
                colorFlash('correct');

                if (questionNumber < questionBank.length -1){
                questionNumber ++;
                clearScreen();
                displayQuestion(questionNumber);}
                else {
                        saveScore();
                        clearInterval(timer);
                        timeStarted = false;
                        getName();}
        }
        else {
                colorFlash('incorrect');
                timeLeft -= 10;
                clearScreen();
                if (questionNumber < questionBank.length - 1){
                        questionNumber++;
                        displayQuestion(questionNumber);
                }
                else {
                        saveScore();
                        clearInterval(timer);
                        getName();
                }
        }
}
function colorFlash(feedback) {
        var background = document.querySelector('#content');
        background.setAttribute('class', feedback)
        setInterval(function() {
                background.removeAttribute('class', feedback );
                background.setAttribute('id', 'content')
        },
        500);
        clearInterval(colorFlash);
}
var getName = function() {
        questionPrompt.innerHTML = 'Enter your name';
        clearScreen();
        var highscoreEl = document.createElement('INPUT');
        highscoreEl.setAttribute('type', 'text');
        highscoreEl.setAttribute('class', 'input-content')
        highscoreEl.setAttribute('id', 'name-value')
        highscoreEl.setAttribute('placeholder', 'Enter Your Name!');
        highscoreSection.appendChild(highscoreEl);
        var submitName = document.createElement('button');
        submitName.setAttribute('type', 'submit');
        submitName.setAttribute('id', 'start-button');
        submitName.textContent = 'Submit';
        highscoreSection.appendChild(submitName);
        submitName.addEventListener('click', saveToStorage);
}
var saveToStorage = function (event){
        event.preventDefault;
        if (document.getElementById('name-value').value.length == 0) {
                alert('Please enter a name to save your score');
        }
        else {
        questionPrompt.innerHTML = 'HIGHSCORES';
        saveName();
        while (highscoreSection.firstChild) {
        highscoreSection.removeChild(highscoreSection.firstChild);}
        displayHighscores();}
}
var displayHighscores = function() {
        if(localStorage.getItem('playerNames') != null && localStorage.getItem('time-remaining') != null) {
                storedNames = JSON.parse(localStorage.getItem('playerNames'));
                storedScore = JSON.parse(localStorage.getItem('time-remaining'));
                for (i = 0; i < storedNames.length; i ++) {
                        var scoreItems = document.createElement('li');
                        scoreItems.setAttribute('class', 'scorelistItem');
                        scoreItems.innerHTML = storedNames[i] + ':   ' + storedScore[i] ;
                        highscoreSection.appendChild(scoreItems);
                }

         }
}

function saveName() {
        var newName = document.getElementById('name-value').value;

        if(localStorage.getItem('playerNames') == null) {
                localStorage.setItem('playerNames', '[]');
        }
        var oldObject = JSON.parse(localStorage.getItem('playerNames'));
        oldObject.push(newName);
        localStorage.setItem('playerNames', JSON.stringify(oldObject));
}

function saveScore() {
        var newScore = timeLeft + 1;
        if(localStorage.getItem('time-remaining') == null) {
                localStorage.setItem('time-remaining', '[]');
        };
        var oldScore = JSON.parse(localStorage.getItem('time-remaining'));
        oldScore.push(newScore);
        localStorage.setItem('time-remaining', JSON.stringify(oldScore));
}


