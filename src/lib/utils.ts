import { PlanType, PLAN_FEATURES } from './types'

// Utilitários para verificação de funcionalidades por plano
export const hasFeature = (userPlan: PlanType, feature: string): boolean => {
  return PLAN_FEATURES[userPlan]?.includes(feature) || false
}

// Configurações de planos
export const PLAN_CONFIG = {
  'vet-basic': {
    name: 'Vet Básico',
    price: 0,
    priceLabel: 'Grátis',
    description: 'Essencial para veterinários autônomos',
    color: 'gray',
    maxUsers: 1,
    features: [
      'Prontuário eletrônico básico',
      'Agendamento de consultas',
      'Controle financeiro básico',
      'Controle de estoque básico',
      'Calculadora de doses'
    ]
  },
  'vet-pro': {
    name: 'Vet Pro',
    price: 19.90,
    priceLabel: 'R$ 19,90',
    description: 'Automação e inteligência para veterinários',
    color: 'blue',
    maxUsers: 1,
    features: [
      'Todas as funcionalidades do Básico',
      'Assinatura digital',
      'Assistente IA para prontuários',
      'Transcrição de voz',
      'Lançamentos automáticos',
      'Controle de lote/validade',
      'Atendimento domiciliar',
      'Otimização de rotas',
      'Comunicação automatizada'
    ]
  },
  'clinic-basic': {
    name: 'Clínica Básica',
    price: 97.00,
    priceLabel: 'R$ 97,00',
    description: 'Gestão completa para clínicas',
    color: 'green',
    maxUsers: 5,
    features: [
      'Todas as funcionalidades do Vet Básico',
      'Gestão de equipe (até 5 usuários)',
      'Relatórios básicos',
      'Controle de permissões'
    ]
  },
  'clinic-pro': {
    name: 'Clínica Pro',
    price: 197.00,
    priceLabel: 'R$ 197,00',
    description: 'IA, automação e escalabilidade total',
    color: 'purple',
    maxUsers: -1, // Ilimitado
    features: [
      'Todas as funcionalidades do Vet Pro',
      'Usuários ilimitados',
      'Módulo de vendas (PDV)',
      'Gestão de comissões',
      'Gestão de internação',
      'App do tutor',
      'Relatórios avançados',
      'Integrações via API',
      'Conciliação bancária'
    ]
  }
} as const

// Cores por plano
export const getPlanColor = (plan: PlanType) => {
  const colors = {
    'vet-basic': {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      button: 'bg-gray-600 hover:bg-gray-700'
    },
    'vet-pro': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    'clinic-basic': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      button: 'bg-green-600 hover:bg-green-700'
    },
    'clinic-pro': {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  }
  
  return colors[plan]
}

// Formatação de moeda
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Formatação de data
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR').format(d)
}

// Formatação de data e hora
export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

// Formatação de telefone
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

// Formatação de CPF
export const formatCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/)
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`
  }
  return cpf
}

// Validação de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validação de CPF
export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')
  
  if (cleaned.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleaned)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(10))) return false
  
  return true
}

// Geração de ID único
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// Cálculo de idade
export const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Status de saúde com cores
export const getHealthStatusColor = (status: string) => {
  const colors = {
    healthy: 'bg-green-100 text-green-800',
    treatment: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
    deceased: 'bg-gray-100 text-gray-800'
  }
  
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

// Status de consulta com cores
export const getAppointmentStatusColor = (status: string) => {
  const colors = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    'no-show': 'bg-gray-100 text-gray-800'
  }
  
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

// Tradução de status
export const translateStatus = (status: string, context: 'health' | 'appointment' | 'payment' = 'health') => {
  const translations = {
    health: {
      healthy: 'Saudável',
      treatment: 'Em tratamento',
      critical: 'Crítico',
      deceased: 'Falecido'
    },
    appointment: {
      scheduled: 'Agendada',
      confirmed: 'Confirmada',
      'in-progress': 'Em andamento',
      completed: 'Concluída',
      cancelled: 'Cancelada',
      'no-show': 'Faltou'
    },
    payment: {
      pending: 'Pendente',
      completed: 'Pago',
      cancelled: 'Cancelado',
      overdue: 'Vencido'
    }
  }
  
  return translations[context][status as keyof typeof translations[typeof context]] || status
}

// Simulação de dados para desenvolvimento
export const generateMockData = () => {
  return {
    pets: [
      {
        id: '1',
        name: 'Rex',
        species: 'dog' as const,
        breed: 'Golden Retriever',
        age: 3,
        weight: 25.5,
        status: 'healthy' as const,
        owner: 'João Silva',
        lastVisit: '2024-01-15'
      },
      {
        id: '2',
        name: 'Mimi',
        species: 'cat' as const,
        breed: 'Persa',
        age: 2,
        weight: 4.2,
        status: 'treatment' as const,
        owner: 'Ana Costa',
        lastVisit: '2024-01-14'
      },
      {
        id: '3',
        name: 'Thor',
        species: 'dog' as const,
        breed: 'Pastor Alemão',
        age: 5,
        weight: 35.0,
        status: 'critical' as const,
        owner: 'Carlos Lima',
        lastVisit: '2024-01-13'
      }
    ],
    appointments: [
      {
        id: '1',
        petName: 'Rex',
        ownerName: 'João Silva',
        time: '09:00',
        type: 'Consulta',
        status: 'completed' as const
      },
      {
        id: '2',
        petName: 'Mimi',
        ownerName: 'Ana Costa',
        time: '10:30',
        type: 'Vacina',
        status: 'in-progress' as const
      },
      {
        id: '3',
        petName: 'Thor',
        ownerName: 'Carlos Lima',
        time: '14:00',
        type: 'Cirurgia',
        status: 'scheduled' as const
      }
    ],
    stats: {
      todayAppointments: 12,
      activePatients: 248,
      monthlyRevenue: 18400,
      lowStock: 5
    }
  }
}