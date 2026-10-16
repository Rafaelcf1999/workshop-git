export default interface SearchStrategy<T> {
    search(items: T[], termo: string): T[];
}