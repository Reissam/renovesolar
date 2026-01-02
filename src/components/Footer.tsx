import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img src="/logo_renove.png" alt="Renove Solar" className="h-12 mb-4" />
            <p className="text-blue-100">Energia solar sustentável para um futuro melhor.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Links Rápidos</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#inicio" className="hover:text-yellow-400 transition">Início</a></li>
              <li><a href="#simulador" className="hover:text-yellow-400 transition">Simulador</a></li>
              <li><a href="#beneficios" className="hover:text-yellow-400 transition">Benefícios</a></li>
              <li><a href="#faq" className="hover:text-yellow-400 transition">Perguntas Frequentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Contato</h4>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+559620270750" className="hover:text-yellow-400 transition">(96) 2027-0750</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:renovesolaratendimento@gmail.com" className="hover:text-yellow-400 transition">email: renovesolaratendimento@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <p>Macapá - Amapá<br />Brasil</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8">
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-200">
            <div>
              <p className="font-semibold text-white mb-2">Certificações</p>
              <p>ABNT • INMETRO • ANEEL Homologado</p>
            </div>
            <div className="text-center">
              <p>&copy; 2024 Renove Solar. Todos os direitos reservados.</p>
            </div>
            <div className="text-right">
              <a href="#" className="hover:text-yellow-400 transition">Política de Privacidade</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-yellow-400 transition">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
