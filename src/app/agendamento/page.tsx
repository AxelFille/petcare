'use client'

import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  User, 
  Phone, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  X,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Stethoscope,
  Syringe,
  Scissors,
  Activity
} from 'lucide-react'

interface Appointment {
  id: string
  petName: string
  petSpecies: string
  ownerName: string
  ownerPhone: string
  date: string
  time: string
  type: 'consultation' | 'surgery' | 'vaccination' | 'exam' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  veterinarian: string
  notes?: string
  duration: number
}

export default function AgendamentoPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day')
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dados mockados de agendamentos
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      petName: 'Rex',
      petSpecies: 'Cão',
      ownerName: 'João Silva',
      ownerPhone: '(11) 99999-9999',
      date: '2024-01-15',
      time: '09:00',
      type: 'consultation',
      status: 'confirmed',
      veterinarian: 'Dr. Maria Silva',
      duration: 30,
      notes: 'Consulta de rotina'
    },
    {
      id: '2',
      petName: 'Mimi',
      petSpecies: 'Gato',
      ownerName: 'Ana Costa',
      ownerPhone: '(11) 88888-8888',
      date: '2024-01-15',
      time: '10:30',
      type: 'vaccination',
      status: 'in-progress',
      veterinarian: 'Dr. Carlos Santos',
      duration: 15
    },
    {
      id: '3',
      petName: 'Thor',
      petSpecies: 'Cão',
      ownerName: 'Carlos Lima',
      ownerPhone: '(11) 77777-7777',
      date: '2024-01-15',
      time: '14:00',
      type: 'surgery',
      status: 'scheduled',
      veterinarian: 'Dr. Maria Silva',
      duration: 120,
      notes: 'Cirurgia de castração'
    },
    {
      id: '4',
      petName: 'Luna',
      petSpecies: 'Gato',
      ownerName: 'Maria Santos',
      ownerPhone: '(11) 66666-6666',
      date: '2024-01-15',
      time: '15:30',
      type: 'consultation',
      status: 'confirmed',
      veterinarian: 'Dr. Ana Oliveira',
      duration: 30
    }
  ])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    return time
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado'
      case 'scheduled':
        return 'Agendado'
      case 'in-progress':
        return 'Em Andamento'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-4 h-4 text-blue-500" />
      case 'surgery':
        return <Scissors className="w-4 h-4 text-red-500" />
      case 'vaccination':
        return <Syringe className="w-4 h-4 text-green-500" />
      case 'exam':
        return <Activity className="w-4 h-4 text-purple-500" />
      case 'emergency':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Heart className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'Consulta'
      case 'surgery':
        return 'Cirurgia'
      case 'vaccination':
        return 'Vacinação'
      case 'exam':
        return 'Exame'
      case 'emergency':
        return 'Emergência'
      default:
        return type
    }
  }

  // Filtrar agendamentos
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus
    
    const appointmentDate = new Date(appointment.date)
    const selectedDateStr = selectedDate.toISOString().split('T')[0]
    const appointmentDateStr = appointmentDate.toISOString().split('T')[0]
    const matchesDate = appointmentDateStr === selectedDateStr
    
    return matchesSearch && matchesFilter && matchesDate
  })

  // Componente do formulário de novo agendamento
  const NewAppointmentForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      petName: '',
      petSpecies: '',
      ownerName: '',
      ownerPhone: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '',
      type: 'consultation',
      veterinarian: '',
      duration: 30,
      notes: ''
    })

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Novo Agendamento</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Pet</label>
                <input
                  type="text"
                  value={formData.petName}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Rex"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Espécie</label>
                <select
                  value={formData.petSpecies}
                  onChange={(e) => setFormData({...formData, petSpecies: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Cão">Cão</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Roedor">Roedor</option>
                  <option value="Réptil">Réptil</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Tutor</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duração (min)</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1h 30min</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Atendimento</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consultation">Consulta</option>
                  <option value="surgery">Cirurgia</option>
                  <option value="vaccination">Vacinação</option>
                  <option value="exam">Exame</option>
                  <option value="emergency">Emergência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Veterinário</label>
                <select
                  value={formData.veterinarian}
                  onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Dr. Maria Silva">Dr. Maria Silva</option>
                  <option value="Dr. Carlos Santos">Dr. Carlos Santos</option>
                  <option value="Dr. Ana Oliveira">Dr. Ana Oliveira</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Observações adicionais..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Agendar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <span>Agendamento</span>
              </h1>
              <p className="text-gray-600 mt-1">Gerencie consultas e procedimentos</p>
            </div>
            <button
              onClick={() => setShowNewAppointment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Agendamento</span>
            </button>
          </div>

          {/* Controles de Data e Filtros */}
          <div className="mt-6 flex flex-col lg:flex-row gap-4">
            {/* Seletor de Data */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(newDate.getDate() - 1)
                  setSelectedDate(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(selectedDate)}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' })}
                </p>
              </div>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate)
                  newDate.setDate(newDate.getDate() + 1)
                  setSelectedDate(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Busca e Filtros */}
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por paciente ou tutor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os status</option>
                  <option value="scheduled">Agendado</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="in-progress">Em Andamento</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{filteredAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAppointments.filter(a => a.status === 'confirmed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAppointments.filter(a => a.status === 'in-progress').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAppointments.filter(a => a.status === 'scheduled').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Agendamentos - {formatDate(selectedDate)}
            </h3>
          </div>
          
          <div className="p-6">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum agendamento encontrado para esta data</p>
                <button
                  onClick={() => setShowNewAppointment(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Criar Primeiro Agendamento
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{appointment.petName}</h4>
                            <span className="text-sm text-gray-500">({appointment.petSpecies})</span>
                          </div>
                          <p className="text-sm text-gray-600">{appointment.ownerName}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{appointment.ownerPhone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{formatTime(appointment.time)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{appointment.duration} min</p>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="text-sm text-gray-700">{getTypeText(appointment.type)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{appointment.veterinarian}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          
                          <div className="flex items-center space-x-1">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Observações:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal de Novo Agendamento */}
        {showNewAppointment && (
          <NewAppointmentForm onClose={() => setShowNewAppointment(false)} />
        )}
      </div>
    </AppLayout>
  )
}