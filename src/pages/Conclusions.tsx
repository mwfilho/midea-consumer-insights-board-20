
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  pontosAtencao, 
  oportunidadesMelhoria, 
  proximosPassos 
} from '@/data/dashboardData';

const Conclusions = () => {
  const cardStyles = {
    warning: "border-l-4 border-red-500",
    opportunity: "border-l-4 border-green-500",
    next: "border-l-4 border-blue-500"
  };

  const estrategiaReducao = [
    { fase: "Identificação\nProblemas", cor: "bg-blue-200" },
    { fase: "Ações\nPreventivas", cor: "bg-green-200" },
    { fase: "Resolução\nRápida SAC", cor: "bg-green-200" },
    { fase: "Acordos\nExtrajudiciais", cor: "bg-green-200" },
    { fase: "Redução 30%\nProcessos", cor: "bg-green-500 text-white" },
  ];

  return (
    <DashboardLayout title="Conclusões e Recomendações">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`shadow-md ${cardStyles.warning}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center text-red-500">
              <span className="mr-2 text-2xl">⚠️</span>
              Pontos de Atenção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {pontosAtencao.map((ponto, index) => (
                <li key={index} className="flex">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{ponto.text}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className={`shadow-md ${cardStyles.opportunity}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center text-green-600">
              <span className="mr-2 text-2xl">✅</span>
              Oportunidades de Melhoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {oportunidadesMelhoria.map((oportunidade, index) => (
                <li key={index} className="flex">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{oportunidade.text}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className={`shadow-md ${cardStyles.next}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center text-blue-600">
              <span className="mr-2 text-2xl">🔄</span>
              Próximos Passos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {proximosPassos.map((passo, index) => (
                <li key={index} className="flex">
                  <span className="bg-midea-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{passo.text}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-midea-blue">
            Estratégia de Redução de Processos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-2">
            {estrategiaReducao.map((fase, index) => (
              <React.Fragment key={index}>
                <div className={`${fase.cor} p-3 rounded text-center flex items-center justify-center whitespace-pre-line`}>
                  {fase.fase}
                </div>
                {index < estrategiaReducao.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center mb-8">
        <div className="flex items-center justify-center">
          <input type="checkbox" className="mr-2" />
          <h3 className="text-lg font-bold text-midea-blue">
            Meta: Redução de 30% nos custos totais do contencioso consumidor até o final de 2025
          </h3>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Conclusions;
