# 🏛️ Documentação de Arquitetura - Core API

Esta aplicação segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, focando no isolamento das regras de negócio e na escalabilidade através de microsserviços.

## 📂 Estrutura de Pastas

```text
src/
├── domain/             # 🧠 Camada de Domínio (O Coração)
│   ├── entities/       # Modelos ricos com lógica de estado (.entity.ts)
│   ├── services/       # Regras complexas multi-entidade (.service.ts)
│   └── interfaces/     # Contratos de repositórios e serviços externos (.interface.ts)
│
├── v1/                 # 🌐 Camada de Aplicação (A Casca)
│   ├── controllers/    # Gestão de entrada/saída HTTP (.controller.ts)
│   ├── dtos/           # Schemas de validação Zod (.dto.ts)
│   ├── middlewares/    # Filtros de rota (Auth, Validation) (.middleware.ts)
│   ├── repositories/   # Implementações de banco de dados (.repository.ts)
│   ├── routes/         # Definição de endpoints REST (.routes.ts)
│   └── services/       # Orquestradores de casos de uso (.service.ts)
│
└── server.ts           # 🚀 Ponto de entrada da aplicação