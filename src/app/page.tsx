'use client';

import { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  FileText, 
  DollarSign, 
  Package, 
  MapPin, 
  Users, 
  Smartphone,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  Mic,
  Brain,
  Shield,
  Zap,
  CreditCard,
  Mail
} from 'lucide-react';
import { createPaymentPreference } from '@/lib/mercadopago';
import { loginUser, registerUser, checkEmailExists, type LoginCredentials, type RegisterData } from '@/lib/auth';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loginData, setLoginData] = useState<LoginCredentials>({ email: '', password: '' });
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: 'vet'
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const plans = [
    {
      name: 'VetBásico',
      price: 'Grátis',
      priceValue: 0,
      type: 'vet',
      description: 'Essencial para veterinários autônomos',
      features: [
        'Prontuário Eletrônico Básico',
        'Bulário com Calculadora de Doses',
        'Controle Financeiro Básico',
        'Controle de Estoque Simples',
        'Agendamento de Consultas',
        '1 Usuário'
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'VetPro',
      price: 'R$ 19,90',
      priceValue: 19.90,
      type: 'vet',
      description: 'Automação e inteligência para veterinários',
      features: [
        'Prontuário com Assinatura Digital',
        'Assistente IA para Prontuários',
        'Gravação e Transcrição por Voz',
        'Lançamento Automático Financeiro',
        'Controle de Lote e Validade',
        'Comunicação Automatizada',
        'Suporte à Decisão Clínica'
      ],
      color: 'border-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: true
    },
    {
      name: 'Clínica Básica',
      price: 'R$ 97,00',
      priceValue: 97.00,
      type: 'clinic',
      description: 'Gestão completa para clínicas',
      features: [
        'Todas as funcionalidades VetBásico',
        'Gestão de Equipe (até 5 usuários)',
        'Relatórios Gerenciais',
        'Controle de Comissões',
        'Agendamento Multi-profissional',
        'Dashboard Administrativo'
      ],
      color: 'border-green-500',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Clínica Pro',
      price: 'R$ 197,00',
      priceValue: 197.00,
      type: 'clinic',
      description: 'IA, automação e escalabilidade',
      features: [
        'Todas as funcionalidades VetPro',
        'Usuários Ilimitados',
        'Gestão de Internação',
        'App do Tutor',
        'Otimização de Rotas',
        'Conciliação Bancária',
        'IA Avançada',
        'Suporte Prioritário'
      ],
      color: 'border-green-500',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      popular: true
    }
  ];

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: 'Prontuário Inteligente',
      description: 'Prontuário eletrônico com IA, gravação de voz e assinatura digital'
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'Assistente IA',
      description: 'Inteligência artificial para suporte à decisão clínica e automação'
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: 'Agendamento Avançado',
      description: 'Sistema completo de agendamento com lembretes automáticos'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: 'Gestão Financeira',
      description: 'Controle completo de receitas, despesas e fluxo de caixa'
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: 'Controle de Estoque',
      description: 'Gestão inteligente de medicamentos e produtos veterinários'
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: 'Atendimento Domiciliar',
      description: 'Otimização de rotas e gestão de visitas domiciliares'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const user = await loginUser(loginData);
      
      if (user) {
        // Login bem-sucedido - salvar dados do usuário
        localStorage.setItem('petcare_user', JSON.stringify({
          ...user,
          loginTime: new Date().toISOString()
        }));
        window.location.href = '/dashboard';
      } else {
        setLoginError('Email ou senha incorretos. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoginError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setIsRegistering(true);

    // Validações
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('As senhas não coincidem');
      setIsRegistering(false);
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError('A senha deve ter pelo menos 6 caracteres');
      setIsRegistering(false);
      return;
    }

    try {
      // Verificar se email já existe
      const emailExists = await checkEmailExists(registerData.email);
      if (emailExists) {
        setRegisterError('Este email já está cadastrado');
        setIsRegistering(false);
        return;
      }

      // Registrar usuário
      const user = await registerUser({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        user_type: registerData.user_type
      });

      if (user) {
        // Cadastro bem-sucedido
        localStorage.setItem('petcare_user', JSON.stringify({
          ...user,
          loginTime: new Date().toISOString()
        }));
        window.location.href = '/dashboard';
      } else {
        setRegisterError('Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setRegisterError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handlePlanSelect = async (plan: any) => {
    if (plan.priceValue === 0) {
      // Plano gratuito - cadastro direto
      setShowRegister(true);
      return;
    }

    // Plano pago - integração com Mercado Pago
    setIsProcessingPayment(true);
    setSelectedPlan(plan);

    try {
      const preference = await createPaymentPreference(plan, 'usuario@email.com');
      
      // Redirecionar para o checkout do Mercado Pago
      if (preference.sandbox_init_point) {
        window.location.href = preference.sandbox_init_point;
      } else if (preference.init_point) {
        window.location.href = preference.init_point;
      } else {
        throw new Error('URL de pagamento não encontrada');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('❌ Erro ao processar pagamento. Tente novamente.');
      setIsProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PetCare+</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                Preços
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </a>
              <button
                onClick={() => setShowLogin(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Começar Grátis
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600">
                  Funcionalidades
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                  Preços
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600">
                  Contato
                </a>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-left text-blue-600 hover:text-blue-700 font-medium"
                >
                  Entrar
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-left"
                >
                  Começar Grátis
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              O Futuro da
              <span className="text-blue-600"> Gestão Veterinária</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo com Inteligência Artificial para clínicas, hospitais e veterinários autônomos. 
              Otimize seu tempo e melhore o atendimento aos seus pacientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRegister(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Começar Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Fazer Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Revolucionárias
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia de ponta para transformar sua prática veterinária
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* AI Features Highlight */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Mic className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comandos de Voz</h3>
                <p className="text-blue-100">
                  "Agendar consulta para Rex amanhã às 10h"
                </p>
              </div>
              <div>
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">IA Integrada</h3>
                <p className="text-blue-100">
                  Assistente inteligente para diagnósticos
                </p>
              </div>
              <div>
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
                <p className="text-blue-100">
                  Conformidade LGPD e assinatura digital
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos para Cada Necessidade
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para seu perfil profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 ${plan.color} relative ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {plan.price}
                    {plan.price !== 'Grátis' && <span className="text-lg text-gray-500">/mês</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={isProcessingPayment && selectedPlan?.name === plan.name}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.buttonColor} text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProcessingPayment && selectedPlan?.name === plan.name ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      {plan.price === 'Grátis' ? 'Começar Grátis' : 'Assinar Agora'}
                      {plan.price !== 'Grátis' && <CreditCard className="w-4 h-4 ml-2" />}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Mercado Pago Info */}
          <div className="mt-12 text-center">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Pagamento 100% Seguro</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Processado pelo Mercado Pago, a plataforma de pagamentos mais confiável do Brasil.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>• Cartão de Crédito</span>
                <span>• Cartão de Débito</span>
                <span>• PIX</span>
                <span>• Boleto</span>
                <span>• Parcelamento em até 12x</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Precisa de Ajuda?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nossa equipe está pronta para ajudar você a transformar sua prática veterinária
          </p>
          
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">Suporte Técnico</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Encontrou algum problema ou tem dúvidas sobre o sistema? Entre em contato conosco:
            </p>
            <a 
              href="mailto:suportepetcaremais@gmail.com"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              suportepetcaremais@gmail.com
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Resposta Rápida</h4>
              <p className="text-gray-600 text-sm">Respondemos em até 24 horas</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Suporte Especializado</h4>
              <p className="text-gray-600 text-sm">Equipe com conhecimento veterinário</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sempre Disponível</h4>
              <p className="text-gray-600 text-sm">Suporte 7 dias por semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Revolucionar sua Prática?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de veterinários que já transformaram seu atendimento com o PetCare+
          </p>
          <button
            onClick={() => setShowRegister(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            Começar Gratuitamente
            <Zap className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">PetCare+</span>
              </div>
              <p className="text-gray-400">
                O futuro da gestão veterinária com inteligência artificial.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#contact" className="hover:text-white">Contato</a></li>
                <li>
                  <a href="mailto:suportepetcaremais@gmail.com" className="hover:text-white flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Suporte Técnico
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCare+. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Entrar</h2>
              <button
                onClick={() => {
                  setShowLogin(false);
                  setLoginError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{loginError}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Não tem conta?{' '}
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                    setLoginError('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cadastrar</h2>
              <button
                onClick={() => {
                  setShowRegister(false);
                  setRegisterError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {registerError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{registerError}</p>
              </div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Conta
                </label>
                <select
                  value={registerData.user_type}
                  onChange={(e) => setRegisterData({...registerData, user_type: e.target.value as 'vet' | 'clinic'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="vet">Veterinário Autônomo</option>
                  <option value="clinic">Clínica/Hospital</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isRegistering ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem conta?{' '}
                <button
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                    setRegisterError('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}