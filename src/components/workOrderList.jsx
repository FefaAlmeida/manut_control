import { useState, useEffect } from 'react';
import WorkOrderRow from '@/components/workOrderRow';

export default function WorkOrderList({ ordens = [] }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 9; 

  useEffect(() => {
    setPaginaAtual(1);
  }, [ordens.length]);

  if (!ordens || ordens.length === 0) {
    return (
      <div className="w-full rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500">
        Nenhuma ordem encontrada.
      </div>
    );
  }

  // Cálculos da Paginação
  const totalItens = ordens.length;
  const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const ordensPaginadas = ordens.slice(inicio, inicio + ITENS_POR_PAGINA);

  const itemInicial = inicio + 1;
  const itemFinal = Math.min(paginaAtual * ITENS_POR_PAGINA, totalItens);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Tabela com Scroll Horizontal se necessário */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="whitespace-nowrap px-6 py-3">OS</th>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Equipamento</th>
              <th className="whitespace-nowrap px-6 py-3">Prioridade</th>
              <th className="whitespace-nowrap px-6 py-3">Técnico</th>
              <th className="whitespace-nowrap px-6 py-3">Vencimento</th>
              <th className="whitespace-nowrap px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ordensPaginadas.map((ordem) => (
              <WorkOrderRow key={ordem.id} ordem={ordem} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Barra de Paginação Integrada ao Rodapé */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-3 text-xs text-slate-500 sm:flex-row">
        <div>
          Exibindo <span className="font-semibold text-slate-700">{itemInicial}</span> a{' '}
          <span className="font-semibold text-slate-700">{itemFinal}</span> de{' '}
          <span className="font-semibold text-slate-700">{totalItens}</span> resultados
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="px-2">
            Página <strong className="text-slate-800">{paginaAtual}</strong> de{' '}
            <strong className="text-slate-800">{totalPaginas}</strong>
          </span>

          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            disabled={paginaAtual >= totalPaginas}
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}