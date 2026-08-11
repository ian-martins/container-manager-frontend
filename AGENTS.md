# Instruções para agentes de IA

## Visão geral
Este projeto é uma aplicação React + TypeScript + Vite com Tailwind CSS v4. A estrutura principal fica em src/; componentes reutilizáveis de interface estão em src/components/ui. Os pontos de entrada principais são src/main.tsx e src/App.tsx.

## Comandos principais
- npm install
- npm run dev
- npm run build
- npm run lint
- npm run preview

## Convenções de desenvolvimento
- Prefira componentes funcionais em TypeScript e use React hooks quando necessário.
- Mantenha as mudanças locais e compatíveis com a estrutura atual do projeto.
- Para interface, prefira classes Tailwind e componentes reutilizáveis em src/components/ui.
- Ao editar componentes baseados em UI, preserve o estilo já adotado e mantenha os imports compatíveis com o alias @/.
- Preserve acessibilidade básica, como labels e roles quando pertinente.
- Evite introduzir novas dependências ou bibliotecas de estado sem necessidade clara.

## Pontos de atenção
- O projeto está em fase inicial e pode ainda seguir um formato de template; o foco deve ser manter o código simples, limpo e consistente.
- Consulte [README.md](README.md) para contexto geral sobre o setup do projeto.
