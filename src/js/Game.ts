import Dungeon from "./Dungeon";
// import Camera from './Camera';
import Animate from "js/Animate";
import store from "services/globals";

export default class Game {
  dungeon: Dungeon;
  // camera:Camera;
  animate: Animate;

  constructor() {
    this.dungeon = null;
    // this.camera = new Camera();
    this.animate = new Animate();

    store.resize();
    store.loadImg("./img/dungeon.png", () => {
      this.init();
    });
  }

  init() {
    // store.control.init();
    this.dungeon = new Dungeon();
    this.dungeon.init();
    // this.camera.setHome();

    this.animate.update = () => {
      // this.camera.setTransform();
      // this.camera.update();
      this.dungeon.draw();
    };
    this.animate.start();
  }

  restart() {
    this.dungeon.restart();
  }
}
