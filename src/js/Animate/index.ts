export default class Animate {
  frame:number;
  lastTime:number;
  framerate:number;
  loop:any;
  update:Function;

  constructor(framerate = 1000 / 240) {
    this.frame = 0;
    this.lastTime = 0;
    this.framerate = framerate;

    this.loop = time => {
      this.frame += Math.round((time - this.lastTime)/framerate);

      this.lastTime = time;
      this.update();

      this.start();
    };
  }

  stop() {
    cancelAnimationFrame(this.loop);
  }

  start() {
    requestAnimationFrame(this.loop);
  }
}