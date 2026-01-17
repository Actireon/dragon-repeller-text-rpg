const SOUNDS = {
  attack: './assets/sounds/attack.mp3',
  dodge: './assets/sounds/dodge.mp3',
  run: './assets/sounds/run.mp3',
  purchase: './assets/sounds/purchase.mp3',
  victory: './assets/sounds/victory.mp3',
  defeat: './assets/sounds/defeat.mp3',
  sell: './assets/sounds/sell.mp3',
};

const audioCache = {};
let backgroundMusic = null;
let isMuted = false;

// Preload all sounds for instant playback
export function preloadSounds() {
  Object.entries(SOUNDS).forEach(([name, path]) => {
    const audio = new Audio(path);
    audio.preload = 'auto';
    audioCache[name] = audio;
  });
}

// Play a sound effect by name
export function playSound(soundName) {
  const soundPath = SOUNDS[soundName];
  if (!soundPath) {
    console.warn(`Sound "${soundName}" not found`);
    return;
  }

  const audio = new Audio(soundPath);
  audio.volume = 0.5;
  audio.play().catch(error => {
    console.warn(`Could not play sound "${soundName}":`, error.message);
  });
}

// Initialize and play background music
export function initBackgroundMusic() {
  backgroundMusic = new Audio('./assets/sounds/main.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;

  // Try to play immediately (may be blocked by browser autoplay policy)
  playBackgroundMusic();

  // Add click listener to start music on first user interaction (for autoplay policy)
  const startMusicOnInteraction = () => {
    if (backgroundMusic.paused) {
      playBackgroundMusic();
    }
    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
  };

  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('keydown', startMusicOnInteraction);
}

function playBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.play().catch(error => {
      console.warn('Could not autoplay background music:', error.message);
    });
  }
}

// Toggle background music mute state
export function toggleMute() {
  if (!backgroundMusic) return;

  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;

  return isMuted;
}

export function getMuteState() {
  return isMuted;
}

preloadSounds();
