
import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

interface StatusData {
  name: string;
  value: number;
}

interface StatusPieChartProps {
  data: StatusData[];
}

const StatusPieChart: React.FC<StatusPieChartProps> = ({ data }) => {
  // Paleta de tons de azul
  const COLORS_STATUS = ['#3b82f6', '#2563eb', '#1d4ed8'];
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine
            outerRadius={120}
            innerRadius={60}
            fill="#3b82f6"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS_STATUS[index % COLORS_STATUS.length]}
                style={{
                  filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.15))'
                }}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 'none'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
