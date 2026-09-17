const dia = 1;

switch (dia) {
  case 1:
    console.log('Segunda-feira');
    break;
  case 2:
    console.log('Terça-feira');
    break;
  case 3:
    console.log('Quarta-feira');
    break;
  case 4:
    console.log('Quinta-feira');
    break;
  case 5:
    console.log('Sexta-feira');
    break;
  case 6:
    console.log('Sábado');
    break;
  default:
    console.log('Não há dia correspondente para o valor inserido.');
}

for (let i = 1; i <= 10; i++) {
  console.log(`5 X ${i} = ${5 * i}`);
}

let tabuada = 7;
let i = 1;

while (i <= 10) {
  console.log(`${tabuada} X ${i} = ${tabuada * i}`);
  i++;
}

const notas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let nota of notas) {
  if (nota < 7) {
    continue;
  }
  console.log(`${nota}`);
}
