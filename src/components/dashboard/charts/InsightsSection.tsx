
import React from 'react';

interface InsightsSectionProps {
  insights: Array<string>;
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-sky-500 mb-4">Insights</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul className="list-disc pl-5 space-y-2">
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsSection;
