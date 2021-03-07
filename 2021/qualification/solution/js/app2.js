const lineByLine = require('n-readlines');
const filePath = '../../problemStatement/'
const fs = require("fs")
let totalScore = 0

function outputFile(fileName, intersections, numberStreetUsed) {
    let file = ''
    const intersectionToRm = intersections.reduce((acc, inter) => !inter.length ? acc + 1 : acc, 0)
    file += intersections.length - intersectionToRm + '\n'
    for (let i = 0; i < intersections.length; i++) {
        if (intersections[i].length == 0) continue
        file += i + '\n'
        file += intersections[i].length + '\n'
        intersections[i].sort(function(a, b) {
            const diff = (a.stateStreet - b.stateStreet)
            return !!diff ? diff : numberStreetUsed[a.name] - numberStreetUsed[b.name]
        }).forEach(street => {
            file += street.name + ' ' + street.time + '\n'
        })

    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}


function initStreet(streets, cars) {
    cars.forEach(car => streets[car[0]].stateStreet = (streets[car[0]].stateStreet || 0) + 1)
}

function maxPointOnFile(streets, cars, simulationTime, pointPerCar) {
    const totalTravelTimeBonus = cars.map(car => car.reduce((acc, curr, idx) => {
        if (!idx) return acc
        return acc + streets[curr].timeStreet
    }, 0)).reduce((acc, curr) => acc + simulationTime - curr, 0)
    return pointPerCar * cars.length + totalTravelTimeBonus
}

function getIntersectionComputedFreq(numberStreetUsed, totalTime, intersections) {
    return Object.keys(intersections).map(key => {
        // const streets = intersections[key]
        // const totalCrowd = streets.reduce((acc, { name }) => acc + (Number(numberStreetUsed[name]) || 0), 0)
        // const totalTotalTimeTravel = streets.reduce((acc, { timeStreet }) => acc + (timeStreet || 0), 0)

        // return streets.map(street => {
        //     if (!numberStreetUsed[street.name] || !totalCrowd) return street
        //     const pourCentCrowd = numberStreetUsed[street.name] / totalCrowd

        //     const pourCentTime = totalTime / (totalTotalTimeTravel / street.timeStreet)
        //     const time = Math.ceil(pourCentCrowd * 2)
        //     return {...street, time }
        // }).filter(el => el.time)
        const intersection = intersections[key]
        const crowdOnThisIntersection = intersection.reduce((acc, { name }) => acc + (Number(numberStreetUsed[name]) || 0), 0)
        return intersection.map(street => {
            if (!numberStreetUsed[street.name] || !crowdOnThisIntersection) return {...street, time: 0 }
            const ratioCrowd = numberStreetUsed[street.name] / crowdOnThisIntersection
            const timeRatio = totalTime / crowdOnThisIntersection / 2
            const time = Math.ceil(numberStreetUsed[street.name] / 30)
            return {...street, time }
        }).filter(({ time }) => time)
    })
}

function simulate(cars, streets, intersections, simulationTime) {

}

function getIntersection(streets) {
    return Object.keys(streets).reduce((acc, curr) => {
        const street = streets[curr]
        if (!acc[street.endStreet]) acc[street.endStreet] = []
        acc[street.endStreet].push(street)
        return acc
    }, {})
}

function fileTreatment(fileName) {
    const start = Date.now()


    const liner = new lineByLine(`${filePath}${fileName}.txt`)
    const [simulationTime, numberIntersection, numberStreet, numbercars, pointPerCar] = liner.next().toString('ascii').split(' ').map(l => Number(l))

    const streets = {}
    for (let i = 0; i < numberStreet; i++) {
        const [startStreet, endStreet, name, timeStreet] = liner.next().toString('ascii').split(' ')
        streets[name] = { startStreet, endStreet, name, timeStreet: Number(timeStreet) }
    }

    const intersections = getIntersection(streets)

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

    const totototot = maxPointOnFile(streets, cars, simulationTime, pointPerCar)
    totalScore += totototot
    console.log("Max score: ", totototot)
    console.log("total score: ", totalScore)
        // initStreet(streets, cars)

    //const intersectionsComputed = getIntersectionComputedFreq(numberStreetUsed, simulationTime, intersections)

    //simulate(cars, streets, intersectionsComputed, simulationTime)

    //outputFile(fileName, intersectionsComputed, numberStreetUsed)

    console.log(Date.now() - start, 'ms')
}




[{
        filename: 'a',
        score: 0
    },
    {
        filename: 'b',
        score: 0
    },
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
    filename
}) => {
    console.log(
        `============================================= ${filename} ==========================================`
    )
    fileTreatment(filename)
})