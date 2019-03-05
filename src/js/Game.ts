import Dungeon from './Dungeon';
import Animate from 'js/Animate';
import store from 'services/globals';

export default class Game {
  dungeon:Dungeon;
  animate:Animate;

  constructor() {
   this.dungeon = null;
   this.animate = new Animate();

   store.resize();
   store.loadImg('./img/dungeon.png', () => {
     this.init();
   });
  }

  init() {
    store.buildGrid();
    this.dungeon = new Dungeon();
    this.animate.update = () => {
      this.dungeon.draw();
    }
    this.animate.start();

  }
}
