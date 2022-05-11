import cn from "classnames";
import { useEffect } from "react";
import { Maze, MazeItemValue } from "./entity/maze.entity";

interface IMazeProps {
  maze: Maze;
}

const MazeBoard: React.FC<IMazeProps> = ({ maze }) => {
  const matrix = maze.getMaze();
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
      style={{
        width: boardWidth + "px",
      }}
    >
      {matrix.map((cols, y) => (
        <div className="flex w-full" key={y}>
          {cols.map((cell, x) => (
            <Block
              id={`b_${x}_${y}`}
              key={`cell-${y}-${x}`}
              val={cell}
              size={blockSize}
              onChange={() => {
                maze.setBlock({ x, y }, 1);
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
  val: MazeItemValue;
  id: string;
  size: number;
  onChange?: () => void;
}> = ({ val, id, size, onChange }) => {
  return (
    <div
      className={cn(
        "border-l border-solid border-b  cursor-pointer border-y-gray-300",
        val === 0 && "bg-gray-100 hover:bg-gray-200",
        val === 1 && "bg-gray-700"
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
