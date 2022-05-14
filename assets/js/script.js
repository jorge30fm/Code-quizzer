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
                answerAttribute: ['false', 'false', 'false', 'true']
        },
        {
                question: 'The "function" and "var" are known as:',
                choices: ['keywords', 'data types', 'declaration statements', 'prototypes'],
                answerAttribute: ['false', 'false', 'true', 'false']
        },
        {
                question:'Which of the following variables takes precedence over the others if the names are the same?',
                choices: ['global variable', 'the local element', 'the two of the above', 'none of the above'],
                answerAttribute: ['false', 'true', 'false', 'true']
        },
        {
                question: 'Which of the following type of a variable is volatile?',
                choices: ['Mutable variable', 'Dynamic variable', 'volatile variable', 'immutable variable'],
                answerAttribute: ['true', 'false', 'false', 'false']
        },
        {
                question: 'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints:',
                choices: ['expception error', 'overflow error', 'Infinity', 'the value as such'],
                answerAttribute: ['false', 'false', 'true', 'false']
        }
]; //array of quiz questions to iterate over

//variables select DOM elements from the starting page, adds event listener to the start button
var landingContent = document.querySelector('#landing-page');
var startButton = document.getElementById('start-button');
startButton.addEventListener('click', startQuiz)

//variables store DOM elements that will contain the content of each question, counter created to keep track of the questions
var questionSectionEl = document.querySelector('.questionLocation');
var questionPrompt = document.querySelector('.question');
var answerListEl = document.querySelector('.answer-choices');
var questionNumber = 0;

//variables containging info about the timer on the header
var timeLeft = 100;
var timeStarted = false;
var timer;
var timerEl = document.getElementById('time-remaining');

//variables containing DOM elements that will contain the high score data, adds event listener to 'View Highscores in the header'
var highscoreSection = document.getElementById('highscore-list');
var highscoreDiv = document.getElementById('highscoreDiv');
var Hstitle = document.getElementById('high-scores');
Hstitle.addEventListener('click', viewHS);


//hides the landing page content when user clicks start quiz button, and displayes the first question
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

//checks if the timerStarted variable is set to false, if so, triggers the start timer function, and displays questions and answer choices on window/
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

//when this function runs, it sets the time started variable to true and  triggersthe startCountdown function every second
function startTimer() {
        timeStarted = true;
        timer = setInterval(startCountdown, 1000)
}

//checks if the time remaining is 0 or greater,if so, displays the timer on page and substract one
//if the time is less than 11, it makes the font red to alert the user
//if time runs out, it triggers the function to get the user name , saves the score, stops the timer and deletes anything displayed in the window
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


//deletes the answer choices from the quiz so that they are not displayed in the window anymore
var clearScreen = function() {
        var answerItems = document.querySelector('.answer-choices');
        while (answerItems.firstChild) {
        answerItems.removeChild(answerItems.firstChild);}

}

//checks if the right answer was picked
//if the right answer was picked, the background flashes green and goes to the next question
//if the wrong answer was picked, background flashes red and substract 10 from the time and displayes the next question
//if there are no other questions, it triggers the getName function
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

//function handles the colorflash if a user picked a correct or incorrect answer
//changes the class of the background color depending on wether the user chose the right answer or not
//takes a parameter from the checkcorrect function 'correct' or 'incorrect'
//depending on the parameter, it sets the class of the main section base don that parameter, triggering CSS properties
//resets the class after half a second to create the illusion of a flash
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

//dinamically displays the input section to get the user's initials
//adds an event listener to the submit button, when clicked, saves the name to storage
var getName = function() {
        questionPrompt.innerHTML = 'Enter your initials';
        clearScreen();
        var highscoreEl = document.createElement('INPUT');
        highscoreEl.setAttribute('type', 'text');
        highscoreEl.setAttribute('class', 'input-content')
        highscoreEl.setAttribute('id', 'name-value')
        highscoreEl.setAttribute('placeholder', 'Initials');
        highscoreSection.appendChild(highscoreEl);
        var submitName = document.createElement('button');
        submitName.setAttribute('type', 'submit');
        submitName.setAttribute('class', 'high-scores')
        submitName.setAttribute('class', 'btn');
        submitName.textContent = 'Submit';
        highscoreSection.appendChild(submitName);
        submitName.addEventListener('click', saveToStorage);
}

//checks if user enter initials to save
//if initials were entered, it triggers the save name function, and clears the screen
//then triggers the function that displays the high scores
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

//checks to see if there is data in local storage, if so, it displays the high score list on the screen, along with a clear and a go back button
//gives html atributes of  'onlcick,  "function()"' to each of the buttons
//if uses clicks the 'go back' button, it reloads the page, effectively taking the user to the main page
//if user clicks the 'clear highscores'button, it deletes the data from local storage and removes the high score list from the window
//other classes added for styling purposes
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
                var goBackBtn = document.createElement('button');
                goBackBtn.setAttribute('class', 'btn');
                goBackBtn.setAttribute('id', 'goBack');
                goBackBtn.setAttribute('onclick', 'location.reload()');
                goBackBtn.textContent = 'Go Back';
                highscoreDiv.appendChild(goBackBtn);


                var clearHSBtn = document.createElement('button');
                clearHSBtn.setAttribute('class', 'btn');
                clearHSBtn.setAttribute('id', 'clearHS');
                clearHSBtn.textContent = 'Clear High Score';
                clearHSBtn.setAttribute('onclick', 'clearStorage()');
                highscoreDiv.appendChild(clearHSBtn);
         }

}

//takes user input and saves it to local storage in an array of names
function saveName() {
        var newName = document.getElementById('name-value').value;

        if(localStorage.getItem('playerNames') == null) {
                localStorage.setItem('playerNames', '[]');
        }
        var oldObject = JSON.parse(localStorage.getItem('playerNames'));
        oldObject.push(newName);
        localStorage.setItem('playerNames', JSON.stringify(oldObject));
}

//stores the time remaining in the timer and adds it to local storage
//if the time remaining is negative, changes it to 0 before sending it to local storage
function saveScore() {
        if (timeLeft < 0) {
                timeLeft =-1
        }
        var newScore = timeLeft + 1;
        if(localStorage.getItem('time-remaining') == null) {
                localStorage.setItem('time-remaining', '[]');
        };
        var oldScore = JSON.parse(localStorage.getItem('time-remaining'));
        oldScore.push(newScore);
        localStorage.setItem('time-remaining', JSON.stringify(oldScore));
}

//if user is in the main page, it hides the content and displays the highscores
//if user is in the middle of answering a questions, it deletes the question list and displays highscores
//if there are no highscores in storage, it displays an alert and reloads the page so the user can retake the quiz
function viewHS() {
        var displaySetting = landingContent.style.display;
        if (displaySetting === 'block'){
                landingContent.style.display = 'none';
                }
        while (answerListEl.firstChild) {
                answerListEl.removeChild(answerListEl.firstChild);}
        if(localStorage.getItem('playerNames') == null && localStorage.getItem('time-remaining') == null) {
                alert('No scores to see. Pleaste take the quiz.')
                location.reload()}
        else {
                questionPrompt.innerHTML = 'HIGHSCORES';
                displayHighscores();
        }

}

//function clears local storage and returns an alert confirmation message, also removes the high score list from the window
var clearStorage = function(){
        localStorage.removeItem('playerNames');
        localStorage.removeItem('time-remaining');
        while (highscoreSection.firstChild) {
                highscoreSection.removeChild(highscoreSection.firstChild);}
        alert('Highscores cleared!')

}