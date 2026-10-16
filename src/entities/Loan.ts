/**
 * Entidade que representa um Empréstimo no sistema.
 */
export default class Loan {
    private static instanceId: number = 1;
    public readonly id = Loan.instanceId++;

    constructor(
        public readonly userId: number,
        public readonly bookId: number
    ) {}
}