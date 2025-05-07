
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2,
  Globe,
  Package,
  DollarSign,
  Map,
  CheckSquare,
} from 'lucide-react';

const DashboardNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      label: 'Resumo Executivo',
      icon: <BarChart2 className="w-5 h-5 mr-2" />,
    },
    {
      path: '/geografia',
      label: 'Distribuição Geográfica',
      icon: <Globe className="w-5 h-5 mr-2" />,
    },
    {
      path: '/produtos',
      label: 'Análise de Produtos',
      icon: <Package className="w-5 h-5 mr-2" />,
    },
    {
      path: '/financeiro',
      label: 'Análise Financeira',
      icon: <DollarSign className="w-5 h-5 mr-2" />,
    },
    {
      path: '/regional',
      label: 'Análise Regional',
      icon: <Map className="w-5 h-5 mr-2" />,
    },
    {
      path: '/conclusoes',
      label: 'Conclusões',
      icon: <CheckSquare className="w-5 h-5 mr-2" />,
    }
  ];

  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isActive(item.path)
              ? 'bg-sky-500 text-white shadow-md'
              : 'bg-white hover:bg-sky-50'
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNav;
