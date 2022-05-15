import { Maze } from "../entity/maze.entity";
import { POINT, Point } from "../entity/point.entity";

export class BFS {
  maze: Maze = new Maze(0, 0);
  constructor(maze: Maze) {
    this.maze = maze;
  }

  async solve() {
    if (!this.maze.startPoint || !this.maze.goalPoint)
      return alert("Please set Goal and Start point!");

    const queue: Point[] = [this.maze.startPoint];
    // if (this.maze.)
    // this.maze.setBlock(this.maze.startPoint, POINT.VISITED);

    while (queue.length) {
      const currPoint: Point = queue.shift() as any;

      if (this.maze.goalPoint.isEqual(currPoint)) {
        this.maze.goalPoint.parent = currPoint;
        break;
      }

      const neighbors = this.getAvailableNeighbors(currPoint);
      for (const neighbor of neighbors) {
        if (this.maze.goalPoint.isEqual(neighbor) === false)
          this.maze.setBlock(neighbor, POINT.VISITED);
        neighbor.parent = currPoint;
        queue.push(neighbor);
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

  async sleep() {
    return new Promise((resolve) => setTimeout(resolve, 5));
  }

  getAvailableNeighbors(point: Point): Point[] {
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

  isSafe(point: Point) {
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
}
