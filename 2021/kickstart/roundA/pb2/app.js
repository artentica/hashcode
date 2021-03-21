const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`1
6 4
1 0 0 0
1 0 0 1
1 1 1 1
1 0 1 0
1 0 1 0
1 1 1 0
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
}


function solve(arr) {
    // console.log(arr)
    let count = 0
    for (let lineIndex = 0; lineIndex < arr.length; lineIndex++) {
        const line = arr[lineIndex];
        for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
            count += scan(columnIndex, lineIndex, arr)
        }
    }
    return count
}

function scan(x, y, arr) {
    let [countLeft, countUp, countRight, countDown] = [0, 0, 0, 0]
    let [copyX, copyY] = [x, y]
    // console.log([x, y])
    if (!arr[y][copyX]) return 0
    while (--copyX >= 0) {
        if (arr[y][copyX]) countLeft++;
        else break;
    }

    copyX = x
    while (++copyX < arr[y].length) {
        if (arr[y][copyX]) countRight++;
        else break;
    }

    copyY = y
    while (--copyY >= 0) {
        if (arr[copyY][x]) countUp++;
        else break;
    }

    copyY = y
    while (++copyY < arr.length) {
        if (arr[copyY][x]) countDown++;
        else break;
    }
    // console.log([countLeft, countUp, countRight, countDown])
    return LNumber(countLeft, countUp, countRight, countDown, [x, y])
}

function LNumber(countLeft, countUp, countRight, countDown, [x, y]) {
    let count = 0

    for (let i = 2; i <= countUp + 1; i++) {
        const tmp = count
        if (countRight + 1 >= i * 2) count++;
        if (countLeft + 1 >= i * 2) count++;
        if (tmp == count) break;
    }
    for (let i = 2; i <= countDown + 1; i++) {
        const tmp = count
        if (countRight + 1 >= i * 2) count++;
        if (countLeft + 1 >= i * 2) count++;
        if (tmp == count) break;
    }
    for (let i = 2; i <= countRight + 1; i++) {
        const tmp = count
        if (countUp + 1 >= i * 2) count++;
        if (countDown + 1 >= i * 2) count++;
        if (tmp == count) break;
    }
    for (let i = 2; i <= countLeft + 1; i++) {
        const tmp = count
        if (countUp + 1 >= i * 2) count++;
        if (countDown + 1 >= i * 2) count++;
        if (tmp == count) break;
    }
    return count
}