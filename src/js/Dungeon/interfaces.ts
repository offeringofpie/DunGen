export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  c: Object;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Pos {
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  w?: number;
  alt?: boolean;
  shift?: boolean;
  ctrl?: boolean;
  buttonLastRaw?: number;
  buttonRaw?: number;
  over?: boolean;
  buttons?: Array<any>;
  mouseX?: number;
  mouseY?: number;
  scale?: number;
  oldX?: number;
  oldY?: number;
  posX?: number;
  posY?: number;
}
