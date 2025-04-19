import { Coordinates, Direction } from "./types.js";

export class Point {
  private direction: Direction = Direction.NONE;
  private position: Coordinates = [0, 0];

  constructor(public x?: number, public y?: number) {
    this.position = [x ?? 0, y ?? 0];
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return this.position;
  }

  setPosition(x: number, y: number) {
    this.position = [x, y];
  }

  move() {
    switch (this.direction) {
      case Direction.UP:
        this.position[0] -= 1;
        break;
      case Direction.DOWN:
        this.position[0] += 1;
        break;
      case Direction.LEFT:
        this.position[1] -= 1;
        break;
      case Direction.RIGHT:
        this.position[1] += 1;
        break;
      default:
        throw new Error(`Invalid direction: ${this.direction}`);
    }
    console.log({ newposition: this.position });
  }
}
