export function Pagination({
  paginaAtual,
  totalPaginas,
  totalItens,
  itensPorPagina,
  onPageChange,
}) {
  if (totalItens === 0) return null;

  const inicio = (paginaAtual - 1) * itensPorPagina + 1;
  const fim = Math.min(paginaAtual * itensPorPagina, totalItens);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row">
      {/* Texto com contagem de itens */}
      <div className="text-xs text-slate-500">
        Exibindo <span className="font-semibold text-slate-700">{inicio}</span> a{" "}
        <span className="font-semibold text-slate-700">{fim}</span> de{" "}
        <span className="font-semibold text-slate-700">{totalItens}</span> resultados
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="px-2 text-xs text-slate-600">
          Página <strong className="text-slate-800">{paginaAtual}</strong> de{" "}
          <strong className="text-slate-800">{totalPaginas || 1}</strong>
        </span>

        <button
          onClick={() => onPageChange(paginaAtual + 1)}
          disabled={paginaAtual >= totalPaginas}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}