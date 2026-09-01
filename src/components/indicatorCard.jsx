// Dicionário com os caminhos das imagens
const imagens = {
  'ordens abertas': '/prancheta.png',
  'vencidas': '/relogio.png',
  'equipamentos parados': '/pause.png',
};

export default function IndicatorCard({ valor, descricao, corDoPonto }) {
  const caminhoImagem = imagens[descricao.toLowerCase()];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      {caminhoImagem ? (
        <img 
          src={caminhoImagem} 
          alt={descricao} 
          className="h-6 w-6 shrink-0 object-contain" 
        />
      ) : (
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${corDoPonto}`} />
      )}

      <div className="flex items-baseline gap-2">
        <strong className="text-2xl font-bold text-slate-900">{valor}</strong>
        <span className="text-sm text-slate-500">{descricao}</span>
      </div>
    </div>
  );
}