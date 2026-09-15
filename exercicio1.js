let dia = 5

switch (dia) {
    case 1:
        console.log("Domingo")
        break;
    case 2:
        console.log("Segunda")
        break
    case 3:
        console.log("Terça")
        break
    case 4:
        console.log("Quarta")
        break
    case 5:
        console.log("Quinta")
        break
    case 6:
        console.log("Sexta")
        break
    case 7:
        console.log("Sabado")
        break
    default:
        console.log("Numero invalido! Digite um valor entre 1 e 7.");
        break;
}



const notas = [5, 6, 7, 8, 9, 10];
for (let nota of notas){
    if(nota < 7){
        continue;
    }
    console.log(`Nota: ${nota}`);
}