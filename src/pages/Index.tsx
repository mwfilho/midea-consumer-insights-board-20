
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import ProcessDistributionChart from '@/components/dashboard/ProcessDistributionChart';
import { 
  statusProcessos,
  escritoriosResponsaveis,
  processosPorEstado,
  valorMedioProdutos
} from '@/data/dashboardData';

// Import new components
import StatusPieChart from '@/components/dashboard/charts/StatusPieChart';
import EscritoriosBarChart from '@/components/dashboard/charts/EscritoriosBarChart';
import ValorMedioProdutosChart from '@/components/dashboard/charts/ValorMedioProdutosChart';
import InsightsSection from '@/components/dashboard/charts/InsightsSection';
import MainIndicators from '@/components/dashboard/charts/MainIndicators';
import DashboardHeader from '@/components/dashboard/charts/DashboardHeader';

const Index = () => {
  // Transformar dados para o gráfico de pizza
  const statusData = [
    { name: 'Ativos', value: statusProcessos.ativo },
    { name: 'Encerrados', value: statusProcessos.encerrado },
    { name: 'Reativados', value: statusProcessos.reativado },
  ];

  // Configuração para o ChartContainer com tons de azul
  const chartConfig = {
    ativos: { label: 'Ativos', theme: { light: '#3b82f6', dark: '#60a5fa' } },
    encerrados: { label: 'Encerrados', theme: { light: '#2563eb', dark: '#3b82f6' } },
    reativados: { label: 'Reativados', theme: { light: '#1d4ed8', dark: '#2563eb' } },
    primaryLine: { theme: { light: '#3b82f6', dark: '#60a5fa' } },
    secondaryLine: { theme: { light: '#1d4ed8', dark: '#2563eb' } },
  };

  const insights = [
    'Maior concentração nas regiões Sudeste e Nordeste',
    'São Paulo, Bahia e Rio de Janeiro representam 57% dos casos',
    'Crescimento de 12% nos processos em MG vs. trimestre anterior'
  ];

  return (
    <DashboardLayout title="Resumo Executivo">
      <DashboardHeader 
        title="Principais Indicadores - Abril/2025"
        subtitle="Análise da carteira de processos do contencioso consumidor"
      />

      {/* Indicadores principais */}
      <MainIndicators />

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Status dos Processos" contentClassName="pt-3">
          <StatusPieChart data={statusData} />
        </ChartCard>

        <ChartCard title="Escritórios Responsáveis" contentClassName="pt-3">
          <EscritoriosBarChart data={escritoriosResponsaveis} config={chartConfig} />
        </ChartCard>
      </div>
      
      {/* Valor Médio por Produto */}
      <div className="grid grid-cols-1 mb-8">
        <ChartCard title="Valor Médio por Produto (R$)" contentClassName="pt-3">
          <ValorMedioProdutosChart data={valorMedioProdutos} />
        </ChartCard>
      </div>

      {/* Lista de estados com mais processos */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-sky-500 mb-4">Principais Estados</h3>
        <ChartCard title="Distribuição de Processos por Estado">
          <ProcessDistributionChart data={processosPorEstado.slice(0, 5)} />
        </ChartCard>
      </div>

      {/* Insights */}
      <InsightsSection insights={insights} />
    </DashboardLayout>
  );
};

export default Index;
