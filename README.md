
# Sistema de Gerenciamento de Biblioteca

    Resolução em TypeScript para o desafio do Bootcamp.

## Autor
    Anderson F. Martins

## Estrutura

    src/
        entities/            Book, User, Loan
        repositories/
            interfaces/      IBookRepository, IUserRepository, ILoanRepository
            BookRepository.ts
            UserRepository.ts
            LoanRepository.ts
        strategies/           Strategy Pattern para buscas extensíveis
            SearchStrategy.ts
            SearchByAuthorStrategy.ts
            SearchByCategoryStrategy.ts
        services/
            LibraryService.ts   Orquestra tudo, depende só das interfaces
        index.ts                Demonstração
    