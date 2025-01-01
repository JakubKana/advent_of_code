import InputLoader from "../utils/Input.js";
import path from "node:path";
import {dirname} from "../helpers.js";

const inputLoader = new InputLoader(path.join(dirname, "advent_04", "input.txt"));
