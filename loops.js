// const tabuada = 7

// for (let i = 1; i <= 10; i++) {
//   console.log(`${tabuada} x ${i} = ${tabuada * i}`);
// }

// let i = 1
// while (i <= 10) {
//   console.log(`${tabuada} x ${i} = ${tabuada * i}`);
//   i++
// }

const notas = [0,1,2,3,4,5,6,7,8,9,10];
for (let nota of notas) {
  if (nota < 7) {
    continue;
  }
  console.log(`Nota: ${nota}`);
}
