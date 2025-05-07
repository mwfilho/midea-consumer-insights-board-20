
import React, { useEffect, useState, useRef } from 'react';
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
  const [isMapReady, setIsMapReady] = useState(false);
  const processosMap = getProcessosByState();
  const columns = getTableColumns();
  const barChartData = getChartData();
  const insights = getInsights();
  const mapRef = useRef(null);

  // Ensure map renders after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout title="Distribuição Geográfica dos Processos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Mapa de Processos por Estado" 
          className="h-full min-h-[500px] bg-gradient-to-br from-white to-blue-50"
          contentClassName="flex items-center justify-center h-full"
        >
          <div ref={mapRef} className="w-full h-full">
            {isMapReady && <BrazilMap processosMap={processosMap} />}
          </div>
        </ChartCard>

        <DataTable 
          title="Processos por Estado"
          columns={columns}
          data={processosPorEstado}
          className="h-full bg-white"
        />
      </div>

      <ChartCard 
        title="Distribuição de Processos por Estado (Top 6)" 
        className="mb-8 bg-gradient-to-br from-white to-blue-50"
      >
        <ProcessDistributionChart data={barChartData} />
      </ChartCard>

      <InsightsList 
        title="Insights"
        insights={insights}
        className="bg-gradient-to-br from-white to-blue-50 border-t-4 border-midea-blue"
      />
    </DashboardLayout>
  );
};

export default GeographicAnalysis;
