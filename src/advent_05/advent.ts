import path from "node:path";

import InputLoader from "../utils/InputLoader.js";
import LinesLoader from "../utils/LinesLoader.js";

import {getDirname} from "../utils/helpers.js";


const inputLoaderPart1 = new InputLoader().setPath(path.join(getDirname(), "input_01.txt"));
const inputLoaderPart2 = new InputLoader().setPath(path.join(getDirname(), "input_02.txt"));

const lines1 = new LinesLoader(inputLoaderPart1.loadInput());
const lines2 = new LinesLoader(inputLoaderPart2.loadInput());

function runPart1() {
    inputLoaderPart1.loadInput();
    const input = lines1.getLines();

    console.log("InputLines", input);

}


function runPart2() {
    const input = lines2.getLines();

    console.log("InputLines", input);

}


runPart1();
runPart2();