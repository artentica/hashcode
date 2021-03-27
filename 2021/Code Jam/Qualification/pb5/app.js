const fs = require('fs');

// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
let P = readline();
for (let i = 1; i <= T; i++) {
    let arr = []

    for (let j = 0; j < 100; j++) {

        let S = readline()
        arr.push(sumAns(S))
    }

    console.log(`Case #${i}: ${solve(arr)}`);
}


function solve(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr)
    const spaceUp = sum / 10000 * 0.75
    const moy = sum / arr.length
    const moySpace = arr.map(el => Math.abs(el - moy))
    const ecartMoy = moySpace.reduce((acc, curr) => acc + curr) / 100
    arr.slice(0).sort((a, b) => a - b)
    const copyArr = arr.slice(0).sort((a, b) => a - b)
    let issue
    for (let j = 0; j < copyArr.length - 2; j++) {
        const temp = copyArr[j + 1] - copyArr[j]
        if (copyArr[j + 1] - copyArr[j] < spaceUp) {
            issue = copyArr[j + 1]
            break
        }
    }
    return arr.findIndex(el => el === issue)
}

function sumAns(S) {
    let sum = 0
    for (let index = 0; index < S.length; index++) {
        sum += Number(S[index])
    }
    return sum
}