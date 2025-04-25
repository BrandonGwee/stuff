// Provided by Perplexity

// Elements
const btn = document.getElementById('censor-btn');
const img = document.getElementById('censor-img');
const clickAudio = document.getElementById('click');
const toneAudio = document.getElementById('tone');

// Button images (make sure these paths are correct and files exist)
const imgUp = '../pictures/bleep/button.png';
const imgDown = '../pictures/bleep/bleep-button-pressed.png';

// Preload images to avoid flicker/alt text
const preloadUp = new Image();
preloadUp.src = imgUp;
const preloadDown = new Image();
preloadDown.src = imgDown;

// Audio snippets (set start/end times in seconds)
const clickStart = 0.15, clickEnd = 0.2;
const slideStart = 0.25, slideEnd = 0.3;
const toneStart = 15.5, toneEnd = 17;

// Utility: play snippet of an audio element
function playSnippet(audio, start, end) {
  audio.currentTime = start;
  audio.volume = 0.3;
  audio.play();
  const handler = () => {
    if (audio.currentTime >= end) {
      audio.pause();
      audio.removeEventListener('timeupdate', handler);
    }
  };
  audio.addEventListener('timeupdate', handler);
}

// Utility: play looping snippet (for tone)
function playLoopSnippet(audio, start, end) {
  audio.currentTime = start;
  audio.play();
  audio.loop = true;
  audio.ontimeupdate = () => {
    if (audio.currentTime >= end) {
      audio.currentTime = start;
    }
  };
}
function stopLoopSnippet(audio) {
  audio.pause();
  audio.ontimeupdate = null;
} 

// Track if button is pressed to avoid duplicate triggers
let isPressed = false;

function startCensor(e) {
  // Prevent scrolling on touch
  if (e.type.startsWith('touch')) e.preventDefault();
  if (isPressed) return;
  isPressed = true;
  // Only set to valid image path
  img.src = imgDown;
  playSnippet(clickAudio, clickStart, clickEnd);
  playLoopSnippet(toneAudio, toneStart, toneEnd);
}

function stopCensor(e) {
  if (!isPressed) return;
  isPressed = false;
  // Only set to valid image path
  img.src = imgUp;
  stopLoopSnippet(toneAudio);
  playSnippet(clickAudio, slideStart, slideEnd);
}

// Desktop
btn.addEventListener('mousedown', startCensor);
btn.addEventListener('mouseup', stopCensor);
btn.addEventListener('mouseleave', stopCensor);

// Mobile
btn.addEventListener('touchstart', startCensor, {passive: false});
btn.addEventListener('touchend', stopCensor);
btn.addEventListener('touchcancel', stopCensor);

// Prevent default drag behavior on image
img.ondragstart = () => false;

// OPTIONAL: Set initial image on page load
img.src = imgUp;
