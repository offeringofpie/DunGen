import store from 'services/globals';
const sprite = {
  'wall': [80,0],
  'floor': [160,96],
};

export default class Pattern {
  canvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  outerCtx:CanvasRenderingContext2D;
  img:ImageBitmap;
  sprite:object;
  w:number;
  h:number;
  constructor(image?,outerCtx?,w?,h?) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.outerCtx = outerCtx || store.ctx;
    this.img = image || store.img;
    this.w = w || 16;
    this.h = h || 16;
    this.sprite = sprite;

    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  get(sprite?) {
    let coords = sprite || 'floor';
    this.ctx.drawImage(
      this.img,
      this.sprite[coords][0], this.sprite[coords][1],
      this.w, this.h,
      0, 0,
      this.w, this.h
    );
    return this.outerCtx.createPattern(this.canvas, 'repeat');
  }
}