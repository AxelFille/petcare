'use client';

import { useSearchParams } from 'next/navigation';
import { Clock, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const externalReference = searchParams.get('external_reference');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pagamento Pendente
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento está sendo processado. Isso pode levar alguns minutos ou até algumas horas, dependendo do método de pagamento escolhido.
        </p>

        {paymentId && (
          <div className="bg-yellow-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Detalhes do Pagamento</h3>
            <p className="text-sm text-gray-600">ID: {paymentId}</p>
            {externalReference && (
              <p className="text-sm text-gray-600">Plano: {externalReference.split('-')[0]}</p>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">O que acontece agora?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Aguarde a confirmação do pagamento</li>
            <li>• Você receberá um email quando aprovado</li>
            <li>• Seu acesso será liberado automaticamente</li>
            <li>• Pode levar até 24 horas para processar</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Acompanhe o status do seu pagamento por email ou entre em contato:
          </p>
          <a 
            href="mailto:suportepetcaremais@gmail.com"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
          >
            <Mail className="w-4 h-4 mr-1" />
            suportepetcaremais@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPending() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <PaymentPendingContent />
    </Suspense>
  );
}