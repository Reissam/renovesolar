import { Zap, Shield, TrendingDown, Leaf, Lock, Headphones } from 'lucide-react';

const features = [
  {
    icon: TrendingDown,
    title: 'Economia Comprovada',
    description: 'Economia de até 80% na conta de luz. Nossos clientes economizam em média R$ 400/mês.'
  },
  {
    icon: Zap,
    title: 'Instalação Rápida',
    description: 'Projeto customizado em 5 dias úteis. Instalação completa em até 30 dias.'
  },
  {
    icon: Shield,
    title: 'Garantia Total',
    description: '25 anos de garantia nos painéis solares e 10 anos no inversor.'
  },
  {
    icon: Leaf,
    title: 'Energia Limpa',
    description: 'Reduza sua pegada de carbono. Energia 100% renovável e sustentável.'
  },
  {
    icon: Lock,
    title: 'Financiamento Seguro',
    description: 'Parcelamos em até 120 meses com juros reduzidos. Sem burocracia.'
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado antes, durante e após a instalação.'
  }
];

export default function Features() {
  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Por que escolher a <span className="text-yellow-500">Renove Solar</span>?
          </h2>
          <p className="text-xl text-gray-600">Tudo que você precisa para ter energia solar de verdade</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-yellow-400 hover:shadow-xl transition duration-300">
                <div className="mb-4 p-3 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg w-fit group-hover:from-yellow-400 group-hover:to-yellow-500 transition">
                  <Icon className="text-white group-hover:text-blue-900" size={28} />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-6 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-white">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-blue-100">Projetos Mensais</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <div className="text-blue-100">Clientes Satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">15</div>
            <div className="text-blue-100">Anos no Mercado</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">24h</div>
            <div className="text-blue-100">Atendimento</div>
          </div>
        </div>
      </div>
    </section>
  );
}
