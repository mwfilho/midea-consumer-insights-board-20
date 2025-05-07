
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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="estado" 
          angle={-45}
          textAnchor="end"
          height={70}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [`${value} processos`, 'Quantidade']}
        />
        <Bar dataKey="processos" name="Processos" fill="#6E59A5">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6E59A5" : "#9b87f5"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProcessDistributionChart;
