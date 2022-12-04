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

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // when there is no input;
    if (!guess) {
        document.querySelector('.message').textContent = '❌ No number';
    // when player wins;
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '✅Correct number';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';    // when teh number is too low;
        document.querySelector('.number').textContent = secretNumber;
        if (score  ) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    } else if (guess < secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = '❗Two low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '💥You lost the game';
            score--;
            document.querySelector('.score').textContent = score;
        }
    // when the number is too high;
    } else if (guess > secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = '❗Two high!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '💥You lost the game';
            score--;
            document.querySelector('.score').textContent = score;
        }
    }
})

document.querySelector('.again').addEventListener('click', function() {
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    secretNumber = Math.trunc(Math.random()*20) + 1;
})

