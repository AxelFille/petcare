import { NextRequest, NextResponse } from 'next/server';
import { createPreference } from '@/lib/mercadopago-server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== INÍCIO DA REQUISIÇÃO API MERCADOPAGO ===');
    
    // Verificar se as variáveis de ambiente estão configuradas ANTES de processar
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error('MERCADOPAGO_ACCESS_TOKEN não configurado');
      return NextResponse.json(
        { 
          error: 'Configuração do Mercado Pago não encontrada',
          details: 'A variável de ambiente MERCADOPAGO_ACCESS_TOKEN não está configurada. Configure-a com sua credencial de produção.',
          solution: 'Adicione MERCADOPAGO_ACCESS_TOKEN=APP_USR-e676e840-aea2-45d3-bc2a-aaddbc99a5c7 nas variáveis de ambiente'
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { plan, userEmail } = body;

    console.log('Dados recebidos na API:', { 
      planName: plan?.name, 
      planPrice: plan?.priceValue,
      userEmail: userEmail || 'não fornecido',
      timestamp: new Date().toISOString()
    });

    // Validação rigorosa dos dados recebidos
    if (!plan) {
      return NextResponse.json(
        { error: 'Dados do plano são obrigatórios' },
        { status: 400 }
      );
    }

    if (!plan.name || typeof plan.name !== 'string' || plan.name.trim() === '') {
      return NextResponse.json(
        { error: 'Nome do plano é obrigatório' },
        { status: 400 }
      );
    }

    if (typeof plan.priceValue !== 'number' || plan.priceValue <= 0) {
      return NextResponse.json(
        { error: 'Valor do plano deve ser um número maior que zero' },
        { status: 400 }
      );
    }

    // Validar email se fornecido
    if (userEmail && typeof userEmail === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return NextResponse.json(
          { error: 'Email fornecido é inválido' },
          { status: 400 }
        );
      }
    }

    console.log('Validações passaram, criando preferência...');

    // Criar preferência usando a função do servidor
    const preference = await createPreference(plan, userEmail);

    console.log('Preferência criada com sucesso:', {
      id: preference.id,
      status: preference.status,
      hasInitPoint: !!preference.init_point,
      hasSandboxInitPoint: !!preference.sandbox_init_point
    });

    // Validar se a preferência foi criada corretamente
    if (!preference.id) {
      throw new Error('Preferência criada mas sem ID válido');
    }

    if (!preference.init_point && !preference.sandbox_init_point) {
      throw new Error('Preferência criada mas sem URL de pagamento');
    }

    const response = {
      success: true,
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
      status: preference.status,
      created_at: new Date().toISOString()
    };

    console.log('Resposta da API preparada:', response);
    console.log('=== FIM DA REQUISIÇÃO API MERCADOPAGO ===');

    return NextResponse.json(response);

  } catch (error) {
    console.error('=== ERRO NA API MERCADOPAGO ===');
    console.error('Erro completo:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    // Tratamento específico de diferentes tipos de erro
    if (error instanceof Error) {
      
      // Erro de configuração
      if (error.message.includes('MERCADOPAGO_ACCESS_TOKEN')) {
        return NextResponse.json(
          { 
            error: 'Configuração do Mercado Pago não encontrada',
            details: error.message,
            solution: 'Configure a variável MERCADOPAGO_ACCESS_TOKEN com sua credencial de produção'
          },
          { status: 500 }
        );
      }

      // Erro de timeout
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { 
            error: 'Timeout na comunicação com Mercado Pago',
            details: 'A requisição demorou mais que o esperado. Tente novamente.',
            solution: 'Aguarde alguns instantes e tente novamente'
          },
          { status: 503 }
        );
      }

      // Erro de rede
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return NextResponse.json(
          { 
            error: 'Erro de conexão com Mercado Pago',
            details: 'Não foi possível conectar com os servidores do Mercado Pago.',
            solution: 'Verifique sua conexão com a internet e tente novamente'
          },
          { status: 503 }
        );
      }

      // Erro de validação
      if (error.message.includes('inválido')) {
        return NextResponse.json(
          { 
            error: 'Dados inválidos',
            details: error.message,
            solution: 'Verifique os dados enviados e tente novamente'
          },
          { status: 400 }
        );
      }

      // Erro genérico do MercadoPago
      return NextResponse.json(
        { 
          error: 'Erro do Mercado Pago',
          details: error.message,
          solution: 'Tente novamente. Se o problema persistir, entre em contato com o suporte.'
        },
        { status: 500 }
      );
    }

    // Erro desconhecido
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: 'Erro desconhecido ao processar pagamento',
        solution: 'Tente novamente. Se o problema persistir, entre em contato com o suporte.'
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}