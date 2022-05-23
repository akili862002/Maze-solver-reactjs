import { useEffect, useState } from "react";
import { AStar } from "../../algorithms/AStar";
import { BFS } from "../../algorithms/BFS";
import { DFS } from "../../algorithms/DFS";
import { Greedy } from "../../algorithms/Greedy";
import { Button } from "../../components/Button";
import Dialog from "../../components/Dialog";
import Select from "../../components/Select";
import { Maze } from "../../entity/maze.entity";
import { Point } from "../../entity/point.entity";
import { convertElementToBase64 } from "../../helper/convertElementToBase64";
import { resizeImage } from "../../helper/resize";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRerender } from "../../hooks/useRerender";
import MazeBoard from "./MazeBoard";
import {
  SaveIcon,
  RunIcon,
  FlagIcon,
  ConfigIcon,
  ResetIcon,
  TrashIcon,
  StopIcon,
} from "./icons";
import Banner from "./Banner";

globalThis.mouseMode = "CREATE_WALL";

type IOption = { type: "BFS" | "DFS" | "Greedy" | "Manhattan"; name: string };

const algorithmOptions: IOption[] = [
  {
    type: "Manhattan",
    name: "A* | Manhattan",
  },
  {
    type: "Greedy",
    name: "Greedy",
  },
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

type StoreMaze = {
  maze: number[][];
  start: Point;
  goal: Point;
  name: string;
  preview: string;
  w: number;
  h: number;
};

const HomePage: React.FC = () => {
  const rerender = useRerender();
  const [loadingSaveMap, setLoadingSaveMap] = useState(false);
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
    globalThis.isForceStop = false;
    maze.resetSolve();
    setIsSolving(true);

    if (!maze.startPoint || !maze.goalPoint)
      return alert("Please set Goal and Start point!");

    switch (algorithmsSelected.type) {
      case "Manhattan": {
        const solver = new AStar(maze);
        await solver.solve();
        break;
      }
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
      setLoadingSaveMap(true);
      setTimeout(async () => {
        listStoredMaze.push({
          maze: maze.maze,
          start: maze.startPoint as any,
          goal: maze.goalPoint as any,
          name,
          w: sizeSelected.width,
          h: sizeSelected.height,
          preview: await resizeImage(
            await convertElementToBase64("maze-board"),
            300,
            300
          ),
        });

        setListStoredMaze([...listStoredMaze]);

        setLoadingSaveMap(false);
      }, 300);
    }
  };

  const handleStop = () => {
    globalThis.isForceStop = true;
    globalThis.isSolving = false;
  };

  return (
    <div className="relative w-screen min-h-screen p-5">
      <Banner />
      <h1 className="mb-1 text-4xl font-bold">Maze Solving Simulation</h1>
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
                icon={<FlagIcon className="text-primary" />}
                variant="secondary"
                onClick={() => {
                  globalThis.mouseMode = "CHOOSE_START";
                }}
              >
                Set start
              </Button>

              <Button
                icon={<FlagIcon className="text-red-600" />}
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
              Solve maze
            </Button>
            <div className="flex gap-1">
              <Button
                icon={<ResetIcon />}
                variant="third"
                disabled={isSolving}
                className="w-full"
                onClick={handleResetSolve}
              >
                Reset solve
              </Button>
              <Button
                icon={<TrashIcon />}
                variant="danger"
                disabled={isSolving}
                className="w-full"
                onClick={handleReset}
              >
                Clear
              </Button>
              <Button
                icon={<StopIcon />}
                variant="danger"
                disabled={!isSolving}
                className="w-full"
                onClick={handleStop}
              >
                Stop
              </Button>
            </div>

            <Button
              loading={loadingSaveMap}
              icon={<SaveIcon />}
              variant="primary"
              disabled={isSolving}
              onClick={handleSave}
            >
              Save
            </Button>

            {listStoredMaze.length && (
              <div>
                <h2 className="mb-1 text-lg font-bold">Stored maps</h2>
                <div className="grid w-full grid-cols-3 gap-2">
                  {listStoredMaze.map(
                    ({ maze, name, start, goal, w, h, preview }) => {
                      return (
                        <button
                          onClick={() => {
                            setSizeSelected(
                              sizeOptions.find(
                                (item) => item.width === w
                              ) as any
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
                          <p className="mt-1 font-semibold text-md">{`${name} (${w}x${h})`}</p>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 left-0 p-1 font-medium text-md">
        ©Copyright, this app belong to Group 6 (Dung, Quang, Nhan) | AI_HCMUTE
      </footer>
    </div>
  );
};

export default HomePage;
