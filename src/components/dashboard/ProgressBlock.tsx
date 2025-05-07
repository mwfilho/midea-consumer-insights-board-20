
import React from 'react';

interface ProgressBlockProps {
  value: number;
  maxValue: number;
  label: string;
  color: string;
  className?: string;
}

const ProgressBlock: React.FC<ProgressBlockProps> = ({ 
  value, 
  maxValue, 
  label, 
  color,
  className = "" 
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBlock;
