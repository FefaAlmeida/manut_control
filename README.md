# ManutControl — Painel de Gestão de Manutenção Industrial

O **ManutControl** é uma aplicação web moderna e responsiva desenvolvida para otimizar o acompanhamento, filtragem e execução de Ordens de Serviço (OS) no ambiente industrial, com foco nos desafios da **Indústria Atlas**. A plataforma resolve a descentralização de informações em planilhas e anotações, reunindo indicadores operacionais, cronogramas e monitoramento de equipamentos em um único painel intuitivo.

---

##  Arquitetura e Como o Projeto Foi Realizado

- **Fonte de Dados:** A base de dados simulada (`manutcontrol_dados.json`) fica centralizada no diretório `src/data/`.
- **Fluxo de Dados e Filtragem:** O arquivo principal (`page.jsx`) centraliza os estados reativos via React Hooks (`useState` e `useEffect`), realizando o tratamento, cruzamento de dados de equipamentos com ordens de serviço e filtragem dinâmica por busca, status e prioridade.
- **Arquitetura Modular:** O sistema foi dividido em componentes focados em responsabilidades únicas dentro da pasta `src/components/`, garantindo legibilidade, manutenção simplificada e reuso de código.
- **Responsividade Adaptativa:** O layout utiliza utilitários do Tailwind CSS baseados em `flex-col` e `grid-cols-1` para dispositivos móveis, transicionando suavemente para `flex-row` e layouts multicolunas (`lg`, `xl`) em telas de desktop.

---

##  Funcionalidades Principais

- **Dashboard de Indicadores (KPIs):** Visualização imediata do total de ordens abertas, ordens vencidas e máquinas paradas.
- **Tabela Interativa de Ordens de Serviço:** Exibição detalhada de OS com busca textual multifoco (código, descrição, técnico, equipamento) e filtros combinados de status e prioridade.
- **Quadros de Tarefas por Prioridade:** Agrupamento visual dinâmico em níveis de atenção (*Urgente*, *Alta*, *Média/Baixa*).
- **Agenda Diária de Manutenção:** Cronograma ordenado por horário para direcionar as rotinas diárias dos técnicos.
- **Monitoramento de Equipamentos Críticos:** Painel focado em ativos fora de operação ou em estado de alerta.
- **Checklist Funcional Reativo:** Marcação rápida de conclusão de tarefas diretamente pelos cards, que altera o status da OS para "concluída", recalculando indicadores e atualizando a tabela em tempo real (com suporte a restauração do status anterior).

---

##  Inovação do Aluno: Checklist de Tarefas Pendentes

### Qual problema a inovação resolve?
1. **Descentralização das demandas diárias:** Elimina a dúvida dos técnicos sobre qual atividade deve ser executada primeiro no chão de fábrica.
2. **Atraso na atualização do sistema:** Resolve a falta de baixa em OS concluídas, problema comum quando a alteração de status exige navegação por menus complexos.

### Benefícios para a equipe de manutenção
- **Visibilidade imediata:** O líder de manutenção consegue visualizar instantaneamente gargalos e dimensionar a equipe de acordo com a prioridade real.
- **Agilidade no chão de fábrica:** O técnico conclui a tarefa com um único clique no checklist do painel principal, mantendo a base de dados atualizada em tempo real.

---

##  Requisitos Opcionais Implementados

- **Paginação de Dados (Item 5):** Implementação do componente `pagination.jsx` na tabela principal para limitar a exibição a 12 itens por página, garantindo performance e navegação limpa.
- **Menu Lateral Recolhível (Item 6):** Desenvolvimento do componente `sidebar.jsx`. Em telas de desktop, o menu inicia aberto e pode ser recolhido para expandir a área de trabalho. Em dispositivos móveis, inicia fechado e é exibido como um menu sobreposto com efeito de sombra (*backdrop overlay*).

---

##  Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Linguagem:** JavaScript (ES6+) / JSX
- **Gerenciamento de Estado:** React `useState` / `useEffect`

---

##  Estrutura do Projeto

```text
src/
├── app/
│   └── page.jsx                 # Página principal (Dashboard & Estados Globais)
├── components/
│   ├── sidebar.jsx              # Navegação lateral responsiva (drawer)
│   ├── header.jsx               # Cabeçalho do sistema e saudações
│   ├── indicatorCard.jsx        # Cards de estatísticas (KPIs)
│   ├── searchFilters.jsx        # Barra de busca e seletores de filtro
│   ├── workOrderList.jsx        # Tabela e gerenciamento de lista de OS
│   ├── workOrderRow.jsx         # Linha individual da tabela de OS
│   ├── checkBox.jsx             # Card de checklist agrupado por prioridade
│   ├── pagination.jsx           # Controle e navegação de paginação
│   ├── PriorityBadge.jsx        # Tag visual estilizada por prioridade
│   ├── StatusBadge.jsx          # Tag visual estilizada por status
│   ├── dailySchedule.jsx        # Painel da agenda do dia
│   └── criticalEquipment.jsx    # Lista de equipamentos em estado crítico
└── data/
    └── manutcontrol_dados.json  # Mock de dados do sistema