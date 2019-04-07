export default class Animate {
  frame:number;
  lastTime:number;
  accumulatedTime:number;
  framerate:number;
  loop:any;
  update:Function;

  constructor(framerate = 1000 / 60) {
    this.frame = 0;
    this.lastTime = 0;
    this.accumulatedTime = 0;
    this.framerate = framerate;

    this.loop = time => {
      this.frame += Math.abs((time - this.lastTime)/framerate);

      if (time > this.lastTime) {
        this.lastTime = time;
        this.update(framerate);
      }

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

// export default class Animate {
//   loop:any;
//   update:Function;
//   constructor(deltaTime = 1 / 120) {
//     let accumulatedTime = 0;
//     let lastTime = 0;

//     this.loop = time => {
//       accumulatedTime += (time - lastTime) / 1000;

//       if (accumulatedTime > 1) {
//         accumulatedTime = 1;
//       }

//       while (accumulatedTime > deltaTime) {
//         this.update(deltaTime);
//         accumulatedTime -= deltaTime;
//       }

//       lastTime = time;

//       this.start();
//     };
//   }

//   stop() {
//     cancelAnimationFrame(this.loop);
//   }

//   start() {
//     requestAnimationFrame(this.loop);
//   }
// }
