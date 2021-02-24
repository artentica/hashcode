
const lineByLine = require('n-readlines');
const filePath = '../../problemStatement/'
const fs = require("fs")

function getIngredients(liner){
    const ingredients = []
    while (line = liner.next()) {
        ingredients.push(line.toString('ascii').split(' ').slice(1))
    }
    return ingredients
}

function deliver(nbTeam, sizeTeam, availablePizza, ingredients, uniqueIngredient){
    let pizzaReadyToShip = []
    for (let nb = 0; nb < nbTeam; nb++) {
        let pizzaOnTheTable = []
        if(availablePizza.size < sizeTeam) break
        let pizzaToAddIdx
        console.log(`team number: ${nb}`)
        for (let t = 0; t < sizeTeam; t++) {
            const totalIngredientOnPTheTable = new Set(pizzaOnTheTable.map(i => ingredients[i]).flat())


            const ingredientToPrioritize = new Set([...uniqueIngredient].filter(x => !totalIngredientOnPTheTable.has(x)))
            // console.log(ingredientToPrioritize)

            let maxScore = 0
            const maxIngPizza = ingredients[availablePizza.values().next().value].length
            for (let p of availablePizza){
                if (pizzaOnTheTable.includes(p)) continue

                if (pizzaOnTheTable.length == 0) {
                    pizzaToAddIdx = p
                    break;
                }

                const nexIngNb = ingredients[p].reduce((acc, curr) => {
                    return ingredientToPrioritize.has(curr) ? acc + 1 : acc
                }, 0)

                // console.log(maxIngPizza, nexIngNb)

                // If we have the max ing possible we stop the loop
                if(maxIngPizza == nexIngNb ){
                    pizzaToAddIdx = p
                    break
                }

                if(nexIngNb >= maxScore){
                    pizzaToAddIdx = p
                    maxScore = nexIngNb
                }        
            }
            pizzaOnTheTable.push(pizzaToAddIdx)
        }
        for (let idx of pizzaOnTheTable) {
            availablePizza.delete(idx)
        }
        pizzaReadyToShip.push(pizzaOnTheTable)
    }
    return pizzaReadyToShip
}

function outputFile(deliveriesPizza, fileName){
    let file = ''
    file += deliveriesPizza.length + '\n'
    for (let delivery of deliveriesPizza) {
        file += delivery.length + ' ' + delivery.join(' ') + '\n'
    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}

function computedNumberTeam( arg ){
    const [totalPizza, twoPTeam, threePTeam, fourPTeam] = arg

    const teams = [[fourPTeam, 4], [threePTeam, 3], [twoPTeam, 2]].reduce((accumulator, currentValue, idx) => {
        let pizzaRemaining = accumulator.reduce((acc, curr) => {return acc- curr[0] * curr [1]}, totalPizza)
        if(idx != 0 ) {
            if (currentValue[0] * currentValue[1] > pizzaRemaining && pizzaRemaining % currentValue[1] == 1 ) {
                accumulator[idx - 1][0] -= 1
                pizzaRemaining += accumulator[idx - 1][1]
            }
        }

        if(currentValue[0] * currentValue[1] > pizzaRemaining) {
            accumulator.push([Math.floor(pizzaRemaining/currentValue[1]), currentValue[1]])
        }else {
            accumulator.push([currentValue[0], currentValue[1]])
        }
        return accumulator
    }, [])
    teams.unshift(totalPizza)
    console.log(teams)
    return teams
}

function fileTreatment(fileName){

    
    const start = Date.now()

    const liner = new lineByLine(`${filePath}${fileName}`)
    let [totalPizza, fourPTeam, threePTeam, twoPTeam] = computedNumberTeam(liner.next().toString('ascii').split(' ').map(l => Number(l)))

    const ingredients = getIngredients(liner)

    const uniqueIngredient = new Set(ingredients.flat())
        
    let orderedPizzaIngredientLengthIdx = ingredients.map( (_, i) => i).sort((a, b) => ingredients[b].length - ingredients[a].length)
    
    let availablePizza = new Set(orderedPizzaIngredientLengthIdx)

    const deliveriesPizza = [fourPTeam,threePTeam,twoPTeam].reduce((accumulator, currentValue) => {
        console.log(`${currentValue[1]} people team`)        
        console.log(`${availablePizza.size} pizza remaining`)
        console.log(`-------------`)
        return accumulator.concat(deliver(currentValue[0],currentValue[1], availablePizza, ingredients, uniqueIngredient))
    }, [])      
    outputFile(deliveriesPizza, fileName)
    console.log(`Pizza to deliver: ${[fourPTeam, threePTeam, twoPTeam].reduce((acc, curr) => {return acc + curr[0] * curr[1]},0)}`)
    console.log(`Pizza delivered: ${deliveriesPizza.reduce((acc, curr) => {return acc + curr.length},0)}`)
    console.log(Date.now() - start,'ms')
}
// , 'b_little_bit_of_everything.in', 'c_many_ingredients.in', 'd_many_pizzas.in', 'e_many_teams.in' 
['a_example', 'b_little_bit_of_everything.in', 'c_many_ingredients.in', 'd_many_pizzas.in', 'e_many_teams.in' ].forEach(filename => {
    console.log(`============================================= ${filename} ==========================================`)
    fileTreatment(filename)
})
