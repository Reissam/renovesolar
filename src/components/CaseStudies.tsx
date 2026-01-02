import { Star } from 'lucide-react';

const projects = [
  {
    name: 'Casa em Morumbi',
    image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600',
    consumption: '1200 kWh/mês',
    savings: 'R$ 960/mês',
    rating: 5,
    quote: 'Mudou completamente nossa vida. Economizamos muito em pouco tempo!'
  },
  {
    name: 'Empresa Logística',
    image: 'https://images.pexels.com/photos/3797517/pexels-photo-3797517.jpeg?auto=compress&cs=tinysrgb&w=600',
    consumption: '8500 kWh/mês',
    savings: 'R$ 6.120/mês',
    rating: 5,
    quote: 'ROI impecável. O investimento se pagou em menos de 2 anos!'
  },
  {
    name: 'Chácara em Cotia',
    image: 'https://images.pexels.com/photos/4397835/pexels-photo-4397835.jpeg?auto=compress&cs=tinysrgb&w=600',
    consumption: '2100 kWh/mês',
    savings: 'R$ 1.680/mês',
    rating: 5,
    quote: 'Excelente atendimento e profissionalismo. Recomendo muito!'
  }
];

export default function CaseStudies() {
  return (
    <section id="projetos" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Projetos que <span className="text-yellow-500">Transformam</span>
          </h2>
          <p className="text-xl text-gray-600">Veja como nossos clientes economizam todos os dias</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300">
              <div className="relative h-64 overflow-hidden">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-110 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: project.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 italic">&quot;{project.quote}&quot;</p>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumo</span>
                    <span className="font-bold text-blue-900">{project.consumption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economia</span>
                    <span className="font-bold text-yellow-500">{project.savings}</span>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold rounded-lg transition">
                  Quero Resultado Parecido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
