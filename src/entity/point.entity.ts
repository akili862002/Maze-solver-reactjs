export class Point {
  x: number = 0;
  y: number = 0;
  mx?: number;
  my?: number;
  visited?: boolean;
  parent?: Point;

  constructor(x: number, y: number, mx?: number, my?: number) {
    this.x = x;
    this.y = y;
    this.mx = mx;
    this.my = my;
  }

  public isEqual(point: Point | null) {
    return point && this.x === point.x && this.y === point.y;
  }
}

export const POINT = {
  NODE: 0,
  WALL: 1,
  GOAL: 2,
  START: -1,
  VISITED: 10,
  SOLVED: 100,
};
