// Tipos para o sistema PetCare+

export interface User {
  id: string
  name: string
  email: string
  role: 'vet' | 'admin' | 'assistant' | 'receptionist'
  plan: 'vet-basic' | 'vet-pro' | 'clinic-basic' | 'clinic-pro'
  clinic?: string
  permissions: string[]
  createdAt: string
  lastLogin?: string
}

export interface Pet {
  id: string
  name: string
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'
  breed: string
  age: number
  weight: number
  color: string
  gender: 'male' | 'female'
  neutered: boolean
  owner: Owner
  microchip?: string
  lastVisit: string
  status: 'healthy' | 'treatment' | 'critical' | 'deceased'
  allergies: string[]
  medications: string[]
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  address: Address
  cpf?: string
  birthDate?: string
  pets: string[] // Pet IDs
  emergencyContact?: EmergencyContact
  preferences: {
    notifications: boolean
    whatsapp: boolean
    email: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export interface Appointment {
  id: string
  petId: string
  ownerId: string
  vetId: string
  date: string
  time: string
  duration: number // em minutos
  type: 'consultation' | 'vaccination' | 'surgery' | 'grooming' | 'return' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  reason: string
  notes?: string
  homeVisit: boolean
  address?: Address
  price: number
  paid: boolean
  paymentMethod?: 'cash' | 'card' | 'pix' | 'transfer'
  createdAt: string
  updatedAt: string
}

export interface MedicalRecord {
  id: string
  petId: string
  vetId: string
  appointmentId?: string
  date: string
  type: 'consultation' | 'vaccination' | 'surgery' | 'exam' | 'treatment'
  complaint: string
  examination: string
  diagnosis: string
  treatment: string
  prescription: Prescription[]
  nextAppointment?: string
  weight?: number
  temperature?: number
  heartRate?: number
  respiratoryRate?: number
  bloodPressure?: string
  attachments: Attachment[]
  digitalSignature?: string
  aiGenerated: boolean
  createdAt: string
  updatedAt: string
}

export interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  quantity: number
}

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'document' | 'video'
  url: string
  size: number
  uploadedAt: string
}

export interface FinancialTransaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
  paymentMethod: 'cash' | 'card' | 'pix' | 'transfer' | 'check'
  status: 'pending' | 'completed' | 'cancelled'
  appointmentId?: string
  petId?: string
  ownerId?: string
  recurring: boolean
  recurringConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
    endDate?: string
  }
  createdAt: string
  updatedAt: string
}

export interface InventoryItem {
  id: string
  name: string
  category: 'medication' | 'vaccine' | 'supply' | 'food' | 'accessory'
  brand: string
  description: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  costPrice: number
  salePrice: number
  supplier: string
  barcode?: string
  expirationDate?: string
  batchNumber?: string
  location: string
  status: 'active' | 'inactive' | 'discontinued'
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: string
  itemId: string
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  reason: string
  reference?: string // ID da venda, consulta, etc.
  userId: string
  date: string
  createdAt: string
}

export interface HomeVisit {
  id: string
  appointmentId: string
  address: Address
  estimatedDuration: number
  travelTime: number
  distance: number
  status: 'scheduled' | 'in-route' | 'arrived' | 'completed' | 'cancelled'
  route?: RoutePoint[]
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface RoutePoint {
  lat: number
  lng: number
  address: string
  estimatedArrival: string
  order: number
}

export interface Communication {
  id: string
  type: 'whatsapp' | 'email' | 'sms' | 'push'
  recipient: string
  subject?: string
  message: string
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed'
  scheduledFor?: string
  sentAt?: string
  template?: string
  variables?: Record<string, string>
  createdAt: string
}

export interface Hospitalization {
  id: string
  petId: string
  vetId: string
  admissionDate: string
  dischargeDate?: string
  reason: string
  status: 'admitted' | 'treatment' | 'recovery' | 'discharged' | 'transferred'
  room: string
  bed: string
  dailyCost: number
  totalCost: number
  notes: string
  vitals: VitalSigns[]
  medications: HospitalizationMedication[]
  procedures: HospitalizationProcedure[]
  createdAt: string
  updatedAt: string
}

export interface VitalSigns {
  id: string
  date: string
  time: string
  temperature: number
  heartRate: number
  respiratoryRate: number
  bloodPressure?: string
  weight?: number
  notes?: string
  userId: string
}

export interface HospitalizationMedication {
  id: string
  medication: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  administeredBy: string[]
  notes?: string
}

export interface HospitalizationProcedure {
  id: string
  name: string
  date: string
  time: string
  performedBy: string
  notes?: string
  cost: number
}

export interface TutorAppAccess {
  id: string
  ownerId: string
  petIds: string[]
  permissions: {
    viewRecords: boolean
    viewVaccinations: boolean
    viewPrescriptions: boolean
    scheduleAppointments: boolean
    viewFinancial: boolean
  }
  lastAccess?: string
  deviceInfo?: {
    platform: string
    version: string
    deviceId: string
  }
  createdAt: string
  updatedAt: string
}

export interface AIAssistant {
  sessionId: string
  userId: string
  petId?: string
  context: 'consultation' | 'diagnosis' | 'prescription' | 'general'
  messages: AIMessage[]
  suggestions: AISuggestion[]
  confidence: number
  createdAt: string
  updatedAt: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  audioUrl?: string
  transcription?: string
}

export interface AISuggestion {
  id: string
  type: 'diagnosis' | 'treatment' | 'medication' | 'exam'
  content: string
  confidence: number
  reasoning: string
  references?: string[]
}

// Configurações de planos
export interface PlanFeatures {
  'vet-basic': string[]
  'vet-pro': string[]
  'clinic-basic': string[]
  'clinic-pro': string[]
}

export const PLAN_FEATURES: PlanFeatures = {
  'vet-basic': [
    'basic-records',
    'basic-schedule',
    'basic-finance',
    'basic-inventory',
    'drug-calculator'
  ],
  'vet-pro': [
    'basic-records',
    'digital-signature',
    'ai-assistant',
    'voice-transcription',
    'basic-schedule',
    'basic-finance',
    'auto-finance',
    'basic-inventory',
    'lot-control',
    'home-visits',
    'route-optimization',
    'auto-communication'
  ],
  'clinic-basic': [
    'basic-records',
    'basic-schedule',
    'basic-finance',
    'basic-inventory',
    'team-management-5',
    'drug-calculator'
  ],
  'clinic-pro': [
    'basic-records',
    'digital-signature',
    'ai-assistant',
    'voice-transcription',
    'basic-schedule',
    'basic-finance',
    'auto-finance',
    'basic-inventory',
    'lot-control',
    'pdv',
    'commissions',
    'home-visits',
    'route-optimization',
    'auto-communication',
    'unlimited-users',
    'hospitalization',
    'tutor-app',
    'advanced-reports',
    'api-integrations'
  ]
}

// Utilitários de tipo
export type PlanType = keyof PlanFeatures
export type FeatureType = PlanFeatures[PlanType][number]