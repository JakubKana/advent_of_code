import fs from "node:fs";

interface InputLoaderHandler {
    loadInput(path: string): string;
}


export default class InputLoader implements InputLoaderHandler {
    private _path: string;

    constructor()
    constructor(path: string)
    constructor(path?: string) {
        this._path = path || "";
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    setPath(path: string): InputLoader {
        this._path = path;
        return this;
    }

    loadInput(): string {
        return fs.readFileSync(this._path, "utf-8");
    }
}