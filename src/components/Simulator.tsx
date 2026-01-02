import { useState, useRef, useEffect } from 'react';
import { Sun } from 'lucide-react';

interface SimulatorProps {
  onProposalClick?: (consumption: number) => void;
}

export default function Simulator({ onProposalClick }: SimulatorProps) {
  const [consumption, setConsumption] = useState(500);
  const [billValue, setBillValue] = useState(480); // R$ 0,96/kWh × 500 kWh = R$ 480
  const [customTariff, setCustomTariff] = useState(0.96); // Tarifa fixa padrão região Norte
  const [showTariffInput, setShowTariffInput] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fórmulas personalizadas conforme especificação
  // Passo 1: Usar tarifa personalizada ou calculada
  const tariff = customTariff; // Tarifa fixa em R$ 0,96
  
  // Passo 2: Calcular economia mensal fixa em 80%
  // Assumindo consumo mínimo de 50 kWh (básico residencial)
  const minimumConsumption = 50;
  const calculatedMonthlyEconomy = (consumption - minimumConsumption) * tariff * 0.80; // 80% de economia fixo
  const calculatedYearlyEconomy = calculatedMonthlyEconomy * 12;
  
  // Passo 3: Calcular potência do sistema (kWp)
  // Parâmetros da fórmula
  const fatorComp = 1.2; // Fator de compensação energética
  const HSP = 5.0; // Horas de Sol Pleno (média Brasil)
  const eficiencia = 0.85; // Eficiência do sistema (85%)
  
  const potenciaKw = consumption * fatorComp / (HSP * 30 * eficiencia);
  
  // Passo 4: Calcular investimento
  const precoKw = 2380; // R$ 2.380 por kWp (valor médio região Norte)
  const investment = potenciaKw * precoKw;
  
  // Passo 5: Calcular payback
  const payback = calculatedYearlyEconomy > 0 ? investment / calculatedYearlyEconomy : 0;
  
  // Usar os valores calculados para exibição
  const displayMonthlyEconomy = calculatedMonthlyEconomy;
  const displayYearlyEconomy = calculatedYearlyEconomy;

  useEffect(() => {
    // Atualizar automaticamente o valor da conta baseado na tarifa personalizada
    const calculatedBillValue = consumption * customTariff;
    setBillValue(calculatedBillValue);
    
    if (consumption > 0 && calculatedBillValue > 0) {
      setShowResult(true);
    }
  }, [consumption, customTariff]);

  return (
    <section id="simulador" ref={sectionRef} className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Economize até <span className="text-yellow-400">80%</span> na conta de luz
          </h2>
          <p className="text-xl text-gray-600">Calcule quanto você pode economizar em 30 segundos</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Consumo */}
            <div>
              <label className="block text-lg font-semibold text-blue-900 mb-3">
                Consumo Médio Mensal (kWh)
              </label>
              <input 
                type="range" 
                min="50" 
                max="2000" 
                value={consumption}
                onChange={(e) => setConsumption(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between mt-4">
                <span className="text-sm text-gray-500">50 kWh</span>
                <span className="text-2xl font-bold text-blue-900">{consumption} kWh</span>
                <span className="text-sm text-gray-500">2000 kWh</span>
              </div>
            </div>

            {/* Valor da Conta */}
            <div>
              <label className="block text-lg font-semibold text-blue-900 mb-3">
                Valor Médio da Conta (R$)
              </label>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center h-20 flex flex-col justify-center">
                <div className="text-2xl font-bold text-blue-900">
                  R$ {billValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  {consumption} kWh × R$ {customTariff.toFixed(2)}/kWh
                </div>
              </div>
            </div>

            {/* Tarifa Editável */}
            <div>
              <label className="block text-lg font-semibold text-blue-900 mb-3">
                Tarifa de Energia
              </label>
              <div className="h-20 flex flex-col justify-center">
                <div className="text-xs text-blue-600 mb-1 text-center">
                  Click aqui e informe sua tarifa.
                </div>
                {!showTariffInput ? (
                  <button 
                    onClick={() => setShowTariffInput(true)}
                    className="text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-full hover:bg-blue-200 transition cursor-pointer h-10"
                  >
                    Tarifa: R$ {tariff.toFixed(2)}/kWh (Região Norte)
                  </button>
                ) : (
                  <div className="bg-white border-2 border-blue-300 rounded-lg p-2">
                    <div className="text-xs text-gray-600 mb-1">Se quiser informar o valor da tarifa clique aqui</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">R$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.1"
                        max="2.0"
                        value={customTariff}
                        onChange={(e) => setCustomTariff(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="0,96"
                      />
                      <span className="text-sm">/kWh</span>
                      <button
                        onClick={() => setShowTariffInput(false)}
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resultados */}
          {showResult && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Economia Mensal */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl p-6 shadow-lg transform hover:scale-105 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="text-blue-900" size={20} />
                    <span className="text-blue-900 font-semibold">Economia Mensal</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    R$ {displayMonthlyEconomy.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-blue-700">
                    Tarifa: R$ {tariff.toFixed(2)}/kWh | Economia: 80.0%
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Economia estimada até 80% na conta de luz
                  </div>
                </div>

                {/* Economia Anual */}
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-900">
                  <div className="text-sm text-gray-600 mb-2">Economia Anual</div>
                  <div className="text-2xl font-bold text-blue-900">
                    R$ {displayYearlyEconomy.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Payback */}
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-yellow-400">
                  <div className="text-sm text-gray-600 mb-2">Payback</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {payback.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} anos
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Investimento */}
                <div className="bg-gray-100 rounded-xl p-6 border-l-4 border-gray-400">
                  <div className="text-sm text-gray-600 mb-2">Investimento Estimado</div>
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {investment.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sistema: {potenciaKw.toFixed(2)} kWp
                  </p>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• Tarifa: R$ {tariff.toFixed(2)}/kWh (Região Norte)</div>
                    <div>• Fator Compensação: {fatorComp}</div>
                    <div>• HSP: {HSP} h/dia</div>
                    <div>• Eficiência: {(eficiencia * 100).toFixed(0)}%</div>
                  </div>
                </div>

                {/* Economia 25 anos */}
                <div className="bg-blue-900 text-white rounded-xl p-6">
                  <p className="font-semibold text-lg mb-2">Em 25 anos você economiza:</p>
                  <p className="text-3xl font-bold text-yellow-400 mb-2">
                    R$ {(displayYearlyEconomy * 25).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-blue-100">Suficiente para reformar toda a casa!</p>
                </div>
              </div>

              <button 
                onClick={() => onProposalClick?.(consumption)}
                className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition shadow-lg"
              >
                Receber Proposta Personalizada
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
