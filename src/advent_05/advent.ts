import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_05", "input_01.txt"));


function runPart1() {
    const input = inputLoader.loadInput();

    console.log(input);
}


function runPart2() {
    const input = inputLoader.loadInput();

    console.log(input);
}


runPart1();