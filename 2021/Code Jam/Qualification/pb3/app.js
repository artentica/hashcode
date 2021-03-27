const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`1
7 12
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {

    let [N, C] = readline().split(' ').map(Number)

    console.log(`Case #${i}: ${solve(N, C )}`);
}


function solve(N, C) {
    let count = C - (N - 1)
    const max = (N - 2 + 1) * ((2 * 2 + (N - 2) * 1) / 2)
    const min = N - 1
    if (C > max || C < min) return 'IMPOSSIBLE'
    let arr = Array(N).fill().map((_, idx) => idx + 1)
        // for (let i = N - 1 - 1; i >= 0; i--) {
        //     if (count === 0) break
        //     if (count >= i) {
        //         arr = reverseFunc(i, arr)
        //         count -= i
        //     }
        // }
    let step = []
    for (let i = N; i >= 0; i--) {
        if (count === 0) break

        if (count + 1 >= i) {
            step.push(i)
            count -= (i - 1)
        }
    }
    step.reverse().forEach(el => {
            arr = reverseFunc(el, arr, N)
        })
        // console.log(step)



    // 2431
    // 1342
    // 1243
    // 1234
    // ----------
    // 2467531
    // 357642
    // 46753
    // 5764
    // 675
    // 76

    return arr.join(' ')
}

function reverseFunc(i, arr, N) {
    return arr.splice(0, N - i).concat(arr.reverse())
}