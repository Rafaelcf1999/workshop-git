# Sistema de Gerenciamento de Biblioteca

Backend para gerenciamento de livros, usuários e empréstimos, desenvolvido em TypeScript com suporte nativo do Node.js.

## Funcionalidades

- Cadastro de livros e usuários.
- Registro de empréstimos e devoluções.
- Busca extensível de livros por diferentes critérios.
- Controle da quantidade de exemplares disponíveis.

## Requisitos

- Node.js 24.10 ou superior.

## Estrutura do projeto

```text
src/
|-- entities/                 # Entidades do domínio
|-- repositories/            # Implementações dos repositórios em memória
|   `-- interfaces/           # Contratos dos repositórios
|-- services/                 # Orquestração das regras de negócio
|-- strategies/               # Estratégias de busca de livros
`-- index.ts                  # Ponto de entrada da aplicação
```

## Execução

```bash
npm start
```

Para executar em modo de desenvolvimento, observando alterações nos arquivos:

```bash
npm run dev
```

## Demonstração

O ponto de entrada da aplicação:

1. instancia o serviço com os repositórios em memória;
2. cadastra dois livros e dois usuários;
3. realiza o empréstimo de um livro;
4. busca livros por autor e por categoria;
5. exibe os resultados no console.

## Arquitetura

O projeto utiliza Repository Pattern para separar o acesso aos dados, Strategy Pattern para permitir novos critérios de busca e injeção de dependência para manter o serviço desacoplado das implementações concretas.
