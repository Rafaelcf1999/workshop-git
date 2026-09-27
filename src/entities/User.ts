/* 
User - Propriedades id (number) e name (string), ambas somente leitura (readonly)
*/

export class User{
    constructor(
        public readonly id: number,
        public readonly name: string
    ){}
}

