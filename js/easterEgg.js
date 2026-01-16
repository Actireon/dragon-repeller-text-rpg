import { state } from './state.js';
import { elements, update, updatePlayerHealthBar } from './dom.js';
import { locations } from './data/locations.js';
import { lose } from './combat.js';

export function easterEgg() {
  update(locations[7]);
}

export function pickTwo() {
  pick(2);
}

export function pickEight() {
  pick(8);
}

// Generate random numbers and check if player's guess matches
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  elements.text.innerText =
    'You picked ' + guess + '. Here are the random numbers:\n';
  for (let i = 0; i < 10; i++) {
    elements.text.innerText += numbers[i] + '\n';
  }
  if (numbers.includes(guess)) {
    elements.text.innerText += 'Right! You win 20 gold!';
    state.gold += 20;
    elements.goldText.innerText = state.gold;
  } else {
    elements.text.innerText += 'Wrong! You lose 10 health!';
    state.health -= 10;
    elements.healthText.innerText = state.health;
    updatePlayerHealthBar();
    if (state.health <= 0) {
      lose();
    }
  }
}
