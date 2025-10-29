'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { Smartphone, Bell, MessageSquare, Calendar, Heart, Star, Download, QrCode } from 'lucide-react';

interface Notificacao {
  id: string;
  tipo: 'lembrete' | 'resultado' | 'agendamento' | 'promocao';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

const mockNotificacoes: Notificacao[] = [
  {
    id: '1',
    tipo: 'lembrete',
    titulo: 'Lembrete de Vacinação',
    mensagem: 'Rex precisa tomar a segunda dose da vacina V10 em 3 dias.',
    data: '2024-01-15',
    lida: false
  },
  {
    id: '2',
    tipo: 'resultado',
    titulo: 'Resultado de Exame',
    mensagem: 'Os resultados dos exames de sangue da Mimi estão disponíveis.',
    data: '2024-01-14',
    lida: true
  },
  {
    id: '3',
    tipo: 'agendamento',
    titulo: 'Consulta Confirmada',
    mensagem: 'Consulta do Thor confirmada para amanhã às 14:00.',
    data: '2024-01-13',
    lida: true
  }
];

export default function AppTutorPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setNotificacoes(mockNotificacoes);
  }, []);

  const stats = {
    usuariosAtivos: 1247,
    notificacoesEnviadas: 3521,
    agendamentosApp: 892,
    avaliacaoMedia: 4.8
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Agendamento Online',
      description: 'Tutores podem agendar consultas diretamente pelo app'
    },
    {
      icon: <Bell className="w-6 h-6 text-green-600" />,
      title: 'Lembretes Automáticos',
      description: 'Notificações de vacinas, medicamentos e consultas'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      title: 'Chat Direto',
      description: 'Comunicação direta entre veterinário e tutor'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: 'Histórico Médico',
      description: 'Acesso completo ao histórico de saúde do pet'
    }
  ];

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">App do Tutor</h1>
              <p className="text-sm text-gray-500">Conecte-se com seus clientes através do aplicativo móvel</p>
            </div>
          </div>

          {/* Plano PRO Badge */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Recurso Exclusivo - Plano PRO</h3>
                  <p className="text-purple-100 text-sm">Ofereça uma experiência premium aos seus clientes</p>
                </div>
              </div>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Upgrade para PRO
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notificações
              </button>
              <button
                onClick={() => setActiveTab('download')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'download'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Download & QR Code
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.usuariosAtivos}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Notificações Enviadas</p>
                    <p className="text-2xl font-bold text-green-600">{stats.notificacoesEnviadas}</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Bell className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Agendamentos via App</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.agendamentosApp}</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.avaliacaoMedia}</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Funcionalidades do App</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações do App</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notificações Push</h4>
                      <p className="text-sm text-gray-600">Enviar lembretes automáticos</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Agendamento Online</h4>
                      <p className="text-sm text-gray-600">Permitir agendamentos pelo app</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Chat em Tempo Real</h4>
                      <p className="text-sm text-gray-600">Comunicação direta com tutores</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Central de Notificações</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Nova Notificação
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {notificacoes.map((notificacao) => (
                <div key={notificacao.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      notificacao.lida ? 'bg-gray-300' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{notificacao.titulo}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notificacao.tipo === 'lembrete' ? 'bg-yellow-100 text-yellow-800' :
                          notificacao.tipo === 'resultado' ? 'bg-green-100 text-green-800' :
                          notificacao.tipo === 'agendamento' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {notificacao.tipo.charAt(0).toUpperCase() + notificacao.tipo.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notificacao.mensagem}</p>
                      <p className="text-gray-400 text-xs">{notificacao.data}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Reenviar
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'download' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">QR Code para Download</h3>
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Compartilhe este QR Code com seus clientes para download direto do app
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Baixar QR Code
                </button>
              </div>
            </div>

            {/* Links de Download */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Links de Download</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">iOS</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">App Store</h4>
                      <p className="text-sm text-gray-600">Para dispositivos iPhone e iPad</p>
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download na App Store</span>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AND</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Google Play</h4>
                      <p className="text-sm text-gray-600">Para dispositivos Android</p>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Baixar no Google Play</span>
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Link Personalizado</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value="https://app.petcare.com/clinica-exemplo"
                      readOnly
                      className="flex-1 px-3 py-2 border border-blue-300 rounded-lg bg-white text-sm"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}