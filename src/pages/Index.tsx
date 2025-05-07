
import React from 'react';
import { 
  BarChart as BarChartIcon,
  Calendar,
  LayoutDashboard,
  Gavel
} from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import InsightsList from '@/components/dashboard/InsightsList';
import { 
  statusProcessos,
  escritoriosResponsaveis,
  processosPorEstado
} from '@/data/dashboardData';

const Index = () => {
  // Transformar dados para o gráfico de pizza
  const statusData = [
    { name: 'Ativos', value: statusProcessos.ativo },
    { name: 'Encerrados', value: statusProcessos.encerrado },
    { name: 'Reativados', value: statusProcessos.reativado },
  ];

  const COLORS = ['#0056a9', '#4a8fd1', '#b8d1ea'];

  return (
    <DashboardLayout title="Resumo Executivo">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-midea-blue mb-2">
          Principais Indicadores - Abril/2025
        </h2>
        <p className="text-gray-600">Análise da carteira de processos do contencioso consumidor</p>
      </div>

      {/* Indicadores principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Processos"
          value="200+"
          icon={<Gavel size={32} className="text-midea-blue" />}
          description="Processos ativos e encerrados"
        />
        <StatCard 
          title="Total de Pagamentos"
          value="R$ 350mil+"
          icon={<BarChartIcon size={32} className="text-midea-blue" />}
          description="Acordos e condenações"
        />
        <StatCard 
          title="Média Danos Morais"
          value="R$ 3.000"
          icon={<LayoutDashboard size={32} className="text-midea-blue" />}
          description="Valor por processo"
        />
        <StatCard 
          title="Média Danos Materiais"
          value="R$ 4.000"
          icon={<Calendar size={32} className="text-midea-blue" />}
          description="Valor por processo"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Status dos Processos">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Escritórios Responsáveis">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={escritoriosResponsaveis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="escritorio" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} processos`} />
                <Bar dataKey="processos" fill="#0056a9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Lista de estados com mais processos */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-midea-blue mb-4">Principais Estados</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-3 font-bold border-b pb-2 mb-2">
            <div>Estado</div>
            <div className="text-center">Processos</div>
            <div className="text-center">Percentual</div>
          </div>
          {processosPorEstado.slice(0, 5).map((estado, index) => (
            <div key={index} className="grid grid-cols-3 py-2 border-b">
              <div>{estado.estado}</div>
              <div className="text-center">{estado.processos}</div>
              <div className="text-center">{estado.percentual}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-midea-blue mb-4">Insights</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul className="list-disc pl-5 space-y-2">
            <li>Maior concentração nas regiões Sudeste e Nordeste</li>
            <li>São Paulo, Bahia e Rio de Janeiro representam 57% dos casos</li>
            <li>Crescimento de 12% nos processos em MG vs. trimestre anterior</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
