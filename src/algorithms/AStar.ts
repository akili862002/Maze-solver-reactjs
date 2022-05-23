import { Maze } from "../entity/maze.entity";
import { POINT, Point } from "../entity/point.entity";
import { Greedy } from "./Greedy";

export class AStar extends Greedy {
  constructor(maze: Maze) {
    super(maze);
  }

  async solve(): Promise<void> {
    if (!this.maze.startPoint || !this.maze.goalPoint)
      return alert("Please set Goal and Start point!");

    const { startPoint, goalPoint } = this.maze;

    const queue: Point[] = [startPoint];

    while (queue.length) {
      const currPoint: Point = queue.shift() as any;

      if (goalPoint.isEqual(currPoint)) {
        goalPoint.parent = currPoint;
        break;
      }

      const neighbors = this.getAvailableNeighbors(currPoint);
      for (const neighbor of neighbors) {
        if (goalPoint.isEqual(neighbor) === false)
          this.maze.setBlock(neighbor, POINT.VISITED);
        neighbor.parent = currPoint;
        neighbor.level = currPoint.level + 1;
        neighbor.score = this.func(neighbor);

        queue.push(neighbor);
      }

      //   queue.sort((a, b) => b.score - a.score);
      queue.sort((a, b) => a.score - b.score);

      //   alert(queue.map(({ x, y, score }) => `(${x}, ${y}):${score}`).join(", "));

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

  manhattan(point: Point) {
    if (!this.maze.goalPoint) return Infinity;

    const { x: x1, y: y1 } = point;
    const { x: x2, y: y2 } = this.maze.goalPoint;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  func(point: Point) {
    return point.level + this.manhattan(point);
  }
}
