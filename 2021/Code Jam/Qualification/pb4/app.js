var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentline = 0;
let i = 0;
let T, N, Q
let arr = [3, 2, 1]
let state = 0
let init = true
let ask = [3, 2, 1]
let bot = 0,
    top = arr.length
rl.on('line', function(line) {
        if (line == -1) rl.close()
        if (currentline === 0) {
            [T, N, Q] = line.split(' ').map(Number)
        } else if (state) {
            solve(Number(line), N)
        }
        currentline++
        if (arr.length === N) {
            T--
            console.log(arr.join(' '))
            arr = [3, 2, 1]
            i = 0;
            init = true
            state = 0
        } else if (T) {
            state = 1
            if (!init) console.log(`${arr[i]} ${arr[i+1]} ${arr.length+1}`)
            else console.log(`1 2 3`)
        } else rl.close()
    })
    .on('close', () => {
        process.exit(0)
    })

function solve(nb) {
    if (init) {
        const placeId = arr.findIndex(el => el === nb)
        arr.splice(placeId, 1)
        const first = arr.findIndex(el => ask.includes(el))
        arr.splice(first + 1, 0, nb)
        i = 0
        init = false
    } else if (arr.length + 1 === nb) {
        const first = arr.findIndex(el => el === arr[i] || el === arr[i + 1])
        arr.splice(first + 1, 0, nb)
        i = 0
    } else if (nb === arr[0]) {
        i = 0
        arr.unshift(arr.length + 1)
    } else if (nb === arr[arr.length - 1]) {
        arr.push(arr.length + 1)
        i = 0
    } else i++
        // arr = arr.flat()

        // if (i === 0 || isArrayInArray === true) {
        //     arr.splice(placeId, 1)
        //     const first = arr.findIndex(el => ask.includes(el))
        //         // const tempId = ask[0] === nb ? place[ask[1]] - 1 : place[ask[0]] + 1
        //     arr.splice(first + 1, 0, nb)
        //     isArrayInArray = false
        // } else {
        //     const first = arr.findIndex(el => el === i + 1 || el === i + 2)
        //     const place = {
        //         [ask[0]]: arr.findIndex(el => el === ask[0]),
        //         [ask[1]]: arr.findIndex(el => el === ask[1])
        //     }
        //     if (placeId === -1) {
        //         if (Math.abs(place[ask[0]] - place[ask[1]]) > 1) {
        //             arr[Math.min(place[ask[0]], place[ask[1]]) + 1] = [arr[Math.min(place[ask[0]], place[ask[1]]) + 1], nb]
        //             isArrayInArray = true
        //             i--
        //         } else arr.splice(first + 1, 0, nb)
        //     } else {
        //         if (arr[first] === i + 1) {
        //             arr.push(i + 3)
        //         } else {
        //             arr.unshift(i + 3)
        //         }
        //     }

        // }
        // i++
}
// (3, 9, 4, 6, 7, 5, 10, 1, 2, 8)

// function solve(nb, N) {
//     const placeId = arr.findIndex(el => el === nb)
//     if (i === 0) {
//         arr.splice(placeId, 1)
//         arr.splice(1, 0, nb)
//     } else {
//         const place = {
//             [i + 1]: arr.findIndex(el => el === i + 1),
//             [i + 2]: arr.findIndex(el => el === i + 2)
//         }
//         if (placeId === -1) {
//             const tempId = Math.min(place[i + 2], place[i + 1])
//             arr.splice(tempId + 1, 0, nb)
//         } else {
//             const vector = place[i + 2] - place[i + 1]
//             if (vector > 0) {
//                 arr.push(i + 3)
//             } else {
//                 arr.unshift(i + 3)
//             }
//         }

//     }
//     i++
// }