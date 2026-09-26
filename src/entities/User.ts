//propriedades readonly: id(number), name(string)

export class User{
    constructor(
        public readonly id: number,
        public readonly name: string
    ){}
}