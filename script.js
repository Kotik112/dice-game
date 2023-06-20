'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceImageEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const rollDice = function () {
	return Math.trunc(Math.random() * 6) + 1;
};

const displayPlayerScore = function (player, score) {
	if (player !== 0 || player !== 1) {
		console.error('invalid selection');
	}
	document.getElementById(`current--${player}`).textContent = score;
};

const switchPlayer = function () {
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
};

let score, currentScore, activePlayer, isPlaying;

const initGame = function () {
	score = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	isPlaying = true;

	score0El.textContent = '0';
	score1El.textContent = '0';
	current0El.textContent = '0';
	current1El.textContent = '0';
	diceImageEl.classList.add('hidden');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
};

initGame();

//rolling dice functionality
btnRoll.addEventListener('click', function () {
	if (isPlaying) {
		// Generate a random dice roll
		const playerRoll = rollDice();
		// Display the dice
		diceImageEl.classList.remove('hidden');
		diceImageEl.src = `dice-${playerRoll}.png`;
		// Check for a 1.
		if (playerRoll !== 1) {
			currentScore += playerRoll;
			// show score on player 1 TEMP
			displayPlayerScore(activePlayer, currentScore);
		}
		//If 1 change to next player.
		else {
			displayPlayerScore(activePlayer, currentScore);
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (isPlaying) {
		score[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			score[activePlayer];

		currentScore = 0;
		displayPlayerScore(activePlayer, currentScore);
		if (score[activePlayer] >= 100) {
			//Finish game
			isPlaying = false;
			diceImageEl.classList.add('hidden');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else switchPlayer();
	}
});

btnNew.addEventListener('click', initGame);
