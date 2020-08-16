window.addEventListener('load', init);

//Available levels
const levels = {
    easy: 5,
    medium: 4,
    hard: 3
}

//To change level
const currentLevel = levels.easy;

// Globals
let time = currentLevel
let score = 0;
let isPlaying;

// Dom Elements
const wordInPut= document.querySelector('#word-input');
const currentWord  = document.querySelector('#current-word');
const socreDisplay = document.querySelector('#score');
const timeDiplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

// Intialize Game
function init(){
    //Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    //Load word from array
    randomWord()
    // Start Matching on word input
    wordInPut.addEventListener('input', startMatch)
    // Call coutdown ever second
    setInterval(countdown, 1000);
    //check game status 
    setInterval(checkStatus, 50);
}

// start match
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        randomWord();
        wordInPut.value = '';
        score++
    }
    //If score is -1, didplay 0
    if(score === -1){
        socreDisplay.innerHTML = 0;
    }else{
    socreDisplay.innerHTML = score
    }
};

//Get random word with wordkin API
function randomWord(){
    apiUrl = "http://api.wordnik.com/v4/words.json/randomWord?api_key=v6cirzky1unhnpi8vharo85m04gbtlhidut11axk3a1gmpkzp"
    fetch(apiUrl)
        .then(function(u){
            return u.json();
        })
        .then(function(data){
            currentWord.innerHTML = data.word;
        })
    }

//Match current word to wordInput
function matchWords(){
    if(wordInPut.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!!!'
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }

}

// countdown timer
function countdown(){
    // Make sure time is not run out
    if(time > 0){
        // Decrement
        time--;
    } else if(time === 0){
        isPlaying = false;
    }
    //Show time
    timeDiplay.innerHTML = time;
}

//check game status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!!!'
        score = -1;
    }
}

