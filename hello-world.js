/* const dia = 1; // Dia da semana

switch (dia) {
  case 1:
    console.log("Domingo");
    break;

  case 2:
    console.log("Segunda-feira");
    break;

  case 3:
    console.log("Terça-feira");
    break;

  case 4:
    console.log("Quarta-feira");
    break;

  case 5:
    console.log("Quinta-feira");
    break;

  case 6:
    console.log("Sexta-feira");
    break;

  case 7:
    console.log("Sábado");
    break;

  default:
    console.log("Opção inválida! Escolha um número de 1 a 7.");
}
    */// For
   /* for (let i = 1; i <= 10; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

*/ //While

/*
const tabuada = 9;
let i = 1;

while (i <= 10) {
  console.log(`${tabuada} x ${i} = ${tabuada * i}`);
  i++;
}
*/

//ForOff

const notas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let nota of notas) {
  if (nota < 7) {
    continue;
  }

  console.log(`${nota}`);
}