const fs = require('fs');
// const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const input = (`4
3
100 7 1
2
10 10
3
4 19 1
3
1 2 3
`).trim().split('\n');

let currentline = 0;

function readline() {
    return input[currentline++];
}

let T = readline();
for (let i = 1; i <= T; i++) {

    let N = Number(readline())
    let numbers = readline().split(' ')

    console.log(`Case #${i}: ${solve(numbers, N )}`);
}


function solve(numbers, N) {
    let count = 0

    for (let i = 1; i < numbers.length; i++) {
        let previous = numbers[i - 1];
        let curr = numbers[i];
        let p = previous.length - 1

        if (Number(previous) < Number(curr)) continue
        else {
            if (previous.length == curr.length) {
                count++
                numbers[i] += '0'
            } else if (previous.length > curr.length) {
                for (let j = 0; j < curr.length; j++) {
                    if (Number(previous[j]) > Number(curr[j])) {
                        count += previous.length - curr.length + 1
                        numbers[i] += '0'.repeat(previous.length - curr.length + 1)
                    } else if (Number(previous[j]) < Number(curr[j])) {
                        count += previous.length - curr.length
                        numbers[i] += '0'.repeat(previous.length - curr.length)
                        break
                    } else {
                        continue
                    }
                }
            }
            // else {
            //     for (let j = 0; j < previous.length; j++) {
            //         if (curr[j] === undefined) {
            //             const rest = previous.substring(j, previous.length)
            //             const temp = Number(rest) + 1
            //             const tempString = pad(temp, rest.length)
            //             if (previous < numbers[i] + tempString) {
            //                 numbers[i] += tempString
            //                 count += tempString.length
            //             } else {

            //                 numbers[i] += '0'.repeat(tempString.length)

            //                 count += tempString.length
            //             }
            //             if (Number(previous) > Number(numbers[i])) {
            //                 count++
            //                 numbers[i] += '0'
            //             }
            //             break
            //             // if (j != previous.length - 1) {
            //             //     count++
            //             //     curr += previous[j]
            //             // }
            //             // if (j === previous.length - 1) {
            //             //     //count++
            //             //     const length = curr.length
            //             //     if (Number(previous) < Number(curr + previous[j]) + 1 && previous[j] != '9') {
            //             //         count++
            //             //         numbers[i] = (Number(curr + previous[j]) + 1).toString()
            //             //     } else if (previous[j] == '9') {
            //             //         count += 2
            //             //         curr += '00'
            //             //         numbers[i] = curr
            //             //     } else {
            //             //         count++
            //             //         curr += '0'
            //             //         if (Number(curr) < Number(previous)) {
            //             //             count++
            //             //             curr += '0'
            //             //         }
            //             //         numbers[i] = curr
            //             //     }
            //             // }
            //         } else if (Number(previous[j]) < Number(curr[j])) {
            //             count += previous.length - curr.length
            //             numbers[i] += '0'.repeat(previous.length - curr.length)
            //             break
            //         }
            //     }
            // }
        }
    }
    console.log(numbers)
    return count
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}