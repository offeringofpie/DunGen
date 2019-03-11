import store from "js/services/globals";

export default class Keybindings {

  bind(ev) {
    ev.addEventListener("mousemove", this.mouse.bind(this));
    ev.addEventListener("mousedown", this.mouse.bind(this));
    ev.addEventListener("mouseup", this.mouse.bind(this));
    ev.addEventListener("mouseout", this.mouse.bind(this));
    ev.addEventListener("mouseover", this.mouse.bind(this));
    ev.addEventListener("mousewheel", this.mouse.bind(this));
    ev.addEventListener("DOMMouseScroll", this.mouse.bind(this)); // firefox

    ev.addEventListener("contextmenu",ev => ev.preventDefault(), false);
  }

  mouse(ev) {
    store.pos.x = ev.offsetX;
    store.pos.y = ev.offsetY;
    if (store.pos.x === undefined) {
      store.pos.x = ev.clientX;
      store.pos.y = ev.clientY;
    }
    store.pos.alt = ev.altKey;
    store.pos.shift = ev.shiftKey;
    store.pos.ctrl = ev.ctrlKey;
    if (ev.type === "mousedown") {
      ev.preventDefault();
      store.pos.buttonRaw |= store.pos.buttons[ev.which - 1];
    } else if (ev.type === "mouseup") {
      store.pos.buttonRaw &= store.pos.buttons[ev.which + 2];
    } else if (ev.type === "mouseout") {
      store.pos.buttonRaw = 0;
      store.pos.over = false;
    } else if (ev.type === "mouseover") {
      store.pos.over = true;
    } else if (ev.type === "mousewheel") {
      ev.preventDefault();
      store.pos.w = ev.wheelDelta;
    } else if (ev.type === "DOMMouseScroll") {
      // FF you pedantic doffus
      store.pos.w = -ev.detail;
    }

    store.control.kit.update();
  }
}
