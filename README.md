# ManutControl — Painel de Gestão de Manutenção Industrial

O **ManutControl** é uma aplicação web moderna e responsiva desenvolvida para otimizar o acompanhamento, filtragem e execução de Ordens de Serviço (OS) no ambiente industrial, com foco nos desafios da **Indústria Atlas**. A plataforma resolve a descentralização de informações em planilhas e anotações, reunindo indicadores operacionais, cronogramas e monitoramento de equipamentos em um único painel intuitivo.

---

## Como Executar o Projeto

### Pré-requisitos

- **Node.js 20.9 ou superior** (exigência do Next.js 16)
- **npm** (instalado junto com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd manut_control

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Depois disso, acesse **http://localhost:3000** no navegador. A página recarrega automaticamente a cada alteração salva no código.

> Caso a porta 3000 já esteja ocupada, o Next.js seleciona a próxima porta livre e informa o endereço correto no terminal.


## Arquitetura e Como o Projeto Foi Realizado

- **Fonte de Dados:** A base de dados simulada (`manutcontrol_dados.json`) fica centralizada no diretório `src/data/`.
- **Fluxo de Dados e Filtragem:** O arquivo principal (`page.jsx`) centraliza os estados reativos via React Hooks (`useState` e `useEffect`), realizando o tratamento, cruzamento de dados de equipamentos com ordens de serviço e filtragem dinâmica por busca, status e prioridade.
- **Arquitetura Modular:** O sistema foi dividido em componentes focados em responsabilidades únicas dentro da pasta `src/components/`, garantindo legibilidade, manutenção simplificada e reuso de código.
- **Responsividade Adaptativa:** O layout utiliza utilitários do Tailwind CSS baseados em `flex-col` e `grid-cols-1` para dispositivos móveis, transicionando suavemente para `flex-row` e layouts multicolunas (`lg`, `xl`) em telas de desktop.
---

## Funcionalidades Principais

- **Dashboard de Indicadores (KPIs):** Visualização imediata do total de ordens abertas, ordens vencidas e máquinas paradas.
- **Tabela Interativa de Ordens de Serviço:** Exibição detalhada de OS com busca textual multifoco (código, descrição, técnico, equipamento) e filtros combinados de status e prioridade.
- **Quadros de Tarefas por Prioridade:** Agrupamento visual dinâmico em níveis de atenção (*Urgente*, *Alta*, *Média/Baixa*).
- **Agenda Diária de Manutenção:** Cronograma ordenado por horário para direcionar as rotinas diárias dos técnicos.
- **Monitoramento de Equipamentos Críticos:** Painel focado em ativos fora de operação ou em estado de alerta.
- **Checklist Funcional Reativo:** Marcação rápida de conclusão de tarefas diretamente pelos cards, que altera o status da OS para "concluída", recalculando indicadores e atualizando a tabela em tempo real (com suporte a restauração do status anterior).

---

## Inovação do Aluno: Checklist de Tarefas Pendentes

### Qual problema a inovação resolve?
1. **Descentralização das demandas diárias:** Elimina a dúvida dos técnicos sobre qual atividade deve ser executada primeiro no chão de fábrica.
2. **Atraso na atualização do sistema:** Resolve a falta de baixa em OS concluídas, problema comum quando a alteração de status exige navegação por menus complexos.

### Benefícios para a equipe de manutenção
- **Visibilidade imediata:** O líder de manutenção consegue visualizar instantaneamente gargalos e dimensionar a equipe de acordo com a prioridade real.
- **Agilidade no chão de fábrica:** O técnico conclui a tarefa com um único clique no checklist do painel principal, mantendo a base de dados atualizada em tempo real.

---

## Requisitos Opcionais Implementados

- **Paginação de Dados (Item 5):** Implementação do componente `pagination.jsx` na tabela principal para limitar a exibição a 9 itens por página, garantindo performance e navegação limpa.
- **Menu Lateral Recolhível (Item 6):** Desenvolvimento do componente `sidebar.jsx`. Em telas de desktop, o menu inicia aberto e pode ser recolhido para expandir a área de trabalho. Em dispositivos móveis, inicia fechado e é exibido como um menu sobreposto com efeito de sombra (*backdrop overlay*).

---

## Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, React 19)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Linguagem:** JavaScript (ES6+) / JSX
- **Gerenciamento de Estado:** React `useState` / `useEffect`
- **Qualidade de Código:** ESLint 9 com `eslint-config-next`

---

## Estrutura do Projeto

```text
manut_control/
├── public/                          # Ícones e logo servidos estaticamente
│   ├── logo.png                     # Marca exibida na sidebar
│   ├── home.png                     # Ícones de navegação do menu lateral
│   ├── prancheta.png
│   ├── configuracoes.png
│   ├── pessoas.png
│   ├── menu.png                     # Botão de abrir/recolher a sidebar
│   ├── seta.png
│   ├── sininho.png                  # Notificações do cabeçalho
│   ├── perfil.png
│   ├── sair.png
│   ├── relogio.png                  # Ícones dos cards de indicadores
│   └── pause.png
├── src/
│   ├── app/
│   │   ├── layout.jsx               # Layout raiz: fontes, metadados e <html>
│   │   ├── globals.css              # Estilos globais e importação do Tailwind
│   │   ├── page.jsx                 # Página principal (Dashboard & Estados Globais)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── sidebar.jsx              # Navegação lateral responsiva (drawer)
│   │   ├── header.jsx               # Cabeçalho do sistema e saudações
│   │   ├── indicatorCard.jsx        # Cards de estatísticas (KPIs)
│   │   ├── searchFilters.jsx        # Barra de busca e seletores de filtro
│   │   ├── workOrderList.jsx        # Tabela e gerenciamento de lista de OS
│   │   ├── workOrderRow.jsx         # Linha individual da tabela de OS
│   │   ├── checkBox.jsx             # Card de checklist agrupado por prioridade
│   │   ├── pagination.jsx           # Controle e navegação de paginação
│   │   ├── PriorityBadge.jsx        # Tag visual estilizada por prioridade
│   │   ├── StatusBadge.jsx          # Tag visual estilizada por status
│   │   ├── dailySchedule.jsx        # Painel da agenda do dia
│   │   └── criticalEquipment.jsx    # Lista de equipamentos em estado crítico
│   └── data/
│       └── manutcontrol_dados.json  # Mock de dados do sistema
├── jsconfig.json                    # Alias de importação: @/* aponta para ./src/*
├── next.config.mjs                  # Configuração do Next.js
```

> Os componentes são importados pelo alias `@/`, definido em `jsconfig.json`. Por exemplo, `@/components/sidebar` resolve para `src/components/sidebar.jsx`.

---

## Modelo de Dados

Todo o sistema é alimentado pelo arquivo `src/data/manutcontrol_dados.json`, que possui quatro chaves na raiz:

```jsonc
{
  "empresa": "Indústria Atlas",   // Nome exibido no painel
  "usuario": "Rafael Almeida",    // Usuário logado (saudação do cabeçalho)
  "equipamentos": [ ... ],        // 10 ativos cadastrados
  "ordensServico": [ ... ]        // 12 ordens de serviço
}
```

### `equipamentos[]`

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | number | Identificador único, referenciado por `ordensServico.equipamentoId`. |
| `codigo` | string | Código do ativo (ex.: `MTR-020`). |
| `nome` | string | Nome descritivo do equipamento. |
| `setor` | string | Setor onde o ativo está instalado (ex.: `Bombas`, `Prensas`). |
| `status` | string | `operando` \| `atencao` \| `em manutencao` \| `parado` |
| `ultimaManutencao` | string | Data da última manutenção no formato `AAAA-MM-DD`. |
| `criticidade` | string | `baixa` \| `media` \| `alta` |

```json
{
  "id": 1,
  "codigo": "MTR-020",
  "nome": "Motor 20 CV - Bomba de Recalque 2",
  "setor": "Bombas",
  "status": "parado",
  "ultimaManutencao": "2026-08-02",
  "criticidade": "alta"
}
```

### `ordensServico[]`

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | number | Identificador único da ordem. |
| `codigo` | string | Código visível da OS (ex.: `OS-2026-0847`). |
| `descricao` | string | Serviço a ser executado. |
| `equipamentoId` | number | Chave que referencia o `id` de um item de `equipamentos`. |
| `tipo` | string | `corretiva` \| `preventiva` \| `preditiva` |
| `prioridade` | string | `baixa` \| `media` \| `alta` \| `urgente` |
| `tecnico` | string | Responsável pela execução. |
| `vencimento` | string | Prazo no formato `AAAA-MM-DD` (convertido para `DD/MM/AAAA` na interface). |
| `status` | string | `planejada` \| `aberta` \| `em andamento` \| `concluida` \| `vencida` |
| `horarioAgendado` | string \| null | Horário `HH:MM` da agenda do dia; quando ausente, a OS não aparece no cronograma. |

```json
{
  "id": 847,
  "codigo": "OS-2026-0847",
  "descricao": "Trocar rolamento do motor",
  "equipamentoId": 1,
  "tipo": "corretiva",
  "prioridade": "urgente",
  "tecnico": "João Pereira",
  "vencimento": "2026-08-17",
  "status": "vencida",
  "horarioAgendado": "08:00"
}
```

Na inicialização, o `page.jsx` cruza as duas listas por `equipamentoId` e anexa o objeto completo do equipamento a cada ordem, o que permite buscar por nome ou código do ativo diretamente na tabela de OS.

---

## Autoria

Projeto desenvolvido por **Fernanda Gabriela**.