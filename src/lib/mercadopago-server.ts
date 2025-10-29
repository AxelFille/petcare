import { MercadoPagoConfig, Preference } from 'mercadopago';

export interface PlanData {
  name: string;
  price: string;
  priceValue: number;
  description: string;
}

// Função para obter token com validação
const getAccessToken = (): string => {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) {
    console.error('MERCADOPAGO_ACCESS_TOKEN não encontrado nas variáveis de ambiente');
    throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado. Configure a variável de ambiente.');
  }
  
  // Validar formato do token
  if (!token.startsWith('APP_USR-') && !token.startsWith('TEST-')) {
    console.error('Token do MercadoPago com formato inválido:', token.substring(0, 10) + '...');
    throw new Error('Token do MercadoPago com formato inválido');
  }
  
  console.log('Token MercadoPago carregado:', token.substring(0, 15) + '...');
  return token;
};

// Função para criar cliente MercadoPago com configuração otimizada
const createMercadoPagoClient = (): Preference => {
  try {
    const accessToken = getAccessToken();
    
    const client = new MercadoPagoConfig({
      accessToken,
      options: {
        timeout: 30000,
      }
    });
    
    console.log('Cliente MercadoPago inicializado com sucesso');
    return new Preference(client);
  } catch (error) {
    console.error('Erro ao inicializar cliente MercadoPago:', error);
    throw error;
  }
};

export async function createPreference(plan: PlanData, userEmail?: string) {
  try {
    console.log('Iniciando criação de preferência para plano:', plan.name);
    
    // Validar dados do plano
    if (!plan || !plan.name || typeof plan.priceValue !== 'number' || plan.priceValue <= 0) {
      throw new Error('Dados do plano inválidos: nome e valor são obrigatórios');
    }

    // Criar cliente MercadoPago
    const preferenceClient = createMercadoPagoClient();

    // Determinar URL base com fallback mais robusto
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else if (process.env.NODE_ENV === 'production') {
        baseUrl = 'https://petcare-plus.vercel.app';
      } else {
        baseUrl = 'http://localhost:3000';
      }
    }
    
    console.log('URL base configurada:', baseUrl);
    
    const preferenceData = {
      items: [
        {
          id: plan.name.toLowerCase().replace(/\s+/g, '-'),
          title: `Assinatura ${plan.name} - PetCare+`,
          description: plan.description || `Plano ${plan.name}`,
          category_id: 'services',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(plan.priceValue),
        }
      ],
      payer: {
        email: userEmail || 'cliente@petcare.com',
      },
      back_urls: {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`,
      },
      auto_return: 'approved' as const,
      payment_methods: {
        excluded_payment_methods: [] as any[],
        excluded_payment_types: [] as any[],
        installments: 12,
      },
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      statement_descriptor: 'PETCARE+',
      external_reference: `petcare-${plan.name.toLowerCase()}-${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log('Dados da preferência preparados:', {
      itemTitle: preferenceData.items[0].title,
      price: preferenceData.items[0].unit_price,
      email: preferenceData.payer.email,
      baseUrl
    });
    
    // Criar preferência com retry manual
    let response: any;
    let lastError: any;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Tentativa ${attempt} de criar preferência...`);
        
        // Adicionar delay progressivo entre tentativas
        if (attempt > 1) {
          const delay = Math.min(1000 * attempt, 5000);
          console.log(`Aguardando ${delay}ms antes da tentativa ${attempt}...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        response = await preferenceClient.create({ body: preferenceData });
        
        console.log('Preferência criada com sucesso:', {
          id: response.id,
          status: response.status,
          init_point: response.init_point ? 'Disponível' : 'Não disponível'
        });
        break;
        
      } catch (error) {
        lastError = error;
        console.error(`Tentativa ${attempt} falhou:`, error);
        
        // Se for erro de configuração, não tentar novamente
        if (error instanceof Error && error.message.includes('MERCADOPAGO_ACCESS_TOKEN')) {
          throw error;
        }
        
        // Se for a última tentativa, lançar erro
        if (attempt === 3) {
          console.error('Todas as tentativas falharam');
          break;
        }
      }
    }
    
    if (!response) {
      throw lastError || new Error('Falha ao criar preferência após 3 tentativas');
    }
    
    // Validar resposta
    if (!response.id) {
      throw new Error('Resposta inválida do MercadoPago: ID não encontrado');
    }
    
    return response;
    
  } catch (error) {
    console.error('Erro detalhado ao criar preferência:', {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      plan: plan.name,
      userEmail,
      timestamp: new Date().toISOString()
    });
    
    // Melhor tratamento de erro com informações específicas
    if (error instanceof Error) {
      if (error.message.includes('MERCADOPAGO_ACCESS_TOKEN')) {
        throw new Error('Configuração do MercadoPago não encontrada. Verifique se a variável MERCADOPAGO_ACCESS_TOKEN está configurada corretamente.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Timeout na comunicação com MercadoPago. Tente novamente em alguns instantes.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Erro de rede ao conectar com MercadoPago. Verifique sua conexão.');
      } else {
        throw new Error(`Erro do MercadoPago: ${error.message}`);
      }
    } else {
      throw new Error('Erro desconhecido ao criar preferência de pagamento');
    }
  }
}