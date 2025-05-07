
import React from 'react';
import { BarChart as BarChartIcon, Calendar, LayoutDashboard, Gavel } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const MainIndicators: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total de Processos"
        value="200+"
        icon={<Gavel size={32} className="text-sky-500" />}
        description="Processos ativos e encerrados"
      />
      <StatCard 
        title="Total de Pagamentos"
        value="R$ 350mil+"
        icon={<BarChartIcon size={32} className="text-sky-500" />}
        description="Acordos e condenações"
      />
      <StatCard 
        title="Média Danos Morais"
        value="R$ 3.000"
        icon={<LayoutDashboard size={32} className="text-sky-500" />}
        description="Valor por processo"
      />
      <StatCard 
        title="Média Danos Materiais"
        value="R$ 4.000"
        icon={<Calendar size={32} className="text-sky-500" />}
        description="Valor por processo"
      />
    </div>
  );
};

export default MainIndicators;
