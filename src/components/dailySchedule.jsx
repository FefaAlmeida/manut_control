// Recebe as ordens já filtradas por horarioAgendado e ordenadas pela page.
export default function DailySchedule({ itens = [] }) {
  if (!itens || itens.length === 0) {
    return (
      <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Agenda de hoje</h2>
        <p className="mt-4 text-xs text-slate-400">Nenhum agendamento para hoje.</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-base font-bold text-slate-800">Agenda de hoje</h2>

      <ul className="flex flex-col m-0 p-0 list-none">
        {itens.map((ordem, index) => {
          const eUltimo = index === itens.length - 1;

          return (
            <li key={ordem.id} className="flex gap-3 items-stretch">
              {/* 1. Coluna do Horário */}
              <span className="w-12 text-right text-xs font-semibold text-blue-600 shrink-0 pt-0.5">
                {ordem.horarioAgendado}
              </span>

              {/* 2. Coluna da Bolinha + Linha Azul */}
              <div className="flex flex-col items-center shrink-0">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0 mt-1" />
                {!eUltimo && <div className="w-[1.5px] flex-1 bg-blue-200 my-1" />}
              </div>

              {/* 3. Coluna de Informações da Ordem */}
              <div className="pb-6 space-y-0.5 pl-1">
                <p className="text-xs font-bold text-slate-800 m-0">Visita de manutenção</p>
                <p className="text-xs font-medium text-slate-500 m-0">
                  {ordem.equipamento?.codigo} · {ordem.equipamento?.nome}
                </p>
                <p className="text-xs text-slate-400 m-0">
                  Técnico: {ordem.tecnico}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-2 border-t border-slate-100 pt-3">
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Ver agenda completa
        </button>
      </div>
    </section>
  );
}