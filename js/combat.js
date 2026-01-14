import { state } from './state.js';
import { elements, update } from './dom.js';
import { weapons } from './data/weapons.js';
import { monsters } from './data/monsters.js';
import { locations } from './data/locations.js';

export function attack() {
  elements.text.innerText =
    'The ' + monsters[state.fighting].name + ' attacks.';
  elements.text.innerText +=
    ' You attack it with your ' + weapons[state.currentWeapon].name + '.';
  state.health -= getMonsterAttackValue(monsters[state.fighting].level);

  if (isMonsterHit()) {
    // Damage = weapon power + random XP bonus + 1
    state.monsterHealth -=
      weapons[state.currentWeapon].power +
      Math.floor(Math.random() * state.xp) +
      1;
  } else {
    elements.text.innerText += ' You miss.';
  }

  elements.healthText.innerText = state.health;
  elements.monsterHealthText.innerText = state.monsterHealth;

  if (state.health <= 0) {
    lose();
  } else if (state.monsterHealth <= 0) {
    if (state.fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  // 10% chance weapon breaks (unless it's your only weapon)
  if (Math.random() <= 0.1 && state.inventory.length !== 1) {
    elements.text.innerText += ' Your ' + state.inventory.pop() + ' breaks.';
    state.currentWeapon--;
  }
}

// Calculate monster's attack damage based on its level minus random XP reduction
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * state.xp);
  return hit > 0 ? hit : 0;
}

// 80% hit chance, always hit when health is critical
function isMonsterHit() {
  return Math.random() > 0.2 || state.health < 20;
}

export function dodge() {
  elements.text.innerText =
    'You dodge the attack from the ' + monsters[state.fighting].name;
}

export function defeatMonster() {
  state.gold += Math.floor(monsters[state.fighting].level * 6.7);
  state.xp += monsters[state.fighting].level;
  elements.goldText.innerText = state.gold;
  elements.xpText.innerText = state.xp;
  update(locations[4]);
}

export function lose() {
  update(locations[5]);
}

export function winGame() {
  update(locations[6]);
}
