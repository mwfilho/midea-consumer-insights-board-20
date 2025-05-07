
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface ProcessData {
  estado: string;
  processos: number;
}

interface ProcessDistributionChartProps {
  data: ProcessData[];
}

const ProcessDistributionChart: React.FC<ProcessDistributionChartProps> = ({ data }) => {
  // Cores mais coesas para os gráficos - tons de azul e cinza
  const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe', '#93c5fd'];
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        className="chart-container"
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
        <XAxis 
          dataKey="estado" 
          angle={-45}
          textAnchor="end"
          height={70}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
        />
        <YAxis 
          tickLine={false}
          axisLine={{ stroke: '#e0e0e0' }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value, name) => [`${value} processos`, 'Quantidade']}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: 'none'
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
        />
        <Bar 
          dataKey="processos" 
          name="Processos" 
          radius={[6, 6, 0, 0]}
          animationDuration={1500}
        >
          {data.map((entry, index) => (
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
    </ResponsiveContainer>
  );
};

export default ProcessDistributionChart;
