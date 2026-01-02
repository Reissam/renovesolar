interface CTAProps {
  onContactClick: () => void;
}

export default function CallToAction({ onContactClick }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Pronto para começar sua jornada para <span className="text-yellow-400">economizar?</span>
        </h2>

        <p className="text-xl text-blue-100 mb-12">
          Receba um orçamento totalmente personalizado baseado no seu consumo. Resposta em até 2 horas!
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">0%</div>
            <p className="text-blue-100">Custo para orçamento</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">2h</div>
            <p className="text-blue-100">Tempo de resposta</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
            <p className="text-blue-100">Sem compromisso</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onContactClick}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition shadow-lg transform hover:scale-105 duration-200">
            Solicitar Orçamento Agora
          </button>
          <a href="https://wa.me/559620270750" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold rounded-lg transition">
            Falar com Consultor
          </a>
        </div>
      </div>
    </section>
  );
}
