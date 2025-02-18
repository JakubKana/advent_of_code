import path from "node:path";

import InputLoader from "../utils/InputLoader.js";
import LinesLoader from "../utils/LinesLoader.js";

import {getDirname} from "../utils/helpers.js";
import HashMap from "../data-structures/HashMap.js";
import {measureInMs} from "../utils/measure.js";
import fs from "fs";

const inputSize: "SM" | "LG" = "LG";


const inputLoaderPart1 = new InputLoader().setPath(path.join(getDirname(), "input_sm_01.txt"));
const inputLoaderPart2 = new InputLoader().setPath(path.join(getDirname(), "input_sm_02.txt"));

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


function getMinPositionBasedOnAfterRulesIndex(printedLine: number[], rulesForNumber: number[]): number {
    let index = -1;
    for (const rule of rulesForNumber) {
        const indexOfRule = printedLine.indexOf(rule);

        index = index === -1 ? indexOfRule : Math.max(index, indexOfRule);

    }
    return index;
}

function getMaxPositionBasedOnBeforeRulesIndex(printedLine: number[], rulesForNumber: number[]): number {
    let index = -1;
    for (const rule of rulesForNumber) {
        const indexOfRule = printedLine.indexOf(rule);

        index = index === -1 ? indexOfRule : Math.max(index, indexOfRule);

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
        const modifiedNumbersLine = [...printedNumbersLine];
        let correctlyPrinted = true;

        // Iterate over each printed number in the line
        for (const printedNumber of printedNumbersLine) {
            // Get the rules for the current printed number from hashmap
            const canNotPrintAfterNumbers = canNotPrintAfterRules.get(printedNumber);
            const canNotPrintBeforeNumbers = canNotPrintBeforeRules.get(printedNumber);

            if (canNotPrintAfterNumbers) {
                // Is the printed number before all rules in the line means that the printed number is in the correct position
                const isPrintedNumberBeforeAll = isPrintedNumberBeforeAllRules(printedNumber, modifiedNumbersLine, canNotPrintAfterNumbers || []);

                if (!isPrintedNumberBeforeAll) {
                    correctlyPrinted = false;
                    // Get the smallest rule index in the line
                    const printedNumberIndex = modifiedNumbersLine.indexOf(printedNumber);

                    let minRulePresentedInPrintedLineForBeforeRulesIndex = getMinPositionBasedOnAfterRulesIndex(modifiedNumbersLine, canNotPrintAfterNumbers);


                    let maxRulePresentedInPrintedLineForAfterRulesIndex = getMaxPositionBasedOnBeforeRulesIndex(modifiedNumbersLine, canNotPrintBeforeNumbers || []);

                    console.log("PrintedNumbersLine", modifiedNumbersLine);
                    console.log("canNotPrintAfterNumber printedNumber: ", printedNumber, canNotPrintAfterNumbers);
                    console.log("canNotPrintBeforeNumber printedNumber: ", printedNumber, canNotPrintBeforeNumbers);


                    if (printedNumberIndex > minRulePresentedInPrintedLineForBeforeRulesIndex) {
                        console.log("PrintedNumberIndex", printedNumberIndex);
                        moveElementInArrayByIndex(modifiedNumbersLine, printedNumberIndex, minRulePresentedInPrintedLineForBeforeRulesIndex);
                    }

                  
                    console.log("PrintedNumbersLine after move", modifiedNumbersLine);
                }
            }
        }

        const middleIndex = Math.floor(modifiedNumbersLine.length / 2);
        const middleElement = modifiedNumbersLine[middleIndex];
        if (correctlyPrinted) {
            correctlyPrintedSum += middleElement;
        } else if (!correctlyPrinted) {
            incorrectlyPrintedSum += middleElement;

        }
        // If the line is correctly printed add the line to the results
        results.push(modifiedNumbersLine);
    });

    console.log("Results", results);
    console.log("Correctly printed sum: ", correctlyPrintedSum); // Your puzzle answer was 5129.
    console.log("Incorrectly printed sum: ", incorrectlyPrintedSum);
    // fs.writeFileSync("lg_results.txt", results.join('\n'));
}

// 75,97,47,61,53 becomes 97,75,47,61,53.
// 61,13,29 becomes 61,29,13.
// 97,13,75,29,47 becomes 97,75,47,29,13.


function runPart2() {
    const input = lines2.getLines();

    console.log("InputLines", input);

}


const measureRunPart1 = measureInMs(runPart1);
const measureRunPart2 = measureInMs(runPart2);

measureRunPart1();
