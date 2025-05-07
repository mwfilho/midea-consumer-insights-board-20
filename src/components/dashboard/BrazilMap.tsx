
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
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
  if (processos < 20) return "#9F9EA1";
  if (processos < 30) return "#6E59A5";
  if (processos < 40) return "#403E43";
  return "#1A1F2C"; // Darkest color for states with most processes
};

interface BrazilMapProps {
  processosMap: Record<string, number>;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ processosMap }) => {
  return (
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
  );
};

export default BrazilMap;
