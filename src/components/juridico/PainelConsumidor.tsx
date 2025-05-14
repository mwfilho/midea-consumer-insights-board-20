
import React from 'react';
import { BarChart2, TrendingUp, Clock, Target, Award } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import { consumidorData } from '@/data/juridicoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface PainelConsumidorProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelConsumidor: React.FC<PainelConsumidorProps> = ({ filters }) => {
  // Dados para gráfico de pizza de acordos
  const acordosData = [
    { name: 'Acordos', value: consumidorData.percentualAcordos },
    { name: 'Outros', value: 100 - consumidorData.percentualAcordos },
  ];
  const COLORS = ['#0057a6', '#e0e0e0'];

  // Definição das colunas da tabela
  const columns = [
    { key: 'id', header: 'Processo', className: 'font-medium' },
    { key: 'cliente', header: 'Cliente' },
    { key: 'produto', header: 'Produto' },
    { 
      key: 'valor', 
      header: 'Valor (R$)',
      className: 'text-right',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Encerrado' ? 'bg-green-100 text-green-800' : 
          value === 'Acordo' ? 'bg-blue-100 text-blue-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'dataAbertura', 
      header: 'Abertura',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'dataEncerramento', 
      header: 'Encerramento',
      render: (value: string | null) => value ? new Date(value).toLocaleDateString('pt-BR') : '-'
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Novos Processos"
          value={`${consumidorData.novosProcessos}`}
          icon={<BarChart2 size={24} className="text-sky-500" />}
          description="No mês atual"
        />
        <StatCard
          title="Processos Encerrados"
          value={`${consumidorData.processosEncerrados}`}
          icon={<Clock size={24} className="text-sky-500" />}
          description="No mês atual"
        />
        <StatCard
          title="% de Acordos"
          value={`${consumidorData.percentualAcordos}%`}
          icon={<TrendingUp size={24} className="text-sky-500" />}
          description="Do total encerrado"
        />
        <StatCard
          title="Taxa de Êxito"
          value={`${consumidorData.taxaExito}%`}
          icon={<Target size={24} className="text-sky-500" />}
          description="Processos ganhos"
        />
        <StatCard
          title="Ciclo Médio"
          value={`${consumidorData.cicloMedioDias} dias`}
          icon={<Clock size={24} className="text-sky-500" />}
          description="Duração média"
        />
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Valor Pago Mensal (R$)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={consumidorData.valorPagoHistorico}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `R$ ${value / 1000}K`} />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Valor Pago']} />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#0057a6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Principais Motivos">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={consumidorData.principaisMotivos}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="motivo" 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar 
                  dataKey="quantidade" 
                  fill="#0057a6" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Gráficos - segunda linha */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Acordos vs. Total">
          <div className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={acordosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#0057a6"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {acordosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Taxa de Êxito" className="col-span-2">
          <div className="p-6 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm font-bold text-sky-600">{consumidorData.taxaExito}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div
                  className="h-4 bg-sky-500 rounded-full"
                  style={{ width: `${consumidorData.taxaExito}%` }}
                ></div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>Meta: 75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-b-lg border-t border-blue-100">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-blue-700 font-medium">
                {consumidorData.taxaExito >= 75 
                  ? 'Meta atingida! Desempenho excelente.'
                  : 'Meta não atingida. Ação necessária.'}
              </span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Tabela de processos */}
      <DataTable
        title="Processos Recentes"
        columns={columns}
        data={consumidorData.processos}
        className="shadow-md"
      />
    </div>
  );
};

export default PainelConsumidor;
