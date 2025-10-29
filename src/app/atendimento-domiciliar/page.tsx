'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { MapPin, Plus, Search, Navigation, Clock, Phone, User, Star } from 'lucide-react';

interface VisitaDomiciliar {
  id: string;
  paciente: string;
  tutor: string;
  endereco: string;
  telefone: string;
  data: string;
  horario: string;
  tipo: string;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  observacoes?: string;
  distancia?: string;
  tempoEstimado?: string;
}

const mockVisitas: VisitaDomiciliar[] = [
  {
    id: '1',
    paciente: 'Rex',
    tutor: 'João Silva',
    endereco: 'Rua das Flores, 123 - Centro',
    telefone: '(11) 99999-9999',
    data: '2024-01-16',
    horario: '09:00',
    tipo: 'Consulta Domiciliar',
    status: 'agendada',
    observacoes: 'Animal com dificuldade de locomoção',
    distancia: '2.5 km',
    tempoEstimado: '15 min'
  },
  {
    id: '2',
    paciente: 'Luna',
    tutor: 'Maria Santos',
    endereco: 'Av. Central, 456 - Jardim',
    telefone: '(11) 88888-8888',
    data: '2024-01-16',
    horario: '10:30',
    tipo: 'Vacinação',
    status: 'em_andamento',
    observacoes: 'Primeira dose da vacina V10',
    distancia: '4.2 km',
    tempoEstimado: '25 min'
  },
  {
    id: '3',
    paciente: 'Thor',
    tutor: 'Pedro Costa',
    endereco: 'Rua do Campo, 789 - Vila Nova',
    telefone: '(11) 77777-7777',
    data: '2024-01-16',
    horario: '14:00',
    tipo: 'Pós-operatório',
    status: 'agendada',
    observacoes: 'Retirada de pontos',
    distancia: '6.8 km',
    tempoEstimado: '35 min'
  }
];

export default function AtendimentoDomiciliarPage() {
  const [visitas, setVisitas] = useState<VisitaDomiciliar[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroData, setFiltroData] = useState<string>('');
  const [busca, setBusca] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [rotaOtimizada, setRotaOtimizada] = useState(false);

  useEffect(() => {
    setVisitas(mockVisitas);
  }, []);

  const visitasFiltradas = visitas.filter(visita => {
    const matchBusca = visita.paciente.toLowerCase().includes(busca.toLowerCase()) ||
                      visita.tutor.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || visita.status === filtroStatus;
    const matchData = !filtroData || visita.data === filtroData;
    
    return matchBusca && matchStatus && matchData;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'agendada': return 'Agendada';
      case 'em_andamento': return 'Em Andamento';
      case 'concluida': return 'Concluída';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const totalVisitas = visitas.length;
  const visitasHoje = visitas.filter(v => v.data === '2024-01-16').length;
  const visitasAndamento = visitas.filter(v => v.status === 'em_andamento').length;
  const distanciaTotal = visitas.reduce((sum, v) => sum + parseFloat(v.distancia?.replace(' km', '') || '0'), 0);

  const otimizarRota = () => {
    setRotaOtimizada(true);
    // Simular otimização de rota
    setTimeout(() => {
      alert('Rota otimizada! Economia de 25% no tempo de deslocamento.');
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Atendimento Domiciliar</h1>
                <p className="text-sm text-gray-500">Gestão de visitas e otimização de rotas</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={otimizarRota}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Navigation className="h-4 w-4" />
                <span>Otimizar Rota</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Nova Visita</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Visitas</p>
                <p className="text-2xl font-bold text-gray-900">{totalVisitas}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitas Hoje</p>
                <p className="text-2xl font-bold text-blue-600">{visitasHoje}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-yellow-600">{visitasAndamento}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Navigation className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distância Total</p>
                <p className="text-2xl font-bold text-green-600">{distanciaTotal.toFixed(1)} km</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🚗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Otimização de Rota - Plano PRO */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Otimização de Rotas - Plano PRO</h3>
              </div>
              <p className="text-green-100">
                Economize até 30% no tempo de deslocamento com nossa IA de otimização de rotas
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">25%</p>
              <p className="text-green-100 text-sm">economia hoje</p>
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
                  placeholder="Buscar por paciente ou tutor..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="agendada">Agendada</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        {/* Lista de Visitas */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Visitas Domiciliares ({visitasFiltradas.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {visitasFiltradas.map((visita) => (
              <div key={visita.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{visita.paciente}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visita.status)}`}>
                        {getStatusText(visita.status)}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {visita.tipo}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{visita.tutor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{visita.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{visita.data} às {visita.horario}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4" />
                        <span>{visita.distancia} • {visita.tempoEstimado}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-600">{visita.endereco}</span>
                    </div>
                    
                    {visita.observacoes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Observações:</span> {visita.observacoes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      Ver Rota
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      Iniciar
                    </button>
                    <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                      Reagendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Nova Visita */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Nova Visita Domiciliar</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Selecione o paciente</option>
                    <option value="rex">Rex - João Silva</option>
                    <option value="mimi">Mimi - Maria Santos</option>
                    <option value="thor">Thor - Pedro Costa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Atendimento</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Selecione o tipo</option>
                    <option value="consulta">Consulta Domiciliar</option>
                    <option value="vacinacao">Vacinação</option>
                    <option value="pos-operatorio">Pós-operatório</option>
                    <option value="emergencia">Emergência</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                  <textarea
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Endereço completo para a visita"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                  <textarea
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Informações importantes sobre a visita..."
                  ></textarea>
                </div>
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
                Agendar Visita
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}