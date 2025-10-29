import { supabase } from './supabase'
import bcrypt from 'bcryptjs'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  user_type: 'vet' | 'clinic'
}

export interface AuthUser {
  id: string
  email: string
  name: string
  user_type: 'vet' | 'clinic'
  plan: string
  phone?: string
  address?: string
}

// Função para fazer login
export async function loginUser(credentials: LoginCredentials): Promise<AuthUser | null> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single()

    if (error || !user) {
      throw new Error('Usuário não encontrado')
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)
    
    if (!isValidPassword) {
      throw new Error('Senha incorreta')
    }

    // Retornar dados do usuário (sem a senha)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      user_type: user.user_type,
      plan: user.plan,
      phone: user.phone,
      address: user.address
    }
  } catch (error) {
    console.error('Erro no login:', error)
    return null
  }
}

// Função para registrar usuário
export async function registerUser(userData: RegisterData): Promise<AuthUser | null> {
  try {
    // Hash da senha
    const saltRounds = 10
    const password_hash = await bcrypt.hash(userData.password, saltRounds)

    // Inserir usuário no banco
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          name: userData.name,
          email: userData.email,
          password_hash,
          user_type: userData.user_type,
          plan: 'VetBásico' // Plano gratuito inicial
        }
      ])
      .select()
      .single()

    if (error) {
      throw new Error('Erro ao criar usuário: ' + error.message)
    }

    // Retornar dados do usuário (sem a senha)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      user_type: user.user_type,
      plan: user.plan,
      phone: user.phone,
      address: user.address
    }
  } catch (error) {
    console.error('Erro no registro:', error)
    return null
  }
}

// Função para verificar se email já existe
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    return !!data && !error
  } catch (error) {
    return false
  }
}

// Função para atualizar plano do usuário após pagamento
export async function updateUserPlan(userId: string, planName: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ plan: planName, updated_at: new Date().toISOString() })
      .eq('id', userId)

    return !error
  } catch (error) {
    console.error('Erro ao atualizar plano:', error)
    return false
  }
}

// Função para salvar dados de pagamento
export async function savePayment(paymentData: {
  user_id: string
  plan_name: string
  amount: number
  payment_method?: string
  mercadopago_payment_id?: string
  status: string
}): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('payments')
      .insert([paymentData])

    return !error
  } catch (error) {
    console.error('Erro ao salvar pagamento:', error)
    return false
  }
}

// Função para buscar usuário por ID
export async function getUserById(userId: string): Promise<AuthUser | null> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, user_type, plan, phone, address')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return null
    }

    return user as AuthUser
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}