const lineByLine = require('n-readlines');
const filePath = '../../problemStatement/'
const fs = require("fs")


function outputFile(fileName, intersections) {
    let file = ''
    const intersectionToRm = intersections.reduce((acc, inter) => !inter.length ? acc + 1 : acc, 0)
    file += intersections.length - intersectionToRm + '\n'
    for (let i = 0; i < intersections.length; i++) {
        if (intersections[i].length == 0) continue
        file += i + '\n'
        file += intersections[i].length + '\n'
        intersections[i].sort(function(a, b) {
            return a.stateStreet - b.stateStreet;
        }).forEach(street => {
            file += street.name + ' ' + street.time + '\n'
        })

    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}


function initStreet(streets, cars) {
    cars.forEach((car, idx) => streets[car[0]].stateStreet = (streets[car[0]].stateStreet || 0) + 1)
}

function getIntersection(numberStreetUsed, totalTime, intersections) {
    return Object.keys(intersections).map(key => {
        const streets = intersections[key]
        const totalCrowd = streets.reduce((acc, { name }) => acc + (Number(numberStreetUsed[name]) || 0), 0)
        const totalTotalTimeTravel = streets.reduce((acc, { timeStreet }) => acc + (timeStreet || 0), 0)

        return streets.map(street => {
            if (!numberStreetUsed[street.name] || !totalCrowd) return street
            const pourCentCrowd = numberStreetUsed[street.name] / totalCrowd

            const pourCentTime = totalTime / (totalTotalTimeTravel / street.timeStreet)
            const time = Math.ceil(pourCentCrowd * 6)
            return {...street, time }
        }).filter(el => el.time)
    })
}


function fileTreatment(fileName, score) {
    const start = Date.now()

    const intersections = {}

    const liner = new lineByLine(`${filePath}${fileName}.txt`)
    let [simulationTime, numberIntersection, numberStreet, numbercars] = liner.next().toString('ascii').split(' ').map(l => Number(l))

    const streets = {}
    for (let i = 0; i < numberStreet; i++) {
        const [startStreet, endStreet, name, timeStreet] = liner.next().toString('ascii').split(' ')
        streets[name] = { startStreet, endStreet, name, timeStreet: Number(timeStreet) }
        if (!intersections[endStreet]) intersections[endStreet] = []
        intersections[endStreet].push(streets[name])
    }

    const cars = []
    for (let i = 0; i < numbercars; i++) {
        const car = liner.next().toString('ascii').split(' ').slice(1)
        cars.push(car)
    }

    const numberStreetUsed = {}
    cars.forEach(car => {
        car.forEach(street => {
            numberStreetUsed[street] = (numberStreetUsed[street] || 0) + 1
        })
    })


    initStreet(streets, cars)

    const intersectionsComputed = getIntersection(numberStreetUsed, simulationTime, intersections)


    outputFile(fileName, intersectionsComputed)

    console.log(Date.now() - start, 'ms')
}




[{
        filename: 'b',
        score: 0
    },
    // ,
    // {
    //     filename: 'b',
    //     score: 0
    // },
    {
        filename: 'c',
        score: 0
    }, {
        filename: 'd',
        score: 0
    }, {
        filename: 'e',
        score: 0
    }, {
        filename: 'f',
        score: 0
    }
].forEach(({
    filename,
    score
}) => {
    console.log(
        `============================================= ${filename} ==========================================`
    )
    fileTreatment(filename, score)
})