'use strict';
const dice = document.querySelector('.dice');
const player1 = document.getElementById('score--0');
const player2 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const rollDice = document.querySelector('.btn--roll');
const player0_bg = document.querySelector('.player--0');
const player1_bg = document.querySelector('.player--1');
const btnHold = document.querySelector('.btn--hold');

player1.textContent = 0;
player2.textContent = 0;
dice.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;

rollDice.addEventListener('click', () => {
  winnerLock();
  // Generating the radom dice value
  const diceValue = Math.trunc(Math.random() * 6) + 1;

  // show the dice image based on the random value
  dice.classList.remove('hidden');
  dice.src = `dice-${diceValue}.png`;

  if (diceValue !== 1) {
    currentScore += diceValue;
    document.getElementById(`current--${activeplayer}`).textContent =
      currentScore;
  } else {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  winnerLock();
  scores[activeplayer] += currentScore;
  document.getElementById(`score--${activeplayer}`).textContent =
    scores[activeplayer];
  currentScore = 0;

  if (scores[activeplayer] >= 100) {
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--active');
  }
});

document.querySelector('.btn--new').addEventListener('click', () => {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  player1.textContent = 0;
  player2.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0_bg.classList.remove('player--winner');
});

function winnerLock() {
  if (scores[activeplayer] >= 100) {
    document
      .querySelector(`.player--${activeplayer}`)
      .classList.add('player--winner');

    document
      .querySelector(`.player--${activeplayer}`)
      .classList.remove('player--active');
    rollDice.disabled = true;
  }
}

function switchPlayer() {
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentScore = 0;
  player0_bg.classList.toggle('player--active');
  player1_bg.classList.toggle('player--active');
}
