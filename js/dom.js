import { state } from './state.js';

// DOM element references
export const elements = {
  button1: document.querySelector('#button1'),
  button2: document.querySelector('#button2'),
  button3: document.querySelector('#button3'),
  text: document.querySelector('#text'),
  xpText: document.querySelector('#xpText'),
  healthText: document.querySelector('#healthText'),
  goldText: document.querySelector('#goldText'),
  monsterStats: document.querySelector('#monsterStats'),
  monsterName: document.querySelector('#monsterName'),
  monsterHealthText: document.querySelector('#monsterHealth'),
};

// Update the UI to reflect current game state
export function updateStats() {
  elements.goldText.innerText = state.gold;
  elements.healthText.innerText = state.health;
  elements.xpText.innerText = state.xp;
}

// Update the game screen based on location config
export function update(location) {
  elements.monsterStats.style.display = 'none';
  elements.button1.innerText = location['button text'][0];
  elements.button2.innerText = location['button text'][1];
  elements.button3.innerText = location['button text'][2];
  elements.button1.onclick = location['button functions'][0];
  elements.button2.onclick = location['button functions'][1];
  elements.button3.onclick = location['button functions'][2];
  elements.text.innerHTML = location.text;
}
