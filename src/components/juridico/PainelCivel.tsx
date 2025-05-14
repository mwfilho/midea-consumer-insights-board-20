
import React from 'react';
import { BarChart2, TrendingUp, Clock, Target, DollarSign } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import { civelData } from '@/data/juridicoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PainelCivelProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelCivel: React.FC<PainelCivelProps> = ({ filters }) => {
  // Cores para os gráficos
  const COLORS = ['#0057a6', '#0077CC', '#3399FF', '#66BBFF', '#99DDFF'];

  // Construir dados para gráfico de custos (waterfall)
  const custosData = [
    {
      name: 'Orçamento',
      valor: civelData.custos.orcamento,
    },
    {
      name: 'Realizado',
      valor: civelData.custos.realizado,
    }
  ];

  // Definir colunas para tabela
  const columns = [
    { key: 'id', header: 'Processo', className: 'font-medium' },
    { key: 'parte', header: 'Parte Contrária' },
    { key: 'assunto', header: 'Assunto' },
    { 
      key: 'valor', 
      header: 'Valor (R$)',
      className: 'text-right',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { 
      key: 'probabilidade', 
      header: 'Probabilidade',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Alta' ? 'bg-red-100 text-red-800' : 
          value === 'Média' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Encerrado' ? 'bg-green-100 text-green-800' : 
          value === 'Suspenso' ? 'bg-gray-100 text-gray-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Processos Ativos"
          value={`${civelData.processosAtivos}`}
          icon={<BarChart2 size={24} className="text-sky-500" />}
          description="Em andamento"
        />
        <StatCard
          title="Exposição Potencial"
          value={`R$ ${(civelData.exposicaoPotencial / 1000000).toFixed(1)}M`}
          icon={<DollarSign size={24} className="text-sky-500" />}
          description="Valor total em risco"
        />
        <StatCard
          title="Taxa de Êxito"
          value={`${civelData.taxaExito}%`}
          icon={<Target size={24} className="text-sky-500" />}
          description="Processos ganhos"
        />
        <StatCard
          title="Ciclo Médio"
          value={`${civelData.tempoMedioCiclo} dias`}
          icon={<Clock size={24} className="text-sky-500" />}
          description="Duração média"
        />
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Custos YTD (R$)">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={custosData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `R$ ${value / 1000}K`} />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']} />
                <Bar 
                  dataKey="valor" 
                  fill="#0057a6"
                  barSize={60}
                  radius={[4, 4, 0, 0]}
                >
                  {custosData.map((entry, index) => {
                    const color = index === 0 ? '#0057a6' : 
                      civelData.custos.realizado > civelData.custos.orcamento ? '#ef4444' : '#10b981';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 bg-blue-50 rounded-b-lg border-t border-blue-100">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-blue-700 font-medium">
                {civelData.custos.realizado <= civelData.custos.orcamento 
                  ? `Economia de R$ ${(civelData.custos.orcamento - civelData.custos.realizado).toLocaleString()} (${Math.round((1 - civelData.custos.realizado / civelData.custos.orcamento) * 100)}%)`
                  : `Orçamento excedido em R$ ${(civelData.custos.realizado - civelData.custos.orcamento).toLocaleString()} (${Math.round((civelData.custos.realizado / civelData.custos.orcamento - 1) * 100)}%)`}
              </span>
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Distribuição por Assunto">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={civelData.distribuicaoPorAssunto}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assunto" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="quantidade" 
                  fill="#0057a6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {civelData.distribuicaoPorAssunto.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Taxa de Êxito e Boxplot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Taxa de Êxito">
          <div className="p-6 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm font-bold text-sky-600">{civelData.taxaExito}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div
                  className="h-4 bg-sky-500 rounded-full"
                  style={{ width: `${civelData.taxaExito}%` }}
                ></div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>Meta: 70%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-b-lg border-t border-blue-100">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-blue-700 font-medium">
                {civelData.taxaExito >= 70 
                  ? 'Meta atingida! Desempenho excelente.'
                  : 'Meta não atingida. Ação necessária.'}
              </span>
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Ciclo de Processos (dias)">
          <div className="p-6 flex items-center justify-center">
            <div className="w-full">
              {/* Representação visual simplificada de boxplot */}
              <div className="relative h-16 flex items-center justify-center">
                <div className="absolute w-full h-2 bg-gray-200 rounded"></div>
                {/* Q1 to Q3 box */}
                <div 
                  className="absolute h-8 bg-sky-200 rounded" 
                  style={{ 
                    left: `${(civelData.cicloProcessos.q1 / civelData.cicloProcessos.max) * 100}%`, 
                    width: `${((civelData.cicloProcessos.q3 - civelData.cicloProcessos.q1) / civelData.cicloProcessos.max) * 100}%` 
                  }}
                ></div>
                {/* Min to Max line */}
                <div 
                  className="absolute h-2 bg-sky-500 rounded" 
                  style={{ 
                    left: `${(civelData.cicloProcessos.min / civelData.cicloProcessos.max) * 100}%`, 
                    width: `${((civelData.cicloProcessos.max - civelData.cicloProcessos.min) / civelData.cicloProcessos.max) * 100}%` 
                  }}
                ></div>
                {/* Median line */}
                <div 
                  className="absolute h-8 w-1 bg-sky-700 rounded" 
                  style={{ left: `${(civelData.cicloProcessos.median / civelData.cicloProcessos.max) * 100}%` }}
                ></div>
              </div>
              
              {/* Valores do boxplot */}
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-600">Min: {civelData.cicloProcessos.min}</span>
                <span className="text-gray-600">Q1: {civelData.cicloProcessos.q1}</span>
                <span className="font-medium">Mediana: {civelData.cicloProcessos.median}</span>
                <span className="text-gray-600">Q3: {civelData.cicloProcessos.q3}</span>
                <span className="text-gray-600">Max: {civelData.cicloProcessos.max}</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Tabela de processos */}
      <DataTable
        title="Processos em Andamento"
        columns={columns}
        data={civelData.processos}
        className="shadow-md"
      />
    </div>
  );
};

export default PainelCivel;
