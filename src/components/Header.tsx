import { Phone, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-blue-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <img src="/logo_renove.png" alt="Renove Solar" className="h-12" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-900 font-medium transition">Início</a>
            <a href="#simulador" className="text-gray-700 hover:text-blue-900 font-medium transition">Simulador</a>
            <a href="#beneficios" className="text-gray-700 hover:text-blue-900 font-medium transition">Benefícios</a>
            <a href="#projetos" className="text-gray-700 hover:text-blue-900 font-medium transition">Projetos</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-900 font-medium transition">Dúvidas</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://wa.me/559620270750" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-4 py-2 text-blue-900 hover:bg-blue-50 rounded-lg transition font-medium">
              <Phone size={18} />
              WhatsApp
            </a>
            <button onClick={onContactClick}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition shadow-lg">
              Orçamento Grátis
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="text-blue-900" size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4 space-y-3">
            <a href="#inicio" className="block text-gray-700 hover:text-blue-900 font-medium">Início</a>
            <a href="#simulador" className="block text-gray-700 hover:text-blue-900 font-medium">Simulador</a>
            <a href="#beneficios" className="block text-gray-700 hover:text-blue-900 font-medium">Benefícios</a>
            <a href="#projetos" className="block text-gray-700 hover:text-blue-900 font-medium">Projetos</a>
            <a href="#faq" className="block text-gray-700 hover:text-blue-900 font-medium">Dúvidas</a>
            <button onClick={onContactClick}
              className="w-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition">
              Orçamento Grátis
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
