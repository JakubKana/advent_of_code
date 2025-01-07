import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_04", "input.txt"));

enum Direction {
    TOP_LEFT_BOTTOM_RIGHT = 1,
    BOTTOM_LEFT_TOP_RIGHT = 2,
}

function reverseInternalArrays(array: string[]) {
    return array.map((row) => row.split("").reverse().join(""));
}

function getRowsArray(input: string, reversed: boolean = false) {
    let rowsArray = input.split("\n");
    if (reversed) {
        rowsArray = reverseInternalArrays(rowsArray);
    }
    return rowsArray;
}

function getColumnsArray(rowsArray: string[], reversed: boolean = false) {
    let columnsArray: string[] = [];
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
        columnsArray = reverseInternalArrays(columnsArray);
    }
    return columnsArray;
}

function getDiagonalsArray(rowsArray: string[], direction: Direction) {

    const diagonalsArray: string[] = [];
    const columnLength = rowsArray[0].length;
    const rowsLength = rowsArray.length; // 5

    if (direction === Direction.TOP_LEFT_BOTTOM_RIGHT) {
        const startPosition = {columnI: 0, rowI: 0};
        const endPosition = {columnI: 0, rowI: 0};
        let goOn = true;
        while (goOn) {
            let currentPosition = {...startPosition};

            let diagonalString = "";

            if (currentPosition.columnI === endPosition.columnI && currentPosition.rowI === endPosition.rowI) {
                diagonalString += rowsArray[currentPosition.rowI][currentPosition.columnI];
            } else {
                if (currentPosition.columnI < columnLength && currentPosition.rowI < rowsLength) {
                    while (currentPosition.columnI <= endPosition.columnI && currentPosition.rowI >= endPosition.rowI && currentPosition.columnI <= columnLength && currentPosition.rowI <= rowsLength) {

                        diagonalString += rowsArray[currentPosition.rowI][currentPosition.columnI];
                        currentPosition.columnI++;
                        currentPosition.rowI--;
                    }
                }

            }
            diagonalsArray.push(diagonalString);

            if (startPosition.columnI === columnLength - 1 && startPosition.rowI === rowsLength - 1) {

                goOn = false;
            }


            if (startPosition.rowI < rowsLength - 1) {
                startPosition.rowI++;
            } else {
                startPosition.columnI++;
            }
            if (endPosition.columnI < columnLength - 1) {
                endPosition.columnI++;
            } else {
                endPosition.rowI++;
            }


        }
    }
    if (direction === Direction.BOTTOM_LEFT_TOP_RIGHT) {
        const startPosition = {columnI: 0, rowI: rowsLength - 1};
        const endPosition = {columnI: 0, rowI: rowsLength - 1};

        let goOn = true;
        while (goOn) {
            let currentPosition = {...startPosition};

            let diagonalString = "";

            if (currentPosition.columnI === endPosition.columnI && currentPosition.rowI === endPosition.rowI) {
                diagonalString += rowsArray[currentPosition.rowI][currentPosition.columnI];
            } else {
                if (currentPosition.columnI < columnLength && currentPosition.rowI < rowsLength) {
                    while (currentPosition.columnI <= endPosition.columnI && currentPosition.rowI <= endPosition.rowI && currentPosition.columnI <= columnLength - 1 && currentPosition.rowI <= rowsLength - 1) {

                        diagonalString += rowsArray[currentPosition.rowI][currentPosition.columnI];
                        currentPosition.columnI++;
                        currentPosition.rowI++;
                    }
                }

            }
            diagonalsArray.push(diagonalString);

            if (startPosition.columnI === columnLength - 1 && startPosition.rowI === 0) {

                goOn = false;
            }

            if (startPosition.rowI > 0) {
                startPosition.rowI--;
            } else {
                startPosition.columnI++;
            }
            if (endPosition.columnI < columnLength) {
                endPosition.columnI++;
            } else {
                endPosition.rowI--;
            }
        }
    }
    return diagonalsArray;
}


function getXmasCount(rowsArray: string[]) {
    const regexpXMAS = /XMAS/g;
    const regexpSAMX = /SAMX/g;
    let xmasCount = 0;
    for (const string of rowsArray) {
        const result = [...string.matchAll(regexpXMAS)];
        xmasCount += result.length;
    }
    for (const string of rowsArray) {
        const result = [...string.matchAll(regexpSAMX)];
        xmasCount += result.length;
    }
    return xmasCount;
}


function runPart1() {

    const input = inputLoader.loadInput();
    const rowsArray = getRowsArray(input);
    // const rowsArrayReversed = getRowsArray(input, true);
    const columnsArray = getColumnsArray(rowsArray);
    // const columnsArrayReversed = getColumnsArray(rowsArray, true);
    console.log({rowsArrayLength: rowsArray.length, columnsArrayLength: columnsArray[0].length});

    // Diagonals
    const diagonalArrayTopLeft = getDiagonalsArray(rowsArray, Direction.TOP_LEFT_BOTTOM_RIGHT);
    const diagonalArrayBottomLeft = getDiagonalsArray(rowsArray, Direction.BOTTOM_LEFT_TOP_RIGHT);
    const diagonalArrayTopLeftReversed = reverseInternalArrays(diagonalArrayTopLeft);
    const diagonalArrayBottomLeftReversed = reverseInternalArrays(diagonalArrayBottomLeft)
    console.log({
        diagonalArrayTopLeft,
        diagonalArrayBottomLeft,
        diagonalArrayTopLeftReversed,
        diagonalArrayBottomLeftReversed
    });

    // COUNTING OF XMAS OCCURENCES
    let xmasCountRowsArray = getXmasCount(rowsArray);
    let xmasCountColumnsArray = getXmasCount(columnsArray);

    let xmasCountDiagonalArrayTopLeft = getXmasCount(diagonalArrayTopLeft);
    let xmasCountDiagonalArrayBottomLeft = getXmasCount(diagonalArrayBottomLeft);

    let xmasCountDiagonalArrayTopLeftReversed = getXmasCount(diagonalArrayTopLeftReversed);
    let xmasCountDiagonalArrayBottomLeftReversed = getXmasCount(diagonalArrayBottomLeftReversed);

    let total = xmasCountRowsArray + xmasCountColumnsArray + xmasCountDiagonalArrayTopLeft + xmasCountDiagonalArrayBottomLeft;

    console.log({
        xmasCountRowsArray,
        xmasCountColumnsArray,
        xmasCountDiagonalArrayBottomLeft,
        xmasCountDiagonalArrayTopLeft,
        xmasCountDiagonalArrayTopLeftReversed,
        xmasCountDiagonalArrayBottomLeftReversed,
        total
    });

}

function countXmasOccurences(rowsArray: string[]) {
    let X_MAS_count = 0;
    //iterate over rows
    for (let rowI = 1; rowI < rowsArray.length - 1; rowI++) {
        // iterate over columns
        for (let columnI = 1; columnI < rowsArray[rowI].length - 1; columnI++) {
            const middle = rowsArray[rowI][columnI];
            if (middle === "A") {

                const TOP_LEFT = rowsArray[rowI - 1][columnI - 1];
                const TOP_RIGHT = rowsArray[rowI - 1][columnI + 1];
                const BOTTOM_LEFT = rowsArray[rowI + 1][columnI - 1];
                const BOTTOM_RIGHT = rowsArray[rowI + 1][columnI + 1];

                const array = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];

                const mCount = array.filter((letter) => letter.includes("M")).length;
                const sCount = array.filter((letter) => letter.includes("S")).length;

                if (mCount === 2 && sCount === 2 && TOP_LEFT !== BOTTOM_RIGHT && TOP_RIGHT !== BOTTOM_LEFT) {
                    X_MAS_count++;
                }
            }
        }
    }
    return X_MAS_count;
}

function runPart2() {
    const input = inputLoader.loadInput();
    const rowsArray = getRowsArray(input);
    const xmasCount = countXmasOccurences(rowsArray);
    console.log({xmasCount});
}

const measure = performance.now();
runPart1();
const measure2 = performance.now() - measure;
console.log({measure2: `${measure2}ms`});

runPart2();