const lineByLine = require('n-readlines');
const filePath = '../../problemStatement/'
const fs = require("fs")

const consoleLog = true

function getIngredients(liner) {
    const ingredients = []
    while (line = liner.next()) {
        ingredients.push(line.toString('ascii').split(' ').slice(1))
    }
    return ingredients
}

function deliver(nbTeam, sizeTeam, availablePizza, ingredients, uniqueIngredient) {
    let pizzaReadyToShip = []
    for (let nb = 0; nb < nbTeam; nb++) {
        let pizzaOnTheTable = []
        if (availablePizza.size < sizeTeam) break
        if (consoleLog) console.log(`${sizeTeam} people team`, ' // ', `team number: ${nb}/${nbTeam}`)
        for (let t = 0; t < sizeTeam; t++) {
            const totalIngredientOnPTheTable = new Set(pizzaOnTheTable.map(i => ingredients[i]).flat())
            let pizzaToAddIdx = undefined

            let maxScore = 0
            if (pizzaOnTheTable.length == 0) {
                pizzaToAddIdx = Array.from(availablePizza).pop()
            } else {
                const ingredientToPrioritize = new Set([...uniqueIngredient].filter(x => !totalIngredientOnPTheTable.has(x)))
                const maxIngPizza = ingredients[Array.from(availablePizza).pop()].length

                for (let p of availablePizza) {
                    if (pizzaOnTheTable.includes(p)) continue

                    // if (pizzaOnTheTable.length == 0) {
                    //     pizzaToAddIdx = p
                    //     break;
                    // }

                    const newIngNb = ingredients[p].reduce((acc, curr) => {
                        return ingredientToPrioritize.has(curr) ? acc + 1 : acc
                    }, 0)

                    // If we have the max ing possible we stop the loop
                    if (maxIngPizza == newIngNb) {
                        pizzaToAddIdx = p
                        break
                    }

                    if (newIngNb > maxScore || pizzaToAddIdx === undefined) {
                        pizzaToAddIdx = p
                        maxScore = newIngNb
                    }
                }
            }
            pizzaOnTheTable.push(pizzaToAddIdx)
        }
        for (let idx of pizzaOnTheTable) {
            availablePizza.delete(idx)
        }
        pizzaReadyToShip.push(pizzaOnTheTable)
    }
    // console.log(pizzaReadyToShip)
    return pizzaReadyToShip
}

function outputFile(deliveriesPizza, fileName) {
    let file = ''
    file += deliveriesPizza.length + '\n'
    for (let delivery of deliveriesPizza) {
        file += delivery.length + ' ' + delivery.join(' ') + '\n'
    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}

function computedNumberTeam(arg) {
    const [totalPizza, twoPTeam, threePTeam, fourPTeam] = arg

    const teams = [
        [fourPTeam, 4],
        [threePTeam, 3],
        [twoPTeam, 2]
    ].reduce((accumulator, currentValue, idx) => {
        let pizzaRemaining = accumulator.reduce((acc, curr) => {
            return acc - curr[0] * curr[1]
        }, totalPizza)
        if (idx != 0) {
            if (currentValue[0] * currentValue[1] > pizzaRemaining && pizzaRemaining % currentValue[1] == 1) {
                accumulator[idx - 1][0] -= 1
                pizzaRemaining += accumulator[idx - 1][1]
            }
        }

        if (currentValue[0] * currentValue[1] > pizzaRemaining) {
            accumulator.push([Math.floor(pizzaRemaining / currentValue[1]), currentValue[1]])
        } else {
            accumulator.push([currentValue[0], currentValue[1]])
        }
        return accumulator
    }, [])
    teams.unshift(totalPizza)
    return teams
}

function countScore(deliveriesPizza, ingredients) {
    return deliveriesPizza.map(delivery => {
        return new Set(delivery.map(pizza => {
            return ingredients[pizza]
        }).flat()).size ** 2
    }).reduce((a, b) => a + b, 0)
}

function fileTreatment(fileName, score) {

    const start = Date.now()

    const liner = new lineByLine(`${filePath}${fileName}`)
    let [totalPizza, fourPTeam, threePTeam, twoPTeam] = computedNumberTeam(liner.next().toString('ascii').split(' ').map(
        l => Number(l)))

    const ingredients = getIngredients(liner)

    const uniqueIngredient = new Set(ingredients.flat())

    let orderedPizzaIngredientLengthIdx = ingredients.map((_, i) => i).sort((a, b) => ingredients[a].length - ingredients[b].length)

    let availablePizza = new Set(orderedPizzaIngredientLengthIdx)

    const deliveriesPizza = [fourPTeam, threePTeam, twoPTeam].reduce((accumulator, currentValue) => {
        if (consoleLog) {
            console.log(`${availablePizza.size} pizza remaining`)
            console.log(`-------------`)
        }
        return accumulator.concat(deliver(currentValue[0], currentValue[1], availablePizza, ingredients,
            uniqueIngredient))
    }, [])
    outputFile(deliveriesPizza, fileName)
    if (consoleLog) {
        console.log(
            `Pizza to deliver: ${[fourPTeam, threePTeam, twoPTeam].reduce((acc, curr) => {return acc + curr[0] * curr[1]},0)}`
        )
        console.log(`Pizza delivered: ${deliveriesPizza.reduce((acc, curr) => {return acc + curr.length},0)}`)
    }
    const countedScore = countScore(deliveriesPizza, ingredients)
    let evolve = ''
    if (countedScore > score) {
        evolve = '+++'
    } else if (countedScore < score) {
        evolve = '---'
    }


    console.log(countScore(deliveriesPizza, ingredients), `${evolve ? evolve : '='}`)
    console.log(Date.now() - start, 'ms')
}
// , 'b_little_bit_of_everything.in', 'c_many_ingredients.in', 'd_many_pizzas.in', 'e_many_teams.in' 
[{
        filename: 'a_example',
        score: 74
    },
    {
        filename: 'b_little_bit_of_everything.in',
        score: 11718
    },
    // {
    //     filename: 'c_many_ingredients.in',
    //     score: 706641129
    // }, {
    //     filename: 'd_many_pizzas.in',
    //     score: 7863202
    // }
    , {
        filename: 'e_many_teams.in',
        score: 10791641
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