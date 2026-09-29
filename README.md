# Library Management System

An in-memory library application written in TypeScript. It registers books and
users, lends and returns books, tracks available copies, and searches the
catalog by author or category.

## Requirements

- Node.js 24.10 or newer
- npm

Node runs the TypeScript source directly. No build step is needed.

## Get started

```bash
npm install
npm start
```

The example in [`src/index.ts`](src/index.ts) registers two books and two users,
lends one book, and prints the results of an author search and a category
search:

```text
Books by author:
- Clean Code | Robert C. Martin | Technology | 1 available
Books by category:
- The Hobbit | J. R. R. Tolkien | Fantasy | 1 available
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the example once. |
| `npm run dev` | Rerun the example when source files change. |
| `npm test` | Run the repository, strategy, and service tests. |
| `npm run typecheck` | Check TypeScript types without generating files. |

## How the project is organized

| Path | Responsibility |
| --- | --- |
| `src/entities/` | `Book`, `User`, and `Loan` models. `Book` controls stock through its methods. |
| `src/repositories/interfaces/` | Contracts for storing books, users, and loans. |
| `src/repositories/` | In-memory repositories backed by maps and an array. |
| `src/strategies/` | The search contract and author/category search implementations. |
| `src/services/LibraryService.ts` | Registration, loans, returns, and search using injected repository interfaces. |
| `tests/` | Automated checks for the domain behavior. |

Book and user IDs must be unique. A user cannot have two active loans for the
same book, and a book cannot be lent when no copies are available. Repository
methods report invalid operations with errors; `LibraryService` logs those
errors with `console.error` instead of throwing them to its caller. A failed
search returns an empty list. All data is lost when the process exits.

## Service methods

| Method | Behavior |
| --- | --- |
| `registerBook(books)` | Register a list of books. |
| `registerUser(users)` | Register a list of users. |
| `loanBook(userId, bookId)` | Lend a book and decrease its available copies. |
| `giveBackBook(userId, bookId)` | Record a return and restore one available copy. |
| `search(strategy, query)` | Return books matched by the chosen strategy. |

## Add another search criterion

Create a class in `src/strategies/` that implements `SearchStrategy.search`,
which receives the book list and a query and returns matching books. Pass an
instance to `LibraryService.search(strategy, query)`. The service does not need
to change when a new strategy is added.
