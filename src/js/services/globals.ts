import ControlKit from 'js/ControlKit';
import { Pos } from 'js/Dungeon/interfaces';
class Store {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  camera: object;
  width: number;
  height: number;
  img: HTMLImageElement;
  gridSize: number;
  cellSize: { w: number; h: number; };
  rooms: Array<any>;
  grid: Array<any>;
  pos: Pos;
  control: ControlKit;

  constructor(){
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.img = new Image();
    this.gridSize = 98;
    this.cellSize = {
      w: this.width/this.gridSize*9/16,
      h: this.height/this.gridSize
    };
    this.rooms = new Array();
    this.grid = new Array();
    this.control = new ControlKit();
    this.pos = {
      buttons: [1, 2, 4, 6, 5, 3],
      x: 0,
      y: 0,
      w: 0,
      alt: false,
      shift: false,
      ctrl: false,
      buttonLastRaw: 0,
      buttonRaw: 0,
      over: false,
      mouseX: 0,
      mouseY: 0
    };
  }

  resize(width = window.innerWidth, height = window.innerHeight) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  buildGrid() {
    for (let r = 0; r < store.gridSize; ++r) {
      this.grid[r] = new Array();
      for (let c = 0; c < store.gridSize; ++c) {
        this.grid[r][c] = 0;
      }
    }
  }

  loadImg(src, cb) {
    let image = new Image();
    image.src = src;
    image.onload = () => {
      this.img = image;
      cb();
    };
  }
}

const store = new Store()

export default store