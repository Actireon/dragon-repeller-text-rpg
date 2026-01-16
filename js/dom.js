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
  // New visual elements
  gameArena: document.querySelector('#gameArena'),
  playerSide: document.querySelector('#playerSide'),
  playerPortrait: document.querySelector('#playerPortrait'),
  playerHealthBar: document.querySelector('#playerHealthBar'),
  playerHealthValue: document.querySelector('#playerHealthValue'),
  monsterSide: document.querySelector('#monsterSide'),
  monsterImage: document.querySelector('#monsterImage'),
  monsterHealthBar: document.querySelector('#monsterHealthBar'),
  monsterMaxHealth: document.querySelector('#monsterMaxHealth'),
  vsIndicator: document.querySelector('#vsIndicator'),
};

// Update the UI to reflect current game state
export function updateStats() {
  elements.goldText.innerText = state.gold;
  elements.healthText.innerText = state.health;
  elements.xpText.innerText = state.xp;
  updatePlayerHealthBar();
}

// Update player health bar width and color
export function updatePlayerHealthBar() {
  const maxHealth = 100;
  const healthPercent = Math.max(0, (state.health / maxHealth) * 100);

  elements.playerHealthBar.style.width = healthPercent + '%';
  elements.playerHealthValue.innerText = Math.max(0, state.health);

  // Update health bar color based on percentage
  elements.playerHealthBar.classList.remove('warning', 'danger');
  if (healthPercent <= 25) {
    elements.playerHealthBar.classList.add('danger');
  } else if (healthPercent <= 50) {
    elements.playerHealthBar.classList.add('warning');
  }
}

// Update monster health bar
export function updateMonsterHealthBar(maxHealth) {
  const healthPercent = Math.max(0, (state.monsterHealth / maxHealth) * 100);

  elements.monsterHealthBar.style.width = healthPercent + '%';
  elements.monsterHealthText.innerText = Math.max(0, state.monsterHealth);
}

// Show the monster in the arena
export function showMonster(monster) {
  elements.monsterImage.src = monster.image;
  elements.monsterImage.alt = monster.name;
  elements.monsterName.innerText = monster.name;
  elements.monsterHealthText.innerText = monster.health;
  elements.monsterMaxHealth.innerText = monster.health;
  elements.monsterHealthBar.style.width = '100%';

  // Show monster side and VS indicator
  elements.monsterSide.classList.add('visible');
  elements.vsIndicator.classList.add('visible');
}

// Hide the monster from arena
export function hideMonster() {
  elements.monsterSide.classList.remove('visible');
  elements.vsIndicator.classList.remove('visible');
}

// Trigger shake animation on an element
export function triggerShake(element) {
  element.classList.remove('shake');
  void element.offsetWidth; // Force reflow
  element.classList.add('shake');

  setTimeout(() => {
    element.classList.remove('shake');
  }, 400);
}

// Trigger hit flash animation
export function triggerHit(element) {
  element.classList.remove('hit');
  void element.offsetWidth;
  element.classList.add('hit');

  setTimeout(() => {
    element.classList.remove('hit');
  }, 300);
}

// Update the game screen based on location config
export function update(location) {
  // Hide monster when not in fight
  if (location.name !== 'fight') {
    hideMonster();
  }

  elements.button1.innerText = location['button text'][0];
  elements.button2.innerText = location['button text'][1];
  elements.button3.innerText = location['button text'][2];
  elements.button1.onclick = location['button functions'][0];
  elements.button2.onclick = location['button functions'][1];
  elements.button3.onclick = location['button functions'][2];
  elements.text.innerHTML = location.text;
}
