import { useState } from "react";
import { Button } from "./components/Button";
import { Maze } from "./entity/maze.entity";
import { useRerender } from "./hooks/useRerender";
import MazeBoard from "./MazeBoard";

function App() {
  const rerender = useRerender();

  const [maze, setMaze] = useState(() => {
    const maze = new Maze(49, 49);
    maze.onUpdate(() => {
      console.log("Render");
      rerender();
    });
    return maze;
  });
  console.log(maze);

  return (
    <>
      <main className="w-screen min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center">
            Welcome to maze game
          </h1>
          <div className="flex py-2 gap-1">
            <Button
              onClick={() => {
                maze.generateRandomMaze();
              }}
            >
              Generate random maze
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
