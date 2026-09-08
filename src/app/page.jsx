"use client";

import { useState, useEffect } from 'react';
import dados from '@/data/manutcontrol_dados.json';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import IndicatorCard from '@/components/indicatorCard';
import SearchFilters from '@/components/searchFilters';
import WorkOrderList from '@/components/workOrderList';
import DailySchedule from '@/components/dailySchedule';
import CriticalEquipment from '@/components/criticalEquipment';
import CheckBox from '@/components/checkBox';

// --- Processamento inicial de dados ---
const equipamentosPorId = new Map(dados.equipamentos.map((e) => [e.id, e]));

function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

const ordensIniciais = dados.ordensServico.map((ordem) => ({
  ...ordem,
  equipamento: equipamentosPorId.get(ordem.equipamentoId),
  vencimentoFormatado: formatarData(ordem.vencimento),
}));

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Estado principal reativo das ordens
  const [listaOrdens, setListaOrdens] = useState(ordensIniciais);

  // Estados dos filtros
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('');
  const [prioridade, setPrioridade] = useState('');

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  // 1. Alterar status via Select (Tabela Principal)
  const handleMudarStatus = (id, novoStatus) => {
    setListaOrdens((prevOrdens) =>
      prevOrdens.map((ordem) =>
        ordem.id === id ? { ...ordem, status: novoStatus } : ordem
      )
    );
  };

  // 2. Alternar CheckBox (Cards de Ação Rápida com Undo/Restauração)
  const handleConcluirOrdem = (id) => {
    setListaOrdens((prevOrdens) =>
      prevOrdens.map((ordem) => {
        if (ordem.id !== id) return ordem;

        if (ordem.status === 'concluida') {
          return {
            ...ordem,
            status: ordem.statusAnterior || 'aberta',
          };
        }

        return {
          ...ordem,
          statusAnterior: ordem.status,
          status: 'concluida',
        };
      })
    );
  };

  // Filtragem dinâmica
  const termo = busca.trim().toLowerCase();
  const ordensFiltradas = listaOrdens.filter((ordem) => {
    const matchBusca = !termo || [
      ordem.codigo,
      ordem.os,
      ordem.descricao,
      ordem.equipamento?.nome,
      ordem.equipamento?.codigo,
      ordem.tecnico,
    ].some((campo) => campo?.toLowerCase().includes(termo));

    const matchStatus = !status || ordem.status?.toLowerCase() === status.toLowerCase();
    const matchPrioridade = !prioridade || ordem.prioridade?.toLowerCase() === prioridade.toLowerCase();

    return matchBusca && matchStatus && matchPrioridade;
  });

  // Indicadores calculados dinamicamente
  const totalAbertas = listaOrdens.filter((o) => o.status === 'aberta').length;
  const totalVencidas = listaOrdens.filter((o) => o.status === 'vencida').length;
  const totalParados = dados.equipamentos.filter((e) => e.status === 'parado').length;

  const agenda = listaOrdens
    .filter((o) => o.horarioAgendado)
    .sort((a, b) => a.horarioAgendado.localeCompare(b.horarioAgendado));

  const equipamentosCriticos = dados.equipamentos.filter((e) => e.status !== 'operando');
  const primeiroNome = dados.usuario ? dados.usuario.split(' ')[0] : 'Usuário';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Header 
          onOpenMenu={() => setIsSidebarOpen((prev) => !prev)} 
          usuario={dados.usuario} 
        />

        <main className="flex flex-col gap-6 p-4 md:p-6">
          {/* Cabeçalho / Saudação */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Bom dia, {primeiroNome}
              </h1>
              <p className="text-sm text-slate-500">
                Veja o que precisa de atenção hoje
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              + Nova ordem
            </button>
          </div>

          {/* Cards Indicadores */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <IndicatorCard 
              valor={totalAbertas} 
              descricao="ordens abertas" 
              corDoPonto="bg-blue-600" 
            />
            <IndicatorCard 
              valor={totalVencidas} 
              descricao="vencidas" 
              corDoPonto="bg-red-600" 
            />
            <IndicatorCard 
              valor={totalParados} 
              descricao="equipamentos parados" 
              corDoPonto="bg-amber-500" 
            />
          </div>

          {/* Grid Geral do Dashboard */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Coluna Principal (Esquerda): Tabela + Cards Empilhados */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              
              {/* Tabela de Ordens */}
              <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  Ordens que exigem atenção
                </h2>

                <SearchFilters 
                  valor={busca} 
                  onChange={setBusca}
                  status={status}
                  onStatusChange={setStatus}
                  prioridade={prioridade}
                  onPrioridadeChange={setPrioridade}
                />

                <div className="w-full overflow-x-auto">
                  <WorkOrderList 
                    ordens={ordensFiltradas} 
                    onMudarStatus={handleMudarStatus} 
                  />
                </div>
              </section>

              {/* Cards de Tarefas Empilhados Responsivos (1 por linha) */}
              <div className="grid grid-cols-1 gap-4 w-full xl:grid-cols-3">
                <CheckBox 
                  ordens={listaOrdens} 
                  onToggleOrdem={handleConcluirOrdem}
                  prioridade="urgente" 
                  titulo="Tarefas Urgentes" 
                />

                <CheckBox 
                  ordens={listaOrdens} 
                  onToggleOrdem={handleConcluirOrdem}
                  prioridade="alta" 
                  titulo="Alta Prioridade" 
                />

                <CheckBox 
                  ordens={listaOrdens} 
                  onToggleOrdem={handleConcluirOrdem}
                  prioridade={["media", "baixa"]} 
                  titulo="Outras Tarefas" 
                />
              </div>

            </div>

            {/* Coluna Lateral (Direita): Agenda e Equipamentos Críticos */}
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