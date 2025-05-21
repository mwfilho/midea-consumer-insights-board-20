
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Processo, CNJApiResponse } from '@/types/cnj';
import SearchForm from './SearchForm';
import ErrorDisplay from './ErrorDisplay';
import ResultsDisplay from './ResultsDisplay';

// URL base para o proxy API (substituir pela URL real após implantação)
const API_PROXY_URL = "/api/cnj-proxy"; // Usando caminho relativo para o endpoint serverless

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
      
      // Preparamos o payload para o proxy API
      const payload = {
        tribunal,
        numeroProcesso: numeroLimpo || undefined,
        documento: docLimpo || undefined,
      };

      console.log("Enviando consulta para o proxy API:", payload);
      
      // Fazemos a chamada para o proxy API ao invés da API direta do CNJ
      const response = await fetch(API_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta do proxy API:', response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json() as CNJApiResponse;
      const hits = data.hits?.hits || [];
      
      if (hits.length === 0) {
        toast({
          title: "Nenhum resultado",
          description: "Não foram encontrados processos com os critérios informados.",
          variant: "default"
        });
        setResultados([]);
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
      let mensagemErro = error instanceof Error ? error.message : "Ocorreu um erro ao consultar a API do CNJ.";
      
      setErro(mensagemErro);
      
      toast({
        title: "Erro na consulta",
        description: mensagemErro,
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
