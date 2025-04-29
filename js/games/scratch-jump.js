// ---- CONFIGURATION ----
const PNG_FRAME_COUNT = 34; // Number of frames in your PNG sequence
const FRAME_RATE = 12; // Frames per second for animation
const JUMP_HEIGHT = 200; // How high the character jumps (in px)
const ANIMATION_DURATION = PNG_FRAME_COUNT / FRAME_RATE; // seconds
const SCRATCH_URL = "https://scratch.mit.edu/users/KhromaCodes/projects/";

const BOING_SFX = document.getElementById("boing-sfx");
const SHOT_SFX = document.getElementById("shot-sfx");

// Preload PNG frames
const frames = [];
for (let i = 0; i < PNG_FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `../pictures/scratch-open-tab/frame${String(i).padStart(4, '0')}.png`; // e.g., frames/frame01.png
    frames.push(img);

    console.log(img.src);
}

const container = document.getElementById('scratch-jump');
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

let clickable = true;
let animating = false;

// Draw initial frame (just eyes)
frames[0].onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[0], 0, 0, canvas.width, canvas.height);
};

container.addEventListener('click', async () => {
    if (!clickable || animating) return;
    clickable = false;
    animating = true;
    container.classList.add('inactive');

    // 1. Play PNG sequence (starts immediately)
    let sequenceDone = false;
    playPNGSequence().then(() => { sequenceDone = true; });

    // 2. After a short delay, jump up (ease out)
    await wait(600);
    await playSnippet(BOING_SFX, 0, 800);
    await animateJump(JUMP_HEIGHT, 300, 'easeOut');

    // Bounce when shooting
    await wait(500);
    await playSnippet(SHOT_SFX, 300, 1200);
    await animateJump((JUMP_HEIGHT + 50), 50, 'easeOut');

    // 3. Open Scratch link after a short delay
    setTimeout(() => {
        window.open(SCRATCH_URL, '_blank');
    }, 200);

    // 5. Fall down (ease in)
    await wait(400);
    await animateJump((-JUMP_HEIGHT - 600), 1000, 'easeIn');

    // 6. Wait and return to original position (ease out)
    await wait(300);
    await animateJump(-220, 100, 'easeOut');

    // 7. Reset state
    clickable = true;
    animating = false;
    container.classList.remove('inactive');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[0], 0, 0, canvas.width, canvas.height);
});

// --- Animation helpers ---

function animateJump(targetY, duration, easeType) {
    return new Promise(resolve => {
        const start = performance.now();
        const initialBottom = parseFloat(getComputedStyle(container).bottom);
        const delta = targetY - initialBottom;
        function ease(t) {
            if (easeType === 'easeOut') {
                return 1 - Math.pow(1 - t, 3);
            } else if (easeType === 'easeIn') {
                return t * t * t;
            }
            return t;
        }
        function step(now) {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = ease(t);
            container.style.bottom = (initialBottom + delta * eased) + 'px';
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(step);
    });
}

function playPNGSequence() {
    return new Promise(resolve => {
        let frame = 0;
        const interval = 1000 / FRAME_RATE;
        function drawFrame() {
            if (frame < PNG_FRAME_COUNT) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(frames[frame], 0, 0, canvas.width, canvas.height);
                frame++;
                setTimeout(drawFrame, interval);
            } else {
                resolve();
            }
        }
        drawFrame();
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playSnippet(audio, start, end) {
    audio.currentTime = start / 1000;
    audio.volume = 0.6;
    audio.play();
    const handler = () => {
        if (audio.currentTime >= end / 1000) {
            audio.pause();
            audio.removeEventListener('timeupdate', handler);
        }
    };
    audio.addEventListener('timeupdate', handler);
}