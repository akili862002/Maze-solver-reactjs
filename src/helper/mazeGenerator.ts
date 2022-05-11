import { Maze, MazeItemValue, Point } from "../entity/maze.entity";

export class MazeGenerator {
  maze: Maze = new Maze(0, 0);
  count = 0;
  listVisited: Record<string, boolean> = {};

  constructor(maze: Maze) {
    this.maze = maze;
    this.mazeGenerator();
  }

  async mazeGenerator() {
    let startPoint: Point = { x: 1, y: 1 };
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

        window.requestAnimationFrame(() => {
          this.maze.fireUpdateEvent();
        });
        await this.sleep();

        // drawMazeTable(this.maze);

        // alert(
        //   `Next: [${stack
        //     .map(({ x, y }) => `(${x}, ${y})`)
        //     .join(", ")}]\nSelected: ${randomSelect.x}, ${randomSelect.y}`
        // );
      }
    }

    // console.log(queue);
  }

  async sleep() {
    return new Promise((resolve) => setTimeout(resolve, 20));
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
      const newPos: Point = {
        x: point.x + neb.x,
        y: point.y + neb.y,
        mx: point.x + neb.mx,
        my: point.y + neb.my,
      };

      if (
        this.isSafe(newPos) &&
        this.maze.maze[newPos.y][newPos.x] === 1 &&
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

const drawMazeTable = (maze: Maze) => {
  console.log("Draw");
  window.requestAnimationFrame(() => {
    for (let y = 0; y < maze.h; y++) {
      for (let x = 0; x < maze.w; x++) {
        const block = document.getElementById(`b_${x}_${y}`);
        if (block) {
          block.style.background =
            maze.maze[y][x] === 1 ? "rgb(55, 65, 81)" : "rgb(243, 244, 246)";
        }
      }
    }
  });
};
