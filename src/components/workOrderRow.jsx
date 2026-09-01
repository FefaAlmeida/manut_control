// Uma linha da tabela. Recebe a ordem já com o equipamento junto.
export default function WorkOrderRow({ ordem }) {
  const estaVencida = ordem.status === 'vencida';

  return (
    <tr>
      <td>{ordem.codigo}</td>
      <td>{ordem.descricao}</td>
      <td>
        {ordem.equipamento.codigo} · {ordem.equipamento.nome}
      </td>
      <td>{ordem.prioridade}</td>
      <td>{ordem.tecnico}</td>
      <td>{ordem.vencimentoFormatado}</td>
      <td>
        {ordem.status}
        {/* vencida precisa ser sinalizada sem depender só da cor */}
        {estaVencida && <span> (atrasada)</span>}
      </td>
    </tr>
  );
}
