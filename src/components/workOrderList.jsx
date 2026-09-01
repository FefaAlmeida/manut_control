import WorkOrderRow from '@/components/workOrderRow';

// Recebe a lista já filtrada pela page e decide como desenhar.
export default function WorkOrderList({ ordens }) {
  // Estado "sem resultados" da busca
  if (ordens.length === 0) {
    return <p>Nenhuma ordem encontrada.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>OS</th>
          <th>Descrição</th>
          <th>Equipamento</th>
          <th>Prioridade</th>
          <th>Técnico</th>
          <th>Vencimento</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {ordens.map((ordem) => (
          <WorkOrderRow key={ordem.id} ordem={ordem} />
        ))}
      </tbody>
    </table>
  );
}
