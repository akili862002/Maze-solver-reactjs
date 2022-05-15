import { Maze } from "../entity/maze.entity";
import { Point } from "../entity/point.entity";

export class MazeGenerator {
  maze: Maze = new Maze(0, 0);
  count = 0;
  listVisited: Record<string, boolean> = {};

  constructor(maze: Maze) {
    this.maze = maze;
    this.mazeGenerator();
    this.randomStartAndPoint();
  }

  async mazeGenerator() {
    let startPoint = new Point(1, 1);
    let stack: Point[] = [startPoint];
    // let queue = [];
    this.maze.initMaze(1);
    this.maze.maze[startPoint.y][startPoint.x] = 1;

    while (stack.length) {
      this.count += 1;
      if (this.count > 100000) return;

      const cell: Point = stack.pop() as any;
      const availableNeighbors = this.getAvailableNeighbors(cell);

      if (availableNeighbors.length) {
        let randomSelect = getRandomItem(availableNeighbors);

        for (let neb of availableNeighbors) {
          this.listVisited[JSON.stringify(neb)] = true;
          this.maze.maze[neb.y][neb.x] = 0;
          if (typeof neb.mx == "number" && typeof neb.my == "number")
            this.maze.maze[neb.my][neb.mx] = 0;
          //   queue.push(neb);

          if (!isEqual(neb, randomSelect)) {
            stack.push(neb);
          }
        }
        stack.push(randomSelect);
        // alert(stack.map(({ x, y }) => `(${x},${y})`).join(", "));

        continue;
        // Draw to board
        window.requestAnimationFrame(() => {
          this.maze.fireUpdateEvent();
        });
        await this.sleep();
      }
    }
  }

  async sleep() {
    return new Promise((resolve) => setTimeout(resolve, 2));
  }

  randomStartAndPoint() {
    const { w, h } = this.maze;
    this.maze.setStartPoint(
      new Point(getRndInteger(1, w / 3), getRndInteger(1, h / 3))
    );
    this.maze.setGoalPoint(
      new Point(getRndInteger(w / 6, w - 2), getRndInteger(h / 6, h - 2))
    );
  }

  getAvailableNeighbors(point: Point): Point[] {
    const res: Point[] = [];
    const neighbors = [
      // top
      { x: 0, y: -2, mx: 0, my: -1 },
      // right
      { x: 2, y: 0, mx: 1, my: 0 },
      // bottom
      { x: 0, y: 2, mx: 0, my: 1 },
      // left
      { x: -2, y: 0, mx: -1, my: 0 },
    ];
    for (const neb of neighbors) {
      const newPos = new Point(
        point.x + neb.x,
        point.y + neb.y,
        point.x + neb.mx,
        point.y + neb.my
      );

      if (
        this.isSafe(newPos) &&
        (this.maze.maze[newPos.y][newPos.x] === 1 ||
          getRndInteger(0, 12) === 1) &&
        !this.listVisited[JSON.stringify(newPos)]
      ) {
        res.push(newPos);
      }
    }

    return res;
  }

  isSafe(point: Point) {
    const { x, y } = point;
    return x > 0 && x < this.maze.w - 1 && y > 0 && y < this.maze.h - 1;
  }
}

const getRandomItem = <T>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

const isEqual = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

function getRndInteger(min: number, max: number) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
