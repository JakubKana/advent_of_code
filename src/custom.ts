const getRandom = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');

const array = Array(20000000).fill(true).map(() => {
    return getRandom(50);
});
const array2 = Array(20000000).fill(true).map(() => {
    return getRandom(50);
});
const measure = performance.now();
array.sort((a, b) => (a && b ? a.toLowerCase().localeCompare(b.toLowerCase()) : 0));

const finalTime = performance.now() - measure;
console.log(`${finalTime}ms`);

const measure1 = performance.now();
// Custom localeCompare function
const DEFAULT_LOCALE = 'en';
const COLLATOR_OPTIONS: Intl.CollatorOptions = {
    usage:
        'sort', sensitivity: 'base'
};
const collator = new Intl.Collator(DEFAULT_LOCALE,
    COLLATOR_OPTIONS);

function localeCompare(a: string, b: string) {
    return collator.compare(a, b);
}

// Usage
array2.sort((a, b) => (a && b ? localeCompare(a, b) : 0));
const finalTime2 = performance.now() - measure1;
console.log(`${finalTime2}ms`);