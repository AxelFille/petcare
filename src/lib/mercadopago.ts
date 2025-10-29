// Tipos para uso compartilhado
export interface PlanData {
  name: string;
  price: string;
  priceValue: number;
  description: string;
}

// Interface para resposta da API
interface PaymentPreferenceResponse {
  success: boolean;
  init_point?: string;
  sandbox_init_point?: string;
  error?: string;
  id?: string;
}

// Função para uso no cliente (frontend) - APENAS chamada para API
export async function createPaymentPreference(plan: PlanData, userEmail?: string): Promise<PaymentPreferenceResponse> {
  try {
    // Validar dados antes de enviar
    if (!plan || !plan.name || typeof plan.priceValue !== 'number') {
      throw new Error('Dados do plano são obrigatórios');
    }

    console.log('Enviando dados para API:', { plan: plan.name, priceValue: plan.priceValue, userEmail });

    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan, userEmail }),
    });

    if (!response.ok) {
      let errorData: any = {};
      
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error('Erro ao parsear resposta de erro:', parseError);
      }
      
      // Tratamento específico para diferentes códigos de erro
      if (response.status === 500) {
        throw new Error(errorData.error || 'Erro interno do servidor. Tente novamente.');
      } else if (response.status === 503) {
        throw new Error(errorData.error || 'Serviço temporariamente indisponível. Aguarde alguns instantes.');
      } else if (response.status === 400) {
        throw new Error(errorData.error || 'Dados inválidos fornecidos.');
      } else {
        throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
      }
    }

    const data: PaymentPreferenceResponse = await response.json();
    
    console.log('Resposta da API:', data);
    
    if (!data.success) {
      throw new Error(data.error || 'Falha ao processar pagamento');
    }
    
    if (!data.init_point && !data.sandbox_init_point) {
      throw new Error('URL de pagamento não encontrada na resposta');
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    
    if (error instanceof Error) {
      // Se for erro de rede, dar uma mensagem mais amigável
      if (error.message.includes('fetch') || error.name === 'TypeError') {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      }
      throw error;
    } else {
      throw new Error('Erro desconhecido ao processar pagamento');
    }
  }
}