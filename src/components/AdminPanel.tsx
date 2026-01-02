import { useState, useEffect } from 'react';
import { Upload, Save, X, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  image: string;
  consumption: string;
  savings: string;
  rating: number;
  quote: string;
}

interface HeroData {
  image: string;
}

export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroData, setHeroData] = useState<HeroData>({ image: '' });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Dados iniciais
  const initialProjects: Project[] = [
    {
      id: 1,
      name: 'Casa em Morumbi',
      image: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600',
      consumption: '1200 kWh/mês',
      savings: 'R$ 960/mês',
      rating: 5,
      quote: 'Mudou completamente nossa vida. Economizamos muito em pouco tempo!'
    },
    {
      id: 2,
      name: 'Empresa Logística',
      image: 'https://images.pexels.com/photos/3797517/pexels-photo-3797517.jpeg?auto=compress&cs=tinysrgb&w=600',
      consumption: '8500 kWh/mês',
      savings: 'R$ 6.120/mês',
      rating: 5,
      quote: 'ROI impecável. O investimento se pagou em menos de 2 anos!'
    },
    {
      id: 3,
      name: 'Chácara em Cotia',
      image: 'https://images.pexels.com/photos/4397835/pexels-photo-4397835.jpeg?auto=compress&cs=tinysrgb&w=600',
      consumption: '2100 kWh/mês',
      savings: 'R$ 1.680/mês',
      rating: 5,
      quote: 'Excelente atendimento e profissionalismo. Recomendo muito!'
    }
  ];

  const initialHeroData: HeroData = {
    image: 'https://images.pexels.com/photos/4397835/pexels-photo-4397835.jpeg?auto=compress&cs=tinysrgb&w=600'
  };

  useEffect(() => {
    // Carregar dados do localStorage
    const savedProjects = localStorage.getItem('adminProjects');
    const savedHero = localStorage.getItem('adminHero');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(initialProjects);
    }
    
    if (savedHero) {
      setHeroData(JSON.parse(savedHero));
    } else {
      setHeroData(initialHeroData);
    }
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const saveToLocalStorage = (newProjects: Project[], newHero: HeroData) => {
    localStorage.setItem('adminProjects', JSON.stringify(newProjects));
    localStorage.setItem('adminHero', JSON.stringify(newHero));
    
    // Disparar evento customizado para notificar outras abas/componentes
    window.dispatchEvent(new CustomEvent('adminDataUpdated', {
      detail: { projects: newProjects, hero: newHero }
    }));
  };

  const handleSaveProject = (project: Project) => {
    const newProjects = projects.find(p => p.id === project.id) 
      ? projects.map(p => p.id === project.id ? project : p)
      : [...projects, project];
    setProjects(newProjects);
    saveToLocalStorage(newProjects, heroData);
    setEditingProject(null);
    alert('Projeto salvo com sucesso!');
  };

  const handleImageUpload = (type: 'hero' | 'project', projectId?: number, file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (type === 'hero') {
          const newHero = { image: imageUrl };
          setHeroData(newHero);
          saveToLocalStorage(projects, newHero);
          alert('Imagem do Hero atualizada com sucesso!');
        } else if (projectId && editingProject) {
          const updatedProject = { ...editingProject, image: imageUrl };
          setEditingProject(updatedProject);
          alert('Imagem do projeto atualizada! Clique em Salvar para confirmar.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      saveToLocalStorage(newProjects, heroData);
      alert('Projeto excluído com sucesso!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Painel Administrativo</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite a senha"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Painel Administrativo</h1>
              <p className="text-gray-600">Gerencie as imagens e informações do site</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                ✓ Auto-salvo
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Imagem do Hero</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem Atual
              </label>
              <div className="relative group">
                <img 
                  src={heroData.image} 
                  alt="Hero" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">1200 x 800 pixels recomendado</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova Imagem
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">Clique para fazer upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload('hero', undefined, e.target.files[0])}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG até 5MB</p>
                <p className="text-xs text-gray-400 mt-2">Tamanho recomendado: 1200 x 800 pixels</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Estudos de Caso</h2>
            <button
              onClick={() => setEditingProject({
                id: Date.now(),
                name: '',
                image: '',
                consumption: '',
                savings: '',
                rating: 5,
                quote: ''
              })}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
            >
              <Upload size={16} />
              Novo Projeto
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="relative mb-4">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-white p-1 rounded-full shadow-md hover:bg-red-100"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.consumption}</p>
                <p className="text-sm font-semibold text-green-600">{project.savings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-900">
                  {editingProject.name ? 'Editar Projeto' : 'Novo Projeto'}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Projeto</label>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {editingProject.image && (
                      <img 
                        src={editingProject.image} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Fazer upload da imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload('project', editingProject.id, e.target.files[0])}
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-1">600 x 400 pixels recomendado</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Consumo</label>
                    <input
                      type="text"
                      value={editingProject.consumption}
                      onChange={(e) => setEditingProject({...editingProject, consumption: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 1200 kWh/mês"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Economia</label>
                    <input
                      type="text"
                      value={editingProject.savings}
                      onChange={(e) => setEditingProject({...editingProject, savings: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: R$ 960/mês"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento</label>
                  <textarea
                    value={editingProject.quote}
                    onChange={(e) => setEditingProject({...editingProject, quote: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Depoimento do cliente..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleSaveProject(editingProject)}
                    className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
