
// Mock data for the Juridico section

// Consumidor data
export const consumidorData = {
  novosProcessos: 42,
  processosEncerrados: 38,
  percentualAcordos: 65,
  taxaExito: 78,
  valorPagoMes: 125000,
  cicloMedioDias: 85,
  principaisMotivos: [
    { motivo: "Defeito de fabricação", quantidade: 24 },
    { motivo: "Garantia não honrada", quantidade: 18 },
    { motivo: "Atendimento inadequado", quantidade: 12 },
    { motivo: "Propaganda enganosa", quantidade: 9 },
    { motivo: "Danos por transporte", quantidade: 7 }
  ],
  valorPagoHistorico: [
    { mes: 'Jan', valor: 98000 },
    { mes: 'Fev', valor: 105000 },
    { mes: 'Mar', valor: 115000 },
    { mes: 'Abr', valor: 92000 },
    { mes: 'Mai', valor: 88000 },
    { mes: 'Jun', valor: 120000 },
    { mes: 'Jul', valor: 110000 },
    { mes: 'Ago', valor: 125000 },
    { mes: 'Set', valor: 130000 },
    { mes: 'Out', valor: 115000 },
    { mes: 'Nov', valor: 140000 },
    { mes: 'Dez', valor: 125000 }
  ],
  cicloProcessos: {
    min: 45,
    q1: 65,
    median: 85,
    q3: 110,
    max: 180
  },
  processos: [
    { id: 'PC-2023-001', cliente: 'João Silva', produto: 'Ar-condicionado X1', valor: 3200, status: 'Encerrado', dataAbertura: '2023-01-15', dataEncerramento: '2023-04-12' },
    { id: 'PC-2023-045', cliente: 'Maria Oliveira', produto: 'Geladeira Pro Max', valor: 4500, status: 'Em andamento', dataAbertura: '2023-03-22', dataEncerramento: null },
    { id: 'PC-2023-112', cliente: 'Carlos Santos', produto: 'Microondas Z200', valor: 1800, status: 'Acordo', dataAbertura: '2023-04-30', dataEncerramento: '2023-07-15' },
    { id: 'PC-2023-156', cliente: 'Ana Pereira', produto: 'Lavadora T50', valor: 3600, status: 'Encerrado', dataAbertura: '2023-05-18', dataEncerramento: '2023-09-05' },
    { id: 'PC-2023-203', cliente: 'Roberto Almeida', produto: 'Ar-condicionado X2', valor: 5100, status: 'Em andamento', dataAbertura: '2023-06-03', dataEncerramento: null }
  ]
};

// Cível data
export const civelData = {
  processosAtivos: 87,
  exposicaoPotencial: 2450000,
  taxaExito: 72,
  tempoMedioCiclo: 145,
  custos: {
    orcamento: 850000,
    realizado: 720000
  },
  distribuicaoPorAssunto: [
    { assunto: "Contratos", quantidade: 32 },
    { assunto: "Danos materiais", quantidade: 24 },
    { assunto: "Obrigações", quantidade: 18 },
    { assunto: "Responsabilidade civil", quantidade: 15 },
    { assunto: "Outros", quantidade: 10 }
  ],
  cicloProcessos: {
    min: 60,
    q1: 95,
    median: 145,
    q3: 210,
    max: 365
  },
  processos: [
    { id: 'CV-2023-021', parte: 'Empresa ABC Ltda', assunto: 'Contrato', valor: 180000, probabilidade: 'Alta', status: 'Em andamento' },
    { id: 'CV-2023-035', parte: 'Fornecedor XYZ S.A.', assunto: 'Danos materiais', valor: 250000, probabilidade: 'Média', status: 'Em andamento' },
    { id: 'CV-2023-047', parte: 'Distribuidor Regional', assunto: 'Obrigações', valor: 320000, probabilidade: 'Baixa', status: 'Encerrado' },
    { id: 'CV-2023-062', parte: 'Construtora Delta', assunto: 'Responsabilidade civil', valor: 550000, probabilidade: 'Alta', status: 'Em andamento' },
    { id: 'CV-2023-078', parte: 'Transportadora Expressa', assunto: 'Contratos', valor: 190000, probabilidade: 'Média', status: 'Suspenso' }
  ]
};

// Trabalhista data
export const trabalhistaData = {
  novosProcessos: 28,
  processosFechados: 32,
  valorReclamatorioMedio: 45000,
  valorEfetivamentePago: 980000,
  percentualAcordos: 58,
  principaisCausas: [
    { causa: "Horas extras", quantidade: 18 },
    { causa: "Insalubridade", quantidade: 15 },
    { causa: "Verbas rescisórias", quantidade: 12 },
    { causa: "Equiparação salarial", quantidade: 8 },
    { causa: "Danos morais", quantidade: 5 }
  ],
  valorPagoAcumulado: [
    { mes: 'Jan', valor: 75000 },
    { mes: 'Fev', valor: 165000 },
    { mes: 'Mar', valor: 280000 },
    { mes: 'Abr', valor: 360000 },
    { mes: 'Mai', valor: 475000 },
    { mes: 'Jun', valor: 565000 },
    { mes: 'Jul', valor: 660000 },
    { mes: 'Ago', valor: 760000 },
    { mes: 'Set', valor: 880000 },
    { mes: 'Out', valor: 980000 }
  ],
  processos: [
    { id: 'TR-2023-012', reclamante: 'José Pereira', causa: 'Horas extras', valorPedido: 42000, resultado: 'Acordo', valorPago: 28000 },
    { id: 'TR-2023-028', reclamante: 'Antônio Silva', causa: 'Insalubridade', valorPedido: 55000, resultado: 'Ganho', valorPago: 0 },
    { id: 'TR-2023-035', reclamante: 'Marta Oliveira', causa: 'Verbas rescisórias', valorPedido: 38000, resultado: 'Acordo', valorPago: 25000 },
    { id: 'TR-2023-047', reclamante: 'Luciana Santos', causa: 'Equiparação salarial', valorPedido: 62000, resultado: 'Perda', valorPago: 62000 },
    { id: 'TR-2023-056', reclamante: 'Paulo Rodrigues', causa: 'Danos morais', valorPedido: 75000, resultado: 'Em andamento', valorPago: 0 }
  ]
};

// Tributário data
export const tributarioData = {
  autosInfracao: 12,
  autosBaixados: 9,
  valoresLancados: 3800000,
  valoresDiscutidos: 2100000,
  economiaObtida: 1250000,
  parcelamentosAtivos: 7,
  faseProcessual: {
    administrativo: 18,
    judicial: 24
  },
  autos: [
    { id: 'AI-2023-001', tributo: 'ICMS', valorOriginal: 850000, valorDiscutido: 680000, fase: 'Judicial', status: 'Em andamento' },
    { id: 'AI-2023-004', tributo: 'IPI', valorOriginal: 420000, valorDiscutido: 320000, fase: 'Administrativo', status: 'Baixado' },
    { id: 'AI-2023-008', tributo: 'ICMS', valorOriginal: 620000, valorDiscutido: 580000, fase: 'Judicial', status: 'Em andamento' },
    { id: 'AI-2023-012', tributo: 'PIS/COFINS', valorOriginal: 910000, valorDiscutido: 440000, fase: 'Administrativo', status: 'Em andamento' },
    { id: 'AI-2023-018', tributo: 'ISS', valorOriginal: 260000, valorDiscutido: 180000, fase: 'Judicial', status: 'Baixado' }
  ]
};

// Contratos data
export const contratosData = {
  contratosRevisao: 18,
  slaAprovacao: 7.5,
  percentualDentroSLA: 82,
  valorContratadoYTD: 12500000,
  renovacoes90Dias: 6,
  modeloPadrao: 65,
  modeloNegociado: 35,
  cicloTempoMeses: [
    { mes: 'Jan', tempo: 8.2 },
    { mes: 'Fev', tempo: 8.5 },
    { mes: 'Mar', tempo: 9.1 },
    { mes: 'Abr', tempo: 8.8 },
    { mes: 'Mai', tempo: 8.2 },
    { mes: 'Jun', tempo: 7.9 },
    { mes: 'Jul', tempo: 7.7 },
    { mes: 'Ago', tempo: 7.5 },
    { mes: 'Set', tempo: 7.6 },
    { mes: 'Out', tempo: 7.5 }
  ],
  contratos: [
    { id: 'CT-2023-025', tipo: 'Fornecimento', contratada: 'Supplier A Ltda.', valor: 1850000, status: 'Em revisão', expiracao: '2024-02-15' },
    { id: 'CT-2023-038', tipo: 'Serviços', contratada: 'Service Corp S.A.', valor: 650000, status: 'Ativo', expiracao: '2025-05-22' },
    { id: 'CT-2023-041', tipo: 'Distribuição', contratada: 'Logística Express', valor: 920000, status: 'Em revisão', expiracao: '2024-01-30' },
    { id: 'CT-2023-053', tipo: 'Licenciamento', contratada: 'Tech Solutions', valor: 480000, status: 'Ativo', expiracao: '2024-03-12' },
    { id: 'CT-2023-065', tipo: 'Manutenção', contratada: 'Maintenance Pro', valor: 310000, status: 'Ativo', expiracao: '2024-11-08' }
  ]
};
