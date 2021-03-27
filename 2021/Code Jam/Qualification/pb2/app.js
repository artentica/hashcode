const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`4
2 3 CJ?CC?
4 2 CJCJ
1 3 C?J
2 5 ??J???
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {

    let [X, Y, S] = readline().split(' ');
    console.log(`Case #${i}: ${solve(Number(X), Number(Y), S)}`);
}


function solve(X, Y, S) {
    let count = 0
    const cost = {
            'CJ': X,
            'JC': Y
        }
        // const keys = ['CJ', 'JC']
        // const minCost = (X - Y <= 0) ? 'CJ' : 'JC'

    // if (S[0] === '?') {
    //     // if (S[1] === '?') S[0] = 'C' // to be review
    //     // else S[0] = S[1]
    //     if
    // }

    // for (let i = 1; i < S.length; i++) {
    //     if (S[i] === '?') {
    //         if (i + 1 < S.length && S[i - 1] !== S[i + 1]){
    //             const key = keys
    //         } else S[i] = S[i-1]
    //     }

    // }
    // console.log(S)
    const string = S.replace(/\?/g, "")
    console.log(string)
    for (let i = 1; i < string.length; i++) {
        count += (cost[`${string[i-1]}${string[i]}`] || 0)
    }
    return count
}