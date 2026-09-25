/**
 * Entidade que representa um Usuário no sistema.
 */
export default class User {
    private static instanceId: number = 1;
    public readonly id = User.instanceId++;
    constructor(public readonly name: string) {}
}