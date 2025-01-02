import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_04", "input.txt"));

enum Direction {
    BOTTOM_RIGHT_TOP_LEFT = 1,
    BOTTOM_LEFT_TOP_RIGHT = 2,
}

function getRowsArray(input: string, reversed: boolean = false) {
    const rowsArray = input.split("\n");

    if (reversed) {
        for (let i = 0; i < rowsArray.length; i++) {
            rowsArray[i] = rowsArray[i].split("").reverse().join("");
        }

    }
    return rowsArray;
}

function getColumnsArray(rowsArray: string[], reversed: boolean = false) {
    const columnsArray: string[] = [];
    for (let i = 0; i < rowsArray.length; i++) {
        const row = rowsArray[i];
        let columnRow: string = "";
        for (let j = 0; j < row.length; j++) {
            const columnLetter = row[j];
            if (columnsArray[j] === undefined) {
                columnsArray[j] = columnLetter;
            } else {
                columnsArray[j] += columnLetter;
            }
        }
        columnsArray.push(columnRow);
    }
    if (reversed) {
        for (let i = 0; i < columnsArray.length; i++) {
            columnsArray[i] = columnsArray[i].split("").reverse().join("");
        }
    }
    return columnsArray;
}

function getXDiagonalsArray(rowsArray: string[], direction: Direction, reversed: boolean = false) {
    const diagonalsArray: string[] = [];
    if(direction === Direction.BOTTOM_RIGHT_TOP_LEFT) {
        for (let i = 0; i < rowsArray.length; i++) {
            let diagonal = "";
            for (let j = 0; j < rowsArray.length; j++) {
                diagonal += rowsArray[i + j][j];
            }
            diagonalsArray.push(diagonal);
        }
    }
    return diagonalsArray;
}

function getYDiagonalsArray(rowsArray: string[], direction: Direction, reversed: boolean = false) {
    const diagonalsArray: string[] = [];

    return diagonalsArray;
}

function runPart1() {
    const input = inputLoader.loadInput();
    const rowsArray = getRowsArray(input);
    const rowsArrayReversed = getRowsArray(input, true);
    const columnsArray = getColumnsArray(rowsArray);
    const columnsArrayReversed = getColumnsArray(rowsArray, true);



}

runPart1();