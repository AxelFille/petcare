'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export default function PagamentoPendente() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Clock className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-yellow-600">
            Pagamento Pendente
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Seu pagamento está sendo processado. Você receberá uma notificação quando for aprovado.
          </p>
          <Button 
            onClick={() => router.push('/')}
            className="w-full"
          >
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}