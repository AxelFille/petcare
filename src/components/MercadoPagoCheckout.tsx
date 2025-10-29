'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, ShoppingCart } from 'lucide-react';

interface PaymentItem {
  title: string;
  quantity: number;
  unit_price: number;
}

export default function MercadoPagoCheckout() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PaymentItem[]>([
    {
      title: 'Produto Exemplo',
      quantity: 1,
      unit_price: 100.00
    }
  ]);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/mercadopago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona para o checkout do MercadoPago
        window.location.href = data.init_point;
      } else {
        alert('Erro ao processar pagamento: ' + data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (index: number, field: keyof PaymentItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Checkout MercadoPago
            </CardTitle>
            <CardDescription>
              Configure os itens e processe o pagamento via MercadoPago
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Configuração dos Itens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Itens do Pedido</h3>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div>
                    <Label htmlFor={`title-${index}`}>Título</Label>
                    <Input
                      id={`title-${index}`}
                      value={item.title}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${index}`}>Quantidade</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`price-${index}`}>Preço Unitário (R$)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botão de Pagamento */}
            <Button 
              onClick={handlePayment}
              disabled={loading || total <= 0}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="lg"
            >
              {loading ? (
                'Processando...'
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Pagar com MercadoPago
                </>
              )}
            </Button>

            {/* Aviso sobre configuração */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Configuração necessária:</strong> Para funcionar, você precisa configurar as variáveis de ambiente do MercadoPago no arquivo .env.local
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}