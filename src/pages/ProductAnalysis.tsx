
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import InsightsList from '@/components/dashboard/InsightsList';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { 
  distribuicaoProdutos, 
  tiposProcessosValores
} from '@/data/dashboardData';

const ProductAnalysis = () => {
  // Cores para os gráficos
  const PRODUCT_COLORS = ['#0056a9', '#4a8fd1', '#b8d1ea', '#e0e9f5'];

  const insightsProdutos = [
    {
      text: 'Lavadoras e lava e seca representam 35% dos processos, maior categoria individual',
      icon: '💡'
    },
    {
      text: 'Produtos de refrigeração têm maior valor médio de indenização (R$4.500)',
      icon: '💡'
    },
    {
      text: 'Ar condicionado com +15% de casos vs. trimestre anterior',
      icon: '💡'
    }
  ];

  const insightsProcessos = [
    {
      text: 'Acordos representam 55% dos processos, reduzindo custos de litígio',
      icon: '💼'
    },
    {
      text: 'Média de valor em danos morais: R$3.000, danos materiais: R$4.000',
      icon: '💼'
    },
    {
      text: 'Queda de 12% em condenações vs. trimestre anterior',
      icon: '💼'
    }
  ];

  return (
    <DashboardLayout title="Análise de Produtos e Tipos de Processos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Distribuição por Família de Produtos">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribuicaoProdutos}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="processos"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribuicaoProdutos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => `${value} processos`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {distribuicaoProdutos.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-3 h-3 mr-2" style={{ backgroundColor: PRODUCT_COLORS[index] }}></div>
                  <span>{item.categoria}: {item.processos} processos</span>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>

        <ChartCard title="Tipos de Processos e Valores">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tiposProcessosValores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" tick={false} />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="valor" fill="#0056a9" name="Valor (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <p>• Acordo Dano Material: R$150.000+ (42% do total)</p>
            <p>• Condenação Danos Morais e Materiais: R$200.000+ (33% do total)</p>
            <p>• Condenação Dano Moral: R$80.000+ (15% do total)</p>
            <p>• Outros (custas judiciais, multas): R$35.000+ (10% do total)</p>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InsightsList 
          title="Insights sobre Produtos"
          insights={insightsProdutos}
          className="bg-blue-50"
        />

        <InsightsList 
          title="Insights sobre Processos"
          insights={insightsProcessos}
          className="bg-blue-50"
        />
      </div>
    </DashboardLayout>
  );
};

export default ProductAnalysis;
