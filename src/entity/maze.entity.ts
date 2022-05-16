import { MazeGenerator } from "../helper/mazeGenerator";
import { POINT, Point } from "./point.entity";

/**
 * 0 is empty
 * 1 is wall
 * -1 is start position
 * 2 is goal position
 * 10 is Point in queue
 */

export class Maze {
  w: number;
  h: number;
  maze: number[][] = [];
  startPoint: Point | null = null;
  goalPoint: Point | null = null;
  event = new CustomEvent("update");

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.initMaze();
  }

  setStartPoint(point: Point) {
    this.setBlock(this.startPoint, 0, { updateEvent: false });
    this.startPoint = point;
    this.setBlock(point, POINT.START);
  }

  setGoalPoint(point: Point) {
    this.setBlock(this.goalPoint, 0, { updateEvent: false });
    this.goalPoint = point;
    this.setBlock(point, 2);
  }

  setBlock(
    point: Point | null,
    val: number,
    option?: { updateEvent: boolean }
  ) {
    const { updateEvent = true } = option || {};
    if (!point) return;

    if (this.maze[point.y][point.x] !== val) {
      this.maze[point.y][point.x] = val;
      if (updateEvent) this.fireUpdateEvent();
    }
  }

  getBlock(point: Point) {
    return this.maze[point.y][point.x];
  }

  initMaze(defaultVal = 0) {
    this.maze = JSON.parse(
      JSON.stringify(new Array(this.h).fill(new Array(this.w).fill(defaultVal)))
    );
    for (let y = 0; y < this.h; y++) {
      this.maze[y][0] = POINT.WALL;
      this.maze[y][this.w - 1] = POINT.WALL;
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
    this.fireUpdateEvent();
  }

  getMaze() {
    return this.maze;
  }

  resetSolve() {
    this.maze.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        if (![POINT.WALL, POINT.GOAL, POINT.NODE, POINT.START].includes(row[i]))
          row[i] = 0;
      }
    });
    if (this.startPoint && this.goalPoint) {
      this.setStartPoint(this.startPoint);
      this.setGoalPoint(this.goalPoint);
    }
    this.fireUpdateEvent();
  }

  onUpdate(cb: () => void) {
    document.addEventListener("update", cb);
  }

  fireUpdateEvent() {
    window.requestAnimationFrame(() => {
      document.dispatchEvent(this.event);
    });
  }
}
