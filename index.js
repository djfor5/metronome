const audio1 = new Audio('./assets/audio/drumsticks-pro-mark-la-special-2bn-hickory-no4-103712.mp3');
const audio2 = new Audio('./assets/audio/metronome-85688.mp3');

audio1.preload = 'auto';
audio2.preload = 'auto';

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const ticks = document.getElementById('ticks')
const seconds = document.getElementById('seconds')

// USER SETTINGS
let tempo = 60; // bpm
let beatsPerMeasure = 4;

const intervalTime = (1000 * 60) / tempo; // milliseconds per tick

// Initialise variables
let metronomeInterval = null;
let elapsedTicks = 0;
let initialTime = performance.now()
let beatCount = 1
let elapsedSeconds = 0
let pausedTime = initialTime

function tick() {
  const currentTime = performance.now();
  if (currentTime < initialTime + (elapsedTicks * intervalTime)) return
  
  elapsedTicks++;
  
  if (beatCount === 1) {
    // audio1.currentTime = 0;
    audio1.preload = 'auto';
    audio1.play()
  } else {
    // audio2.currentTime = 0;
    audio2.preload = 'auto';
    audio2.play()
  }

  ticks.textContent = elapsedTicks

  const newElapsedSeconds = Math.floor((currentTime - initialTime) / 1000);
  if (newElapsedSeconds !== elapsedSeconds) {
    elapsedSeconds = newElapsedSeconds;
    seconds.textContent = elapsedSeconds;
  }

  beatCount === beatsPerMeasure ? beatCount = 1 : beatCount++;
}

function startMetronome() {
  if (metronomeInterval !== null) return

  initialTime += performance.now() - pausedTime;
  metronomeInterval = setInterval(tick, intervalTime);
}

function stopMetronome() {
  if (metronomeInterval === null) return
  
  pausedTime = performance.now();
  clearInterval(metronomeInterval);
  metronomeInterval = null;
  audio1.pause();
  audio2.pause();
}

function resetMetronome() {
  elapsedTicks = 0;
  initialTime = performance.now();
  beatCount = 1;
  elapsedSeconds = 0;
  ticks.textContent = '';
  seconds.textContent = 0;
}

startBtn.addEventListener('click', startMetronome);
stopBtn.addEventListener('click', stopMetronome);
resetBtn.addEventListener('click', resetMetronome);