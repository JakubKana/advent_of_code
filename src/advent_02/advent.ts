import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_02", "input.txt"));

enum Order {
    NONE,
    ASCENDING,
    DESCENDING,

}

function loadNumbersArray() {
    const rowArray = inputLoader.loadInput().split("\n");
    const numbers: number[][] = [];

    for (const row of rowArray) {
        const arrayRow: number[] = row.split(" ").map((num) => parseInt(num));
        numbers.push(arrayRow);
    }

    return numbers;
}

const checkOrder = (number1: number, number2: number): Order => {
    if (number1 < number2) {
        return Order.ASCENDING;
    }
    if (number1 > number2) {
        return Order.DESCENDING;
    }
    return Order.NONE;
}

const checkDifferenceRule = (number1: number, number2: number): boolean => {
    const difference = Math.abs(number1 - number2)
    return difference >= 1 && difference <= 3;
}

const checkArrayOrderRule = (array: number[]): boolean => {
    let order = null;
    for (let i = 0; i < array.length - 1; i++) {
        const currentOrder = checkOrder(array[i], array[i + 1]);
        if (order === null) {
            order = currentOrder;
        }
        if (order !== currentOrder) {
            return false;
        }
    }
    return true;

}

const checkArrayDifferenceRule = (array: number[]): boolean => {
    for (let i = 0; i < array.length - 1; i++) {
        if (!checkDifferenceRule(array[i], array[i + 1])) {
            return false;
        }
    }
    return true;
}


function removeElementFromArray(array: number[], index: number): number[] {
    return array.toSpliced(index, 1);
}

function runPart1() {
    const numbers = loadNumbersArray();
    const result: { safe: boolean, array: number[] }[] = [];

    for (const numberArray of numbers) {

        const safe = checkArrayOrderRule(numberArray);
        const safe1 = checkArrayDifferenceRule(numberArray);

        result.push({safe: safe && safe1, array: numberArray});
    }


    console.log(result.filter((res) => res.safe).length);
}

function runPart2() {
    const numbers = loadNumbersArray();
    const result: { safe: boolean, array: number[] }[] = [];
    for (const numberArray of numbers) {
        const safe = checkArrayOrderRule(numberArray);
        const safe1 = checkArrayDifferenceRule(numberArray);
        result.push({safe: safe && safe1, array: numberArray});
    }
    const safeArrays = result.filter((res) => res.safe).map((res) => res.array);
    const unsafeArrays = result.filter((res) => !res.safe).map((res) => res.array);
    const newSafeArrays: number[][] = []
    for (let array of unsafeArrays) {
        for (let i = 0; i < array.length; i++) {

            const newArray = removeElementFromArray(array, i);

            const safe1 = checkArrayDifferenceRule(newArray);
            const safe = checkArrayOrderRule(newArray);
            if (safe && safe1) {
                newSafeArrays.push(newArray);
                break;
            }
        }
    }

    console.log(safeArrays.length + newSafeArrays.length);
}


runPart1();
runPart2();