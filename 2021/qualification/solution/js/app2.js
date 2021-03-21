const lineByLine = require('n-readlines');
const filePath = '../../problemStatement/'
const fs = require("fs")
let totalScore = 0

function outputFile(fileName, intersections, numberStreetUsed, streets) {
    let file = ''
    const intersectionToRm = intersections.reduce((acc, inter) => !inter.length ? acc + 1 : acc, 0)
    file += intersections.length - intersectionToRm + '\n'
    for (let i = 0; i < intersections.length; i++) {
        if (intersections[i].length == 0) continue
        file += i + '\n'
        file += intersections[i].length + '\n'
        intersections[i].sort(function(a, b) {
            return streets[a.name].index - streets[b.name].index
        }).forEach(street => {
            file += street.name + ' ' + street.time + '\n'
        })

    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}

function initStreet(streets, cars) {
    cars.forEach((car, idx) => streets[car.streets[0]].queue.push(idx))
}

function maxPointOnFile(streets, cars, simulationTime, pointPerCar) {
    const totalTravelTimeBonus = cars.map(car => car.reduce((acc, curr, idx) => {
        if (!idx) return acc
        return acc + streets[curr].timeStreet
    }, 0)).reduce((acc, curr) => acc + simulationTime - curr, 0)
    return pointPerCar * cars.length + totalTravelTimeBonus
}

function getIntersectionComputedFreq(numberStreetUsed, totalTime, intersections, streets) {
    return Object.keys(intersections).map(key => {
        const intersection = intersections[key]
        const crowdOnThisIntersection = intersection.reduce((acc, { name }) => acc + (Number(numberStreetUsed[name]) || 0), 0)
        return intersection.map(street => {
            if (!numberStreetUsed[street.name] || !crowdOnThisIntersection) {
                streets[street.name].time = 0
                return {...street, time: 0 }
            }
            const ratioCrowd = numberStreetUsed[street.name] / crowdOnThisIntersection
            const timeRatio = totalTime / crowdOnThisIntersection / 2
            const time = Math.ceil(numberStreetUsed[street.name] / 30)

            streets[street.name].time = time
            return {...street, time }
        }).filter(({ time }) => time)
    })
}

function arrayMaxIndex(array) {
    return array.indexOf(Math.max.apply(null, array));
};

function simulate(cars, streets, intersections, simulationTime, numberStreetUsed) {
    for (let time = 0; time < simulationTime + 1; time++) {
        const carToMove = []
        for (let idx = 0; idx < cars.length; idx++) {
            const car = cars[idx];
            if (!car.done && car.arrival <= time) {
                // console.log("-------")
                if (streets[car.streets[car.onStreetNb]].queue[0] === idx) { // first in queue
                    const totalTime = intersections[streets[car.streets[car.onStreetNb]].endStreet].reduce((acc, { time }) => acc + time, 0)
                    const isPlanned = streets[car.streets[car.onStreetNb]].index !== null
                        // console.log("isPlanned", isPlanned, streets[car.streets[car.onStreetNb]].index, streets[car.streets[car.onStreetNb]].index != null)
                    const modulo = simulationTime % totalTime
                    const previousLight = intersections[streets[car.streets[car.onStreetNb]].endStreet].map(el => streets[el.name]).reduce((acc, { name }) => streets[name].index < streets[car.streets[car.onStreetNb]].index ? acc + streets[name].time : acc, 0)
                        // console.log(car)
                        // console.log(street)
                        // console.log("time", time)
                        // console.log("modulo", modulo, totalTime)
                    if (isPlanned) {
                        const isGreen = previousLight <= modulo && modulo < (previousLight + streets[car.streets[car.onStreetNb]].time)
                        if (isGreen) {
                            car.onStreetNb += 1
                            if (car.onStreetNb == car.streets.length) {
                                car.done = true
                                carToMove.push([car.streets[car.onStreetNb - 1]])
                            } else {
                                const nextStreet = streets[car.streets[car.onStreetNb]]
                                car.arrival = time + nextStreet.timeStreet
                                carToMove.push([car.streets[car.onStreetNb - 1], nextStreet.name])
                                    // nextStreet.queue.push(streets[car.streets[car.onStreetNb - 1]].queue.shift())
                            }
                        }
                    } else {
                        if (previousLight <= modulo) {
                            // Need to decide next street to light in green
                            // console.log(intersection)
                            const unplannedStreets = intersections[streets[car.streets[car.onStreetNb]].endStreet].map(el => streets[el.name]).filter(({ index }) => index === null).sort(function(a, b) {
                                    const diff = (b.queue.length - a.queue.length)
                                    return !!diff ? diff : numberStreetUsed[b.name] - numberStreetUsed[a.name]
                                })
                                // console.log(unplannedStreets)
                            streets[unplannedStreets[0].name].index = intersections[streets[car.streets[car.onStreetNb]].endStreet].length - unplannedStreets.length
                                // console.log(unplannedStreets[0].name, streets[unplannedStreets[0].name].index)
                            if (unplannedStreets[0].name === streets[car.streets[car.onStreetNb]].name) {
                                car.onStreetNb += 1
                                    // console.log(car, car.onStreetNb > car.streets.length)
                                if (car.onStreetNb == car.streets.length) {
                                    car.done = true
                                    carToMove.push([car.streets[car.onStreetNb - 1]])
                                } else {
                                    const nextStreet = streets[car.streets[car.onStreetNb]]
                                        // console.log(nextStreet, car)
                                    car.arrival = time + nextStreet.timeStreet

                                    carToMove.push([car.streets[car.onStreetNb - 1], nextStreet.name])
                                        // nextStreet.queue.push(streets[car.streets[car.onStreetNb - 1]].queue.shift())
                                }
                            }
                            // const unplannedStreet = intersection.filter(({ index }) => index === null)
                            // const nextStreet = unplannedStreet[arrayMaxIndex(unplannedStreet)]
                            // nextStreet.index = intersection.length - unplannedStreet.length
                        }

                    }
                }
            }

        }
        carToMove.forEach(car => {
            const id = streets[car[0]].queue.shift()
            if (car[1]) streets[car[1]].queue.push(id)
        })
    }
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
        streets[name] = { startStreet, endStreet, name, timeStreet: Number(timeStreet), queue: [], index: null }
    }

    const intersections = getIntersection(streets)

    const cars = []
    for (let i = 0; i < numbercars; i++) {
        const car = {}
        car.streets = liner.next().toString('ascii').split(' ').slice(1)
        car.arrival = 0
        car.onStreetNb = 0
        cars.push(car)
    }

    const numberStreetUsed = {}
    cars.forEach(car => {
        car.streets.forEach(street => {
            numberStreetUsed[street] = (numberStreetUsed[street] || 0) + 1
        })
    })

    // const totototot = maxPointOnFile(streets, cars, simulationTime, pointPerCar)
    // totalScore += totototot
    // console.log("Max score: ", totototot)
    // console.log("total score: ", totalScore)
    initStreet(streets, cars)

    const intersectionsComputed = getIntersectionComputedFreq(numberStreetUsed, simulationTime, intersections, streets)

    simulate(cars, streets, intersectionsComputed, simulationTime, numberStreetUsed)

    outputFile(fileName, intersectionsComputed, numberStreetUsed, streets)

    console.log(Date.now() - start, 'ms')
        // console.log(cars)
    console.log(cars.filter(car => !car.done).length)
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