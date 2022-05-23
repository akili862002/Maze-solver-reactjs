import { Maze } from "../entity/maze.entity";
import { POINT, Point } from "../entity/point.entity";

export abstract class Base {
  maze: Maze = new Maze(0, 0);

  constructor(maze: Maze) {
    this.maze = maze;
  }

  abstract solve(): Promise<void>;

  protected async sleep() {
    return new Promise((resolve) => setTimeout(resolve, 5));
  }

  protected getAvailableNeighbors(point: Point): Point[] {
    const res: Point[] = [];
    const neighbors = [
      // top
      { x: 0, y: -1 },
      // right
      { x: 1, y: 0 },
      // bottom
      { x: 0, y: 1 },
      // left
      { x: -1, y: 0 },
    ];
    for (const neb of neighbors) {
      const newPos = new Point(point.x + neb.x, point.y + neb.y);
      if (this.isSafe(newPos) && this.maze.getBlock(newPos) !== POINT.VISITED) {
        res.push(newPos);
      }
    }

    return res;
  }

  protected isSafe(point: Point) {
    const { x, y } = point;
    const val = this.maze.getBlock(point);
    return (
      (x > 0 &&
        x < this.maze.w - 1 &&
        y > 0 &&
        y < this.maze.h - 1 &&
        val === 0) ||
      val === 2
    );
  }

  protected getDistanceToGoal(point: Point) {
    const { x: x1, y: y1 } = point;
    const { x: x2 = 0, y: y2 = 0 } = this.maze.goalPoint || {};

    const xDir = (x1 - x2) * (x1 - x2);
    const yDir = (y1 - y2) * (y1 - y2);

    return Math.sqrt(xDir + yDir);
  }
}
