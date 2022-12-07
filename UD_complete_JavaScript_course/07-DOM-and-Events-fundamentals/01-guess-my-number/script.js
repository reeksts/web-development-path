'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct number';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random()*20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // when there is no input;
    if (!guess) {
        displayMessage('❌ No number');
    // when player wins;
    } else if (guess === secretNumber) {
        displayMessage('✅Correct number');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';    // when teh number is too low;
        document.querySelector('.number').textContent = secretNumber;
        if (score) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    // when the guess is wrong;
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess >  secretNumber ? '❗Two high!' : '❗Two low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥You lost the game');
            score--;
            document.querySelector('.score').textContent = score;
        }
    }
})

document.querySelector('.again').addEventListener('click', function() {
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    secretNumber = Math.trunc(Math.random()*20) + 1;
})

