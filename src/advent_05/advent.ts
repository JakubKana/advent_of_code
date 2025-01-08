import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoaderPart1 = new InputLoader(path.join(dirname, "advent_05", "input_01.txt"));
const inputLoaderPart2 = new InputLoader(path.join(dirname, "advent_05", "input_02.txt"));


function runPart1() {
    const input = inputLoaderPart1.loadInput();

    console.log(input);
}


function runPart2() {
    const input = inputLoaderPart2.loadInput();

    console.log(input);
}


runPart1();