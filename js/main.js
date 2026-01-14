import { elements } from './dom.js';
import { goStore, goCave, fightDragon } from './navigation.js';

// Initialize button event listeners on the main screen
elements.button1.onclick = goStore;
elements.button2.onclick = goCave;
elements.button3.onclick = fightDragon;
