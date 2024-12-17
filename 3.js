const gameArea = document.getElementById('game-area');
const levelLabel = document.getElementById('level-label');
const modal = document.getElementById('modal');
const nextLevelBtn = document.getElementById('next-level-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');

let currentLevel = 1;
let tubes = [];
let paused = false;

// Generate Levels Dynamically
function generateLevel(level) {
  gameArea.innerHTML = '';
  tubes = [];

  const totalTubes = 4 + Math.floor(level / 10);
  const totalColors = 2 + Math.floor(level / 10);
  const emptyTubes = Math.min(4, Math.floor(level / 20));

  let colors = [];
  for (let i = 0; i < totalColors; i++) {
    for (let j = 0; j < 4; j++) {
      colors.push(i);
    }
  }
  shuffle(colors);

  // Fill tubes
  for (let i = 0; i < totalTubes - emptyTubes; i++) {
    tubes[i] = [];
    for (let j = 0; j < 4; j++) {
      tubes[i].push(colors.pop());
    }
  }

  while (tubes.length < totalTubes) {
    tubes.push([]);
  }

  renderTubes();
  levelLabel.textContent = `Level: ${level}`;
}

function renderTubes() {
  gameArea.innerHTML = '';
  tubes.forEach((tube, i) => {
    const tubeDiv = document.createElement('div');
    tubeDiv.classList.add('tube');
    tubeDiv.dataset.index = i;

    tube.slice().reverse().forEach((color, idx) => {
      const liquidDiv = document.createElement('div');
      liquidDiv.classList.add('liquid');
      liquidDiv.style.height = '25%';
      liquidDiv.style.backgroundColor = getColor(color);
      liquidDiv.style.bottom = `${idx * 25}%`;
      tubeDiv.appendChild(liquidDiv);
    });

    gameArea.appendChild(tubeDiv);
  });
}

// Utility to shuffle colors
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getColor(index) {
  const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#28B463', '#2874A6'];
  return colors[index % colors.length];
}

// Check for Level Completion
function checkCompletion() {
  const isComplete = tubes.every(tube => tube.length === 0 || new Set(tube).size === 1);
  if (isComplete) {
    modal.style.display = 'block';
  }
}

// Event Listeners
nextLevelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  currentLevel++;
  generateLevel(currentLevel);
});

pauseBtn.addEventListener('click', () => {
  paused = true;
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'inline';
});

resumeBtn.addEventListener('click', () => {
  paused = false;
  resumeBtn.style.display = 'none';
  pauseBtn.style.display = 'inline';
});

// Initialize Game
generateLevel(currentLevel);