const dia = parseInt(Math.random()*7 + 1)

switch (dia) {
    case 1:
        console.log("domingo")
        break;
    case 2:
        console.log("segunda-feira")
        break;
    case 3:
        console.log("terca-feira")
        break;
    case 4:
        console.log("quarta-feira")
        break;
    case 5:
        console.log("quinta-feira")
        break;
    case 6:
        console.log("sexta-feira")
        break;
    case 7:
        console.log("sabado")
        break;
    default:
        console.log("dia invalido")
        break;
}

