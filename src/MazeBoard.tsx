import cn from "classnames";
import { useEffect } from "react";
import { Maze } from "./entity/maze.entity";
import { POINT, Point } from "./entity/point.entity";
import { useRerender } from "./hooks/useRerender";

interface IMazeProps {
  maze: Maze;
}

const MazeBoard: React.FC<IMazeProps> = ({ maze }) => {
  const matrix = maze.getMaze();
  const rerender = useRerender();

  useEffect(() => {
    maze.onUpdate(() => {
      rerender();
    });
  }, [maze]);

  console.log("Render");

  useEffect(() => {
    document.body.onmousedown = () => {
      globalThis.isMouseDown = true;
    };
    document.body.onmouseup = () => {
      globalThis.isMouseDown = false;
    };
  }, []);

  const boardWidth = 700;
  const blockSize = boardWidth / maze.w;

  return (
    <div
      className="bg-gray-200"
      style={{
        width: boardWidth + "px",
      }}
    >
      {matrix.map((cols, y) => (
        <div className="flex w-full" key={y}>
          {cols.map((cell, x) => (
            <Block
              id={`b_${x}_${y}`}
              key={`cell-${y}-${x}-${cell}`}
              val={cell}
              size={blockSize}
              onChange={() => {
                switch (globalThis.mouseMode) {
                  case "CREATE_WALL":
                    maze.setBlock(new Point(x, y), 1);
                    break;
                  case "BREAK_WALL":
                    maze.setBlock(new Point(x, y), 0);
                    break;
                  case "CHOOSE_START":
                    maze.setStartPoint(new Point(x, y));
                    break;
                  case "CHOOSE_GOAL":
                    maze.setGoalPoint(new Point(x, y));
                    break;
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeBoard;

const Block: React.FC<{
  val: number;
  id: string;
  size: number;
  onChange?: () => void;
}> = ({ val, id, size, onChange }) => {
  return (
    <div
      className={cn(
        " cursor-pointer ",
        // "border-l border-solid border-b border-y-gray-300",
        val === 0 && " hover:bg-gray-200",
        val === 1 && "bg-gray-700",
        val === -1 && "bg-blue-500",
        val === 2 && "bg-red-500",
        val === POINT.VISITED && "bg-gray-400",
        val === POINT.SOLVED && "bg-[#00ff7e]"
      )}
      id={id}
      onMouseEnter={(e) => {
        if (globalThis.isMouseDown) onChange?.();
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      onMouseDown={onChange}
    ></div>
  );
};
