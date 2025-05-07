
export const processosPorEstado = [
  { estado: 'São Paulo (SP)', processos: 42, percentual: '21%' },
  { estado: 'Bahia (BA)', processos: 38, percentual: '19%' },
  { estado: 'Rio de Janeiro (RJ)', processos: 34, percentual: '17%' },
  { estado: 'Minas Gerais (MG)', processos: 28, percentual: '14%' },
  { estado: 'Rio Grande do Sul (RS)', processos: 16, percentual: '8%' },
  { estado: 'Pernambuco (PE)', processos: 12, percentual: '6%' },
  { estado: 'Outros estados', processos: 30, percentual: '15%' },
];

export const escritoriosResponsaveis = [
  { escritorio: 'Urbano Vitalino', processos: 147 },
  { escritorio: 'Dotta Donegatti', processos: 40 },
  { escritorio: 'RMC', processos: 5 },
  { escritorio: 'Outros', processos: 8 },
];

export const distribuicaoProdutos = [
  { categoria: 'Full Kitchen', processos: 100, percentual: '45%' },
  { categoria: 'Refrigeração', processos: 65, percentual: '29%' },
  { categoria: 'Ar Cond. HVAC', processos: 40, percentual: '18%' },
  { categoria: 'Eletroportáteis', processos: 15, percentual: '8%' },
];

export const tiposProcessosValores = [
  { tipo: 'Acordo Dano Material', valor: 150000, percentual: '42%' },
  { tipo: 'Condenação Danos Morais e Materiais', valor: 200000, percentual: '33%' },
  { tipo: 'Condenação Dano Moral', valor: 80000, percentual: '15%' },
  { tipo: 'Outros (custas judiciais, multas)', valor: 35000, percentual: '10%' },
];

export const valorMedioProdutos = [
  { produto: 'Lavadora', valor: 3400 },
  { produto: 'Refrigerador', valor: 4500 },
  { produto: 'Ar Condicionado', valor: 4200 },
  { produto: 'Lava e Seca', valor: 3700 },
  { produto: 'Microondas', valor: 2500 },
  { produto: 'Outros', valor: 2800 },
];

export const detalhamentoFinanceiro = [
  { 
    categoria: 'Full Kitchen', 
    valorTotal: 175000, 
    mediaDanoMoral: 2850, 
    mediaDanoMaterial: 3950, 
    percentual: '42%' 
  },
  { 
    categoria: 'Refrigeração', 
    valorTotal: 125000, 
    mediaDanoMoral: 3200, 
    mediaDanoMaterial: 4500, 
    percentual: '30%' 
  },
  { 
    categoria: 'Ar Condicionado', 
    valorTotal: 95000, 
    mediaDanoMoral: 3100, 
    mediaDanoMaterial: 4200, 
    percentual: '22%' 
  },
  { 
    categoria: 'Eletroportáteis', 
    valorTotal: 25000, 
    mediaDanoMoral: 2500, 
    mediaDanoMaterial: 1800, 
    percentual: '6%' 
  },
];

export const analiseRegionalComparativa = [
  {
    regiao: 'Sudeste',
    processos: '104 (52%)',
    status: '40% Ativos | 55% Encerrados | 5% Reativados',
    produtosMaisReclamados: 'Refrigerador, Ar Condicionado',
    valorMedio: 'R$ 7.850',
    escritorioPrincipal: 'Urbano Vitalino',
    classe: 'region-southeast'
  },
  {
    regiao: 'Nordeste',
    processos: '50 (25%)',
    status: '48% Ativos | 47% Encerrados | 5% Reativados',
    produtosMaisReclamados: 'Lavadora, Lava e Seca',
    valorMedio: 'R$ 6.500',
    escritorioPrincipal: 'Urbano Vitalino',
    classe: 'region-northeast'
  },
  {
    regiao: 'Sul',
    processos: '24 (12%)',
    status: '42% Ativos | 54% Encerrados | 4% Reativados',
    produtosMaisReclamados: 'Ar Condicionado, Microondas',
    valorMedio: 'R$ 5.200',
    escritorioPrincipal: 'Dotta, Donegatti',
    classe: 'region-south'
  },
  {
    regiao: 'Norte',
    processos: '14 (7%)',
    status: '57% Ativos | 36% Encerrados | 7% Reativados',
    produtosMaisReclamados: 'Ar Condicionado, Freezer',
    valorMedio: 'R$ 6.100',
    escritorioPrincipal: 'Urbano Vitalino',
    classe: 'region-north'
  },
  {
    regiao: 'Centro-Oeste',
    processos: '8 (4%)',
    status: '50% Ativos | 45% Encerrados | 5% Reativados',
    produtosMaisReclamados: 'Refrigerador, Lavadora',
    valorMedio: 'R$ 5.800',
    escritorioPrincipal: 'Dotta, Donegatti',
    classe: 'region-central-west'
  }
];

export const pontosAtencao = [
  { 
    text: 'Produtos da linha Full Kitchen representam 45% dos processos, gerando maior impacto financeiro',
    icon: '⚠️'
  },
  { 
    text: 'Lavadoras e refrigeradores lideram reclamações com valores médios superiores a R$3.800',
    icon: '⚠️'
  },
  { 
    text: 'Regiões Sudeste (52%) e Nordeste (25%) concentram 77% dos processos',
    icon: '⚠️'
  },
  { 
    text: 'Valor médio de danos materiais (R$4.000) supera danos morais (R$3.000)',
    icon: '⚠️'
  }
];

export const oportunidadesMelhoria = [
  { 
    text: 'Priorizar acordos para reduzir custos (economia de 35% vs. condenações)',
    icon: '✅'
  },
  { 
    text: 'Revisar controle de qualidade em lavadoras e refrigeradores',
    icon: '✅'
  },
  { 
    text: 'Fortalecer suporte técnico nas regiões Sudeste e Nordeste',
    icon: '✅'
  },
  { 
    text: 'Implementar programa de resolução preventiva para reduzir judicialização',
    icon: '✅'
  },
  { 
    text: 'Padronizar processo de assistência técnica para produtos da linha Full Kitchen',
    icon: '✅'
  }
];

export const proximosPassos = [
  { 
    text: 'Criar força-tarefa para avaliar problemas técnicos recorrentes em lavadoras',
    icon: '🔄'
  },
  { 
    text: 'Desenvolver política de acordos padronizados para agilizar resolução',
    icon: '🔄'
  },
  { 
    text: 'Implementar monitoramento regional de SAC e reclamações para ação preventiva',
    icon: '🔄'
  },
  { 
    text: 'Realizar treinamento técnico especializado nas regiões críticas',
    icon: '🔄'
  },
  { 
    text: 'Revisar manuais de produto para reduzir interpretações equivocadas',
    icon: '🔄'
  }
];

export const evolucaoPagamentos = [
  { mes: 'Nov/24', totalPagamentos: 95, danosMorais: 42 },
  { mes: 'Dez/24', totalPagamentos: 105, danosMorais: 48 },
  { mes: 'Jan/25', totalPagamentos: 88, danosMorais: 40 },
  { mes: 'Fev/25', totalPagamentos: 92, danosMorais: 38 },
  { mes: 'Mar/25', totalPagamentos: 78, danosMorais: 32 },
  { mes: 'Abr/25', totalPagamentos: 65, danosMorais: 28 },
];

export const statusProcessos = {
  ativo: 45,
  encerrado: 50,
  reativado: 5
};
