const notas = [0,1,2,3,4,5,6,7,8,9,10]
for (let nota of notas){
  if (nota < 7){
    continue
  }
  console.log(`${nota}`)
}