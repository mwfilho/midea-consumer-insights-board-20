
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  ComposedChart, Area
} from 'recharts';
import { analiseRegionalComparativa } from '@/data/dashboardData';

const RegionalAnalysis = () => {
  // Dados para gráfico de valor médio por região
  const valorMedioPorRegiao = [
    { regiao: 'Sudeste', valor: 7850 },
    { regiao: 'Nordeste', valor: 6500 },
    { regiao: 'Sul', valor: 5200 },
    { regiao: 'Norte', valor: 6100 },
    { regiao: 'Centro-Oeste', valor: 5800 },
  ];

  // Dados para gráfico de processos por região e status
  const processosPorRegiaoEStatus = [
    { regiao: 'Sudeste', ativos: 42, encerrados: 57, reativados: 5 },
    { regiao: 'Nordeste', ativos: 24, encerrados: 24, reativados: 2 },
    { regiao: 'Sul', ativos: 10, encerrados: 13, reativados: 1 },
    { regiao: 'Norte', ativos: 8, encerrados: 5, reativados: 1 },
    { regiao: 'Centro-Oeste', ativos: 4, encerrados: 4, reativados: 0 },
  ];

  // Cores para os gráficos
  const REGION_COLORS = {
    'Sudeste': '#0056a9',
    'Nordeste': '#35a853',
    'Sul': '#9747ff',
    'Norte': '#e67e22',
    'Centro-Oeste': '#e91e63'
  };

  const insights = [
    { text: 'Maior concentração de processos na região Sudeste' },
    { text: 'Ar Condicionado é o produto mais reclamado nas regiões Norte e Sul' },
    { text: 'Sudeste tem o maior valor médio (R$ 7.850) entre todas as regiões' },
  ];

  return (
    <DashboardLayout title="Análise Regional Comparativa">
      <div className="overflow-x-auto mb-8">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-midea-blue text-white">
              <th className="p-3 text-left">Região</th>
              <th className="p-3 text-left">Processos</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Produtos mais reclamados</th>
              <th className="p-3 text-left">Valor médio</th>
              <th className="p-3 text-left">Escritório principal</th>
            </tr>
          </thead>
          <tbody>
            {analiseRegionalComparativa.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-white ${item.classe}`}>
                    {item.regiao}
                  </span>
                </td>
                <td className="p-3">{item.processos}</td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div
                      className="h-2.5 rounded-full status-active"
                      style={{ width: item.status.split('|')[0].split('%')[0].trim() + '%' }}
                    ></div>
                  </div>
                  <span className="text-xs">{item.status}</span>
                </td>
                <td className="p-3">{item.produtosMaisReclamados}</td>
                <td className="p-3">{item.valorMedio}</td>
                <td className="p-3">{item.escritorioPrincipal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Valor Médio por Região (R$)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={valorMedioPorRegiao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regiao" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Bar dataKey="valor">
                  {valorMedioPorRegiao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={REGION_COLORS[entry.regiao]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Processos por Região e Status">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={processosPorRegiaoEStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regiao" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ativos" stackId="a" fill="#0056a9" name="Ativos" />
                <Bar dataKey="encerrados" stackId="a" fill="#4a8fd1" name="Encerrados" />
                <Bar dataKey="reativados" stackId="a" fill="#b8d1ea" name="Reativados" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Principais Insights Regionais">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <p>
                {index === 0 && <span className="text-midea-blue mr-2">📊</span>}
                {index === 1 && <span className="text-midea-blue mr-2">❄️</span>}
                {index === 2 && <span className="text-green-500 mr-2">💰</span>}
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default RegionalAnalysis;
