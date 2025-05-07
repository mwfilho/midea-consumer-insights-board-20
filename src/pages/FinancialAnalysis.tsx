
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import {
  PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  BarChart, Bar
} from 'recharts';
import { 
  evolucaoPagamentos,
  valorMedioProdutos,
  detalhamentoFinanceiro
} from '@/data/dashboardData';

const FinancialAnalysis = () => {
  // Dados para o gráfico de pizza danos morais vs materiais
  const danosMoraisVsMateriais = [
    { name: 'Danos Materiais', value: 57 },
    { name: 'Danos Morais', value: 43 },
  ];

  const COLORS = ['#0056a9', '#b8d1ea'];

  // Colunas para tabela de detalhamento financeiro
  const columns = [
    { key: 'categoria', header: 'Categoria' },
    { key: 'valorTotal', header: 'Valor Total', render: (value) => `R$ ${value.toLocaleString()}` },
    { key: 'mediaDanoMoral', header: 'Média Dano Moral', render: (value) => `R$ ${value.toLocaleString()}` },
    { key: 'mediaDanoMaterial', header: 'Média Dano Material', render: (value) => `R$ ${value.toLocaleString()}` },
    { key: 'percentual', header: '% do Total' },
  ];

  const insights = [
    { 
      text: 'Acordos geram economia média de 35% em relação às condenações judiciais',
      icon: '📉'
    },
    { 
      text: 'Produtos de refrigeração têm maior valor médio de indenização (R$ 4.500)',
      icon: '❄️'
    },
    { 
      text: 'Danos materiais correspondem a 57% do valor total das indenizações',
      icon: '💰'
    }
  ];

  return (
    <DashboardLayout title="Análise Financeira Detalhada">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Danos Morais vs. Materiais">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={danosMoraisVsMateriais}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {danosMoraisVsMateriais.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            <div>
              <h3 className="font-bold text-gray-500">Danos Morais</h3>
              <p className="text-2xl font-bold text-midea-blue">R$ 3.000</p>
              <p className="text-sm text-gray-500">Média por processo</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-500">Danos Materiais</h3>
              <p className="text-2xl font-bold text-midea-blue">R$ 4.000</p>
              <p className="text-sm text-gray-500">Média por processo</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Evolução dos Pagamentos (R$ mil)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={evolucaoPagamentos}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value} mil`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalPagamentos"
                  stroke="#0056a9"
                  name="Total Pagamentos"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="danosMorais"
                  stroke="#b8d1ea"
                  name="Danos Morais"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-midea-blue mr-1"></span> Redução de 15% nos pagamentos vs. mesmo período do ano anterior
          </p>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Valor Médio por Tipo de Produto (R$)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={valorMedioProdutos}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="produto" type="category" />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Bar dataKey="valor" fill="#0056a9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <DataTable 
          title="Detalhamento Financeiro por Categoria"
          columns={columns}
          data={detalhamentoFinanceiro}
        />
      </div>

      <ChartCard title="Insights Financeiros">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <p className="flex items-start">
                <span className="text-xl mr-2">{insight.icon}</span>
                <span>{insight.text}</span>
              </p>
            </div>
          ))}
        </div>
      </ChartCard>
    </DashboardLayout>
  );
};

export default FinancialAnalysis;
