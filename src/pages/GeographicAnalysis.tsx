
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import InsightsList from '@/components/dashboard/InsightsList';
import BrazilMap from '@/components/dashboard/BrazilMap';
import ProcessDistributionChart from '@/components/dashboard/ProcessDistributionChart';
import { 
  processosPorEstado,
  getProcessosByState, 
  getChartData, 
  getInsights, 
  getTableColumns 
} from '@/utils/processData';

const GeographicAnalysis = () => {
  const processosMap = getProcessosByState();
  const columns = getTableColumns();
  const barChartData = getChartData();
  const insights = getInsights();

  return (
    <DashboardLayout title="Distribuição Geográfica dos Processos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Mapa de Processos por Estado" 
          className="h-full"
          contentClassName="flex items-center justify-center"
        >
          <BrazilMap processosMap={processosMap} />
        </ChartCard>

        <DataTable 
          title="Processos por Estado"
          columns={columns}
          data={processosPorEstado}
          className="h-full"
        />
      </div>

      <ChartCard title="Distribuição de Processos por Estado (Top 6)" className="mb-8">
        <ProcessDistributionChart data={barChartData} />
      </ChartCard>

      <InsightsList 
        title="Insights"
        insights={insights}
      />
    </DashboardLayout>
  );
};

export default GeographicAnalysis;
