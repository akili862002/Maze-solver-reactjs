import { useEffect, useState } from "react";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Button } from "./components/Button";
import Select from "./components/Select";
import { Maze } from "./entity/maze.entity";
import { useRerender } from "./hooks/useRerender";
import MazeBoard from "./MazeBoard";

globalThis.mouseMode = "CREATE_WALL";

type IOption = { type: "BFS" | "DFS"; name: string };

const algorithmOptions: IOption[] = [
  {
    type: "BFS",
    name: "Breadth First Search",
  },
  {
    type: "DFS",
    name: "Depth First Search",
  },
];

type ISizeOption = { width: number; height: number };
const sizeOptions: ISizeOption[] = [9, 19, 29, 39, 49, 69, 99].map((s) => ({
  width: s,
  height: s,
}));

function App() {
  const [sizeSelected, setSizeSelected] = useState<ISizeOption>(sizeOptions[4]);
  const [maze, setMaze] = useState(
    new Maze(sizeSelected.width, sizeSelected.height)
  );
  const [algorithmsSelected, setAlgorithmsSelected] = useState<IOption>(
    algorithmOptions[0]
  );
  const [isSolving, setIsSolving] = useState(false);
  const [execInfo, setExecInfo] = useState<{ timeExec: number } | null>(null);

  useEffect(() => {
    handleReset();
  }, [sizeSelected]);

  console.log("Parent render");

  const handleSolve = async () => {
    setIsSolving(true);
    switch (algorithmsSelected.type) {
      case "BFS": {
        const solver = new BFS(maze);
        await solver.solve();
        break;
      }
      case "DFS": {
        const solver = new DFS(maze);
        await solver.solve();
        break;
      }
    }
    setIsSolving(false);
  };

  const handleReset = () => {
    const maze = new Maze(sizeSelected.width, sizeSelected.height);
    setMaze(maze);
  };

  return (
    <div className="relative w-screen min-h-screen p-5">
      <h1 className="mb-1 text-4xl font-bold">Maze solver simulation</h1>
      <main>
        <div className="flex flex-row space-x-2">
          <div>
            <MazeBoard maze={maze} />
          </div>
          <div className="space-y-2">
            <Select
              placeholder="Select Size"
              optionSelected={sizeSelected}
              options={sizeOptions}
              renderOption={(option) => `${option.width} x ${option.height}`}
              isEqual={(a, b) => a.width === b.width}
              onSelect={(option) => setSizeSelected(option)}
            />
            <div className="flex gap-1 ">
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
            </div>
            <Select
              placeholder="Select algorithm"
              optionSelected={algorithmsSelected}
              options={algorithmOptions}
              renderOption={(option) => option.name}
              isEqual={(a, b) => a.type === b.type}
              onSelect={(option) => setAlgorithmsSelected(option)}
            />
            <Button
              disabled={isSolving}
              className="w-full"
              onClick={handleSolve}
            >
              Solve
            </Button>
            <div className="flex gap-1">
              <Button
                variant="warning-secondary"
                disabled={isSolving}
                className="w-full"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="warning"
                disabled={isSolving}
                className="w-full"
                onClick={handleReset}
              >
                Reset solve
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 left-0 p-1 font-medium text-md">
        ©Copyright, this app belong to Group 6 (Dung, Quang, Nhan) | AI_HCMUTE
      </footer>
    </div>
  );
}

export default App;
