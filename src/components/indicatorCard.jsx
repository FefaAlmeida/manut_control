// EXEMPLO de componente que recebe tudo por props.
// A page decide os valores; aqui só desenhamos.
// corDoPonto: classe completa (ex: "bg-red-600"), porque o Tailwind
// não consegue montar classe dinâmica tipo `bg-${cor}-600`.
export default function IndicatorCard({ valor, descricao, corDoPonto }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      {/* o ponto precisa de tamanho, senão a span fica invisível */}
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${corDoPonto}`} />

      <div className="flex items-baseline gap-2">
        <strong className="text-2xl font-bold text-slate-900">{valor}</strong>
        <span className="text-sm text-slate-500">{descricao}</span>
      </div>
    </div>
  );
}
