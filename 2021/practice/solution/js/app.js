
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

function deliver(nbTeam, sizeTeam, orderedPizzaIngredientLengthIdx){
    const temp = []
    for(i = 0; i < nbTeam; i++){
        if(orderedPizzaIngredientLengthIdx.length >= sizeTeam) {
            temp.push(orderedPizzaIngredientLengthIdx.splice(0, sizeTeam))
        } else break
    }
    return temp
}

function outputFile(deliveriesPizza, fileName){
    let file = ''
    file += deliveriesPizza.length + '\n'
    for (let delivery of deliveriesPizza) {
        file += delivery.length + ' ' + delivery.join(' ') + '\n'
    }
    fs.writeFileSync(`${fileName.split('.')[0]}.out`, file)
}

function fileTreatment(fileName){
    const liner = new lineByLine(`${filePath}${fileName}`)
    const [twoPTeam,threePTeam,fourPTeam] = liner.next().toString('ascii').split(' ').slice(1).map(l => Number(l))

    const ingredients = getIngredients(liner)

    const orderedPizzaIngredientLength = ingredients.sort((a, b) => b.length - a.length)

    let orderedPizzaIngredientLengthIdx = orderedPizzaIngredientLength.map( (_, i) => i)
    
    const deliveriesPizza = deliver(fourPTeam, 4, orderedPizzaIngredientLengthIdx).concat(deliver(threePTeam, 3, orderedPizzaIngredientLengthIdx)).concat(deliver(twoPTeam, 2, orderedPizzaIngredientLengthIdx))
    
    

    outputFile(deliveriesPizza, fileName)

}

['a_example', 'b_little_bit_of_everything.in', 'c_many_ingredients.in', 'd_many_pizzas.in', 'e_many_teams.in' ].forEach(filename => {
    fileTreatment(filename)
})
