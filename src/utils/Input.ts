import fs from "node:fs";

interface Input {
    loadInput(path: string): string;
}


export default class InputLoader implements Input {
    private _path: string;

    constructor(path: string) {
        this._path = path;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    loadInput(): string {
     return fs.readFileSync(this._path, "utf-8");
    }

}