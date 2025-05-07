
import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  Marker
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/dashboard/ChartCard';
import DataTable from '@/components/dashboard/DataTable';
import InsightsList from '@/components/dashboard/InsightsList';
import { processosPorEstado } from '@/data/dashboardData';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Cell } from 'recharts';

// Brazil GeoJSON path
const BRAZIL_GEO_URL = "/lovable-uploads/brazil-estados.json";

// Map state codes to full names for tooltip display
const stateCodeToFullName: Record<string, string> = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AM": "Amazonas",
  "AP": "Amapá",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MG": "Minas Gerais",
  "MS": "Mato Grosso do Sul",
  "MT": "Mato Grosso",
  "PA": "Pará",
  "PB": "Paraíba",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "PR": "Paraná",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RO": "Rondônia",
  "RR": "Roraima",
  "RS": "Rio Grande do Sul",
  "SC": "Santa Catarina",
  "SE": "Sergipe",
  "SP": "São Paulo",
  "TO": "Tocantins"
};

// Convert our data format to a map for easy lookup
const getProcessosByState = () => {
  const stateMap: Record<string, number> = {};
  
  processosPorEstado.forEach(item => {
    const match = item.estado.match(/\(([A-Z]{2})\)/);
    if (match && match[1]) {
      stateMap[match[1]] = item.processos;
    }
  });
  
  return stateMap;
};

// Map for color intensity based on number of processes
const getStateColor = (stateCode: string, processosMap: Record<string, number>) => {
  const processos = processosMap[stateCode] || 0;
  
  if (processos === 0) return "#F1F0FB"; // Very light color for states with no data
  if (processos < 10) return "#D3E4FD";
  if (processos < 20) return "#9F9EA1";
  if (processos < 30) return "#6E59A5";
  if (processos < 40) return "#403E43";
  return "#1A1F2C"; // Darkest color for states with most processes
};

const GeographicAnalysis = () => {
  const processosMap = getProcessosByState();
  
  const columns = [
    { key: 'estado', header: 'Estado' },
    { key: 'processos', header: 'Processos', className: 'text-center' },
    { 
      key: 'percentual', 
      header: 'Percentual', 
      className: 'text-center',
      render: (value, row) => (
        <div>
          <span>{value}</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="h-2.5 rounded-full bg-midea-blue"
              style={{ width: value }}
            ></div>
          </div>
        </div>
      )
    },
  ];

  // Convert data for bar chart
  const barChartData = processosPorEstado
    .filter(item => item.estado !== "Outros estados")
    .map(item => ({
      estado: item.estado.replace(/\s*\([A-Z]{2}\)/, ''),
      processos: item.processos
    }));

  const insights = [
    {
      text: 'Maior concentração nas regiões Sudeste e Nordeste',
      icon: '📊'
    },
    {
      text: 'São Paulo, Bahia e Rio de Janeiro representam 57% dos casos',
      icon: '📍'
    },
    {
      text: 'Crescimento de 12% nos processos em MG vs. trimestre anterior',
      icon: '📈'
    }
  ];

  return (
    <DashboardLayout title="Distribuição Geográfica dos Processos">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Mapa de Processos por Estado" 
          className="h-full"
          contentClassName="flex items-center justify-center"
        >
          <div className="relative w-full">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 750,
                center: [-55, -15]
              }}
              style={{ width: "100%", height: "400px" }}
            >
              <Geographies geography={BRAZIL_GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const stateCode = geo.properties.sigla;
                    const stateName = stateCodeToFullName[stateCode] || stateCode;
                    const processos = processosMap[stateCode] || 0;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="state-tooltip"
                        data-tooltip-content={`${stateName}: ${processos} processos`}
                        style={{
                          default: {
                            fill: getStateColor(stateCode, processosMap),
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#1EAEDB",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            <Tooltip id="state-tooltip" />
          </div>
        </ChartCard>

        <DataTable 
          title="Processos por Estado"
          columns={columns}
          data={processosPorEstado}
          className="h-full"
        />
      </div>

      <ChartCard title="Distribuição de Processos por Estado (Top 6)" className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="estado" 
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <RechartsTooltip 
              formatter={(value, name) => [`${value} processos`, 'Quantidade']}
            />
            <Bar dataKey="processos" name="Processos" fill="#6E59A5">
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#6E59A5" : "#9b87f5"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <InsightsList 
        title="Insights"
        insights={insights}
      />
    </DashboardLayout>
  );
};

export default GeographicAnalysis;
