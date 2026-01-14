// Centralized game state - all mutable game variables in one place
export const state = {
  xp: 0,
  health: 100,
  gold: 50,
  currentWeapon: 0,
  fighting: null,
  monsterHealth: 0,
  inventory: ['stick'],
};

export function resetState() {
  state.xp = 0;
  state.health = 100;
  state.gold = 50;
  state.currentWeapon = 0;
  state.fighting = null;
  state.monsterHealth = 0;
  state.inventory = ['stick'];
}
