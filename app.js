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

const words = [
    'river',
    'lcuky',
    'five',
    'stubborn',
    'cocktail',
    'dog',
    'danny',
    'establishment',
    'revolver',
    'echo',
    'siblings',
    'developer',
    'statue',
    'hike',
    'nutrition',
    'food',
    'definition',
    'space',
    'magic',
    'fantasy',
    'hero',
    'javascript',
    'cat',
    'laughter',
    'high'
];

// Intialize Game
function init(){
    //Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    //Load word from array
    showWord(words)
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
        showWord(words);
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
//Pick & show random word
function showWord(words){
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Ouput a random word
    currentWord.innerHTML = words[randIndex]
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


// This will new feature. We are going to let users change difficulty 