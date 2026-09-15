let numero = 9

console.log("Tabuada com for")
for(let i = 1; i <= 10; i++){
    console.log(`${numero} X ${i} = ${numero * i}`)
}

console.log("------------------------")

console.log("Tabuada com while")
let j = 1
while(j <= 10){
    console.log(`${numero} X ${j} = ${numero * j}`)
    j++
}

console.log("------------------------")

console.log("Ver somente notas iguais ou maiores que 7 (com for of)")
notas = [5, 6, 2, 1, 4, 3, 9, 8, 7, 10, 5, 2, 3, 1, 4, 6, 8, 7, 9]
for(let nota of notas){
    if(nota < 7){
continue
}
console.log(nota)
}