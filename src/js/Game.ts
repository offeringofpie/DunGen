import Dungeon from './Dungeon';
import Camera from './Camera';
import Animate from 'js/Animate';
import store from 'services/globals';

export default class Game {
  dungeon:Dungeon;
  camera:Camera;
  animate:Animate;

  constructor() {
   this.dungeon = null;
   this.camera = new Camera();
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
      store.ctx.clearRect(0,0,store.canvas.width,store.canvas.height);
      this.camera.update();
      this.camera.setHome();
      this.camera.setTransform();
      this.dungeon.draw();
    }
    this.animate.start();
  }

  restart() {
    this.dungeon.restart();
  }
}
