import InputLoader from "../utils/InputLoader.js";
import path from "node:path";
import {getDirname} from "../utils/helpers.js";

const inputLoader = new InputLoader().setPath(path.join(getDirname(), "input_01.txt"));


function runPart1(inputString?: string) {
    const input = inputString || inputLoader.loadInput();
    const regex = new RegExp(/mul\((\d+),(\d+)\)/g);
    const iterator = [...input.matchAll(regex)];
    let result: number = 0;
    for (const match of iterator) {
        result += parseInt(match[1]) * parseInt(match[2]);
    }
    console.log(result);
}

function stringBetweenStrings(startStr: string, endStr: string, str: string) {
    const startString = str.indexOf(startStr);
    const endString = str.indexOf(endStr);
    if (startString === -1 || endString === -1) {
        return "";
    }
    const pos = str.indexOf(startStr) + startStr.length;
    return str.substring(pos, str.indexOf(endStr, pos));
}

function runPart2() {
    const input = inputLoader.loadInput();

    let inputCleaned = String(input);
    let betweenString = stringBetweenStrings("don't()", "do()", inputCleaned);

    while (betweenString.length > 0) {
        inputCleaned = inputCleaned.replace(`don't()${betweenString}`, '');
        betweenString = stringBetweenStrings("don't()", "do()", inputCleaned);
    }
    console.log({inputCleaned});
    runPart1(inputCleaned);
}

runPart1();
runPart2();