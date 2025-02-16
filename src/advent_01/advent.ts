import path from 'node:path';
import {getDirname} from "../utils/helpers.js";
import InputLoader from "../utils/InputLoader.js";


const inputLoader = new InputLoader().setPath(path.join(getDirname(), "input_01.txt"));


function calculateDifferences(leftArray: number[], rightArray: number[]) {
    const differences: { left: number, right: number, difference: number }[] = [];
    for (let i = 0; i < leftArray.length; i++) {
        const difference = Math.abs(leftArray[i] - rightArray[i]);
        differences.push({left: leftArray[i], right: rightArray[i], difference});
    }
    return differences;
}

function calculateSimilarity(leftArrayNoDuplicates: number[], rightArray: number[], leftArrayWithSimilarities: {
    number: number;
    similarity: number
}[]) {
    // Calculate total similarity score
    for (const number of leftArrayNoDuplicates) {
        const noOfOccurences = rightArray.filter((num) => num === number).length;
        leftArrayWithSimilarities.push({number, similarity: number * noOfOccurences});
    }

    const sumOfSimilarities = leftArrayWithSimilarities.reduce((acc, curr) => acc + curr.similarity, 0);
    return sumOfSimilarities;
}

function populateArrays(input: string) {
    const rowArray = input.split("\n");
    const leftArray: number[] = [];
    const rightArray: number[] = [];

    for (const row of rowArray) {
        const [first, second] = row.split("   ");
        if (first && second) {
            leftArray.push(parseInt(first));
            rightArray.push(parseInt(second));
        }

    }
    return {leftArray, rightArray};
}

function sortArray(array: number[]) {
    array.sort((a, b) => a - b);
}

function runPart1() {
    const input = inputLoader.loadInput();
    const {leftArray, rightArray} = populateArrays(input);

    sortArray(leftArray);
    sortArray(rightArray);

    const differences = calculateDifferences(leftArray, rightArray);
    const sumOfDifferences = differences.reduce((acc, curr) => acc + curr.difference, 0);

    console.log(sumOfDifferences);
}


function runPart2() {
    const input = inputLoader.loadInput();
    const {leftArray, rightArray} = populateArrays(input);

    sortArray(leftArray);
    sortArray(rightArray);

    const leftArrayNoDuplicates = [...new Set(leftArray)];
    const leftArrayWithSimilarities: { number: number, similarity: number }[] = [];

    const sumOfSimilarities = calculateSimilarity(leftArrayNoDuplicates, rightArray, leftArrayWithSimilarities);

    console.log(sumOfSimilarities);

}

runPart1();
runPart2();
