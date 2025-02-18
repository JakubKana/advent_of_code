import {isArrayEmpty} from "./helpers.js";

export default class LinesLoader {
    #lines: string;
    readonly #linesArray: string[];

    constructor(lines: string) {
        this.#lines = lines;
        this.#linesArray = [];
    }

    getLines(): string[] {
        if (isArrayEmpty<string>(this.#linesArray)) {
            return this.#lines.split(/\r\n|\r|\n/).map((line) => line.trim());
        }
        return this.#linesArray;
    }
}