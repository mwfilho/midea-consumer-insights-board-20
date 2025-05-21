
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Processo, CNJApiResponse } from '@/types/cnj';
import SearchForm from './SearchForm';
import ErrorDisplay from './ErrorDisplay';
import ResultsDisplay from './ResultsDisplay';

// URL base para o proxy API (em produção, substituir pela URL real do proxy)
const API_PROXY_URL = "https://api-proxy.example.com/cnj-proxy";

const ConsultasProcessuais = () => {
  const [numeroProcesso, setNumeroProcesso] = useState('');
  const [documento, setDocumento] = useState('');
  const [tribunal, setTribunal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultados, setResultados] = useState<Processo[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tribunal) {
      toast({
        title: "Tribunal não selecionado",
        description: "Por favor, selecione um tribunal para realizar a busca.",
        variant: "destructive"
      });
      return;
    }
    
    if (!numeroProcesso && !documento) {
      toast({
        title: "Dados incompletos",
        description: "Informe o número do processo ou CPF/CNPJ para buscar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResultados([]);
    setErro(null);

    try {
      const numeroLimpo = numeroProcesso.replace(/\D/g, '');
      const docLimpo = documento.replace(/\D/g, '');
      
      // Enquanto não temos o proxy real implementado, continuaremos a chamar a API diretamente
      // Em produção, substitua este bloco pelo código que chama o proxy
      // Criamos o payload da busca
      const payload = {
        tribunal,
        numeroProcesso: numeroLimpo || undefined,
        documento: docLimpo || undefined,
      };

      console.log("Realizando consulta com os parâmetros:", payload);
      
      // Simulação de um proxy API
      // Em um ambiente de produção, isto seria substituído por:
      // const response = await fetch(API_PROXY_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      
      // NOTA: Como explicado, esta chamada direta continuará falhando devido ao CORS
      // Estamos mantendo este código apenas para demonstração
      // Um proxy serverless real seria necessário para resolver definitivamente o problema
      
      // Para efeitos de demonstração, manteremos a chamada direta à API
      let query: any = {};
      
      if (numeroLimpo) {
        query = {
          match: { numeroProcesso: numeroLimpo }
        };
      } else if (docLimpo) {
        query = {
          match: { "partes.numeroDocumento": docLimpo }
        };
      }

      const apiPayload = {
        size: 100,
        query: query
      };

      // Construção correta da URL da API
      const url = `https://api-publica.datajud.cnj.jus.br/${tribunal}/_search`;
      
      console.log("Buscando processo no endpoint:", url);
      console.log("Payload:", JSON.stringify(apiPayload));
      
      // Na implementação real, esta chamada seria substituída pela chamada ao proxy
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==`, // Chave apenas para demonstração
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        const statusText = await response.text();
        throw new Error(`Erro na requisição: ${response.status} - ${statusText}`);
      }

      const data = await response.json() as CNJApiResponse;
      const hits = data.hits?.hits || [];
      
      if (hits.length === 0) {
        toast({
          title: "Nenhum resultado",
          description: "Não foram encontrados processos com os critérios informados.",
          variant: "default"
        });
        return;
      }

      const processos = hits.map(item => {
        const processo = item._source;
        
        // Organiza as movimentações em ordem cronológica
        if (processo.movimentos) {
          processo.movimentos.sort((a, b) => 
            new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
          );
        }
        
        return processo;
      });

      setResultados(processos);
      
      toast({
        title: "Busca realizada",
        description: `${processos.length} processo(s) encontrado(s).`,
        variant: "default"
      });

    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      setErro(error instanceof Error ? error.message : "Ocorreu um erro ao consultar a API do CNJ.");
      
      // Adicionar informação sobre CORS para ajudar na depuração
      if (error instanceof Error && error.message.includes("NetworkError") || error.message.includes("Failed to fetch") || error.message.includes("CORS")) {
        setErro(`Erro de CORS ao acessar a API. É necessário implementar um proxy serverless para contornar esta limitação. 
                Detalhes: ${error.message}`);
      }
      
      toast({
        title: "Erro na consulta",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao consultar a API do CNJ.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <SearchForm
            numeroProcesso={numeroProcesso}
            documento={documento}
            tribunal={tribunal}
            isLoading={isLoading}
            setNumeroProcesso={setNumeroProcesso}
            setDocumento={setDocumento}
            setTribunal={setTribunal}
            handleSearch={handleSearch}
          />
        </CardContent>
      </Card>

      <ErrorDisplay erro={erro} />
      <ResultsDisplay resultados={resultados} />
    </div>
  );
};

export default ConsultasProcessuais;
