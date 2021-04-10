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
    cursor = Math.floor(arr.length / 2),
    top = arr.length - 1
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
            initSearch()
            i = 0;
            init = true
            state = 0
        } else if (T) {
            state = 1
            if (!init) console.log(`${arr[bot]} ${arr[cursor]} ${arr.length+1}`)
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
        arr.splice(1, 0, nb)
        init = false
    } else if (nb === arr[0]) {
        arr.unshift(arr.length + 1)
        initSearch()
    } else if (nb === arr[arr.length - 1]) {
        arr.push(arr.length + 1)
        initSearch()
    } else if (arr.length + 1 === nb) {
        // code here
        if (Math.abs(bot - cursor) === 1) {
            const first = arr.findIndex(el => el === arr[bot] || el === arr[cursor])
            arr.splice(first + 1, 0, nb)
            initSearch()
        } else {
            top = cursor
            cursor = Math.floor((bot + top) / 2)
        }
    } else {
        bot = cursor
        cursor = Math.ceil((top + bot) / 2)
    }
}

function initSearch() {
    bot = 0,
        cursor = Math.floor(arr.length / 2),
        top = arr.length - 1
}
// (3, 9, 4, 6, 7, 5, 10, 1, 2, 8)