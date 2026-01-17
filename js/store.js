import { state } from './state.js';
import { playSound } from './audio.js';
import { elements, updatePlayerHealthBar } from './dom.js';
import { weapons } from './data/weapons.js';

const MAX_HEALTH = 100;

export function buyHealth() {
  // Check if health is already at max
  if (state.health >= MAX_HEALTH) {
    elements.text.innerText =
      '❤️ Your HP is already at maximum! No need to heal.';
    return;
  }

  if (state.gold >= 10) {
    playSound('purchase');
    state.gold -= 10;
    state.health += 10;

    // Cap health at max
    if (state.health > MAX_HEALTH) {
      state.health = MAX_HEALTH;
    }

    elements.goldText.innerText = state.gold;
    elements.healthText.innerText = state.health;
    updatePlayerHealthBar();
    elements.text.innerText =
      '💚 You bought 10 health! Current HP: ' + state.health + '/' + MAX_HEALTH;
  } else {
    elements.text.innerText = 'You do not have enough gold to buy health.';
  }
}

export function buyWeapon() {
  if (state.currentWeapon < weapons.length - 1) {
    if (state.gold >= 30) {
      playSound('purchase');
      state.gold -= 30;
      state.currentWeapon++;
      elements.goldText.innerText = state.gold;
      let newWeapon = weapons[state.currentWeapon].name;
      elements.text.innerText = 'You now have a ' + newWeapon + '.';
      state.inventory.push(newWeapon);
      elements.text.innerText +=
        ' In your inventory you have: ' + state.inventory.join(', ');
    } else {
      elements.text.innerText = 'You do not have enough gold to buy a weapon.';
    }
  } else {
    elements.text.innerText = 'You already have the most powerful weapon!';
    elements.button2.innerText = 'Sell weapon for 15 gold';
    elements.button2.onclick = sellWeapon;
  }
}

export function sellWeapon() {
  if (state.inventory.length > 1) {
    playSound('sell');
    state.gold += 15;
    elements.goldText.innerText = state.gold;
    let soldWeapon = state.inventory.shift();
    elements.text.innerText = 'You sold a ' + soldWeapon + '.';
    elements.text.innerText +=
      ' In your inventory you have: ' + state.inventory.join(', ');
  } else {
    elements.text.innerText = "Don't sell your only weapon!";
  }
}
