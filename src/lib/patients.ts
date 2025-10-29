import { supabase } from './supabase'
import type { Patient, Tutor } from './supabase'

export interface PatientWithTutor extends Patient {
  tutor: Tutor
}

// Buscar todos os pacientes de um usuário
export async function getPatientsByUser(userId: string): Promise<PatientWithTutor[]> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        tutor:tutors(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar pacientes:', error)
      return []
    }

    return data as PatientWithTutor[]
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error)
    return []
  }
}

// Criar novo paciente
export async function createPatient(patientData: {
  name: string
  species: string
  breed?: string
  age?: string
  weight?: string
  sex?: string
  tutor: {
    name: string
    email?: string
    phone: string
    address?: string
  }
  user_id: string
}): Promise<PatientWithTutor | null> {
  try {
    // Primeiro, criar o tutor
    const { data: tutorData, error: tutorError } = await supabase
      .from('tutors')
      .insert([{
        name: patientData.tutor.name,
        email: patientData.tutor.email,
        phone: patientData.tutor.phone,
        address: patientData.tutor.address,
        user_id: patientData.user_id
      }])
      .select()
      .single()

    if (tutorError) {
      console.error('Erro ao criar tutor:', tutorError)
      return null
    }

    // Depois, criar o paciente
    const { data: patientDataResult, error: patientError } = await supabase
      .from('patients')
      .insert([{
        name: patientData.name,
        species: patientData.species,
        breed: patientData.breed,
        age: patientData.age,
        weight: patientData.weight,
        sex: patientData.sex,
        tutor_id: tutorData.id,
        user_id: patientData.user_id
      }])
      .select(`
        *,
        tutor:tutors(*)
      `)
      .single()

    if (patientError) {
      console.error('Erro ao criar paciente:', patientError)
      return null
    }

    return patientDataResult as PatientWithTutor
  } catch (error) {
    console.error('Erro ao criar paciente:', error)
    return null
  }
}

// Atualizar paciente
export async function updatePatient(patientId: string, updates: Partial<Patient>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('patients')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', patientId)

    return !error
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error)
    return false
  }
}

// Buscar paciente por ID
export async function getPatientById(patientId: string): Promise<PatientWithTutor | null> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select(`
        *,
        tutor:tutors(*)
      `)
      .eq('id', patientId)
      .single()

    if (error) {
      console.error('Erro ao buscar paciente:', error)
      return null
    }

    return data as PatientWithTutor
  } catch (error) {
    console.error('Erro ao buscar paciente:', error)
    return null
  }
}

// Estatísticas de pacientes
export async function getPatientsStats(userId: string) {
  try {
    const { data: patients, error } = await supabase
      .from('patients')
      .select('species, status')
      .eq('user_id', userId)

    if (error) {
      console.error('Erro ao buscar estatísticas:', error)
      return {
        total: 0,
        dogs: 0,
        cats: 0,
        active: 0
      }
    }

    const stats = {
      total: patients.length,
      dogs: patients.filter(p => p.species.toLowerCase() === 'cão').length,
      cats: patients.filter(p => p.species.toLowerCase() === 'gato').length,
      active: patients.filter(p => p.status === 'ativo').length
    }

    return stats
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return {
      total: 0,
      dogs: 0,
      cats: 0,
      active: 0
    }
  }
}