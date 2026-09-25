export default class User {
    public static instanceId: number = 1;
    public readonly id = User.instanceId++;
    constructor(public readonly name: string) {}
}