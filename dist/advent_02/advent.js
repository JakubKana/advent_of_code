import InputLoader from "../utils/Input.js";
import path from "node:path";
import { dirname } from "../helpers.js";
const inputLoader = new InputLoader(path.join(dirname, "advent_02", "input.txt"));
console.log(inputLoader.loadInput());
//# sourceMappingURL=advent.js.map