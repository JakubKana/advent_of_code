import InputLoader from "../utils/InputLoader.js";
import path from "node:path";
import { getDirname } from "../utils/helpers.js";
import { Point } from "./point.js";
import { Coordinates, Direction } from "./types.js";
import HashMap from "../data_structures/HashMap.js";
const inputLoader = new InputLoader().setPath(
  path.join(getDirname(), "input.txt")
);

const visited = new HashMap();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeDirection(point: Readonly<Point>) {
  const direction = point.getDirection();
  if (direction === Direction.UP) {
    point.setDirection(Direction.RIGHT);
  } else if (direction === Direction.DOWN) {
    point.setDirection(Direction.LEFT);
  } else if (direction === Direction.LEFT) {
    point.setDirection(Direction.UP);
  } else if (direction === Direction.RIGHT) {
    point.setDirection(Direction.DOWN);
  }
}

function getNextPointByDirection(point: Readonly<Point>): Coordinates | null {
  const direction = point.getDirection();
  if (direction === Direction.UP) {
    return [point.getPosition()[0] - 1, point.getPosition()[1]];
  } else if (direction === Direction.DOWN) {
    return [point.getPosition()[0] + 1, point.getPosition()[1]];
  } else if (direction === Direction.LEFT) {
    return [point.getPosition()[0], point.getPosition()[1] - 1];
  } else if (direction === Direction.RIGHT) {
    return [point.getPosition()[0], point.getPosition()[1] + 1];
  }
  return null;
}

function printMatrix(matrix: string[][]) {
  // Clear the console
  console.clear();

  // Add a border around the matrix for better visibility
  const border = "-".repeat(matrix[0].length + 2);
  console.log(border);

  // Print each row with borders
  matrix.forEach((row) => {
    console.log("|" + row.join("") + "|");
  });

  console.log(border);

  // Add a small delay to make the visualization smoother
  return delay(2);
}

async function moveByRules(startingPoint: Readonly<Point>, matrix: string[][]) {
  let stop = false;
  const matrixNextPoint: Point = new Point(
    startingPoint.getPosition()[0],
    startingPoint.getPosition()[1]
  );
  matrixNextPoint.setDirection(startingPoint.getDirection());

  if (
    matrix[startingPoint.getPosition()[0]][startingPoint.getPosition()[1]] ===
    "^"
  ) {
    visited.add(startingPoint.getPosition()[0], startingPoint.getPosition()[1]);
  }

  while (!stop) {
    try {
      //await printMatrix(matrix); // Wait for the matrix to be printed
      const nextPosition = getNextPointByDirection(matrixNextPoint);
      const matrixNextValue = matrix[nextPosition![0]][nextPosition![1]];
      if (matrixNextValue === undefined) {
        stop = true;
        break;
      } else {
        if (matrixNextValue !== "^" && matrixNextValue !== "#") {
          matrix[nextPosition![0]][nextPosition![1]] = "X";
          visited.add(nextPosition![0], nextPosition![1]);
          matrixNextPoint.move();
          continue;
        }
        if (matrixNextValue === "#") {
          changeDirection(matrixNextPoint);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      stop = true;

      //  throw new Error("Indexoutofbound exception", { cause: err });
    }
  }
}

async function runPart1() {
  const input = inputLoader.loadInput();
  const lines = input.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const startingCoordinates: Coordinates = [0, 0];

  for (let x = 0; x < lines[0].length; x++) {
    for (let y = 0; y < lines.length; y++) {
      const element = matrix[x][y];

      if (element === "^") {
        console.log("Starting coordinates", { element, x, y });
        startingCoordinates[0] = x;
        startingCoordinates[1] = y;
        break;
      }
    }
  }

  const startingPoint = new Point(
    startingCoordinates[0],
    startingCoordinates[1]
  );
  startingPoint.setDirection(Direction.UP);
  console.log(startingPoint);

  await moveByRules(startingPoint, matrix);
  console.log("Visited", visited);
  console.log("Visited size", visited.map.size);
  // count hashmap all items
  let count = 0;
  visited.map.forEach((value) => {
    const uniqueItems = [...new Set(value)];
    count += uniqueItems.length;
  });
  console.log("Count", count);
}

function runPart2() {
  const input = inputLoader.loadInput();

  console.log(input);
}
console.clear();
runPart1();
