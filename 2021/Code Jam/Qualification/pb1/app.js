const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`3
4
1 3 4 2
2
1 2
7
1 6 7 5 4 3 2
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {

    let [N] = readline().split(' ').map(Number);
    let arr = readline().split(' ').map(Number)

    console.log(`Case #${i}: ${solve(arr, N )}`);
}


function solve(arr, N) {
    let count = 0
    for (let i = 0; i < N - 1; i++) {
        const minVal = minValueIndex(i, arr)
        const arrayToReverse = arr.splice(i, minVal - i + 1)
        arr = arr.splice(0, i).concat(arrayToReverse.reverse()).concat(arr)

        count += minVal - i + 1
    }
    return count
}

function minValueIndex(i, arr) {

    return arr.findIndex(el => el === i + 1)
}