import { state, resetState } from './state.js';
import { elements, update, updateStats } from './dom.js';
import { locations } from './data/locations.js';
import { monsters } from './data/monsters.js';

// Set the current monster and start the fight
export function goFight() {
  update(locations[3]);
  state.monsterHealth = monsters[state.fighting].health;
  elements.monsterStats.style.display = 'block';
  elements.monsterName.innerText = monsters[state.fighting].name;
  elements.monsterHealthText.innerText = state.monsterHealth;
}

export function fightSlime() {
  state.fighting = 0;
  goFight();
}

export function fightBeast() {
  state.fighting = 1;
  goFight();
}

export function fightDragon() {
  state.fighting = 2;
  goFight();
}

export function goTown() {
  update(locations[0]);
}

export function goStore() {
  update(locations[1]);
}

export function goCave() {
  update(locations[2]);
}

export function restart() {
  resetState();
  updateStats();
  goTown();
}
