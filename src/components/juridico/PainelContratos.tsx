
import React from 'react';
import { FileText, Clock, Target, DollarSign, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import { contratosData } from '@/data/juridicoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface PainelContratosProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelContratos: React.FC<PainelContratosProps> = ({ filters }) => {
  // Cores para os gráficos
  const COLORS = ['#0057a6', '#e0e0e0'];

  // Dados para gráfico de pizza de modelo padrão vs negociado
  const modelosData = [
    { name: 'Padrão', value: contratosData.modeloPadrao },
    { name: 'Negociado', value: contratosData.modeloNegociado }
  ];

  // Calcular a meta SLA (considerando que é 8 dias)
  const slaMeta = 8;
  const dentroSLA = contratosData.slaAprovacao <= slaMeta;

  // Definir colunas para tabela
  const columns = [
    { key: 'id', header: 'Contrato', className: 'font-medium' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'contratada', header: 'Contratada' },
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
          value === 'Ativo' ? 'bg-green-100 text-green-800' : 
          value === 'Em revisão' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'expiracao', 
      header: 'Expiração',
      render: (value: string) => {
        const expirationDate = new Date(value);
        const today = new Date();
        const diffTime = expirationDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return (
          <div className="flex items-center">
            <span className={`${
              diffDays <= 30 ? 'text-red-600 font-medium' : 
              diffDays <= 90 ? 'text-amber-600' : 
              'text-gray-600'
            }`}>
              {new Date(value).toLocaleDateString('pt-BR')}
            </span>
            {diffDays <= 30 && (
              <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
            )}
          </div>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Contratos em Revisão"
          value={`${contratosData.contratosRevisao}`}
          icon={<FileText size={24} className="text-sky-500" />}
          description="Em andamento"
        />
        <StatCard
          title="SLA de Aprovação"
          value={`${contratosData.slaAprovacao} dias`}
          icon={<Clock size={24} className={dentroSLA ? "text-green-500" : "text-red-500"} />}
          description={dentroSLA ? "Dentro do SLA" : "Acima do SLA"}
        />
        <StatCard
          title="% Dentro do SLA"
          value={`${contratosData.percentualDentroSLA}%`}
          icon={<Target size={24} className="text-sky-500" />}
          description="Meta: 80%"
        />
        <StatCard
          title="Valor Contratado YTD"
          value={`R$ ${(contratosData.valorContratadoYTD / 1000000).toFixed(1)}M`}
          icon={<DollarSign size={24} className="text-sky-500" />}
          description="No ano corrente"
        />
        <StatCard
          title="Renovações próximas"
          value={`${contratosData.renovacoes90Dias}`}
          icon={<AlertTriangle size={24} className="text-amber-500" />}
          description="Próximos 90 dias"
          className={contratosData.renovacoes90Dias > 0 ? "border-amber-400 border-l-4" : ""}
        />
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Ciclo Médio de Aprovação (dias)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={contratosData.cicloTempoMeses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[7, 10]} />
                <Tooltip formatter={(value) => [`${value} dias`, 'Ciclo Médio']} />
                <Line
                  type="monotone"
                  dataKey="tempo"
                  stroke="#0057a6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                {/* Linha de meta de SLA */}
                <Line
                  type="monotone"
                  dataKey={() => slaMeta}
                  stroke="#10b981"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Meta SLA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Padrão vs. Negociado">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#0057a6"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {modelosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* SLA e Alerta de renovações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="SLA de Aprovação">
          <div className="p-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">SLA Atual: {contratosData.slaAprovacao} dias</span>
              <span className="text-sm font-medium text-gray-600">Meta: {slaMeta} dias</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-4 ${dentroSLA ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(contratosData.slaAprovacao / slaMeta * 100, 100)}%` }}
              ></div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">% Contratos Dentro do SLA</span>
                <span className={`text-sm font-medium ${contratosData.percentualDentroSLA >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                  {contratosData.percentualDentroSLA}%
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div
                  className={`h-4 rounded-full ${contratosData.percentualDentroSLA >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${contratosData.percentualDentroSLA}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-b-lg border-t border-blue-100">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-blue-700 font-medium">
                {dentroSLA ? 'SLA dentro da meta estabelecida.' : 'SLA acima da meta estabelecida. Ação recomendada.'}
              </span>
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Renovações Próximas" className={contratosData.renovacoes90Dias > 0 ? "border-amber-400 border-l-2" : ""}>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle size={32} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{contratosData.renovacoes90Dias} contratos</h3>
                <p className="text-sm text-gray-600">com vencimento nos próximos 90 dias</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Distribuição por Prazo</h4>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="bg-red-100 p-3 rounded-lg text-center">
                    <span className="block text-lg font-bold text-red-700">2</span>
                    <span className="text-xs text-red-600">30 dias</span>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-lg text-center">
                    <span className="block text-lg font-bold text-amber-700">3</span>
                    <span className="text-xs text-amber-600">60 dias</span>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg text-center">
                    <span className="block text-lg font-bold text-blue-700">1</span>
                    <span className="text-xs text-blue-600">90 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-b-lg border-t border-amber-100">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm text-amber-700 font-medium">
                Ação recomendada: iniciar processo de renovação para contratos expirando em menos de 60 dias.
              </span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Tabela de contratos */}
      <DataTable
        title="Contratos"
        columns={columns}
        data={contratosData.contratos}
        className="shadow-md"
      />
    </div>
  );
};

export default PainelContratos;
