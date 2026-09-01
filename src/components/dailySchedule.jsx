// Recebe as ordens já filtradas por horarioAgendado e ordenadas pela page.
export default function DailySchedule({ itens }) {
  return (
    <section>
      <h2>Agenda de hoje</h2>
      <ul>
        {itens.map((ordem) => (
          <li key={ordem.id}>
            <span>{ordem.horarioAgendado}</span>
            <p>Visita de manutenção</p>
            <p>
              {ordem.equipamento.codigo} · {ordem.equipamento.nome}
            </p>
            <p>Técnico: {ordem.tecnico}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
