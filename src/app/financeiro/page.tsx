'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { DollarSign, TrendingUp, TrendingDown, Plus, Calendar, CreditCard, Receipt } from 'lucide-react';

interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
  formaPagamento?: string;
}

const mockTransacoes: Transacao[] = [
  {
    id: '1',
    tipo: 'receita',
    descricao: 'Consulta - Rex (João Silva)',
    valor: 120.00,
    categoria: 'Consultas',
    data: '2024-01-15',
    status: 'pago',
    formaPagamento: 'Cartão de Crédito'
  },
  {
    id: '2',
    tipo: 'receita',
    descricao: 'Banho e Tosa - Mimi (Maria Santos)',
    valor: 80.00,
    categoria: 'Serviços',
    data: '2024-01-14',
    status: 'pago',
    formaPagamento: 'PIX'
  },
  {
    id: '3',
    tipo: 'despesa',
    descricao: 'Compra de Medicamentos',
    valor: 350.00,
    categoria: 'Estoque',
    data: '2024-01-13',
    status: 'pago',
    formaPagamento: 'Boleto'
  },
  {
    id: '4',
    tipo: 'receita',
    descricao: 'Cirurgia - Thor (Pedro Costa)',
    valor: 800.00,
    categoria: 'Cirurgias',
    data: '2024-01-12',
    status: 'pendente'
  },
  {
    id: '5',
    tipo: 'despesa',
    descricao: 'Aluguel da Clínica',
    valor: 2500.00,
    categoria: 'Fixas',
    data: '2024-01-10',
    status: 'pago',
    formaPagamento: 'Transferência'
  }
];

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [showForm, setShowForm] = useState(false);
  const [mesAtual, setMesAtual] = useState('2024-01');

  useEffect(() => {
    setTransacoes(mockTransacoes);
  }, []);

  const transacoesFiltradas = transacoes.filter(transacao => {
    const matchTipo = filtroTipo === 'todos' || transacao.tipo === filtroTipo;
    const matchStatus = filtroStatus === 'todos' || transacao.status === filtroStatus;
    return matchTipo && matchStatus;
  });

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const receitasPendentes = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pendente')
    .reduce((sum, t) => sum + t.valor, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
                <p className="text-sm text-gray-500">Controle de receitas e despesas</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Transação</span>
            </button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
                <p className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(saldoAtual)}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                saldoAtual >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`h-6 w-6 ${saldoAtual >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receitas</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalReceitas)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Despesas</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalDespesas)}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">A Receber</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(receitasPendentes)}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Receipt className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico de Fluxo de Caixa */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Fluxo de Caixa</h3>
                <input
                  type="month"
                  value={mesAtual}
                  onChange={(e) => setMesAtual(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Gráfico Simples */}
              <div className="h-64 flex items-end justify-between space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div 
                        className="w-full bg-green-500 rounded-t"
                        style={{ height: `${Math.random() * 100 + 50}px` }}
                      ></div>
                      <div 
                        className="w-full bg-red-500 rounded-b"
                        style={{ height: `${Math.random() * 80 + 30}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Receitas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">Despesas</span>
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todos">Todos os Tipos</option>
                  <option value="receita">Receitas</option>
                  <option value="despesa">Despesas</option>
                </select>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="vencido">Vencido</option>
                </select>
              </div>
            </div>

            {/* Lista de Transações */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transações Recentes ({transacoesFiltradas.length})
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {transacoesFiltradas.map((transacao) => (
                  <div key={transacao.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`h-3 w-3 rounded-full ${
                            transacao.tipo === 'receita' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {transacao.descricao}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transacao.status)}`}>
                            {transacao.status.charAt(0).toUpperCase() + transacao.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Categoria:</span> {transacao.categoria}
                          </div>
                          <div>
                            <span className="font-medium">Data:</span> {formatDate(transacao.data)}
                          </div>
                          {transacao.formaPagamento && (
                            <div>
                              <span className="font-medium">Pagamento:</span> {transacao.formaPagamento}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transacao.tipo === 'receita' ? '+' : '-'}{formatCurrency(transacao.valor)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar com Resumos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Consultas</span>
                  <span className="text-sm font-medium text-green-600">R$ 1.200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cirurgias</span>
                  <span className="text-sm font-medium text-green-600">R$ 2.400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Serviços</span>
                  <span className="text-sm font-medium text-green-600">R$ 800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estoque</span>
                  <span className="text-sm font-medium text-red-600">R$ 1.500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fixas</span>
                  <span className="text-sm font-medium text-red-600">R$ 3.200</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contas a Receber</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">Cirurgia - Thor</span>
                    <span className="text-sm font-bold text-yellow-600">R$ 800</span>
                  </div>
                  <span className="text-xs text-gray-500">Vence em 5 dias</span>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">Consulta - Luna</span>
                    <span className="text-sm font-bold text-blue-600">R$ 120</span>
                  </div>
                  <span className="text-xs text-gray-500">Vence em 10 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Nova Transação */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Nova Transação</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Selecione o tipo</option>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descrição da transação"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Selecione a categoria</option>
                    <option value="consultas">Consultas</option>
                    <option value="cirurgias">Cirurgias</option>
                    <option value="servicos">Serviços</option>
                    <option value="estoque">Estoque</option>
                    <option value="fixas">Despesas Fixas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="pago">Pago</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Selecione</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">PIX</option>
                    <option value="cartao-credito">Cartão de Crédito</option>
                    <option value="cartao-debito">Cartão de Débito</option>
                    <option value="transferencia">Transferência</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Salvar Transação
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}