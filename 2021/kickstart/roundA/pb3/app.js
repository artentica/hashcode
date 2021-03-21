const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`1
3 6
7 4 0 0 0 0
4 0 0 0 0 0
0 0 0 0 0 7
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {
    let arr = []
    let [row, column] = readline().split(' ').map(Number);
    for (let i = 0; i < row; i++) {
        arr.push(readline().split(' ').map(Number))
    }

    console.log(`Case #${i}: ${solve(arr)}`);
    console.log(arr)
}


function solve(arr) {
    console.log(arr)
    let count = 0
    for (let maxValue = max(arr); maxValue > 1; maxValue--) {
        for (let lineIndex = 0; lineIndex < arr.length; lineIndex++) {
            const line = arr[lineIndex];
            for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
                if (arr[lineIndex][columnIndex] === maxValue) count += scan(columnIndex, lineIndex, maxValue, arr)
            }
        }

    }
    return count
}

function scan(x, y, max, arr) {
    let count = 0
    let [copyX, copyY] = [x, y]
    console.log([x, y])
    while (--copyX >= 0) {
        const curr = arr[y][copyX]
        const cmp = arr[y][copyX + 1]
        if (curr < (cmp - 1)) {
            const diff = cmp - curr - 1
            count += diff
            arr[y][copyX] += diff
        } else break;
    }

    copyX = x
    while (++copyX < arr[y].length) {
        const curr = arr[y][copyX]
        const cmp = arr[y][copyX - 1]
        if (curr < cmp - 1) {
            const diff = cmp - curr - 1
            count += diff
            arr[y][copyX] += diff
        } else break;
    }

    copyY = y
    while (--copyY >= 0) {
        const curr = arr[copyY][x]
        const cmp = arr[copyY + 1][x]
        if (curr < cmp - 1) {
            const diff = cmp - curr - 1
            count += diff
            arr[copyY][x] += diff
        } else break;
    }

    copyY = y
    while (++copyY < arr.length) {
        const curr = arr[copyY][x]
        const cmp = arr[copyY - 1][x]
        if (curr < cmp - 1) {
            const diff = cmp - curr - 1
            count += diff
            arr[copyY][x] += diff
        } else break;
    }
    return count
}

function max(arr) {
    const set = new Set(arr.flat())
    return Math.max(...Array.from(set))
}