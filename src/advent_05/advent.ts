import path from "node:path";

import InputLoader from "../utils/InputLoader.js";
import LinesLoader from "../utils/LinesLoader.js";

import {getDirname} from "../utils/helpers.js";
import HashMap from "../data-structures/HashMap.js";
import {measureInMs} from "../utils/measure.js";
import fs from "fs";

const inputSize: "sm" | "lg" = "lg";

function getPart1InputPath(): string {
    return `input${inputSize === "sm" ? "_sm" : ""}_01.txt`;
}

function getPart2InputPath(): string {
    return `input${inputSize === "sm" ? "_sm" : ""}_02.txt`;
}

const inputLoaderPart1 = new InputLoader().setPath(path.join(getDirname(), getPart1InputPath()));
const inputLoaderPart2 = new InputLoader().setPath(path.join(getDirname(), getPart2InputPath()));

const lines1 = new LinesLoader(inputLoaderPart1.loadInput());
const lines2 = new LinesLoader(inputLoaderPart2.loadInput());

function parsePrintRules(input: string[], isNotAfterRules: boolean): HashMap {
    const rules = new HashMap();
    input.forEach((line) => {
        const [key, value] = line.split('|')
        if (isNotAfterRules) {
            rules.add(parseInt(key), parseInt(value));
        } else {
            rules.add(parseInt(value), parseInt(key));
        }
    });
    return rules;
}

function parsePrintLine(printLine: string): number[] {
    const printedNumbers: number[] = []
    printLine.split(',').map((number) => {
        printedNumbers.push(parseInt(number.trim(), 10))
    });
    return printedNumbers
}

function isPrintedNumberAfterAllRules(printedNumber: number, printedNumbers: number[], rulesForNumber: number[]): boolean {
    let result = false;

    if (rulesForNumber.length === 0) {
        return true;
    }

    const indexOfPrintedNumber = printedNumbers.indexOf(printedNumber);
    if (indexOfPrintedNumber === -1) {
        return result;
    }

    for (const rule of rulesForNumber) {
        if (printedNumbers.includes(rule)) {
            const indexOfRule = printedNumbers.indexOf(rule);
            if (indexOfPrintedNumber > indexOfRule) {
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

function isPrintedNumberBeforeAllRules(printedNumber: number, printedNumbers: number[], rulesForNumber: number[]): boolean {
    let result = false;

    if (rulesForNumber.length === 0) {
        return true;
    }

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

function getMinPositionBasedOnAfterRulesIndex(printedLine: number[], rulesForNumber: number[]): number {
    let index = -1;
    for (const rule of rulesForNumber) {
        const indexOfRule = printedLine.indexOf(rule);
        if (indexOfRule !== -1) {
            index = Math.min(index, indexOfRule);
        }
    }
    return index;
}

function getMaxPositionBasedOnBeforeRulesIndex(printedLine: number[], rulesForNumber: number[]): number {
    let index = -1;

    for (const rule of rulesForNumber) {
        const indexOfRule = printedLine.indexOf(rule);
        if (indexOfRule !== -1) {

            index = Math.max(index, indexOfRule);

        }
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

    const canNotPrintAfterRules = parsePrintRules(printRules, true);
    const canNotPrintBeforeRules = parsePrintRules(printRules, false);

    const results: number[][] = [];

    let correctlyPrintedSum: number = 0;
    let incorrectlyPrintedSum: number = 0;

    // Iterate over each print line
    printLines.forEach((line) => {
        // Parse the print line to array of numbers
        const printedNumbersLine = parsePrintLine(line);

        const reconstructedLine: number[] = [];
        let correctlyPrinted = true;

        // Iterate over each printed number in the line
        for (const printedNumber of printedNumbersLine) {
            // Get the rules for the current printed number from hashmap
            const canNotPrintAfterNumbers = canNotPrintAfterRules.get(printedNumber);
            const canNotPrintBeforeNumbers = canNotPrintBeforeRules.get(printedNumber);

            if (canNotPrintAfterNumbers || canNotPrintBeforeNumbers) {
                // Is the printed number before all rules in the line means that the printed number is in the correct position
                const isPrintedNumberBeforeAll = isPrintedNumberBeforeAllRules(printedNumber, printedNumbersLine, canNotPrintAfterNumbers || []);
                const isPrintedNumberAfterAll = isPrintedNumberAfterAllRules(printedNumber, printedNumbersLine, canNotPrintBeforeNumbers || []);
                if (!isPrintedNumberBeforeAll || !isPrintedNumberAfterAll) {
                    correctlyPrinted = false;
                    break;
                }
            }
        }

        if (!correctlyPrinted) {
            // Reconstruct the line
            for (const printedNumber of printedNumbersLine) {
                const canNotPrintAfterNumbers = canNotPrintAfterRules.get(printedNumber) || [];
                const canNotPrintBeforeNumbers = canNotPrintBeforeRules.get(printedNumber) || [];
                reconstructedLine.push(printedNumber);

                let hasError = !isPrintedNumberBeforeAllRules(printedNumber, reconstructedLine, canNotPrintAfterNumbers || []) || !isPrintedNumberAfterAllRules(printedNumber, reconstructedLine, canNotPrintBeforeNumbers || []);
                do {

                    if (hasError) {
                        let minIndex = getMinPositionBasedOnAfterRulesIndex(reconstructedLine, canNotPrintAfterNumbers)
                        let maxIndex = getMaxPositionBasedOnBeforeRulesIndex(reconstructedLine, canNotPrintBeforeNumbers)
                        let printedNumberIndex = reconstructedLine.indexOf(printedNumber);

                        let newIndex = Math.max(Math.max(minIndex, 0), Math.max(maxIndex, 0));

                        moveElementInArrayByIndex(reconstructedLine, printedNumberIndex, newIndex);
                        hasError = !isPrintedNumberBeforeAllRules(printedNumber, reconstructedLine, canNotPrintAfterNumbers || []) || !isPrintedNumberAfterAllRules(printedNumber, reconstructedLine, canNotPrintBeforeNumbers || []);

                    }
                } while (hasError);
            }
        }

        // Fix calculation after the line is correctly printed
        if (correctlyPrinted) {
            results.push(printedNumbersLine);
            correctlyPrintedSum += printedNumbersLine[Math.floor(printedNumbersLine.length / 2)];
        } else {
            results.push(reconstructedLine);
            incorrectlyPrintedSum += reconstructedLine[Math.floor(reconstructedLine.length / 2)];
        }
    });

    console.log("Results", results);
    console.log("Correctly printed sum: ", correctlyPrintedSum); // Your puzzle answer was 5129.
    console.log("Incorrectly printed sum: ", incorrectlyPrintedSum);
}

const measureRunPart1 = measureInMs(runPart1);


measureRunPart1();
