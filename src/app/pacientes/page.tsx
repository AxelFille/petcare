'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { Heart, Plus, Search, Filter, Calendar, Phone, MapPin, User } from 'lucide-react';

interface Paciente {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  peso: string;
  sexo: 'macho' | 'femea';
  tutor: string;
  telefone: string;
  endereco: string;
  ultimaConsulta: string;
  status: 'ativo' | 'inativo';
  foto?: string;
}

const mockPacientes: Paciente[] = [
  {
    id: '1',
    nome: 'Rex',
    especie: 'Cão',
    raca: 'Golden Retriever',
    idade: '3 anos',
    peso: '28 kg',
    sexo: 'macho',
    tutor: 'João Silva',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    ultimaConsulta: '2024-01-10',
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Mimi',
    especie: 'Gato',
    raca: 'Persa',
    idade: '2 anos',
    peso: '4 kg',
    sexo: 'femea',
    tutor: 'Maria Santos',
    telefone: '(11) 88888-8888',
    endereco: 'Av. Central, 456',
    ultimaConsulta: '2024-01-08',
    status: 'ativo'
  },
  {
    id: '3',
    nome: 'Thor',
    especie: 'Cão',
    raca: 'Pastor Alemão',
    idade: '5 anos',
    peso: '35 kg',
    sexo: 'macho',
    tutor: 'Pedro Costa',
    telefone: '(11) 77777-7777',
    endereco: 'Rua do Campo, 789',
    ultimaConsulta: '2024-01-05',
    status: 'ativo'
  }
];

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [filtroEspecie, setFiltroEspecie] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    setPacientes(mockPacientes);
  }, []);

  const pacientesFiltrados = pacientes.filter(paciente => {
    const matchBusca = paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      paciente.tutor.toLowerCase().includes(busca.toLowerCase());
    const matchEspecie = filtroEspecie === 'todos' || paciente.especie.toLowerCase() === filtroEspecie;
    const matchStatus = filtroStatus === 'todos' || paciente.status === filtroStatus;
    
    return matchBusca && matchEspecie && matchStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
                <p className="text-sm text-gray-500">Gerencie informações dos animais</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Paciente</span>
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">{pacientes.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cães</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pacientes.filter(p => p.especie === 'Cão').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🐕</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gatos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pacientes.filter(p => p.especie === 'Gato').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">🐱</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pacientes.filter(p => p.status === 'ativo').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome do paciente ou tutor..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filtroEspecie}
              onChange={(e) => setFiltroEspecie(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todas as Espécies</option>
              <option value="cão">Cães</option>
              <option value="gato">Gatos</option>
            </select>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* Lista de Pacientes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Pacientes ({pacientesFiltrados.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {pacientesFiltrados.map((paciente) => (
              <div key={paciente.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {getInitials(paciente.nome)}
                    </span>
                  </div>
                  
                  {/* Informações principais */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{paciente.nome}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {paciente.especie}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        paciente.status === 'ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {paciente.status.charAt(0).toUpperCase() + paciente.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Raça:</span> {paciente.raca}
                      </div>
                      <div>
                        <span className="font-medium">Idade:</span> {paciente.idade}
                      </div>
                      <div>
                        <span className="font-medium">Peso:</span> {paciente.peso}
                      </div>
                      <div>
                        <span className="font-medium">Sexo:</span> {paciente.sexo.charAt(0).toUpperCase() + paciente.sexo.slice(1)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{paciente.tutor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{paciente.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Última consulta: {formatDate(paciente.ultimaConsulta)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{paciente.endereco}</span>
                    </div>
                  </div>
                  
                  {/* Ações */}
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => setSelectedPaciente(paciente)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      Prontuário
                    </button>
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Novo Paciente */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Novo Paciente</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações do Paciente */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Informações do Paciente</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome do paciente"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Espécie</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Selecione</option>
                          <option value="cao">Cão</option>
                          <option value="gato">Gato</option>
                          <option value="ave">Ave</option>
                          <option value="roedor">Roedor</option>
                          <option value="reptil">Réptil</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Raça</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Raça do animal"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: 2 anos"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Peso</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: 5 kg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Selecione</option>
                          <option value="macho">Macho</option>
                          <option value="femea">Fêmea</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Informações do Tutor */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Informações do Tutor</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Tutor</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                      <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Endereço completo"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Informações adicionais sobre o paciente..."
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Cadastrar Paciente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Paciente */}
      {selectedPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalhes do Paciente
                </h3>
                <button
                  onClick={() => setSelectedPaciente(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-2xl">
                    {getInitials(selectedPaciente.nome)}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedPaciente.nome}</h4>
                  <p className="text-gray-600">{selectedPaciente.especie} • {selectedPaciente.raca}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Informações do Animal</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Idade:</span> {selectedPaciente.idade}</div>
                    <div><span className="font-medium">Peso:</span> {selectedPaciente.peso}</div>
                    <div><span className="font-medium">Sexo:</span> {selectedPaciente.sexo}</div>
                    <div><span className="font-medium">Status:</span> {selectedPaciente.status}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Informações do Tutor</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Nome:</span> {selectedPaciente.tutor}</div>
                    <div><span className="font-medium">Telefone:</span> {selectedPaciente.telefone}</div>
                    <div><span className="font-medium">Endereço:</span> {selectedPaciente.endereco}</div>
                    <div><span className="font-medium">Última consulta:</span> {formatDate(selectedPaciente.ultimaConsulta)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPaciente(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}