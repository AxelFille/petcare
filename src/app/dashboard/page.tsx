'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { 
  Heart, 
  Calendar, 
  FileText, 
  DollarSign, 
  Package, 
  MapPin, 
  Users, 
  Smartphone,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Activity,
  Clock,
  Mic,
  MicOff,
  Brain,
  Crown
} from 'lucide-react';

export default function Dashboard() {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const storedUser = localStorage.getItem('petcare_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Simulação de reconhecimento de voz
  const startVoiceRecognition = () => {
    setIsListening(true);
    // Simular comando de voz
    setTimeout(() => {
      setVoiceCommand('Agendar consulta para Rex amanhã às 10h');
      setIsListening(false);
      // Processar comando
      setTimeout(() => {
        alert('Comando processado: Consulta agendada para Rex em ' + new Date(Date.now() + 86400000).toLocaleDateString() + ' às 10:00');
        setVoiceCommand('');
      }, 2000);
    }, 3000);
  };

  // Dados dinâmicos baseados no plano do usuário
  const getStatsForPlan = (plan: string) => {
    const baseStats = [
      {
        title: 'Consultas Hoje',
        value: '0',
        change: '+0',
        icon: <Calendar className="w-8 h-8 text-blue-600" />,
        color: 'bg-blue-50'
      },
      {
        title: 'Receita do Mês',
        value: 'R$ 0,00',
        change: '+0%',
        icon: <DollarSign className="w-8 h-8 text-green-600" />,
        color: 'bg-green-50'
      },
      {
        title: 'Pacientes Ativos',
        value: '0',
        change: '+0',
        icon: <Users className="w-8 h-8 text-purple-600" />,
        color: 'bg-purple-50'
      },
      {
        title: 'Estoque Baixo',
        value: '0',
        change: '0',
        icon: <Package className="w-8 h-8 text-orange-600" />,
        color: 'bg-orange-50'
      }
    ];

    // Se for plano pago, mostrar dados de exemplo mais realistas
    if (plan && plan !== 'VetBásico') {
      return [
        {
          title: 'Consultas Hoje',
          value: '8',
          change: '+3',
          icon: <Calendar className="w-8 h-8 text-blue-600" />,
          color: 'bg-blue-50'
        },
        {
          title: 'Receita do Mês',
          value: 'R$ 12.350',
          change: '+18%',
          icon: <DollarSign className="w-8 h-8 text-green-600" />,
          color: 'bg-green-50'
        },
        {
          title: 'Pacientes Ativos',
          value: '156',
          change: '+12',
          icon: <Users className="w-8 h-8 text-purple-600" />,
          color: 'bg-purple-50'
        },
        {
          title: 'Estoque Baixo',
          value: '3',
          change: '-1',
          icon: <Package className="w-8 h-8 text-orange-600" />,
          color: 'bg-orange-50'
        }
      ];
    }

    return baseStats;
  };

  const stats = getStatsForPlan(userData?.plan);

  const getAppointmentsForPlan = (plan: string) => {
    if (plan && plan !== 'VetBásico') {
      return [
        { id: 1, pet: 'Rex', owner: 'João Silva', time: '09:00', type: 'Consulta', status: 'Confirmado' },
        { id: 2, pet: 'Mimi', owner: 'Ana Costa', time: '10:30', type: 'Vacinação', status: 'Em andamento' },
        { id: 3, pet: 'Thor', owner: 'Carlos Lima', time: '14:00', type: 'Cirurgia', status: 'Agendado' },
        { id: 4, pet: 'Luna', owner: 'Maria Santos', time: '15:30', type: 'Consulta', status: 'Confirmado' }
      ];
    }
    return [];
  };

  const recentAppointments = getAppointmentsForPlan(userData?.plan);

  const quickActions = [
    { name: 'Nova Consulta', icon: <Plus className="w-5 h-5" />, color: 'bg-blue-600', href: '/agendamento' },
    { name: 'Prontuário', icon: <FileText className="w-5 h-5" />, color: 'bg-green-600', href: '/prontuarios' },
    { name: 'Financeiro', icon: <DollarSign className="w-5 h-5" />, color: 'bg-purple-600', href: '/financeiro' },
    { name: 'Estoque', icon: <Package className="w-5 h-5" />, color: 'bg-orange-600', href: '/estoque' }
  ];

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      'VetBásico': { color: 'bg-gray-100 text-gray-800', icon: null },
      'VetPro': { color: 'bg-blue-100 text-blue-800', icon: <Crown className="w-4 h-4" /> },
      'Clínica Básica': { color: 'bg-green-100 text-green-800', icon: null },
      'Clínica Pro': { color: 'bg-green-100 text-green-800', icon: <Crown className="w-4 h-4" /> }
    };

    const config = planConfig[plan as keyof typeof planConfig] || planConfig['VetBásico'];

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon && <span className="mr-1">{config.icon}</span>}
        {plan}
      </span>
    );
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo de volta, {userData?.name || 'Usuário'}!
              </p>
              {userData?.plan && (
                <div className="mt-2">
                  {getPlanBadge(userData.plan)}
                </div>
              )}
            </div>
            
            {/* Voice Command */}
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isListening ? 'Ouvindo...' : 'Comando de Voz'}</span>
                </button>
                
                {voiceCommand && (
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                    <Brain className="w-4 h-4 inline mr-1" />
                    {voiceCommand}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => window.location.href = action.href}
                className={`${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity flex flex-col items-center space-y-2`}
              >
                {action.icon}
                <span className="text-sm font-medium">{action.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Consultas de Hoje</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todas
              </button>
            </div>
            
            {recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.pet}</p>
                        <p className="text-sm text-gray-600">{appointment.owner}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-xs text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma consulta agendada para hoje</p>
                <button 
                  onClick={() => window.location.href = '/agendamento'}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Agendar primeira consulta
                </button>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Atividades Recentes</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            
            {userData?.plan && userData.plan !== 'VetBásico' ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Consulta de Rex finalizada</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Novo paciente cadastrado: Mimi</p>
                    <p className="text-xs text-gray-500">Há 4 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Estoque baixo: Vacina V10</p>
                    <p className="text-xs text-gray-500">Há 6 horas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Pagamento recebido: R$ 150,00</p>
                    <p className="text-xs text-gray-500">Ontem</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Comece a usar o sistema para ver atividades</p>
                <p className="text-xs text-gray-400">
                  Agende consultas, cadastre pacientes e gerencie seu estoque
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Plan Upgrade Banner (apenas para plano gratuito) */}
        {userData?.plan === 'VetBásico' && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Desbloqueie todo o potencial do PetCare+</h3>
                <p className="text-blue-100 mb-4">
                  Upgrade para VetPro e tenha acesso a IA, comandos de voz, relatórios avançados e muito mais!
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Fazer Upgrade
                </button>
              </div>
              <div className="hidden md:block">
                <Crown className="w-16 h-16 text-yellow-300" />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}