
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

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

// Map for color intensity based on number of processes
const getStateColor = (stateCode: string, processosMap: Record<string, number>) => {
  const processos = processosMap[stateCode] || 0;
  
  if (processos === 0) return "#F1F0FB"; // Very light color for states with no data
  if (processos < 10) return "#D3E4FD";
  if (processos < 20) return "#93C5FD"; // blue-300
  if (processos < 30) return "#60A5FA"; // blue-400
  if (processos < 40) return "#3B82F6"; // blue-500
  return "#2563EB"; // blue-600 - Darkest color for states with most processes
};

interface BrazilMapProps {
  processosMap: Record<string, number>;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ processosMap }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  
  return (
    <div className="relative w-full" style={{ height: '500px', maxHeight: '100vh' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 750,
          center: [-55, -15]
        }}
        style={{ width: "100%", height: "100%" }}
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
                  onMouseEnter={() => {
                    setTooltipContent(`${stateName}: ${processos} processos`);
                  }}
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
                    pressed: {
                      fill: "#3182CE",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id="state-tooltip" />
      
      {/* Map legend */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
        <div className="font-bold mb-1">Processos por Estado</div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#F1F0FB]"></div>
          <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#D3E4FD]"></div>
          <span>1-9</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#93C5FD]"></div>
          <span>10-19</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#60A5FA]"></div>
          <span>20-29</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#3B82F6]"></div>
          <span>30-39</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#2563EB]"></div>
          <span>40+</span>
        </div>
      </div>
    </div>
  );
};

export default BrazilMap;
