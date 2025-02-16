import InputLoader from "../utils/InputLoader.js";
import path from "node:path";
import {dirname} from "../utils/helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_06", "input_01.txt"));

function runPart1() {
    const input = inputLoader.loadInput();

    console.log(input);
}


function runPart2() {
    const input = inputLoader.loadInput();

    console.log(input);
}