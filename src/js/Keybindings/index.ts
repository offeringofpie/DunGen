export default class Keybindings {
  x: Number;
  y: Number;
  w: Number;
  alt: Boolean;
  shift: Boolean;
  ctrl: Boolean;
  buttonLastRaw: any;
  buttonRaw: any;
  over: Boolean;
  buttons: Array<any>;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.alt = false;
    this.shift = false;
    this.ctrl = false;
    this.buttonLastRaw = 0;
    this.buttonRaw = 0;
    this.over = false;
    this.buttons = [1, 2, 4, 6, 5, 3];
  }

  bind(ev) {
    ev.addEventListener("mousemove", this.mouse.bind(this));
    ev.addEventListener("mousedown", this.mouse.bind(this));
    ev.addEventListener("mouseup", this.mouse.bind(this));
    ev.addEventListener("mouseout", this.mouse.bind(this));
    ev.addEventListener("mouseover", this.mouse.bind(this));
    ev.addEventListener("mousewheel", this.mouse.bind(this));
    ev.addEventListener("DOMMouseScroll", this.mouse.bind(this)); // fire fox

    ev.addEventListener(
      "contextmenu",
      function(ev) {
        ev.preventDefault();
      },
      false
    );
  }

  mouse(ev) {
    this.x = ev.offsetX;
    this.y = ev.offsetY;
    if (this.x === undefined) {
      this.x = ev.clientX;
      this.y = ev.clientY;
    }
    this.alt = ev.altKey;
    this.shift = ev.shiftKey;
    this.ctrl = ev.ctrlKey;
    if (ev.type === "mousedown") {
      ev.preventDefault();
      this.buttonRaw |= this.buttons[ev.which - 1];
    } else if (ev.type === "mouseup") {
      this.buttonRaw &= this.buttons[ev.which + 2];
    } else if (ev.type === "mouseout") {
      this.buttonRaw = 0;
      this.over = false;
    } else if (ev.type === "mouseover") {
      this.over = true;
    } else if (ev.type === "mousewheel") {
      ev.preventDefault();
      this.w = ev.wheelDelta;
    } else if (ev.type === "DOMMouseScroll") {
      // FF you pedantic doffus
      this.w = -ev.detail;
    }
  }
}
