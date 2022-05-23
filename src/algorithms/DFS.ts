import { Maze } from "../entity/maze.entity";
import { POINT, Point } from "../entity/point.entity";
import { Base } from "./Base";

export class DFS extends Base {
  constructor(maze: Maze) {
    super(maze);
  }

  async solve() {
    if (!this.maze.startPoint || !this.maze.goalPoint) return;

    const stack: Point[] = [this.maze.startPoint];

    while (stack.length) {
      if (globalThis.isForceStop) return;

      const currPoint: Point = stack.pop() as any;

      if (this.maze.goalPoint.isEqual(currPoint)) {
        this.maze.goalPoint.parent = currPoint;
        break;
      }

      const neighbors = this.getAvailableNeighbors(currPoint);
      for (const neighbor of neighbors) {
        if (this.maze.goalPoint.isEqual(neighbor) === false)
          this.maze.setBlock(neighbor, POINT.VISITED);
        neighbor.parent = currPoint;
        stack.push(neighbor);
      }

      // Draw to board
      window.requestAnimationFrame(() => {});
      await this.sleep();
    }

    let point = this.maze.goalPoint;
    let paths = [];
    while (point.parent) {
      paths.push(point);
      point = point.parent;
    }

    paths = paths.reverse();
    for (let path of paths) {
      window.requestAnimationFrame(() => {
        this.maze.setBlock(path, POINT.SOLVED);
      });
      await this.sleep();
    }

    this.maze.setBlock(this.maze.startPoint, POINT.START, {
      updateEvent: false,
    });
    this.maze.setBlock(this.maze.goalPoint, POINT.GOAL, { updateEvent: false });

    window.requestAnimationFrame(() => {
      this.maze.fireUpdateEvent();
    });
  }
}
