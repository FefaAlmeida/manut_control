import { StatusBadge } from "./StatusBadge";

// Mapeamento apenas para a cor do ponto na esquerda
const DOT_COLORS = {
  parado: "bg-red-500",
  atencao: "bg-amber-500",
  operando: "bg-emerald-500",
  "em manutencao": 'bg-amber-700',
};

export default function CriticalEquipment({ equipamentos = [] }) {
  if (!equipamentos || equipamentos.length === 0) {
    return (
      <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Equipamentos críticos</h2>
        <p className="mt-4 text-xs text-slate-400">Nenhum equipamento crítico no momento.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-slate-800">Equipamentos críticos</h2>

      <ul className="divide-y divide-slate-100 p-0 m-0 list-none">
        {equipamentos.map((equipamento) => {
          const statusKey = equipamento.status?.toLowerCase() || "";
          const dotColor = DOT_COLORS[statusKey] || "bg-slate-400";

          return (
            <li key={equipamento.id} className="py-3 flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  {/* Bolinha colorida dinâmica baseada no status */}
                  <span className={`h-2 w-2 rounded-full shrink-0 ${dotColor}`} />

                  <span className="text-xs font-bold text-slate-800">{equipamento.codigo}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-medium truncate">{equipamento.setor}</span>
                </div>
                <p className="text-xs text-slate-600 truncate mt-0.5">{equipamento.nome}</p>
              </div>

              {/* Mantido o StatusBadge no lado direito */}
              <div className="shrink-0">
                <StatusBadge status={equipamento.status} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Ver todos os equipamentos
        </button>
      </div>
    </section>
  );
}