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

// Button events
btn.addEventListener('mousedown', (e) => {
  // Change image
  img.src = imgDown;
  // Play click sound snippet
  playSnippet(clickAudio, clickStart, clickEnd);
  // Start looping 1kHz tone
  playLoopSnippet(toneAudio, toneStart, toneEnd);
});

// Button events
btn.addEventListener('touchstart', (e) => {
  // Change image
  img.src = imgDown;
  // Play click sound snippet
  playSnippet(clickAudio, clickStart, clickEnd);
  // Start looping 1kHz tone
  playLoopSnippet(toneAudio, toneStart, toneEnd);
});

// On mouseup or mouseleave, stop tone and play slide sound
function stopCensor() {
  // Change image back
  img.src = imgUp;
  // Stop tone
  stopLoopSnippet(toneAudio);
  // Play slide sound snippet
  playSnippet(clickAudio, slideStart, slideEnd);
}
btn.addEventListener('mouseup', stopCensor);
btn.addEventListener('touchend', stopCensor); // For touch devices

// Prevent default drag behavior on image
img.ondragstart = () => false;