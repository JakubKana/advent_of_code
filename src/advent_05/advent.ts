import path from "node:path";

import InputLoader from "../utils/InputLoader.js";
import LinesLoader from "../utils/LinesLoader.js";

import {getDirname} from "../utils/helpers.js";
import HashMap from "../data-structures/HashMap.js";


const inputLoaderPart1 = new InputLoader().setPath(path.join(getDirname(), "input_01.txt"));
const inputLoaderPart2 = new InputLoader().setPath(path.join(getDirname(), "input_02.txt"));

const lines1 = new LinesLoader(inputLoaderPart1.loadInput());
const lines2 = new LinesLoader(inputLoaderPart2.loadInput());

function parsePrintRules(input: string[]): HashMap {
    const rules = new HashMap();

    input.forEach((line) => {
        const [key, value] = line.split('|')
        rules.add(parseInt(key), parseInt(value));
    });

    return rules;
}

function parsePrintLine(printLine: string): number[] {
    const printedNumbers: number[] = []

    printLine.split(',').map((number) => {
        printedNumbers.push(parseInt(number.trim(), 10))
    })

    return printedNumbers
}

function isPrintedNumberBeforeAllRules(printedNumber: number, printedNumbers: number[], rulesForNumber: number[]): boolean {
    let result = false;

    const indexOfPrintedNumber = printedNumbers.indexOf(printedNumber);

    if (indexOfPrintedNumber === -1) {
        return result;
    }
    for (const rule of rulesForNumber) {
        if (printedNumbers.includes(rule)) {
            const indexOfRule = printedNumbers.indexOf(rule);
            if (indexOfPrintedNumber < indexOfRule) {
                result = true;

            } else {
                result = false;
                break;
            }
        }
        result = true;
    }

    return result;
}


function getSmallestRuleIndex(printedLine: number[], rulesForNumber: number[]): number {
    let index = -1;
    for (const rule of rulesForNumber) {
        const indexOfRule = printedLine.indexOf(rule);
        index = index === -1 ? indexOfRule : Math.min(index, indexOfRule);

    }

    return index;
}


function moveElementInArrayByIndex(arr: number[], fromIndex: number, toIndex: number) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


function runPart1() {
    inputLoaderPart1.loadInput();
    const printRules = lines1.getLines();
    const printLines = lines2.getLines();
    const rules = parsePrintRules(printRules);

    const results: number[][] = [];
    let correctlyPrintedSum: number = 0;
    let incorrectlyPrintedSum: number = 0;
    // Iterate over each print line
    printLines.forEach((line) => {
        // Parse the print line to array of numbers
        const printedNumbersLine = parsePrintLine(line);
        let correctlyPrinted = true;
        // Iterate over each printed number in the line
        for (const printedNumber of printedNumbersLine) {
            // Get the rules for the current printed number from hashmap
            const rulesForNumber = rules.get(printedNumber);
            if (rulesForNumber) {
                // Is the printed number before all rules in the line means that the printed number is in the correct position
                const isPrintedNumberBeforeAll = isPrintedNumberBeforeAllRules(printedNumber, printedNumbersLine, rulesForNumber);
                if (!isPrintedNumberBeforeAll) {
                    correctlyPrinted = false;
                    // Get the smallest rule index in the line
                    const smallestRuleIndex = getSmallestRuleIndex(printedNumbersLine, rulesForNumber);
                    if (smallestRuleIndex > -1) {
                        // Move the printed number to the smallest rule index to the begining
                        moveElementInArrayByIndex(printedNumbersLine, printedNumbersLine.indexOf(printedNumber), 0);

                    }
                }
            }
        }
        const middleIndex = Math.floor(printedNumbersLine.length / 2);
        const middleElement = printedNumbersLine[middleIndex];
        if (correctlyPrinted) {
            correctlyPrintedSum += middleElement;
        } else if (!correctlyPrinted) {
            incorrectlyPrintedSum += middleElement;

        }
        // If the line is correctly printed add the line to the results
        results.push(printedNumbersLine);
    });

    console.log("Results", results);
    console.log("Correctly printed sum: ", correctlyPrintedSum); // Your puzzle answer was 5129.
    console.log("Incorrectly printed sum: ", incorrectlyPrintedSum);
}


function runPart2() {
    const input = lines2.getLines();

    console.log("InputLines", input);

}


runPart1();
