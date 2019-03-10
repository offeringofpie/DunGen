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
  pos: any;

  constructor(){
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.img = new Image();
    this.gridSize = 98;
    this.cellSize = {
      w: this.width/this.gridSize,
      h: this.height/this.gridSize
    };
    this.rooms = new Array();
    this.grid = new Array();
    this.pos = {
      x:0,
      y:0,
      scale:0,
      mouseX:0,
      mouseY:0,
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