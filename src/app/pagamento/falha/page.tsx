'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PagamentoFalha() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Pagamento Rejeitado
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Houve um problema com seu pagamento. Verifique os dados do cartão e tente novamente.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => router.back()}
              className="w-full"
            >
              Tentar Novamente
            </Button>
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full"
            >
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}