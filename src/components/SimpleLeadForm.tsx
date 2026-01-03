import { useState } from 'react';
import { X, Loader } from 'lucide-react';

interface SimpleLeadFormProps {
  onClose: () => void;
  formType: 'calcule_economia' | 'proposta_personalizada';
  title: string;
}

export default function SimpleLeadForm({ onClose, formType, title }: SimpleLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Enviar para N8N webhook
      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        lead_source: 'website_form',
        status: 'new',
        timestamp: new Date().toISOString(),
        form_type: formType
      };

      const webhookResponse = await fetch('http://localhost:5678/webhook-test/orcamento_gratis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (!webhookResponse.ok) {
        throw new Error('Falha ao enviar para N8N');
      }

      console.log('✅ Dados enviados para N8N com sucesso');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Erro ao enviar formulário. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-green-600">Sucesso!</h3>
              <p className="text-gray-600">
                Sua solicitação foi enviada com sucesso! Entraremos em contato em até 2 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mensagem (opcional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="Digite sua mensagem aqui..."
                />
              </div>

              {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitação'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Respeitamos sua privacidade. Seus dados são protegidos conforme a LGPD.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
