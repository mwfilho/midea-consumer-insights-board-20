
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  children, 
  className = "",
  contentClassName = "" 
}) => {
  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <CardHeader className="pb-2 border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-sky-500 flex items-center">
          <span className="w-1.5 h-4 bg-sky-500 mr-2 rounded-sm"></span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-4 ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
