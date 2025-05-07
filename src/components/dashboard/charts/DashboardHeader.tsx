
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-sky-500 mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;
