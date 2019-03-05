import store from 'services/globals';

const ground = {
  type: 'floor',
  room: false
}

export default class Maze {
  w: any;
  h: any;
  map: any;
  startX: any;
	startY: any;
	gridMap:any;
	gridW:any;
	gridH:any;

  constructor() {
    this.w = store.width;
    this.h = store.height;
    this.startX = 0;
    this.startY = 0;
    this.map = new Array();

    this.startX = 0;
    this.startY = 0;
  }

  toGrid() {
    var grid = new Array();
    for (let r = 0; r < store.gridSize; ++r) {
      grid[r] = new Array();
      for (let c = 0; c < store.gridSize; ++c) {
        grid[r][c] = ground;
      }
    }

    for (let y = 0; y < store.gridSize/2; ++y) {
      let py = y * 2;

      for (let x = 0; x < store.gridSize/2; ++x) {
        let px = x * 2;

        grid[py][px] = 0;

        if (this.map[y][x]["n"]) {
          grid[py - 1][px] = 0;
        }
        if (this.map[y][x]["s"] && typeof grid[py + 1] !== 'undefined') {
          grid[py + 1][px] = 0;
        }
        if (this.map[y][x]["e"] && typeof grid[py][px + 1] !== 'undefined') {
          grid[py][px + 1] = 0;
        }
        if (this.map[y][x]["w"]) {
          grid[py][px - 1] = 0;
        }
      }
    }

    store.grid = grid;
    this.gridW = grid.length;
    this.gridH = grid[0].length;
  }

  build() {
    for (let r = 0; r < store.gridSize; ++r) {
      this.map[r] = new Array();
      for (let c = 0; c < store.gridSize; ++c) {
        this.map[r][c] = { n: 0, s: 0, e: 0, w: 0, v: 0 };
      }
    }

    let c = new Array();
    c.push({ x: this.startX, y: this.startY });
    this.map[this.startY][this.startX]["v"] = 1;

    let modDir = {
      n: { y: -1, x: 0, o: "s" },
      s: { y: 1, x: 0, o: "n" },
      w: { y: 0, x: -1, o: "e" },
      e: { y: 0, x: 1, o: "w" }
    };

    while (c.length > 0) {
      var i = Math.floor((Math.random() * 10000) % c.length);
      var cell = c[i];

      // Check for neighbours
      var n = new Array();
      if (cell.x > 0 && this.map[cell.y][cell.x - 1]["v"] == 0) {
        n.push("w");
      }
      if (cell.x < this.w - 1 && typeof this.map[cell.y][cell.x + 1] !== 'undefined' && this.map[cell.y][cell.x + 1]["v"] == 0) {
        n.push("e");
      }
      if (cell.y > 0 && this.map[cell.y - 1][cell.x]["v"] == 0) {
        n.push("n");
      }
      if (cell.y < this.h - 1 && typeof this.map[cell.y + 1] !== 'undefined' && this.map[cell.y + 1][cell.x]["v"] == 0) {
        n.push("s");
      }

      if (n.length == 0) {
        c.splice(i, 1);
        continue;
      }

      var dir = n[Math.floor((Math.random() * 10000) % n.length)];

      var destX = cell.x + modDir[dir].x;
      var destY = cell.y + modDir[dir].y;

      this.map[cell.y][cell.x][dir] = 1;
      this.map[destY][destX][modDir[dir].o] = 1;
      this.map[destY][destX]["v"] = 1;
      c.push({ x: destX, y: destY });
    }

    this.toGrid();
  }
}