// Input controlado: quem guarda o texto é a page (useState).
// Aqui só avisamos a mudança para cima.
export default function SearchFilters({ valor, onChange }) {
  return (
    <div>
      <label htmlFor="busca">Buscar</label>
      <input
        id="busca"
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar ordem, equipamento ou técnico"
      />
    </div>
  );
}
