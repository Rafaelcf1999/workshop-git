const diaDaSemana = 1;
let nomeDoDia;

switch (diaDaSemana) {
  case 1:
    nomeDoDia = "Domingo";
    break;
  case 2:
    nomeDoDia = "Segunda";
    break;
  case 3:
    nomeDoDia = "Terça";
    break;
  case 4:
    nomeDoDia = "Quarta";
    break;
  case 5:
    nomeDoDia = "Quinta";
    break;
  case 2:
    nomeDoDia = "Sexta";
    break;
  case 2:
    nomeDoDia = "Sabado";
    break;
  default:
    nomeDoDia = "Dia inválido";
}

console.log(nomeDoDia);