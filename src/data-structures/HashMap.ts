import {HashMapFunctions, HashMapRecords} from "./HashMap.types.js";

export default class HashMap implements HashMapFunctions {
    private _map: HashMapRecords;

    constructor() {
        this._map = new Map<number, number[]>();
    }
    
    public get map(): HashMapRecords {
        return this._map;
    }

    public set map(value: HashMapRecords) {
        this._map = value;
    }

    public add(key: number, value: number): void {
        if (this._map.has(key)) {
            this._map.get(key)?.push(value);
        } else {
            this._map.set(key, [value]);
        }
    }

    public get(key: number): number[] | undefined {
        return this._map.get(key) || undefined;
    }

    public remove(key: number): void {
        this._map.delete(key);
    }
}