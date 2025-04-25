// Elements
const btn = document.getElementById('censor-btn');
const img = document.getElementById('censor-img');
const clickAudio = document.getElementById('click');
const toneAudio = document.getElementById('tone');

// Button images
const imgUp = '../../pictures/bleep/button.png';
const imgDown = '../../pictures/bleep/bleep-button-pressed.png';

// Audio snippets (set start/end times in seconds)
const clickStart = 0.15, clickEnd = 0.2; // Example: first 0.2s is click
const slideStart = 0.25, slideEnd = 0.3; // Example: 0.2s-0.5s is slide
const toneStart = 15.5, toneEnd = 17;   // Example: loop 1s section

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
  img.src = imgDown;
  playSnippet(clickAudio, clickStart, clickEnd);
  playLoopSnippet(toneAudio, toneStart, toneEnd);
}

function stopCensor(e) {
  if (!isPressed) return;
  isPressed = false;
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
