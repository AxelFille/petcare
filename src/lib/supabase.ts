import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas
export interface User {
  id: string
  email: string
  name: string
  password_hash: string
  user_type: 'vet' | 'clinic'
  plan: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Tutor {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  name: string
  species: string
  breed?: string
  age?: string
  weight?: string
  sex?: string
  status: 'ativo' | 'inativo'
  tutor_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  patient_id: string
  user_id: string
  appointment_date: string
  appointment_type: string
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'finalizado' | 'cancelado'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  plan_name: string
  amount: number
  payment_method?: string
  mercadopago_payment_id?: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: string
  patient_id: string
  user_id: string
  appointment_id?: string
  diagnosis?: string
  treatment?: string
  medications?: string
  observations?: string
  created_at: string
  updated_at: string
}

export interface InventoryItem {
  id: string
  user_id: string
  product_name: string
  category?: string
  quantity: number
  min_quantity: number
  unit_price?: number
  supplier?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}