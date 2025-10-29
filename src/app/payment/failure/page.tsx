'use client';

import { useSearchParams } from 'next/navigation';
import { X, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <X className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pagamento Não Aprovado
        </h1>
        
        <p className="text-gray-600 mb-6">
          Houve um problema com seu pagamento. Isso pode acontecer por diversos motivos, como dados incorretos ou limite insuficiente.
        </p>

        {paymentId && (
          <div className="bg-red-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Detalhes</h3>
            <p className="text-sm text-gray-600">ID: {paymentId}</p>
            <p className="text-sm text-gray-600">Status: {status || 'Rejeitado'}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">O que fazer?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Verifique os dados do cartão</li>
            <li>• Confirme se há limite disponível</li>
            <li>• Tente outro cartão</li>
            <li>• Entre em contato com seu banco</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/#pricing"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Link>
          
          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Precisa de ajuda?{' '}
            <a 
              href="mailto:suportepetcaremais@gmail.com"
              className="text-blue-600 hover:text-blue-700"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}