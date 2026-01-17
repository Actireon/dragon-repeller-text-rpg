import { state } from './state.js';
import { playSound } from './audio.js';
import {
  elements,
  update,
  updatePlayerHealthBar,
  updateMonsterHealthBar,
  triggerShake,
  triggerHit,
} from './dom.js';
import { weapons } from './data/weapons.js';
import { monsters } from './data/monsters.js';
import { locations } from './data/locations.js';

export function attack() {
  playSound('attack');
  const monster = monsters[state.fighting];

  elements.text.innerText = 'The ' + monster.name + ' attacks.';
  elements.text.innerText +=
    ' You attack it with your ' + weapons[state.currentWeapon].name + '.';

  // Monster attacks player
  const damage = getMonsterAttackValue(monster.level);
  state.health -= damage;

  // Trigger visual effects for player taking damage
  if (damage > 0) {
    triggerShake(elements.playerSide);
    triggerHit(elements.playerPortrait);
  }

  if (isMonsterHit()) {
    // Damage = weapon power + random XP bonus + 1
    const playerDamage =
      weapons[state.currentWeapon].power +
      Math.floor(Math.random() * state.xp) +
      1;
    state.monsterHealth -= playerDamage;

    // Trigger visual effects for monster taking damage
    triggerShake(elements.monsterSide);
    triggerHit(elements.monsterImage);
  } else {
    elements.text.innerText += ' You miss.';
  }

  // Update health displays
  elements.healthText.innerText = state.health;
  elements.monsterHealthText.innerText = state.monsterHealth;
  updatePlayerHealthBar();
  updateMonsterHealthBar(monster.health);

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
  playSound('dodge');
  elements.text.innerText =
    'You dodge the attack from the ' + monsters[state.fighting].name;
}

export function defeatMonster() {
  playSound('victory');
  state.gold += Math.floor(monsters[state.fighting].level * 6.7);
  state.xp += monsters[state.fighting].level;
  elements.goldText.innerText = state.gold;
  elements.xpText.innerText = state.xp;
  update(locations[4]);
}

export function lose() {
  playSound('defeat');
  update(locations[5]);
}

export function winGame() {
  playSound('victory');
  update(locations[6]);
}
