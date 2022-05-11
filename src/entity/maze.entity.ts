import { MazeGenerator } from "../helper/mazeGenerator";

export type Point = { x: number; y: number; mx?: number; my?: number };
/**
 * 0 is empty
 * 1 is wall
 * -1 is start position
 * 2 is goal position
 */
export type MazeItemValue = 0 | 1 | -1 | 2;

export class Maze {
  w: number;
  h: number;
  maze: MazeItemValue[][] = [];
  startPoint: Point = { x: 0, y: 0 };
  goalPoint: Point = { x: 0, y: 0 };
  event = new CustomEvent("update");

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.initMaze();
  }

  setStartPoint(point: Point) {
    this.startPoint = point;
    this.maze[point.y][point.x] = -1;
    this.fireUpdateEvent();
  }

  setGoalPoint(point: Point) {
    this.goalPoint = point;
    this.maze[point.y][point.x] = 2;
    this.fireUpdateEvent();
  }

  setBlock(point: Point, val: MazeItemValue) {
    if (this.maze[point.y][point.x] !== val) {
      this.maze[point.y][point.x] = val;
      this.fireUpdateEvent();
    }
  }

  initMaze(defaultVal: MazeItemValue = 0) {
    this.maze = JSON.parse(
      JSON.stringify(new Array(this.h).fill(new Array(this.w).fill(defaultVal)))
    );
    for (let y = 0; y < this.h; y++) {
      this.maze[y][0] = 1;
      this.maze[y][this.w - 1] = 1;
    }
    for (let x = 0; x < this.w; x++) {
      this.maze[0][x] = 1;
      this.maze[this.h - 1][x] = 1;
    }

    // for (let x = 0; x < this.w; x++) {
    // }
  }

  generateRandomMaze() {
    this.initMaze();
    new MazeGenerator(this);

    // for (let y = 0; y < this.h; y++) {
    //   for (let x = 0; x < this.w; x++) {
    //     this.maze[x][y] = genMaze.maze[y][x][0] === "wall" ? 1 : 0;
    //   }
    // }
    this.fireUpdateEvent();
  }

  getMaze() {
    return this.maze;
  }

  onUpdate(cb: () => void) {
    document.addEventListener("update", cb);
  }

  fireUpdateEvent() {
    document.dispatchEvent(this.event);
  }
}
