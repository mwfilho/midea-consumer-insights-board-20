
import React from 'react';
import { BarChart2, TrendingUp, Clock, Users, FileText, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import { 
  consumidorData, 
  civelData, 
  trabalhistaData, 
  tributarioData, 
  contratosData 
} from '@/data/juridicoData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, LineChart, Line, PieChart, Pie 
} from 'recharts';

interface PainelGeralProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
}

const PainelGeral: React.FC<PainelGeralProps> = ({ filters }) => {
  // Cores para os gráficos
  const COLORS = ['#0057a6', '#3399FF', '#66BBFF', '#99DDFF', '#CCE5FF'];
  
  // Dados para gráfico de processos ativos por área
  const processosAtivosPorArea = [
    { name: 'Consumidor', quantidade: consumidorData.novosProcessos - consumidorData.processosEncerrados },
    { name: 'Cível', quantidade: civelData.processosAtivos },
    { name: 'Trabalhista', quantidade: trabalhistaData.novosProcessos - trabalhistaData.processosFechados },
    { name: 'Tributário', quantidade: tributarioData.autosInfracao - tributarioData.autosBaixados },
    { name: 'Contratos', quantidade: contratosData.contratosRevisao }
  ];

  // Dados para gráfico de taxa de êxito por área
  const taxaExitoPorArea = [
    { name: 'Consumidor', taxa: consumidorData.taxaExito },
    { name: 'Cível', taxa: civelData.taxaExito },
    { name: 'Trabalhista', taxa: Math.round(trabalhistaData.processosFechados / (trabalhistaData.novosProcessos + trabalhistaData.processosFechados) * 100) },
    { name: 'Tributário', taxa: Math.round(tributarioData.autosBaixados / (tributarioData.autosInfracao + tributarioData.autosBaixados) * 100) },
    { name: 'Contratos', taxa: contratosData.percentualDentroSLA }
  ];

  // Dados para o gráfico de ciclo médio
  const cicloMedioPorArea = [
    { name: 'Consumidor', dias: consumidorData.cicloMedioDias },
    { name: 'Cível', dias: civelData.tempoMedioCiclo },
    { name: 'Trabalhista', dias: 45 }, // Valor fixo já que não temos cicloMedioTempo
    { name: 'Contratos', dias: contratosData.slaAprovacao }
  ];

  // Dados para gráfico de acordos vs total
  const acordosData = [
    { name: 'Consumidor', acordo: consumidorData.percentualAcordos, total: 100 },
    { name: 'Cível', acordo: 40, total: 100 }, // Valor fixo já que não temos percentualAcordos
    { name: 'Trabalhista', acordo: trabalhistaData.percentualAcordos, total: 100 }
  ];

  // Valor total em risco
  const valorTotalRisco = 
    civelData.exposicaoPotencial + 
    trabalhistaData.valorReclamatorioMedio * (trabalhistaData.novosProcessos - trabalhistaData.processosFechados) +
    tributarioData.valoresDiscutidos;

  // Calcular economias para cível (já que não temos economiaObtida)
  const civelEconomia = 450000; // Valor estimado fixo para cível

  // Economia total obtida
  const economiaTotal = 
    tributarioData.economiaObtida + 
    civelEconomia + 
    (trabalhistaData.valorReclamatorioMedio * trabalhistaData.processosFechados - trabalhistaData.valorEfetivamentePago);

  // Valor global contratado
  const valorContratado = contratosData.valorContratadoYTD;

  return (
    <div className="space-y-6">
      {/* KPIs consolidados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Processos Ativos (Total)"
          value={processosAtivosPorArea.reduce((acc, curr) => acc + curr.quantidade, 0).toString()}
          icon={<FileText size={24} className="text-sky-500" />}
          description="Todos os departamentos"
        />
        <StatCard
          title="Exposição Financeira"
          value={`R$ ${(valorTotalRisco / 1000000).toFixed(1)}M`}
          icon={<AlertTriangle size={24} className="text-amber-500" />}
          description="Valor total em risco"
        />
        <StatCard
          title="Economia Obtida"
          value={`R$ ${(economiaTotal / 1000000).toFixed(1)}M`}
          icon={<TrendingUp size={24} className="text-green-500" />}
          description="Total economizado"
        />
        <StatCard
          title="Valor Contratado YTD"
          value={`R$ ${(valorContratado / 1000000).toFixed(1)}M`}
          icon={<BarChart2 size={24} className="text-sky-500" />}
          description="No ano corrente"
        />
      </div>

      {/* Primeira linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Processos Ativos por Área">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processosAtivosPorArea}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} processos`, ""]} />
                <Bar 
                  dataKey="quantidade" 
                  name="Processos Ativos"
                  fill="#0057a6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {processosAtivosPorArea.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Taxa de Êxito por Área (%)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={taxaExitoPorArea}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Bar 
                  dataKey="taxa" 
                  name="Taxa de Êxito"
                  fill="#0057a6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                >
                  {taxaExitoPorArea.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.taxa >= 70 ? '#10b981' : entry.taxa >= 50 ? '#f59e0b' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Ciclo Médio por Área (dias)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cicloMedioPorArea}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value} dias`, ""]} />
                <Bar 
                  dataKey="dias" 
                  name="Dias"
                  fill="#0057a6" 
                  barSize={30}
                  radius={[0, 4, 4, 0]}
                >
                  {cicloMedioPorArea.map((entry, index) => {
                    // Menor ciclo = melhor (verde), maior ciclo = pior (vermelho)
                    const maxCiclo = Math.max(...cicloMedioPorArea.map(item => item.dias));
                    const minCiclo = Math.min(...cicloMedioPorArea.map(item => item.dias));
                    const range = maxCiclo - minCiclo;
                    const normalizedValue = (entry.dias - minCiclo) / range;
                    
                    // Gradiente de cores verde -> amarelo -> vermelho
                    const color = normalizedValue < 0.3 ? '#10b981' : 
                                  normalizedValue < 0.7 ? '#f59e0b' : '#ef4444';
                                  
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <ChartCard title="Percentual de Acordos por Área">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={acordosData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value, name) => {
                  return [
                    `${value}%`, 
                    name === 'acordo' ? 'Acordos' : 'Outros'
                  ];
                }} />
                <Bar 
                  dataKey="acordo" 
                  name="Acordos" 
                  stackId="a"
                  fill="#0057a6" 
                  radius={[4, 0, 0, 0]} 
                />
                <Bar 
                  dataKey="total" 
                  name="Outros" 
                  stackId="a" 
                  fill="#e0e0e0" 
                  radius={[0, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Terceira linha com cards de destaque e alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de alerta de renovações de contratos */}
        <ChartCard 
          title="Contratos a Vencer" 
          className={contratosData.renovacoes90Dias > 0 ? "border-amber-400 border-l-2" : ""}
        >
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
        </ChartCard>
        
        {/* Card de economia obtida */}
        <ChartCard title="Economia Total Obtida" className="col-span-2">
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700">Distribuição por Área</h4>
              <div className="mt-4 space-y-4">
                {/* Tributário */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">Tributário</span>
                    <span className="text-sm font-medium text-gray-600">
                      R$ {(tributarioData.economiaObtida / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-3 bg-sky-500 rounded-full"
                      style={{ width: `${(tributarioData.economiaObtida / economiaTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Cível */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">Cível</span>
                    <span className="text-sm font-medium text-gray-600">
                      R$ {(civelEconomia / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-3 bg-sky-500 rounded-full"
                      style={{ width: `${(civelEconomia / economiaTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Trabalhista */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">Trabalhista</span>
                    <span className="text-sm font-medium text-gray-600">
                      R$ {((trabalhistaData.valorReclamatorioMedio * trabalhistaData.processosFechados - trabalhistaData.valorEfetivamentePago) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div
                      className="h-3 bg-sky-500 rounded-full"
                      style={{ width: `${((trabalhistaData.valorReclamatorioMedio * trabalhistaData.processosFechados - trabalhistaData.valorEfetivamentePago) / economiaTotal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-lg font-bold text-green-600">
                Total: R$ {(economiaTotal / 1000000).toFixed(1)}M
              </h3>
              <p className="text-sm text-gray-500">
                Equivalente a {Math.round((economiaTotal / valorTotalRisco) * 100)}% do valor total em risco
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

    </div>
  );
};

export default PainelGeral;
