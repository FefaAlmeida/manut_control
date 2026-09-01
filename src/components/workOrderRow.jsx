import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";

export default function WorkOrderRow({ ordem }) {
  const estaVencida = ordem.status?.toLowerCase() === 'vencida';

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
      <td className="px-6 py-4 align-middle whitespace-nowrap font-medium text-blue-600">
        {ordem.codigo}
      </td>

      <td className="px-6 py-4 align-middle text-slate-800">
        {ordem.descricao}
      </td>

      <td className="px-6 py-4 align-middle text-slate-600">
        <span className="font-medium text-slate-700">{ordem.equipamento?.codigo}</span>
        {" · "}
        <span>{ordem.equipamento?.nome}</span>
      </td>

      <td className="px-6 py-4 align-middle whitespace-nowrap">
        <PriorityBadge prioridade={ordem.prioridade} />
      </td>

      <td className="px-6 py-4 align-middle whitespace-nowrap text-slate-700">
        {ordem.tecnico}
      </td>

      {/* Aplica a cor vermelha se estiver vencida */}
      <td className={`px-6 py-4 align-middle whitespace-nowrap ${estaVencida ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
        {ordem.vencimentoFormatado}
      </td>

      {/* Corrigida a tag <td> duplicada */}
      <td className="px-6 py-4 align-middle whitespace-nowrap">
        <StatusBadge status={ordem.status} />
      </td>
    </tr>
  );
}