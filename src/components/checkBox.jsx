// src/components/checkBox.jsx

export default function CheckBox({ 
  ordens = [], 
  onToggleOrdem = () => {}, 
  prioridade = "urgente", // Pode ser "urgente" ou ["media", "baixa"]
  titulo = "Tarefas urgentes"
}) {
  // Filtro adaptado para aceitar uma string ou um array de prioridades
  const tarefasFiltradas = ordens.filter((ordem) => {
    if (Array.isArray(prioridade)) {
      return prioridade.some(
        (p) => p.toLowerCase() === ordem.prioridade?.toLowerCase()
      );
    }
    return ordem.prioridade?.toLowerCase() === prioridade.toLowerCase();
  });

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{titulo}</h3>

      <ul className="divide-y divide-slate-200">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((ordem) => {
            const isConcluida = ordem.status === 'concluida';

            return (
              <li key={ordem.id} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <input
                    id={`os-${ordem.id}`}
                    type="checkbox"
                    checked={isConcluida}
                    onChange={() => onToggleOrdem(ordem.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label
                    htmlFor={`os-${ordem.id}`}
                    className={`ml-3 text-sm cursor-pointer select-none transition-colors ${
                      isConcluida ? 'line-through text-slate-400' : 'text-slate-700'
                    }`}
                  >
                    <span className="font-semibold block">
                      {ordem.equipamento?.nome || 'Equipamento'}
                    </span>
                    <span className={`text-xs block ${isConcluida ? 'text-slate-300' : 'text-slate-500'}`}>
                      {ordem.descricao}
                    </span>
                  </label>
                </div>
              </li>
            );
          })
        ) : (
          <p className="py-2 text-sm text-slate-500">
            Nenhuma tarefa pendente nesta categoria.
          </p>
        )}
      </ul>
    </div>
  );
}