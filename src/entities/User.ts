export class User {
    public name: string;
    public readonly id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}