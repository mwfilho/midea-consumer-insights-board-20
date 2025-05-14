
import React from 'react';
import { BarChart2, Users, DollarSign, Clock, Award } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import { trabalhistaData } from '@/data/juridicoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie } from 'recharts';

interface PainelTrabalhistaProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelTrabalhista: React.FC<PainelTrabalhistaProps> = ({ filters }) => {
  // Cores para os gráficos
  const COLORS = ['#0057a6', '#e0e0e0'];
  const COLORS_BAR = ['#0057a6', '#0077CC', '#3399FF', '#66BBFF', '#99DDFF'];

  // Dados para gráfico de pizza de acordos x sentenças
  const acordosData = [
    { name: 'Acordos', value: trabalhistaData.percentualAcordos },
    { name: 'Sentenças', value: 100 - trabalhistaData.percentualAcordos }
  ];

  // Definir colunas para tabela
  const columns = [
    { key: 'id', header: 'Processo', className: 'font-medium' },
    { key: 'reclamante', header: 'Reclamante' },
    { key: 'causa', header: 'Causa' },
    { 
      key: 'valorPedido', 
      header: 'Valor Pedido (R$)',
      className: 'text-right',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { 
      key: 'resultado', 
      header: 'Resultado',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Acordo' ? 'bg-blue-100 text-blue-800' : 
          value === 'Ganho' ? 'bg-green-100 text-green-800' : 
          value === 'Perda' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'valorPago', 
      header: 'Valor Pago (R$)',
      className: 'text-right',
      render: (value: number) => value > 0 ? `R$ ${value.toLocaleString()}` : '-'
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Novos Processos"
          value={`${trabalhistaData.novosProcessos}`}
          icon={<BarChart2 size={24} className="text-sky-500" />}
          description="No mês atual"
        />
        <StatCard
          title="Fechados"
          value={`${trabalhistaData.processosFechados}`}
          icon={<Users size={24} className="text-sky-500" />}
          description="No mês atual"
        />
        <StatCard
          title="Valor Reclamatório Médio"
          value={`R$ ${trabalhistaData.valorReclamatorioMedio.toLocaleString()}`}
          icon={<DollarSign size={24} className="text-sky-500" />}
          description="Por processo"
        />
        <StatCard
          title="% Acordos"
          value={`${trabalhistaData.percentualAcordos}%`}
          icon={<Award size={24} className="text-sky-500" />}
          description="Do total de processos"
        />
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Valor Efetivamente Pago YTD (R$)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trabalhistaData.valorPagoAcumulado}
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
        
        <ChartCard title="Principais Causas">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trabalhistaData.principaisCausas}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="causa" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="quantidade" 
                  fill="#0057a6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {trabalhistaData.principaisCausas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_BAR[index % COLORS_BAR.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Accordos x Sentenças */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="% Acordos x Sentenças">
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
        
        <ChartCard title="Valor Reclamatório vs. Pago" className="col-span-2">
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700">Valor Médio Reclamado</h4>
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 h-4 rounded-full mr-2">
                  <div 
                    className="h-4 bg-sky-500 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <span className="text-sm font-bold">
                  R$ {trabalhistaData.valorReclamatorioMedio.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700">Valor Médio Efetivamente Pago</h4>
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 h-4 rounded-full mr-2">
                  <div 
                    className="h-4 bg-green-500 rounded-full"
                    style={{ width: `${(trabalhistaData.valorEfetivamentePago / trabalhistaData.processosFechados) / trabalhistaData.valorReclamatorioMedio * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold">
                  R$ {Math.round(trabalhistaData.valorEfetivamentePago / trabalhistaData.processosFechados).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="mt-4 bg-green-50 p-3 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-green-700 font-medium">
                  Economia de {Math.round(100 - (trabalhistaData.valorEfetivamentePago / trabalhistaData.processosFechados) / trabalhistaData.valorReclamatorioMedio * 100)}% em relação ao valor reclamado
                </span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Tabela de processos */}
      <DataTable
        title="Processos Trabalhistas"
        columns={columns}
        data={trabalhistaData.processos}
        className="shadow-md"
      />
    </div>
  );
};

export default PainelTrabalhista;
