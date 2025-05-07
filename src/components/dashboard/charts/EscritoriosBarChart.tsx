
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface EscritorioData {
  escritorio: string;
  processos: number;
}

interface EscritoriosBarChartProps {
  data: EscritorioData[];
  config: any;
}

const EscritoriosBarChart: React.FC<EscritoriosBarChartProps> = ({ data, config }) => {
  // Tons de azul (blue-500 a blue-900)
  const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'];

  return (
    <div className="h-[300px]">
      <ChartContainer 
        config={config}
        className="w-full h-full"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis 
            dataKey="escritorio" 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey="processos" 
            name="Processos" 
            radius={[6, 6, 0, 0]} 
            fill="#3b82f6"
            animationBegin={0}
            animationDuration={1500}
            className="hover:opacity-80"
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
      </ChartContainer>
    </div>
  );
};

export default EscritoriosBarChart;
