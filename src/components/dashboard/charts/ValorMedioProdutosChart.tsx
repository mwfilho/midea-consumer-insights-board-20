
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface ProdutoValorData {
  produto: string;
  valor: number;
}

interface ValorMedioProdutosChartProps {
  data: ProdutoValorData[];
}

const ValorMedioProdutosChart: React.FC<ValorMedioProdutosChartProps> = ({ data }) => {
  // Tons de azul (blue-500 a blue-900)
  const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
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
            fill="#3b82f6"
          >
            {data.map((entry, index) => (
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
  );
};

export default ValorMedioProdutosChart;
