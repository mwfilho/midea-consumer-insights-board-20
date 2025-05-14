
import React from 'react';
import { FileText, TrendingDown, DollarSign, BarChart2, Clock } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import { tributarioData } from '@/data/juridicoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

interface PainelTributarioProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelTributario: React.FC<PainelTributarioProps> = ({ filters }) => {
  // Cores para os gráficos
  const COLORS = ['#0057a6', '#3399FF'];

  // Dados para gráfico de barras comparando valores lançados vs discutidos
  const valoresData = [
    {
      name: 'Valores',
      original: tributarioData.valoresLancados,
      discutido: tributarioData.valoresDiscutidos
    }
  ];

  // Dados para gráfico de fase processual
  const faseProcessualData = [
    { name: 'Administrativo', quantidade: tributarioData.faseProcessual.administrativo },
    { name: 'Judicial', quantidade: tributarioData.faseProcessual.judicial }
  ];

  // Definir colunas para tabela
  const columns = [
    { key: 'id', header: 'Auto de Infração', className: 'font-medium' },
    { key: 'tributo', header: 'Tributo' },
    { 
      key: 'valorOriginal', 
      header: 'Valor Original (R$)',
      className: 'text-right',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { 
      key: 'valorDiscutido', 
      header: 'Valor Discutido (R$)',
      className: 'text-right',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { key: 'fase', header: 'Fase' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Baixado' ? 'bg-green-100 text-green-800' : 
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Autos de Infração (mês)"
          value={`${tributarioData.autosInfracao}`}
          icon={<FileText size={24} className="text-sky-500" />}
          description="Recebidos no mês"
        />
        <StatCard
          title="Autos Encerrados"
          value={`${tributarioData.autosBaixados}`}
          icon={<BarChart2 size={24} className="text-sky-500" />}
          description="Baixados no mês"
        />
        <StatCard
          title="Economia Obtida"
          value={`R$ ${(tributarioData.economiaObtida / 1000000).toFixed(2)}M`}
          icon={<TrendingDown size={24} className="text-sky-500" />}
          description="Valor total"
        />
        <StatCard
          title="Parcelamentos Ativos"
          value={`${tributarioData.parcelamentosAtivos}`}
          icon={<Clock size={24} className="text-sky-500" />}
          description="Em andamento"
        />
        <StatCard
          title="% Discussão"
          value={`${Math.round((tributarioData.valoresDiscutidos / tributarioData.valoresLancados) * 100)}%`}
          icon={<DollarSign size={24} className="text-sky-500" />}
          description="Valor discutido/lançado"
        />
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Valor Lançado vs. Discutido (R$)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={valoresData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis tickFormatter={(value) => `R$ ${value / 1000000}M`} />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, '']} />
                <Legend />
                <Bar 
                  dataKey="original" 
                  name="Valor Lançado" 
                  fill={COLORS[0]} 
                  radius={[4, 4, 0, 0]} 
                  barSize={80}
                />
                <Bar 
                  dataKey="discutido" 
                  name="Valor Discutido" 
                  fill={COLORS[1]} 
                  radius={[4, 4, 0, 0]} 
                  barSize={80}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Fase Processual">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={faseProcessualData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="quantidade" 
                  fill="#0057a6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={80}
                >
                  {faseProcessualData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Economia obtida e métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Economia Obtida">
          <div className="p-6 flex flex-col space-y-6">
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">Valor Original vs. Final</span>
                <span className="text-sm font-bold text-green-600">
                  R$ {tributarioData.economiaObtida.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-6 bg-green-500 flex items-center justify-end pr-2 text-white text-xs font-bold"
                  style={{ width: `${Math.round((tributarioData.economiaObtida / tributarioData.valoresLancados) * 100)}%` }}
                >
                  {Math.round((tributarioData.economiaObtida / tributarioData.valoresLancados) * 100)}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-sm text-gray-500">Valor Original</p>
                <p className="font-bold text-lg text-sky-600">R$ {(tributarioData.valoresLancados / 1000000).toFixed(2)}M</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Valor Final</p>
                <p className="font-bold text-lg text-green-600">
                  R$ {((tributarioData.valoresLancados - tributarioData.economiaObtida) / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Economia</p>
                <p className="font-bold text-lg text-green-600">
                  R$ {(tributarioData.economiaObtida / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-b-lg border-t border-green-100">
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-green-700 font-medium">
                Economia de {Math.round((tributarioData.economiaObtida / tributarioData.valoresLancados) * 100)}% em relação aos valores originais
              </span>
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Índices de Performance">
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Taxa de Sucesso (Autos Baixados / Total)</h4>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-sky-500 h-4 rounded-full"
                  style={{ width: `${(tributarioData.autosBaixados / (tributarioData.autosInfracao + tributarioData.autosBaixados)) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right text-sm font-medium text-sky-600">
                {Math.round((tributarioData.autosBaixados / (tributarioData.autosInfracao + tributarioData.autosBaixados)) * 100)}%
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700">Taxa de Discutibilidade (Discutido / Lançado)</h4>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-sky-500 h-4 rounded-full"
                  style={{ width: `${(tributarioData.valoresDiscutidos / tributarioData.valoresLancados) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right text-sm font-medium text-sky-600">
                {Math.round((tributarioData.valoresDiscutidos / tributarioData.valoresLancados) * 100)}%
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700">Autos em Parcelamento</h4>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-amber-500 h-4 rounded-full"
                  style={{ width: `${(tributarioData.parcelamentosAtivos / (tributarioData.faseProcessual.administrativo + tributarioData.faseProcessual.judicial)) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right text-sm font-medium text-amber-600">
                {Math.round((tributarioData.parcelamentosAtivos / (tributarioData.faseProcessual.administrativo + tributarioData.faseProcessual.judicial)) * 100)}%
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Tabela de autos de infração */}
      <DataTable
        title="Autos de Infração"
        columns={columns}
        data={tributarioData.autos}
        className="shadow-md"
      />
    </div>
  );
};

export default PainelTributario;
