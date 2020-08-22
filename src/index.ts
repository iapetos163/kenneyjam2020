import './style.scss';

import UIManager from './UIManager';

const game = document.getElementById('game') as HTMLDivElement;
const ui = new UIManager(game);

setInterval(() => {
  ui.draw();
}, 1000 / 60);

ui.init();
