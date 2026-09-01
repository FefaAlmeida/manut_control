const prioridades = {
  alta: 'bg-red-500',
  media: 'bg-yellow-500',
  média: 'bg-yellow-500',
  baixa: 'bg-green-500',
  urgente: 'bg-red-800',
};

export function PriorityBadge({ prioridade }) {
  const chave = prioridade ? String(prioridade).toLowerCase().trim() : '';
  const corPonto = prioridades[chave] || 'bg-slate-400';

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
      <span className={`h-2 w-2 shrink-0 rounded-full ${corPonto}`} />
      {prioridade}
    </span>
  );
}