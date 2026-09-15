const numero = 3;
let dia;

switch (numero) {
  case 1:
    dia = "Domingo";
    break;
  case 2:
    dia = "Segunda-feira";
    break;
  case 3:
    dia = "Terça-feira";
    break;
  case 4:
    dia = "Quarta-feira";
    break;
  case 5:
    dia = "Quinta-feira";
    break;
  case 6:
    dia = "Sexta-feira";
    break;
  case 7:
    dia = "Sábado";
    break;
  default:
    dia = "Número inválido";
}

console.log(dia);