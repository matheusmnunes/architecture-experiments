# Architecture Experiments

Este projeto reúne experimentos sobre organização e integração de aplicações, com foco em manter uma arquitetura simples, navegável e fácil de adaptar.

A proposta não é apresentar uma arquitetura definitiva ou pronta para produção. O repositório funciona como um espaço para testar abordagens, avaliar responsabilidades entre camadas e registrar ideias que possam servir de base para outros projetos.

Os experimentos também ajudam a identificar soluções que possam ser extraídas e evoluir de forma independente, seja como biblioteca, serviço ou ferramenta reutilizável. Projetos como `query-fragments` e `easy-pdf-generator` nasceram dessa exploração.

Entre os conceitos explorados estão:

- separação entre rotas, controllers, services e repositories;
- validação de entrada e saída na fronteira HTTP;
- uso de schemas e DTOs para definir contratos;
- composição de consultas com o `query-fragments`;
- integração com o `easy-pdf-generator` para geração de PDFs;
- configuração e execução dos serviços com Docker Compose.

O serviço principal está em `services/core-api`. Algumas implementações ainda são experimentais e podem mudar conforme novas alternativas forem testadas.

## Execução

Crie o arquivo de configuração a partir do exemplo:

```bash
cp .env.example .env
```

Revise os valores do `.env` e inicie os serviços:

```bash
docker compose up
```

## Projetos relacionados

- `query-fragments`: composição de consultas SQL.
- `easy-pdf-generator`: geração de documentos PDF.

## Status

Projeto experimental em evolução. As abordagens presentes neste repositório representam estudos e possibilidades.
