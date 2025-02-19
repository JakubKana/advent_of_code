import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs';
import stack from 'callsite'
// PATH HELPERS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getDirname = (): string => {
    return path.dirname(stack()[1].getFileName()).replace("file:///", "")
}


function getAppRootDir(): string {
    let currentDir = dirname
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..')
    }
    return currentDir
}


// ARRAY HELPERS
const isArrayEmpty: <T>(array: T[]) => boolean = <T>(array: T[]): boolean => {
    return array.length === 0;
}

function insertArrayBefore<T>(target: T[], insert: T[], index: number): T[] {
    target.splice(index, 0, ...insert);
    return target;
}

function insertArrayAfter<T>(target: T[], insert: T[], index: number): T[] {
    target.splice(index + 1, 0, ...insert);
    return target;
}


export {filename, dirname, getAppRootDir, getDirname, isArrayEmpty, insertArrayAfter, insertArrayBefore};

