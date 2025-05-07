
import React, { ReactNode } from 'react';
import { Calendar } from 'lucide-react';
import DashboardNav from './DashboardNav';
interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  currentDate?: string;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  currentDate = "Abril/2025"
}) => {
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="midea-gradient p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-white">Dashboard Contencioso Consumidor</h1>
        <img alt="Midea Logo" className="h-10" src="/lovable-uploads/3431dd02-612a-43ec-9330-7bb548873d8d.png" />
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-midea-blue">{title}</h2>
          <div className="flex items-center text-gray-500">
            <Calendar className="mr-2 h-5 w-5 text-midea-blue" />
            <span>{currentDate}</span>
          </div>
        </div>

        <DashboardNav />

        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="midea-bg-blue p-3 text-center text-white text-sm shadow-inner">
        Dashboard Contencioso Consumidor - Midea © {new Date().getFullYear()}
      </footer>
    </div>;
};
export default DashboardLayout;
