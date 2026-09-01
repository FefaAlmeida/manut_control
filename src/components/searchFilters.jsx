const OPCOES_STATUS = ['Aberta', 'Vencida', 'Em andamento', 'Planejada', 'Concluída'];
const OPCOES_PRIORIDADE = ['Urgente', 'Alta', 'Média', 'Baixa'];

export default function SearchFilters({
  valor,
  onChange,
  status,
  onStatusChange,
  prioridade,
  onPrioridadeChange,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center w-full my-4">
      {/* Input com Ícone de Lupa embutido (substitui a label externa) */}
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar ordem, equipamento ou técnico"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Select de Status gerado com .map */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer md:w-auto"
      >
        <option value="">Todos os status</option>
        {OPCOES_STATUS.map((item) => (
          <option key={item} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>

      {/* Select de Prioridade gerado com .map */}
      <select
        value={prioridade}
        onChange={(e) => onPrioridadeChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer md:w-auto"
      >
        <option value="">Todas as prioridades</option>
        {OPCOES_PRIORIDADE.map((item) => (
          <option key={item} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}