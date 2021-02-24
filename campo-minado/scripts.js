/** Counters of feedbacks */
var totalExploded = 0;
var totalSaved = 0;

/** Values from the rules */
var totalSpots = 9;
var maxMines = 4;
var maxClearSpots = totalSpots - maxMines;

/** Definition spots attributes */
var spots = [];

/** Feedback mesages */
var MESSAGE_START = 'Começando o jogo.'
var MESSAGE_WINNER = 'Parabéns ! Você encontrou todos os espaços livres de minas.';
var MESSAGE_LOSER = 'Tente de novo ! Você acabou explodindo todas as minas';

/** Randomizer index of spots */
function getRamdomIndex() {
  return Math.floor(Math.random() * totalSpots);
}

/** Define what spot should be a mine */
function defineMines() {
  for(var i = 0; i < maxMines; i++) {
    var index = 0;
    do { index = getRamdomIndex(); } while (spots[index].isMine);

    spots[index].isMine = true;
  }
}

/** Creates basic definition of spot */
function createSpot() {
  return {
    isMine: false,
    isOpen: false,
  }
}

/** Initialize all spots */
function initSpots() {
  spots = [];
  for(var i = 0; i < totalSpots; i++) {
    spots.push(createSpot());
  }
}

function clearUI() {
  var mines = document.querySelectorAll('.area .spot .mine');
  console.log(mines);
  for(var i = 0; i < mines.length; i++) {
    mines[i].classList.remove('touched');
    mines[i].classList.remove('exploded');
    mines[i].classList.remove('not-exploded');
  }
}

/** Update Score UI */
function updateScore() {
  var scoreExploded = document.querySelector('.score-container .score-exploded .count');
  var scoreSaved = document.querySelector('.score-container .score-not-exploded .count');

  scoreExploded.innerHTML = totalExploded;
  scoreSaved.innerHTML = totalSaved;
}

/** Checks if game is finished */
function checkFinish() {
  var countMinesOpened = spots.filter(s => s.isMine && s.isOpen).length;
  var countSpotsSaved = spots.filter(s => !s.isMine && s.isOpen).length;

  if (countMinesOpened === maxMines) {
    alert(MESSAGE_LOSER);
    startGame();
  }

  if (countSpotsSaved === maxClearSpots) {
    alert(MESSAGE_WINNER);
    startGame();
  }
}

/** Click event for each spot */
function openSpot(spotElement, index) {
  var spot = spots[index];
  if (spot.isOpen) return;

  spot.isOpen = true;

  var mine = spotElement.querySelector('.mine');
  mine.classList.add('touched');

  if (spot.isMine) {
    mine.classList.add('exploded');
    totalExploded += 1;
  } else {
    mine.classList.add('not-exploded');
    totalSaved += 1;
  }

  updateScore();
  checkFinish();
}

/** Main function to start the game */
function startGame() {
  totalExploded = 0;
  totalSaved = 0;

  console.log(MESSAGE_START);

  initSpots();
  defineMines();
  clearUI();
  updateScore();
}

startGame();