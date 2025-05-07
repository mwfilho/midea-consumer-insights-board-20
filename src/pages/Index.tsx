
import React from 'react';
import { 
  BarChart as BarChartIcon,
  Calendar,
  LayoutDashboard,
  Gavel
} from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadialBar } from 'recharts';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import ProcessDistributionChart from '@/components/dashboard/ProcessDistributionChart';
import { 
  statusProcessos,
  escritoriosResponsaveis,
  processosPorEstado,
  valorMedioProdutos
} from '@/data/dashboardData';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';

const Index = () => {
  // Transformar dados para o gráfico de pizza
  const statusData = [
    { name: 'Ativos', value: statusProcessos.ativo },
    { name: 'Encerrados', value: statusProcessos.encerrado },
    { name: 'Reativados', value: statusProcessos.reativado },
  ];

  // Cores mais coesas - tons de azul
  const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];
  const COLORS_STATUS = ['#0ea5e9', '#38bdf8', '#7dd3fc'];

  // Configuração para o ChartContainer
  const chartConfig = {
    ativos: { label: 'Ativos', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
    encerrados: { label: 'Encerrados', theme: { light: '#38bdf8', dark: '#7dd3fc' } },
    reativados: { label: 'Reativados', theme: { light: '#7dd3fc', dark: '#bae6fd' } },
    primaryLine: { theme: { light: '#0ea5e9', dark: '#38bdf8' } },
    secondaryLine: { theme: { light: '#7dd3fc', dark: '#bae6fd' } },
  };

  return (
    <DashboardLayout title="Resumo Executivo">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sky-500 mb-2">
          Principais Indicadores - Abril/2025
        </h2>
        <p className="text-gray-600">Análise da carteira de processos do contencioso consumidor</p>
      </div>

      {/* Indicadores principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Processos"
          value="200+"
          icon={<Gavel size={32} className="text-sky-500" />}
          description="Processos ativos e encerrados"
        />
        <StatCard 
          title="Total de Pagamentos"
          value="R$ 350mil+"
          icon={<BarChartIcon size={32} className="text-sky-500" />}
          description="Acordos e condenações"
        />
        <StatCard 
          title="Média Danos Morais"
          value="R$ 3.000"
          icon={<LayoutDashboard size={32} className="text-sky-500" />}
          description="Valor por processo"
        />
        <StatCard 
          title="Média Danos Materiais"
          value="R$ 4.000"
          icon={<Calendar size={32} className="text-sky-500" />}
          description="Valor por processo"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Status dos Processos" contentClassName="pt-3">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  paddingAngle={5}
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS_STATUS[index % COLORS_STATUS.length]}
                      style={{
                        filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.15))'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: 'none'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  layout="horizontal"
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Escritórios Responsáveis" contentClassName="pt-3">
          <div className="h-[300px]">
            <ChartContainer 
              config={chartConfig}
              className="w-full h-full"
            >
              <BarChart data={escritoriosResponsaveis}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis 
                  dataKey="escritorio" 
                  tick={{ fill: '#666', fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#666', fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="processos" 
                  name="Processos" 
                  radius={[6, 6, 0, 0]} 
                  fill="#0ea5e9"
                  animationBegin={0}
                  animationDuration={1500}
                  className="hover:opacity-80"
                >
                  {escritoriosResponsaveis.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      style={{
                        filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.15))'
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </ChartCard>
      </div>
      
      {/* Valor Médio por Produto */}
      <div className="grid grid-cols-1 mb-8">
        <ChartCard title="Valor Médio por Produto (R$)" contentClassName="pt-3">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={valorMedioProdutos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
                <XAxis 
                  type="number" 
                  tick={{ fill: '#666', fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                />
                <YAxis 
                  dataKey="produto" 
                  type="category" 
                  tick={{ fill: '#666', fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={false}
                  width={100}
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Valor Médio']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: 'none'
                  }}
                />
                <Bar 
                  dataKey="valor" 
                  radius={[0, 6, 6, 0]} 
                  animationDuration={1500}
                  fill="#0ea5e9"
                >
                  {valorMedioProdutos.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[Math.min(index, COLORS.length - 1)]} 
                      style={{
                        filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.15))'
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
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
      <div className="mb-8">
        <h3 className="text-xl font-bold text-sky-500 mb-4">Insights</h3>
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
