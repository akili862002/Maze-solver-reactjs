import { useEffect, useState } from "react";
import { AStar } from "./algorithms/AStar";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Greedy } from "./algorithms/Greedy";
import { Button } from "./components/Button";
import Select from "./components/Select";
import { Maze } from "./entity/maze.entity";
import { Point } from "./entity/point.entity";
import { convertElementToBase64 } from "./helper/convertElementToBase64";
import useLocalStorage from "./hooks/useLocalStorage";
import { useRerender } from "./hooks/useRerender";
import MazeBoard from "./MazeBoard";

globalThis.mouseMode = "CREATE_WALL";

type IOption = { type: "BFS" | "DFS" | "Greedy" | "Manhattan"; name: string };

const algorithmOptions: IOption[] = [
  {
    type: "BFS",
    name: "Breadth First Search",
  },
  {
    type: "DFS",
    name: "Depth First Search",
  },
  {
    type: "Greedy",
    name: "Greedy",
  },
  {
    type: "Manhattan",
    name: "A* | Manhattan",
  },
];

type ISizeOption = { width: number; height: number };
const sizeOptions: ISizeOption[] = [9, 19, 29, 39, 49, 69, 99].map((s) => ({
  width: s,
  height: s,
}));

type StoreMaze = {
  maze: number[][];
  start: Point;
  goal: Point;
  name: string;
  preview: string;
  w: number;
  h: number;
};

function App() {
  const rerender = useRerender();
  const [listStoredMaze, setListStoredMaze] = useLocalStorage<StoreMaze[]>(
    "mazes",
    []
  );
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

  const handleSolve = async () => {
    maze.resetSolve();
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
      case "Greedy": {
        const solver = new Greedy(maze);
        await solver.solve();
        break;
      }
      case "Manhattan": {
        const solver = new AStar(maze);
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

  const handleResetSolve = () => {
    maze.resetSolve();
  };

  const handleSave = async () => {
    if (!maze.startPoint || !maze.goalPoint)
      return alert("Please set start-point & goal-point!");
    const name = prompt("Enter string:");

    if (name) {
      maze.resetSolve();
      setTimeout(async () => {
        listStoredMaze.push({
          maze: maze.maze,
          start: maze.startPoint as any,
          goal: maze.goalPoint as any,
          name,
          w: sizeSelected.width,
          h: sizeSelected.height,
          preview: await convertElementToBase64("maze-board"),
        });

        setListStoredMaze([...listStoredMaze]);
      }, 300);
    }
  };

  return (
    <div className="relative w-screen min-h-screen p-5">
      <h1 className="mb-1 text-4xl font-bold">Maze solver simulation</h1>
      <main>
        <div className="flex flex-row space-x-2">
          <div>
            <MazeBoard maze={maze} />
          </div>
          <div className="space-y-2 w-50">
            <Select
              placeholder="Select Size"
              optionSelected={sizeSelected}
              options={sizeOptions}
              renderOption={(option) => `${option.width} x ${option.height}`}
              isEqual={(a, b) => a.width === b.width}
              onSelect={(option) => {
                setSizeSelected(option);
              }}
            />
            <div className="flex gap-1 ">
              <Button
                icon={<ConfigIcon />}
                variant="secondary"
                onClick={() => {
                  maze.generateRandomMaze();
                }}
              >
                Generate random maze
              </Button>

              <Button
                icon={<FlagIcon />}
                variant="secondary"
                onClick={() => {
                  globalThis.mouseMode = "CHOOSE_START";
                }}
              >
                Set start
              </Button>

              <Button
                icon={<FlagIcon />}
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
              icon={<RunIcon />}
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
                onClick={handleResetSolve}
              >
                Reset solve
              </Button>
            </div>

            <Button
              icon={<SaveIcon />}
              variant="primary"
              disabled={isSolving}
              onClick={handleSave}
            >
              Save
            </Button>

            <div className="grid w-full grid-cols-3 gap-2">
              {listStoredMaze.map(
                ({ maze, name, start, goal, w, h, preview }) => {
                  return (
                    <button
                      onClick={() => {
                        setSizeSelected(
                          sizeOptions.find((item) => item.width === w) as any
                        );
                        const newMaze = new Maze(w, h);
                        newMaze.setStartPoint(new Point(start.x, start.y));
                        newMaze.setGoalPoint(new Point(goal.x, goal.y));
                        newMaze.maze = maze;
                        setMaze(newMaze);
                        // rerender();
                      }}
                    >
                      <img className="rounded-5" src={preview} />
                      <p className="mt-1 font-semibold text-md">{name}</p>
                    </button>
                  );
                }
              )}
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

const SaveIcon: React.FC = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
  </svg>
);

const RunIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
      clipRule="evenodd"
    />
  </svg>
);

const FlagIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
      clipRule="evenodd"
    />
  </svg>
);

const ConfigIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-2 h-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);
