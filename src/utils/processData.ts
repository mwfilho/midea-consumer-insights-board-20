
import React from 'react';
import { processosPorEstado } from '@/data/dashboardData';

export interface ProcessoEstadoData {
  estado: string;
  processos: number;
  percentual: string;
}

export interface ProcessoChartData {
  estado: string;
  processos: number;
}

export const getProcessosByState = (): Record<string, number> => {
  const stateMap: Record<string, number> = {};
  
  processosPorEstado.forEach(item => {
    const match = item.estado.match(/\(([A-Z]{2})\)/);
    if (match && match[1]) {
      stateMap[match[1]] = item.processos;
    }
  });
  
  return stateMap;
};

export const getChartData = (): ProcessoChartData[] => {
  return processosPorEstado
    .filter(item => item.estado !== "Outros estados")
    .map(item => ({
      estado: item.estado.replace(/\s*\([A-Z]{2}\)/, ''),
      processos: item.processos
    }));
};

export const getInsights = () => [
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

export const getTableColumns = () => [
  { key: 'estado', header: 'Estado' },
  { key: 'processos', header: 'Processos', className: 'text-center' },
  { 
    key: 'percentual', 
    header: 'Percentual', 
    className: 'text-center',
    render: (value: string) => (
      <div>
        <span>{value}</span>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="h-2.5 rounded-full bg-midea-blue"
            style={{ width: value }}
          />
        </div>
      </div>
    )
  }
];
