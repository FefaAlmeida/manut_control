export default function Sidebar({ isOpen, onClose }) {
  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay Mobile (MANTIDO EXATAMENTE IGUAL) */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar: Anima a largura de 256px para 0px sem travamentos */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200
          transition-[width,transform] duration-300 ease-in-out overflow-hidden
          md:sticky md:top-0 md:z-auto
          ${isOpen 
            ? 'w-64 translate-x-0' 
            : 'w-0 -translate-x-full md:translate-x-0 md:border-none'
          }
        `}
      >
        {/* Largura fixa interna trava os itens para não encavalar durante a animação */}
        <div className="w-64 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 p-4">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain shrink-0" />
              <h1 className="text-xl font-bold text-slate-800">ManutControl</h1>
            </div>

            <nav className="space-y-1 mt-2">
              <div 
                onClick={handleItemClick} 
                className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg cursor-pointer transition-all"
              >
                <img src="/home.png" alt="Visão geral" className="w-6 h-6 object-contain shrink-0" />
                <span className="font-medium">Visão geral</span>
              </div>

              <div 
                onClick={handleItemClick} 
                className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg cursor-pointer transition-all"
              >
                <img src="/prancheta.png" alt="Ordens de serviço" className="w-6 h-6 object-contain shrink-0" />
                <span className="font-medium">Ordens de serviço</span>
              </div>

              <div 
                onClick={handleItemClick} 
                className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg cursor-pointer transition-all"
              >
                <img src="/configuracoes.png" alt="Equipamentos" className="w-6 h-6 object-contain shrink-0" />
                <span className="font-medium">Equipamentos</span>
              </div>

              <div 
                onClick={handleItemClick} 
                className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg cursor-pointer transition-all"
              >
                <img src="/pessoas.png" alt="Técnicos" className="w-6 h-6 object-contain shrink-0" />
                <span className="font-medium">Técnicos</span>
              </div>
            </nav>
          </div>

          <div 
            onClick={handleItemClick} 
            className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-lg cursor-pointer transition-all"
          >
            <img src="/sair.png" alt="Sair" className="w-6 h-6 object-contain shrink-0" />
            <span className="font-medium">Sair</span>
          </div>
        </div>
      </aside>
    </>
  );
}