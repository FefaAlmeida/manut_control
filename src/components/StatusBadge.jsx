const estilosStatus = {
  vencida: 'bg-red-100 text-red-500',
  "em andamento": 'bg-amber-500 text-amber-900',
  aberta: 'bg-amber-200 text-amber-700', 
  planejada: 'bg-yellow-500 text-yellow-900',
  concluida: 'bg-emerald-500 text-emerald-900', 
  parado: 'text-red-500',
  atencao: 'text-amber-500',
  operando: 'text-emerald-500',
  "em manutencao": 'text-amber-700',
};

export function StatusBadge({ status }) {
  // Trata maiúsculas/minúsculas e espaços extras
  const chave = status ? String(status).toLowerCase().trim() : '';
  const estilo = estilosStatus[chave] || 'bg-slate-100 text-slate-700';

  return (
    <span className={`inline-flex items-center shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${estilo}`}>
      {status}
    </span>
  );
}