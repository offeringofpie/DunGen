import Keybindings from "js/Keybindings";
import store from "services/globals";

export default class Camera {
  x: number;
  y: number;
  ox: number;
  oy: number;
  scale: number;
  rotate: number;
  cx: number;
  cy: number;
  cox: number;
  coy: number;
  cscale: number;
  crotate: number;
  dx: number;
  dy: number;
  dox: number;
  doy: number;
  dscale: number;
  drotate: number;
  drag: number;
  accel: number;
  matrix: Array<any>;
  invMatrix: Array<any>;
  mouseX: number;
  mouseY: number;
  ctx: CanvasRenderingContext2D;
  mouse: any;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.ox = 0;
    this.oy = 0;
    this.scale = 1;
    this.rotate = 0;
    this.cx = 0;
    this.cy = 0;
    this.cox = 0;
    this.coy = 0;
    this.cscale = 1;
    this.crotate = 0;
    this.dx = 0;
    this.dy = 0;
    this.dox = 0;
    this.doy = 0;
    this.dscale = 1;
    this.drotate = 0;
    this.drag = 0.1;
    this.accel = 2;
    this.matrix = [0, 0, 0, 0, 0, 0];
    this.invMatrix = [0, 0, 0, 0, 0, 0];
    this.mouse = new Keybindings();
    this.mouseX = 0;
    this.mouseY = 0;

    this.mouse.bind(store.canvas);
  }

  setTransform() {
    var m = this.matrix;
    var i = 0;
    store.ctx.setTransform(m[i++], m[i++], m[i++], m[i++], m[i++], m[i++]);

  }
  setHome() {
    store.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  update() {
    this.dx += (this.x - this.cx) * this.accel;
    this.dy += (this.y - this.cy) * this.accel;
    this.dox += (this.ox - this.cox) * this.accel;
    this.doy += (this.oy - this.coy) * this.accel;
    this.dscale += (this.scale - this.cscale) * this.accel;
    this.drotate += (this.rotate - this.crotate) * this.accel;
    this.dx *= this.drag;
    this.dy *= this.drag;
    this.dox *= this.drag;
    this.doy *= this.drag;
    this.dscale *= this.drag;
    this.drotate *= this.drag;

    this.cx += this.dx;
    this.cy += this.dy;
    this.cox += this.dox;
    this.coy += this.doy;
    this.cscale += this.dscale;
    this.crotate += this.drotate;

    this.matrix[0] = Math.cos(this.crotate) * this.cscale;
    this.matrix[1] = Math.sin(this.crotate) * this.cscale;
    this.matrix[2] = -this.matrix[1];
    this.matrix[3] = this.matrix[0];

    this.matrix[4] =
      -(this.cx * this.matrix[0] + this.cy * this.matrix[2]) + this.cox;
    this.matrix[5] =
      -(this.cx * this.matrix[1] + this.cy * this.matrix[3]) + this.coy;

    var det = this.matrix[0] * this.matrix[3] - this.matrix[1] * this.matrix[2];
    this.invMatrix[0] = this.matrix[3] / det;
    this.invMatrix[1] = -this.matrix[1] / det;
    this.invMatrix[2] = -this.matrix[2] / det;
    this.invMatrix[3] = this.matrix[0] / det;
    if (this.mouse !== undefined) {
      if (this.mouse.oldX !== undefined && (this.mouse.buttonRaw & 1) === 1) {
        var mdx = this.mouse.x - this.mouse.oldX;
        var mdy = this.mouse.y - this.mouse.oldY;

        var mrx = mdx * this.invMatrix[0] + mdy * this.invMatrix[2];
        var mry = mdx * this.invMatrix[1] + mdy * this.invMatrix[3];
        this.x -= mrx;
        this.y -= mry;
      }

      if (this.mouse.w !== undefined && this.mouse.w !== 0) {
        this.ox = this.mouse.x;
        this.oy = this.mouse.y;
        this.x = this.mouseX;
        this.y = this.mouseY;

        if (this.mouse.w > 0) {
          this.scale *= 1.1;
          this.mouse.w -= 20;
          if (this.mouse.w < 0) {
            this.mouse.w = 0;
          }
        }
        if (this.mouse.w < 0) {
          this.scale *= 1 / 1.1;
          this.mouse.w += 20;
          if (this.mouse.w > 0) {
            this.mouse.w = 0;
          }
        }
      }

      var screenX = this.mouse.x - this.cox;
      var screenY = this.mouse.y - this.coy;
      this.mouseX =
        this.cx + (screenX * this.invMatrix[0] + screenY * this.invMatrix[2]);
      this.mouseY =
        this.cy + (screenX * this.invMatrix[1] + screenY * this.invMatrix[3]);
      this.mouse.rx = this.mouseX;
      this.mouse.ry = this.mouseY;
      this.mouse.oldX = this.mouse.x;
      this.mouse.oldY = this.mouse.y;
    }
    store.pos = {
      x:this.x,
      y:this.y,
      scale:this.scale,
      mouseX:this.mouseX,
      mouseY:this.mouseY,
    };
  }
}