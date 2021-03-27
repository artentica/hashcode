const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`3
4
1 2 3 4
2 1 4 3
3 4 1 2
4 3 2 1
4
2 2 2 2
2 3 2 3
2 2 2 3
2 2 2 2
3
2 1 3
1 3 2
1 2 3
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {
    let arr = []
    let [N] = readline().split(' ').map(Number);
    for (let i = 0; i < N; i++) {
        arr.push(readline().split(' ').map(Number))
    }

    console.log(`Case #${i}: ${solve(arr, N )}`);
}


function solve(arr, N) {
    // console.log(arr)
    let r = 0
    let c = 0
    let k = 0

    for (let lineIndex = 0; lineIndex < arr.length; lineIndex++) {
        const line = arr[lineIndex];
        const set = new Set()
        for (let i = 0; i < line.length; i++) {
            if (!set.has(line[i])) set.add(line[i])
            else {
                r++
                break
            }
        }
    }

    for (let lineIndex = 0; lineIndex < arr.length; lineIndex++) {
        const set = new Set()
        for (let i = 0; i < arr[lineIndex].length; i++) {
            if (!set.has(arr[i][lineIndex])) set.add(arr[i][lineIndex])
            else {
                c++
                break
            }
        }
    }
    for (let index = 0; index < N; index++) {
        const element = arr[index][index];
        k += element
    }
    return `${k} ${r} ${c}`
}