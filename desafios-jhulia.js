const idade = 18;
if(idade >= 18){
    console.log("Você é maior de idade");
}else{
    console.log("Você é menor de idade");
}

const dia = "1";
switch(dia){
    case ("1"):
    console.log("Domingo");
        break;
    case ("2"):
        console.log("Segunda-feira");
        break;
    case ("3"):
        console.log("Terça-feira");
        break;
    case ("4"):
        console.log("Quarta-feira");
        break;
    case ("5"):
        console.log("Quinta-feira");
        break;
    case ("6"):
        console.log("Sexta-feira");
        break;
    case ("7"):
        console.log("Sábado");
        break;
    default:
        console.log("Dia inválido");
        break;
}

let i = 1;
const tabuada = 5;
while(i <= 10){
    console.log(`${tabuada} x ${i} = ${tabuada * i}`);
    i++;
}

const notas = [5, 6, 7, 8, 9, 10];
for (let nota of notas){
    if(nota < 7){
        continue;
    }
    console.log(`Nota: ${nota}`);
}