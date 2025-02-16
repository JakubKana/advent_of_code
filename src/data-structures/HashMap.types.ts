export type HashMapRecords = Map<number, number[]>

export interface HashMapFunctions {
    add(key: number, value: number): void;
    get(key: number): number[] | undefined;
    remove(key: number): void;
}
