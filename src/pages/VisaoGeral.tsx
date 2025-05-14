
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterBar from '@/components/dashboard/FilterBar';
import PainelGeral from '@/components/juridico/PainelGeral';
import PainelConsumidor from '@/components/juridico/PainelConsumidor';
import PainelCivel from '@/components/juridico/PainelCivel';
import PainelTrabalhista from '@/components/juridico/PainelTrabalhista';
import PainelTributario from '@/components/juridico/PainelTributario';
import PainelContratos from '@/components/juridico/PainelContratos';

const VisaoGeral = () => {
  const [filters, setFilters] = useState({
    ano: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    uf: 'Todos',
    status: 'Todos'
  });

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <DashboardLayout title="Visão Geral - Jurídico">
      <FilterBar onFilterChange={handleFilterChange} filters={filters} />
      
      <div className="mt-6">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="consumidor">Consumidor</TabsTrigger>
            <TabsTrigger value="civel">Cível</TabsTrigger>
            <TabsTrigger value="trabalhista">Trabalhista</TabsTrigger>
            <TabsTrigger value="tributario">Tributário</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="animate-fade-in">
            <PainelGeral filters={filters} />
          </TabsContent>
          
          <TabsContent value="consumidor" className="animate-fade-in">
            <PainelConsumidor filters={filters} />
          </TabsContent>
          
          <TabsContent value="civel" className="animate-fade-in">
            <PainelCivel filters={filters} />
          </TabsContent>
          
          <TabsContent value="trabalhista" className="animate-fade-in">
            <PainelTrabalhista filters={filters} />
          </TabsContent>
          
          <TabsContent value="tributario" className="animate-fade-in">
            <PainelTributario filters={filters} />
          </TabsContent>
          
          <TabsContent value="contratos" className="animate-fade-in">
            <PainelContratos filters={filters} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VisaoGeral;
