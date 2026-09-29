export interface IRepository<T> {
    save(item: T): void;
    findAll(): T[];
}