import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Quanto custa instalar um sistema solar?',
    answer: 'O custo varia de acordo com seu consumo, mas a média é de R$ 15.000 a R$ 40.000. Oferecemos financiamento em até 120 meses, tornando a parcela menor que a economia mensal.'
  },
  {
    question: 'Quanto tempo leva para se pagar o investimento?',
    answer: 'O payback médio é de 4 a 6 anos. Após esse período, toda a energia é praticamente gratuita pelos próximos 19 anos de garantia.'
  },
  {
    question: 'E se fizer nublado? Rende mesmo?',
    answer: 'Sim! Os painéis funcionam com luz solar indireta. Mesmo em dias nublados, geram entre 40-60% da sua capacidade total. Você só paga o que não usar à rede.'
  },
  {
    question: 'Preciso de bateria para armazenar energia?',
    answer: 'Não é obrigatório. Com net metering, você vende o excedente para a rede e recupera créditos. Baterias são opcionais para backup noturno.'
  },
  {
    question: 'Qual é a garantia do sistema?',
    answer: '25 anos de garantia nos painéis solares e 10 anos no inversor. Nossa empresa oferece manutenção gratuita no primeiro ano.'
  },
  {
    question: 'Preciso fazer obras na minha casa?',
    answer: 'Mínimas! Apenas instalação dos painéis no telhado (ou solo) e cabos até o inversor. Leva entre 1-3 dias sem bagunça.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Dúvidas <span className="text-yellow-500">Frequentes</span>
          </h2>
          <p className="text-xl text-gray-600">Tudo que você precisa saber sobre energia solar</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-2 border-blue-100 rounded-lg overflow-hidden hover:border-yellow-400 transition">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 transition"
              >
                <span className="text-lg font-semibold text-blue-900 text-left">{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={`text-yellow-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-blue-50 border-t-2 border-blue-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h3>
          <p className="text-blue-100 mb-6">Fale com um especialista. Sem compromisso, sem pressão.</p>
          <a href="https://wa.me/559620270750" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition">
            Conversar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
