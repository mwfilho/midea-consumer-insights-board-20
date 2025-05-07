
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import InsightsList from '@/components/dashboard/InsightsList';
import { processosPorEstado } from '@/data/dashboardData';

const GeographicAnalysis = () => {
  const columns = [
    { key: 'estado', header: 'Estado' },
    { key: 'processos', header: 'Processos', className: 'text-center' },
    { 
      key: 'percentual', 
      header: 'Percentual', 
      className: 'text-center',
      render: (value, row) => (
        <div>
          <span>{value}</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="h-2.5 rounded-full bg-midea-blue"
              style={{ width: value }}
            ></div>
          </div>
        </div>
      )
    },
  ];

  const insights = [
    {
      text: 'Maior concentração nas regiões Sudeste e Nordeste',
      icon: '📊'
    },
    {
      text: 'São Paulo, Bahia e Rio de Janeiro representam 57% dos casos',
      icon: '📍'
    },
    {
      text: 'Crescimento de 12% nos processos em MG vs. trimestre anterior',
      icon: '📈'
    }
  ];

  return (
    <DashboardLayout title="Distribuição Geográfica dos Processos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <img 
              src="/lovable-uploads/73964e62-f460-4f69-b3df-d1450e879443.png" 
              alt="Mapa do Brasil com distribuição de processos" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div>
          <DataTable 
            title="Processos por Estado"
            columns={columns}
            data={processosPorEstado}
            className="h-full"
          />
        </div>
      </div>

      <InsightsList 
        title="Insights"
        insights={insights}
      />
    </DashboardLayout>
  );
};

export default GeographicAnalysis;
