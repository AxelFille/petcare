'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Check, X, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  
  const status = searchParams.get('status');
  const paymentId = searchParams.get('payment_id');
  const externalReference = searchParams.get('external_reference');

  useEffect(() => {
    // Salvar dados do pagamento no localStorage para demonstração
    if (status === 'approved' && paymentId) {
      const userData = {
        email: 'usuario@email.com',
        name: 'Usuário',
        plan: externalReference?.split('-')[0] || 'VetPro',
        planValue: 19.90,
        paymentId: paymentId,
        paymentDate: new Date().toISOString(),
        loginTime: new Date().toISOString(),
        subscriptionStatus: 'active'
      };

      localStorage.setItem('petcare_user', JSON.stringify(userData));
      setPaymentData(userData);
    }
  }, [status, paymentId, externalReference]);

  const getStatusInfo = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <Check className="w-16 h-16 text-green-500" />,
          title: 'Pagamento Aprovado!',
          message: 'Sua assinatura foi ativada com sucesso.',
          color: 'green'
        };
      case 'pending':
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500" />,
          title: 'Pagamento Pendente',
          message: 'Aguardando confirmação do pagamento.',
          color: 'yellow'
        };
      case 'rejected':
      case 'failure':
        return {
          icon: <X className="w-16 h-16 text-red-500" />,
          title: 'Pagamento Rejeitado',
          message: 'Houve um problema com seu pagamento. Tente novamente.',
          color: 'red'
        };
      default:
        return {
          icon: <Clock className="w-16 h-16 text-gray-500" />,
          title: 'Processando...',
          message: 'Verificando status do pagamento.',
          color: 'gray'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="mb-6">
          {statusInfo.icon}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {statusInfo.title}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {statusInfo.message}
        </p>

        {paymentId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Detalhes do Pagamento</h3>
            <p className="text-sm text-gray-600">ID: {paymentId}</p>
            {externalReference && (
              <p className="text-sm text-gray-600">Plano: {externalReference.split('-')[0]}</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          {status === 'approved' ? (
            <Link
              href="/dashboard"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold inline-block"
            >
              Acessar Dashboard
            </Link>
          ) : status === 'pending' ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Você receberá um email quando o pagamento for confirmado.
              </p>
              <Link
                href="/"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
              >
                Voltar ao Início
              </Link>
            </div>
          ) : (
            <Link
              href="/#pricing"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
            >
              Tentar Novamente
            </Link>
          )}
          
          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}