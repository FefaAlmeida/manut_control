export default function Header({ onOpenMenu, usuario }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white w-full">
      <div>
        <img 
          src="/menu.png" 
          alt="Menu" 
          onClick={onOpenMenu}
          className="w-5 h-5 cursor-pointer object-contain" 
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <img src="/sininho.png" alt="Notificações" className="w-5 h-5 object-contain" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/perfil.png" alt="Perfil" className="w-8 h-8 rounded-full object-contain" />
          <span className="text-sm font-medium text-gray-800">{usuario}</span>
          <img src="/seta.png" alt="Abrir menu" className="w-3 h-3 object-contain" />
        </div>
      </div>
    </header>
  );
}