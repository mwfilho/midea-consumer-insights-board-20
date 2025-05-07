
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  description,
  className = ""
}) => {
  return (
    <Card className={`shadow-md h-full ${className}`}>
      <CardHeader className="pb-2 pt-4 text-center">
        {icon && <div className="flex justify-center mb-2">{icon}</div>}
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-3xl font-bold text-midea-blue">{value}</p>
        {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
