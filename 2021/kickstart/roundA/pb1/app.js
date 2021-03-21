const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`2
5 1
ABCAA
4 2
ABAA`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {
    let [nbLetter, score] = readline().split(' ');
    let string = readline();
    console.log(`Case #${i}: ${solve(score, string,nbLetter)}`);
}


function solve(score, string, nbLetter) {
    let alreadyOk = 0
    for (let i = 0; i < nbLetter / 2; i++) {
        if (string[i] !== string[nbLetter - 1 - i]) {
            alreadyOk++
        }
    }
    return Math.abs(score - alreadyOk)
}