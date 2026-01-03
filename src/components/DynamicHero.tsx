import { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroData {
  image: string;
}

interface HeroProps {
  onSimulateClick: () => void;
}

export default function DynamicHero({ onSimulateClick }: HeroProps) {
  const [heroData, setHeroData] = useState<HeroData>({ image: '' });

  const initialHeroData: HeroData = {
    image: 'https://images.pexels.com/photos/4397835/pexels-photo-4397835.jpeg?auto=compress&cs=tinysrgb&w=600'
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Tentar carregar do Supabase primeiro
        const apiKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        const heroResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/hero_config?id=eq.1`, {
          headers: {
            'apikey': apiKey,
            'Authorization': `Bearer ${apiKey}`
          }
        });
        
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          if (heroData.length > 0 && heroData[0].image) {
            setHeroData({ image: heroData[0].image });
            return;
          }
        }
      } catch (error) {
        console.warn('Erro ao carregar do Supabase, usando localStorage:', error);
      }
      
      // Fallback para localStorage
      const savedHero = localStorage.getItem('adminHero');
      if (savedHero) {
        try {
          setHeroData(JSON.parse(savedHero));
        } catch (error) {
          console.error('Erro ao carregar dados do Hero:', error);
          setHeroData(initialHeroData);
        }
      } else {
        setHeroData(initialHeroData);
      }
    };

    loadData();

    // Listener para evento customizado de atualização
    const handleAdminDataUpdated = (e: CustomEvent) => {
      if (e.detail && e.detail.hero) {
        setHeroData(e.detail.hero);
      }
    };

    window.addEventListener('adminDataUpdated', handleAdminDataUpdated as EventListener);
    
    // Listener para storage events (outras abas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminHero' && e.newValue) {
        try {
          setHeroData(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Erro ao atualizar dados do Hero:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('adminDataUpdated', handleAdminDataUpdated as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-20 pb-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Economize até <span className="text-yellow-400">80%</span> na conta de luz
              </h1>
              <p className="text-xl text-blue-100">
                Energia solar de verdade. Investimento inteligente. Retorno garantido em 5 anos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={20} />
                <span>Instalação em até 30 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={20} />
                <span>Financiamento com juros baixos</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={20} />
                <span>Garantia de 25 anos nos painéis</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={onSimulateClick}
                className="flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200">
                Calcule sua Economia <ArrowRight size={20} />
              </button>
              <a href="https://wa.me/559620270750" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold rounded-lg transition">
                Fale com Especialista
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <div className="text-3xl font-bold text-yellow-400">5K+</div>
                <div className="text-sm text-blue-200">Clientes Atendidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">50M</div>
                <div className="text-sm text-blue-200">kWh Gerados/Ano</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">R$800M</div>
                <div className="text-sm text-blue-200">Economizado</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl blur-2xl opacity-20"></div>
              <img src={heroData.image} 
                   alt="Painel Solar" 
                   className="relative rounded-2xl shadow-2xl w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
