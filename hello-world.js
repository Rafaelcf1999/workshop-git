const dia = 4;

switch (dia) {
  case 1:
    console.log("Domingo");
    break;
  case 2:
    console.log("Segunda-Feira");
    break;
  case 3:
    console.log("Terça-Feira");
    break;
  case 4:
    console.log("Quarta-Feira");
    break;
  case 5:
    console.log("Quinta-Feira");
    break;
  case 6:
    console.log("Sexta-Feira");
    break;
  case 7:
    console.log("Sábado-Feira");
    break;
  default:
    console.log("Valor inválido! (somente 1-7 são válidos)");
}

console.log("\n");

///////////////////////////////////////////////////////////////////////

for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

console.log("\n");

///////////////////////////////////////////////////////////////////////

const tabuada = 7;
let i = 1;

while (i <= 10) {
  console.log(`${tabuada} x ${i} = ${tabuada * i}`);
  i++;
}

console.log("\n");

///////////////////////////////////////////////////////////////////////

const alunos = [
  { nome: "Paulo", nota: 7 },
  { nome: "Marcela", nota: 9 },
  { nome: "João", nota: 5 },
  { nome: "Maicom", nota: 2 },
];

for (let aluno of alunos) {
  if (aluno.nota < 7) {
    continue;
  }
  console.log(`${aluno.nome} foi aprovado(a) com a nota = ${aluno.nota}`);
}

console.log("\n");

///////////////////////////////////////////////////////////////////////

const usuario = {
  nome: "Guilherme",
  amigos: ["Paulo", "Marcela", "João", "Maicom"],
  idade: 22,
  empregado: true,
};

for (let chave in usuario) {
  console.log(`${chave} = ${usuario[chave]}`);
}

console.log("\n");

///////////////////////////////////////////////////////////////////////
