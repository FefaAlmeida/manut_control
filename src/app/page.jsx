"use client";
import { useState } from 'react';
import dados from '@/data/manutcontrol_dados.json';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import IndicatorCard from '@/components/indicatorCard';
import SearchFilters from '@/components/searchFilters';
import WorkOrderList from '@/components/workOrderList';
import DailySchedule from '@/components/dailySchedule';
import CriticalEquipment from '@/components/criticalEquipment';

// --- Preparação dos dados (roda uma vez, fora do componente) ---

// Dicionário id -> equipamento, para achar o equipamento de cada ordem
const equipamentosPorId = new Map(dados.equipamentos.map((e) => [e.id, e]));

function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Cada ordem ganha o objeto do equipamento e a data já formatada
const ordens = dados.ordensServico.map((ordem) => ({
  ...ordem,
  equipamento: equipamentosPorId.get(ordem.equipamentoId),
  vencimentoFormatado: formatarData(ordem.vencimento),
}));

// Indicadores calculados a partir dos arrays (nunca escritos na mão)
const totalAbertas = ordens.filter((o) => o.status === 'aberta').length;
const totalVencidas = ordens.filter((o) => o.status === 'vencida').length;
const totalParados = dados.equipamentos.filter((e) => e.status === 'parado').length;

// Agenda do dia: só ordens com horário, ordenadas pelo horário
const agenda = ordens
  .filter((o) => o.horarioAgendado)
  .sort((a, b) => a.horarioAgendado.localeCompare(b.horarioAgendado));

// Equipamentos críticos: tudo que não está operando
const equipamentosCriticos = dados.equipamentos.filter((e) => e.status !== 'operando');

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [busca, setBusca] = useState('');

  // Busca por código, descrição, equipamento ou técnico
  const termo = busca.trim().toLowerCase();
  const ordensFiltradas = ordens.filter((ordem) =>
    [ordem.codigo, ordem.descricao, ordem.equipamento.nome, ordem.tecnico].some((campo) =>
      campo.toLowerCase().includes(termo)
    )
  );

  const primeiroNome = dados.usuario.split(' ')[0];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenMenu={() => setIsSidebarOpen(true)} usuario={dados.usuario} />

        <main className="p-4 md:p-6 flex flex-col gap-6">
          {/* Saudação + ação principal */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Bom dia, {primeiroNome}</h1>
              <p className="text-sm text-slate-500">Veja o que precisa de atenção hoje</p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              + Nova ordem
            </button>
          </div>

          {/* Indicadores */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <IndicatorCard valor={totalAbertas} descricao="ordens abertas" corDoPonto="bg-blue-600" />
            <IndicatorCard valor={totalVencidas} descricao="vencidas" corDoPonto="bg-red-600" />
            <IndicatorCard valor={totalParados} descricao="equipamentos parados" corDoPonto="bg-amber-500" />
          </div>

          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
              <h2 className="text-base font-semibold text-slate-900">Ordens que exigem atenção</h2>
              <SearchFilters valor={busca} onChange={setBusca} />
              <WorkOrderList ordens={ordensFiltradas} />
            </section>

            <div className="flex flex-col gap-6">
              <DailySchedule itens={agenda} />
              <CriticalEquipment equipamentos={equipamentosCriticos} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
