import { elements } from './dom.js';
import { goStore, goCave, fightDragon } from './navigation.js';
import { initBackgroundMusic, toggleMute, getMuteState } from './audio.js';

// Initialize button event listeners on the main screen
elements.button1.onclick = goStore;
elements.button2.onclick = goCave;
elements.button3.onclick = fightDragon;

// Initialize background music
initBackgroundMusic();

const musicToggleBtn = document.getElementById('musicToggle');

function updateMusicIcon() {
  musicToggleBtn.textContent = getMuteState() ? '🔇' : '🔊';
}

musicToggleBtn.addEventListener('click', e => {
  e.stopPropagation();
  toggleMute();
  updateMusicIcon();
});

updateMusicIcon();
