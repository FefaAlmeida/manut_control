export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Fundo escuro para fechar ao clicar fora no mobile */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar deslizando no celular */}
      <div className={`
        fixed top-0 left-0 z-50 bg-white border-r border-gray-100
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static
        flex flex-col justify-between h-screen w-1/2 md:w-64
      `}>
        <div>
          <div className="flex items-center gap-3 p-4">
            <img src="/logo.png" alt="Logo" className="w-8 h-auto object-contain" />
            <h1 className="text-xl font-bold">ManutControl</h1>
          </div>

          <div className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600 rounded-r-lg cursor-pointer transition-all">
            <img src="/casa.png" alt="Visão geral" className="w-6 h-auto object-contain" />
            <h1>Visão geral</h1>
          </div>

          <div className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600 rounded-r-lg cursor-pointer transition-all">
            <img src="/prancheta.png" alt="Ordens de serviço" className="w-6 h-auto object-contain" />
            <h1>Ordens de serviço</h1>
          </div>

          <div className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600 rounded-r-lg cursor-pointer transition-all">
            <img src="/configuracoes.png" alt="Equipamentos" className="w-6 h-auto object-contain" />
            <h1>Equipamentos</h1>
          </div>

          <div className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600 rounded-r-lg cursor-pointer transition-all">
            <img src="/pessoas.png" alt="Técnicos" className="w-6 h-auto object-contain" />
            <h1>Técnicos</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600 rounded-r-lg cursor-pointer transition-all">
          <img src="/sair.png" alt="Sair" className="w-6 h-auto object-contain" />
          <h1>Sair</h1>
        </div>
      </div>
    </>
  );
}