
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightsListProps {
  title: string;
  insights: {
    icon?: string;
    text: string;
    color?: string;
  }[];
  className?: string;
}

const InsightsList: React.FC<InsightsListProps> = ({ 
  title, 
  insights,
  className = "" 
}) => {
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-midea-blue">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              {insight.icon && (
                <span className={`insight-icon ${insight.color || 'text-midea-blue'}`}>
                  {insight.icon}
                </span>
              )}
              <span className="text-gray-700">{insight.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default InsightsList;
