// Recebe só os equipamentos que não estão operando (filtro feito na page).
export default function CriticalEquipment({ equipamentos }) {
  return (
    <section>
      <h2>Equipamentos críticos</h2>
      <ul>
        {equipamentos.map((equipamento) => (
          <li key={equipamento.id}>
            <span>{equipamento.codigo}</span>
            <span>{equipamento.nome}</span>
            <span>{equipamento.setor}</span>
            <span>{equipamento.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
