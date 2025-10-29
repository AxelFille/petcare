'use client'

import { useState, useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  Calendar, 
  User, 
  Heart, 
  Stethoscope,
  Camera,
  Mic,
  Brain,
  Shield,
  Save,
  Edit,
  Eye,
  Download,
  Upload,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  ChevronDown,
  ChevronRight,
  Paperclip,
  Activity,
  Pill,
  Syringe,
  Scissors,
  FileSignature,
  Zap,
  Volume2,
  Square,
  Play
} from 'lucide-react'

// Tipos para prontuários
interface MedicalRecord {
  id: string
  petId: string
  petName: string
  petSpecies: string
  petBreed: string
  ownerName: string
  ownerPhone: string
  date: string
  type: 'consultation' | 'surgery' | 'vaccination' | 'exam' | 'emergency'
  status: 'draft' | 'completed' | 'signed'
  veterinarian: string
  complaint: string
  clinicalExam: string
  diagnosis: string
  treatment: string
  prescription: string
  observations: string
  attachments: string[]
  aiGenerated?: boolean
  digitalSignature?: {
    signed: boolean
    timestamp?: string
    hash?: string
  }
}

interface User {
  id: string
  name: string
  email: string
  role: 'vet' | 'admin' | 'assistant'
  plan: 'vet-basic' | 'vet-pro' | 'clinic-basic' | 'clinic-pro'
  clinic?: string
}

export default function ProntuariosPage() {
  const [currentUser] = useState<User>({
    id: '1',
    name: 'Dr. Maria Silva',
    email: 'maria@petcare.com',
    role: 'vet',
    plan: 'clinic-pro',
    clinic: 'Clínica Vida Animal'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterType, setFilterType] = useState<string>('all')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingText, setRecordingText] = useState('')
  const [aiAssistantActive, setAiAssistantActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Evitar erro de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  // Verificar se funcionalidade está disponível no plano
  const hasFeature = (feature: string): boolean => {
    const planFeatures = {
      'vet-basic': ['basic-records'],
      'vet-pro': ['basic-records', 'digital-signature', 'ai-assistant'],
      'clinic-basic': ['basic-records'],
      'clinic-pro': ['basic-records', 'digital-signature', 'ai-assistant']
    }
    
    return planFeatures[currentUser.plan]?.includes(feature) || false
  }

  // Dados mockados de prontuários - usando datas fixas para evitar hidratação
  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      petId: 'pet1',
      petName: 'Rex',
      petSpecies: 'Cão',
      petBreed: 'Golden Retriever',
      ownerName: 'João Silva',
      ownerPhone: '(11) 99999-9999',
      date: '2024-01-15',
      type: 'consultation',
      status: 'signed',
      veterinarian: 'Dr. Maria Silva',
      complaint: 'Animal apresentando letargia e perda de apetite há 2 dias',
      clinicalExam: 'T: 39.2°C, FC: 120bpm, FR: 28rpm. Mucosas normocoradas, linfonodos normais. Abdome sem alterações à palpação.',
      diagnosis: 'Gastroenterite leve',
      treatment: 'Dieta leve, hidratação oral, repouso',
      prescription: 'Omeprazol 20mg - 1 comprimido a cada 12h por 5 dias\nProbiótico - 1 sachê ao dia por 7 dias',
      observations: 'Retorno em 3 dias se não houver melhora',
      attachments: [],
      aiGenerated: true,
      digitalSignature: {
        signed: true,
        timestamp: '2024-01-15T14:30:00Z',
        hash: 'abc123def456'
      }
    },
    {
      id: '2',
      petId: 'pet2',
      petName: 'Mimi',
      petSpecies: 'Gato',
      petBreed: 'Persa',
      ownerName: 'Ana Costa',
      ownerPhone: '(11) 88888-8888',
      date: '2024-01-14',
      type: 'vaccination',
      status: 'completed',
      veterinarian: 'Dr. Carlos Santos',
      complaint: 'Vacinação anual',
      clinicalExam: 'Animal saudável, sem alterações ao exame físico',
      diagnosis: 'Animal hígido',
      treatment: 'Vacinação V4 + antirrábica',
      prescription: 'Não se aplica',
      observations: 'Próxima vacinação em 12 meses',
      attachments: ['carteira_vacinacao.pdf'],
      digitalSignature: {
        signed: false
      }
    },
    {
      id: '3',
      petId: 'pet3',
      petName: 'Thor',
      petSpecies: 'Cão',
      petBreed: 'Pastor Alemão',
      ownerName: 'Carlos Lima',
      ownerPhone: '(11) 77777-7777',
      date: '2024-01-13',
      type: 'surgery',
      status: 'draft',
      veterinarian: 'Dr. Maria Silva',
      complaint: 'Fratura em membro posterior direito',
      clinicalExam: 'Fratura fechada em terço médio de fêmur direito, animal consciente e responsivo',
      diagnosis: 'Fratura de fêmur direito',
      treatment: 'Osteossíntese com placa e parafusos',
      prescription: 'Em elaboração...',
      observations: 'Cirurgia agendada para amanhã às 8h',
      attachments: ['raio_x_femur.jpg'],
      digitalSignature: {
        signed: false
      }
    }
  ])

  // Filtrar prontuários
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || record.type === filterType
    
    return matchesSearch && matchesFilter
  })

  // Simular gravação de voz
  const handleVoiceRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setRecordingText('Animal apresenta claudicação em membro anterior esquerdo, com edema e sensibilidade à palpação. Suspeita de entorse.')
      setIsRecording(false)
    }, 3000)
  }

  // Simular assistente IA
  const handleAiAssistant = () => {
    setAiAssistantActive(true)
    setTimeout(() => {
      setAiAssistantActive(false)
    }, 2000)
  }

  // Função para formatar data de forma consistente
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Função para formatar data e hora de forma consistente
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Componente para bloqueio de funcionalidades
  const FeatureLock = ({ feature, children }: { feature: string, children: React.ReactNode }) => {
    if (!hasFeature(feature)) {
      return (
        <div className="relative">
          <div className="opacity-50 pointer-events-none">
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <div className="text-center">
              <Shield className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-600 font-medium">Plano Pro</p>
            </div>
          </div>
        </div>
      )
    }
    return <>{children}</>
  }

  // Componente do formulário de prontuário
  const RecordForm = ({ record, onClose }: { record?: MedicalRecord, onClose: () => void }) => {
    const [formData, setFormData] = useState<Partial<MedicalRecord>>(record || {
      petName: '',
      petSpecies: '',
      petBreed: '',
      ownerName: '',
      ownerPhone: '',
      type: 'consultation',
      complaint: '',
      clinicalExam: '',
      diagnosis: '',
      treatment: '',
      prescription: '',
      observations: ''
    })

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {record ? 'Editar Prontuário' : 'Novo Prontuário'}
              </h2>
              {record?.aiGenerated && (
                <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  <Brain className="w-3 h-3" />
                  <span>IA</span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Assistente IA */}
          {hasFeature('ai-assistant') && (
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Assistente IA PetCare+</h3>
                    <p className="text-sm text-gray-600">Grave sua consulta ou digite para gerar prontuário automaticamente</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleVoiceRecording}
                    className={`p-3 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleAiAssistant}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      aiAssistantActive
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {aiAssistantActive ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Gerar com IA</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              {recordingText && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong>Transcrição:</strong> {recordingText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Formulário */}
          <div className="p-6 space-y-6">
            {/* Informações do Paciente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Pet</label>
                <input
                  type="text"
                  value={formData.petName || ''}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Rex"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Espécie</label>
                <select
                  value={formData.petSpecies || ''}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Raça</label>
                <input
                  type="text"
                  value={formData.petBreed || ''}
                  onChange={(e) => setFormData({...formData, petBreed: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Golden Retriever"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Atendimento</label>
                <select
                  value={formData.type || 'consultation'}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="consultation">Consulta</option>
                  <option value="surgery">Cirurgia</option>
                  <option value="vaccination">Vacinação</option>
                  <option value="exam">Exame</option>
                  <option value="emergency">Emergência</option>
                </select>
              </div>
            </div>

            {/* Informações do Tutor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Tutor</label>
                <input
                  type="text"
                  value={formData.ownerName || ''}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.ownerPhone || ''}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Dados Clínicos */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Queixa Principal</label>
                <textarea
                  value={formData.complaint || ''}
                  onChange={(e) => setFormData({...formData, complaint: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva o motivo da consulta..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exame Clínico</label>
                <textarea
                  value={formData.clinicalExam || ''}
                  onChange={(e) => setFormData({...formData, clinicalExam: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Temperatura, frequência cardíaca, exame físico..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                <textarea
                  value={formData.diagnosis || ''}
                  onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Diagnóstico clínico..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tratamento</label>
                <textarea
                  value={formData.treatment || ''}
                  onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Procedimentos realizados e tratamento indicado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prescrição</label>
                <textarea
                  value={formData.prescription || ''}
                  onChange={(e) => setFormData({...formData, prescription: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Medicamentos, dosagens e instruções..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <textarea
                  value={formData.observations || ''}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações adicionais, retornos, cuidados..."
                />
              </div>
            </div>

            {/* Anexos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anexos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-xs text-gray-500 mt-1">Imagens, PDFs, documentos (máx. 10MB cada)</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <Camera className="w-4 h-4" />
                <span className="text-sm">Foto</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">Anexar</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Salvar Rascunho
              </button>
              <FeatureLock feature="digital-signature">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <FileSignature className="w-4 h-4" />
                  <span>Assinar Digitalmente</span>
                </button>
              </FeatureLock>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Não renderizar até estar montado (evita hidratação)
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
                <FileText className="w-8 h-8 text-blue-600" />
                <span>Prontuários Eletrônicos</span>
              </h1>
              <p className="text-gray-600 mt-1">Gerencie os prontuários dos seus pacientes</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Prontuário</span>
            </button>
          </div>

          {/* Filtros e Busca */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por paciente, tutor ou diagnóstico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os tipos</option>
                <option value="consultation">Consultas</option>
                <option value="surgery">Cirurgias</option>
                <option value="vaccination">Vacinações</option>
                <option value="exam">Exames</option>
                <option value="emergency">Emergências</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Prontuários</p>
                <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assinados Digitalmente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {medicalRecords.filter(r => r.digitalSignature?.signed).length}
                </p>
              </div>
              <FileSignature className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gerados por IA</p>
                <p className="text-2xl font-bold text-gray-900">
                  {medicalRecords.filter(r => r.aiGenerated).length}
                </p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {medicalRecords.filter(r => r.status === 'draft').length}
                </p>
              </div>
              <Edit className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Lista de Prontuários */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Prontuários Recentes</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veterinário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{record.petName}</div>
                          <div className="text-sm text-gray-500">{record.petSpecies} • {record.petBreed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.ownerName}</div>
                      <div className="text-sm text-gray-500">{record.ownerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {record.type === 'consultation' && <Stethoscope className="w-4 h-4 text-blue-500" />}
                        {record.type === 'surgery' && <Scissors className="w-4 h-4 text-red-500" />}
                        {record.type === 'vaccination' && <Syringe className="w-4 h-4 text-green-500" />}
                        {record.type === 'exam' && <Activity className="w-4 h-4 text-purple-500" />}
                        {record.type === 'emergency' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                        <span className="text-sm text-gray-900 capitalize">
                          {record.type === 'consultation' ? 'Consulta' :
                           record.type === 'surgery' ? 'Cirurgia' :
                           record.type === 'vaccination' ? 'Vacinação' :
                           record.type === 'exam' ? 'Exame' : 'Emergência'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'signed' ? 'bg-green-100 text-green-800' :
                          record.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status === 'signed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {record.status === 'completed' && <FileText className="w-3 h-3 mr-1" />}
                          {record.status === 'draft' && <Edit className="w-3 h-3 mr-1" />}
                          {record.status === 'signed' ? 'Assinado' :
                           record.status === 'completed' ? 'Concluído' : 'Rascunho'}
                        </div>
                        {record.aiGenerated && (
                          <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Brain className="w-3 h-3 mr-1" />
                            IA
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.veterinarian}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Visualização */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Prontuário - {selectedRecord.petName}</h2>
                    <p className="text-sm text-gray-600">{selectedRecord.ownerName} • {formatDate(selectedRecord.date)}</p>
                  </div>
                  {selectedRecord.aiGenerated && (
                    <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      <Brain className="w-3 h-3" />
                      <span>Gerado por IA</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informações do Paciente</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nome:</strong> {selectedRecord.petName}</p>
                      <p><strong>Espécie:</strong> {selectedRecord.petSpecies}</p>
                      <p><strong>Raça:</strong> {selectedRecord.petBreed}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informações do Tutor</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Nome:</strong> {selectedRecord.ownerName}</p>
                      <p><strong>Telefone:</strong> {selectedRecord.ownerPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Queixa Principal</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.complaint}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Exame Clínico</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.clinicalExam}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Diagnóstico</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.diagnosis}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tratamento</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.treatment}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Prescrição</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-line">{selectedRecord.prescription}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Observações</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRecord.observations}</p>
                  </div>
                </div>

                {selectedRecord.digitalSignature?.signed && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Documento Assinado Digitalmente</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Assinado em {formatDateTime(selectedRecord.digitalSignature.timestamp!)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">Hash: {selectedRecord.digitalSignature.hash}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Veterinário: {selectedRecord.veterinarian}
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    <Download className="w-4 h-4 inline mr-2" />
                    Baixar PDF
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Criação/Edição */}
        {isCreating && (
          <RecordForm onClose={() => setIsCreating(false)} />
        )}
      </div>
    </AppLayout>
  )
}