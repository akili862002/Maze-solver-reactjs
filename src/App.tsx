import { useEffect, useState } from "react";
import { DFS } from "./algorithms/DFS";
import { Button } from "./components/Button";
import { Maze } from "./entity/maze.entity";
import { useRerender } from "./hooks/useRerender";
import MazeBoard from "./MazeBoard";

globalThis.mouseMode = "CREATE_WALL";

function App() {
  const rerender = useRerender();
  const [mazeSize, setMazeSize] = useState({ width: 49, height: 49 });
  const [maze, setMaze] = useState(new Maze(mazeSize.width, mazeSize.height));

  useEffect(() => {
    maze.onUpdate(() => {
      rerender();
    });
  }, [mazeSize]);

  return (
    <>
      <main className="w-screen min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center">
            Welcome to maze game
          </h1>
          <div className="flex gap-1 py-2">
            <Button
              variant="secondary"
              onClick={() => {
                maze.generateRandomMaze();
              }}
            >
              Generate random maze
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                globalThis.mouseMode = "CHOOSE_START";
              }}
            >
              Set start
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                globalThis.mouseMode = "CHOOSE_GOAL";
              }}
            >
              Set goal
            </Button>

            <Button
              onClick={() => {
                const solver = new DFS(maze);
                solver.solve();
              }}
            >
              Solve
            </Button>
          </div>
          <div>
            <MazeBoard maze={maze} />
          </div>
        </div>
      </main>
      <footer>©Copyright, this app belong to Group</footer>
    </>
  );
}

export default App;
