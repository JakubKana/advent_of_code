import fs from "node:fs";
export default class InputLoader {
    constructor(path) {
        this._path = path;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
    loadInput() {
        return fs.readFileSync(this._path, "utf-8");
    }
}
//# sourceMappingURL=Input.js.map