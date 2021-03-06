import { lerp, intersect } from "services/random";
import { Rect } from "./interfaces";
import store from "services/globals";
import Pattern from "js/Pattern";

export default class Dungeon {
  ctx: CanvasRenderingContext2D;
  rooms: Array<Rect>;
  pattern: Pattern;

  constructor() {
    this.ctx = store.canvas.getContext("2d");
    this.pattern = new Pattern();
    this.rooms = new Array();
  }

  init() {
    // this.maze.build();
    store.buildGrid();
    this.setRooms();
  }

  restart() {
    this.init();
  }

  setRooms(rooms?, size?, roomTries?) {
    const roomSize = size || 40;
    let roomTriesLeft = roomTries || 100;
    let roomsLeft = rooms || 10;

    for (let t = 0; t < roomTriesLeft; t++) {
      let width: number = Math.floor(lerp(10, roomSize));
      let height: number = Math.floor(lerp(10, roomSize));
      let x: number = Math.floor(lerp(0, (store.gridSize - width) / 2) * 2 + 1);
      let y: number = Math.floor(
        lerp(0, (store.gridSize - height) / 2) * 2 + 1
      );
      let overlaps: boolean = false;
      let room: Rect = {
        x: x,
        y: y,
        w: width,
        h: height,
        c: {
          x: Math.ceil(x + width / 2),
          y: Math.ceil(y + height / 2)
        }
      };

      for (let r = 0; r < store.rooms.length; r++) {
        if (intersect(room, store.rooms[r])) {
          overlaps = true;
        }
      }

      if (!overlaps && store.rooms.length < roomsLeft) {
        store.rooms.push(room);
      }
    }

    store.rooms.forEach((room, index) => {
      for (let y = room.y; y < room.y + room.h - 1; y++) {
        let edgeY = y == room.y ? -1 : y == room.y + room.h - 1 ? 1 : 0;
        for (let x = room.x; x < room.x + room.w - 1; x++) {
          let edgeX = x == room.x ? -1 : x == room.x + room.w - 1 ? 1 : 0;
          store.grid[y][x] = {
            type: "floor",
            room: true,
            edge: [edgeY, edgeX],
            index: index
          };
        }
      }

      this._carve(store.rooms[Math.max(0, index - 1)], room);
    });
    this.addWalls();
  }

  private _isFloor(y, x) {
    return store.grid[y][x].type === "floor";
  }

  private _isDoor(y, x) {
    return store.grid[y][x].type === "door";
  }

  private _isEdge(y, x) {
    return typeof store.grid[y][x].edge !== "undefined";
  }

  private _isValid(y, x) {
    return (
      typeof store.grid[y] !== "undefined" &&
      typeof store.grid[y][x] !== "undefined"
    );
  }

  private _carve(r1, r2) {
    const c1 = r1.c;
    const c2 = r2.c;

    for (let y = Math.min(c2.y, c1.y); y <= Math.max(c2.y, c1.y); y++) {
      if (!store.grid[y][c2.x].room) {
        store.grid[y][c2.x] = {
          type: "floor",
          room: false,
          edge: [2, 0]
        };
      }

      // if (y == r2.y-1) {
      //   store.grid[y][c2.x] = {
      //     type: 'door'
      //   }
      // } else if (y == r2.y+r2.h-1) {
      //   store.grid[y][c2.x] = {
      //     type: 'door'
      //   }
      // }

      // if (y == r1.y-1) {
      //   store.grid[y][c1.x] = {
      //     type: 'door'
      //   }
      // } else if (y == r1.y+r1.h-1) {
      //   store.grid[y][c2.x] = {
      //     type: 'door'
      //   }
      // }
    }

    for (let x = Math.min(c1.x, c2.x); x <= Math.max(c1.x, c2.x); x++) {
      if (!store.grid[c1.y][x].room) {
        store.grid[c1.y][x] = {
          type: "floor",
          room: false,
          edge: [0, 2]
        };
      }

      // if (x == r2.x-1) {
      //   store.grid[c2.y][x] = {
      //     type: 'door'
      //   }
      // } else if (x == r2.x+r2.w-1) {
      //   store.grid[c2.y][x] = {
      //     type: 'door'
      //   }
      // }

      // if (x == r1.x-1) {
      //   store.grid[c1.y][x] = {
      //     type: 'door'
      //   }
      // } else if (x == r1.x+r1.w-1) {
      //   store.grid[c2.y][x] = {
      //     type: 'door'
      //   }
      // }
    }
  }

  addWalls() {
    for (var y = 0; y < store.gridSize; ++y) {
      for (var x = 0; x < store.gridSize; ++x) {
        if (this._isEdge(y, x)) {
          let matrix = [
            [y - 1, x - 1],
            [y - 1, x],
            [y - 1, x + 1],
            [y, x - 1],
            [y, x],
            [y, x + 1],
            [y + 1, x - 1],
            [y + 1, x],
            [y + 1, x + 1]
          ];

          matrix.forEach(c => {
            if (
              this._isValid(c[0], c[1]) &&
              !this._isFloor(c[0], c[1]) &&
              !this._isDoor(c[0], c[1])
            ) {
              store.grid[c[0]][c[1]] = {
                type: "wall"
              };
            }
          });
        }
      }
    }
  }

  draw() {
    store.ctx.clearRect(0, 0, store.canvas.width, store.canvas.height);
    let colors = ["#660000", "#000066"];
    for (var y = 0; y < store.gridSize; ++y) {
      for (var x = 0; x < store.gridSize; ++x) {
        let type = store.grid[y][x].type;
        if (type) {
          this.ctx.fillStyle = this.pattern.get(type);
          this.ctx.fillRect(
            store.cellSize.w * x,
            store.cellSize.h * y,
            store.cellSize.w,
            store.cellSize.h
          );
        }
      }
    }
  }
}
