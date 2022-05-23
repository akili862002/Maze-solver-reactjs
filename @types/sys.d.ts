declare module "maze-generation";

declare var isMouseDown: boolean;

type IMouseMode = "CREATE_WALL" | "BREAK_WALL" | "CHOOSE_START" | "CHOOSE_GOAL";

declare var mouseMode: IMouseMode;
declare var isSolving: boolean;
declare var isForceStop: boolean;
