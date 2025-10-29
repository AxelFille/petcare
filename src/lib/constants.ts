// Constantes do sistema PetCare+

// Informações do produto
export const APP_INFO = {
  name: 'PetCare+',
  tagline: 'Super Gestão Veterinária',
  version: '1.0.0',
  description: 'Sistema completo de gestão veterinária com IA integrada'
} as const

// Cores oficiais da marca
export const BRAND_COLORS = {
  primary: '#2563eb', // Azul
  secondary: '#16a34a', // Verde
  accent: '#dc2626', // Vermelho (para alertas)
  neutral: '#ffffff', // Branco
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const

// Configurações de planos
export const PLANS = {
  VET_BASIC: {
    id: 'vet-basic',
    name: 'Vet Básico',
    price: 0,
    billing: 'monthly',
    description: 'Essencial para veterinários autônomos',
    maxUsers: 1,
    maxPets: 100,
    storage: '1GB'
  },
  VET_PRO: {
    id: 'vet-pro',
    name: 'Vet Pro',
    price: 19.90,
    billing: 'monthly',
    description: 'Automação e inteligência para veterinários',
    maxUsers: 1,
    maxPets: 500,
    storage: '5GB'
  },
  CLINIC_BASIC: {
    id: 'clinic-basic',
    name: 'Clínica Básica',
    price: 97.00,
    billing: 'monthly',
    description: 'Gestão completa para clínicas',
    maxUsers: 5,
    maxPets: 1000,
    storage: '10GB'
  },
  CLINIC_PRO: {
    id: 'clinic-pro',
    name: 'Clínica Pro',
    price: 197.00,
    billing: 'monthly',
    description: 'IA, automação e escalabilidade total',
    maxUsers: -1, // Ilimitado
    maxPets: -1, // Ilimitado
    storage: '50GB'
  }
} as const

// Tipos de usuário
export const USER_ROLES = {
  VET: 'vet',
  ADMIN: 'admin',
  ASSISTANT: 'assistant',
  RECEPTIONIST: 'receptionist'
} as const

// Espécies de animais
export const PET_SPECIES = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  RABBIT: 'rabbit',
  HAMSTER: 'hamster',
  GUINEA_PIG: 'guinea_pig',
  FERRET: 'ferret',
  REPTILE: 'reptile',
  FISH: 'fish',
  OTHER: 'other'
} as const

// Traduções de espécies
export const SPECIES_TRANSLATIONS = {
  dog: 'Cão',
  cat: 'Gato',
  bird: 'Ave',
  rabbit: 'Coelho',
  hamster: 'Hamster',
  guinea_pig: 'Porquinho-da-índia',
  ferret: 'Furão',
  reptile: 'Réptil',
  fish: 'Peixe',
  other: 'Outro'
} as const

// Status de saúde
export const HEALTH_STATUS = {
  HEALTHY: 'healthy',
  TREATMENT: 'treatment',
  CRITICAL: 'critical',
  DECEASED: 'deceased'
} as const

// Status de consultas
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show'
} as const

// Tipos de consulta
export const APPOINTMENT_TYPES = {
  CONSULTATION: 'consultation',
  VACCINATION: 'vaccination',
  SURGERY: 'surgery',
  GROOMING: 'grooming',
  RETURN: 'return',
  EMERGENCY: 'emergency',
  EXAM: 'exam',
  TREATMENT: 'treatment'
} as const

// Traduções de tipos de consulta
export const APPOINTMENT_TYPE_TRANSLATIONS = {
  consultation: 'Consulta',
  vaccination: 'Vacinação',
  surgery: 'Cirurgia',
  grooming: 'Banho e Tosa',
  return: 'Retorno',
  emergency: 'Emergência',
  exam: 'Exame',
  treatment: 'Tratamento'
} as const

// Métodos de pagamento
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  PIX: 'pix',
  TRANSFER: 'transfer',
  CHECK: 'check'
} as const

// Traduções de métodos de pagamento
export const PAYMENT_METHOD_TRANSLATIONS = {
  cash: 'Dinheiro',
  card: 'Cartão',
  pix: 'PIX',
  transfer: 'Transferência',
  check: 'Cheque'
} as const

// Categorias de estoque
export const INVENTORY_CATEGORIES = {
  MEDICATION: 'medication',
  VACCINE: 'vaccine',
  SUPPLY: 'supply',
  FOOD: 'food',
  ACCESSORY: 'accessory',
  EQUIPMENT: 'equipment'
} as const

// Traduções de categorias de estoque
export const INVENTORY_CATEGORY_TRANSLATIONS = {
  medication: 'Medicamento',
  vaccine: 'Vacina',
  supply: 'Material',
  food: 'Ração/Alimento',
  accessory: 'Acessório',
  equipment: 'Equipamento'
} as const

// Tipos de comunicação
export const COMMUNICATION_TYPES = {
  WHATSAPP: 'whatsapp',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push'
} as const

// Templates de comunicação
export const COMMUNICATION_TEMPLATES = {
  APPOINTMENT_REMINDER: 'appointment_reminder',
  VACCINATION_REMINDER: 'vaccination_reminder',
  APPOINTMENT_CONFIRMATION: 'appointment_confirmation',
  TREATMENT_FOLLOW_UP: 'treatment_follow_up',
  BIRTHDAY_GREETING: 'birthday_greeting',
  PAYMENT_REMINDER: 'payment_reminder'
} as const

// Configurações de IA
export const AI_CONFIG = {
  MAX_TOKENS: 4000,
  TEMPERATURE: 0.7,
  CONFIDENCE_THRESHOLD: 0.8,
  SUPPORTED_LANGUAGES: ['pt-BR', 'en-US'],
  VOICE_RECOGNITION_TIMEOUT: 30000 // 30 segundos
} as const

// Configurações de mapa/rotas
export const MAP_CONFIG = {
  DEFAULT_CENTER: {
    lat: -23.5505,
    lng: -46.6333 // São Paulo
  },
  DEFAULT_ZOOM: 12,
  MAX_ROUTE_POINTS: 10,
  OPTIMIZATION_RADIUS: 50 // km
} as const

// Configurações de notificação
export const NOTIFICATION_CONFIG = {
  APPOINTMENT_REMINDER_HOURS: [24, 2], // 24h e 2h antes
  VACCINATION_REMINDER_DAYS: [30, 7, 1], // 30, 7 e 1 dia antes
  LOW_STOCK_THRESHOLD: 10,
  CRITICAL_STOCK_THRESHOLD: 5
} as const

// Configurações de arquivo
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg']
} as const

// Configurações de segurança
export const SECURITY_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  SESSION_TIMEOUT: 8 * 60 * 60 * 1000, // 8 horas
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  JWT_EXPIRY: '24h'
} as const

// Configurações de backup
export const BACKUP_CONFIG = {
  AUTO_BACKUP_INTERVAL: 24 * 60 * 60 * 1000, // 24 horas
  RETENTION_DAYS: 30,
  BACKUP_TYPES: ['full', 'incremental', 'differential']
} as const

// URLs e endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  AUTH: '/auth',
  USERS: '/users',
  PETS: '/pets',
  APPOINTMENTS: '/appointments',
  RECORDS: '/records',
  INVENTORY: '/inventory',
  FINANCE: '/finance',
  COMMUNICATION: '/communication',
  AI: '/ai',
  MAPS: '/maps'
} as const

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  MOCK_DATA: process.env.NODE_ENV === 'development',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
} as const

// Regex patterns
export const REGEX_PATTERNS = {
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  PHONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CEP: /^\d{5}-\d{3}$/
} as const