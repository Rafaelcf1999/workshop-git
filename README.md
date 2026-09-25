# Ambiente TypeScript

Baseada na estrutura de `Desafio-bootcamp`, sem classes ou implementação.

Requisito: Node.js 24.10 ou superior, com npm.

## Estrutura

```text
src/
  entities/
  repositories/
    interfaces/
  services/
  strategies/
tests/
```

As pastas estão vazias intencionalmente. O Git não versiona pastas vazias.
Para recriá-las após clonar, execute no PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path src/entities, src/repositories/interfaces, src/services, src/strategies, tests
```

## Comandos

```sh
npm ci
npm run typecheck
npm start
npm run dev
npm test
```

- `npm ci`: instala as dependências nas versões registradas no lockfile.
- `npm run typecheck`: verifica os tipos; enquanto não houver arquivos `.ts`, o TypeScript informa que não encontrou arquivos de entrada (TS18003).
- `npm start`: executa `src/index.ts`, depois que você criar esse arquivo.
- `npm run dev`: executa o mesmo arquivo e reinicia quando houver alterações.
- `npm test`: executa os arquivos `tests/*.test.ts`, depois que você criar os testes.

O Node executa TypeScript diretamente, sem etapa de build. Use a extensão `.ts` nos imports locais e `import type` para importar apenas tipos. A verificação de tipos é feita separadamente com `npm run typecheck`.

No PowerShell, se `npm` for bloqueado pela política de scripts, use `npm.cmd` nos comandos acima.
