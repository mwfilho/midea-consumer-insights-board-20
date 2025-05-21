
import React, { useState } from 'react';
import { Search, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { TRIBUNAIS } from '@/data/tribunaisData';
import { Processo, CNJApiResponse } from '@/types/cnj';
import ProcessoDetail from './ProcessoDetail';
import ProcessosList from './ProcessosList';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="numeroProcesso" className="text-sm font-medium">
                  Número do Processo
                </label>
                <Input
                  id="numeroProcesso"
                  placeholder="Ex: 00012345620215010000"
                  value={numeroProcesso}
                  onChange={(e) => setNumeroProcesso(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="documento" className="text-sm font-medium">
                  CPF/CNPJ
                </label>
                <Input
                  id="documento"
                  placeholder="Somente números"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tribunal" className="text-sm font-medium">
                Tribunal
              </label>
              <Select value={tribunal} onValueChange={setTribunal} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tribunal" />
                </SelectTrigger>
                <SelectContent>
                  {TRIBUNAIS.map((trib, index) => (
                    <SelectItem key={index} value={trib.alias}>
                      {trib.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {erro && (
        <Alert variant="destructive" className="bg-red-50 border-red-300">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro na consulta</AlertTitle>
          <AlertDescription>
            {erro}
            <div className="mt-2 text-sm">
              Nota: A API pública do CNJ tem restrições de CORS que impedem o acesso direto via navegador. 
              Em um ambiente de produção, essas chamadas devem ser feitas através de um servidor backend.
            </div>
          </AlertDescription>
        </Alert>
      )}

      {resultados.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {resultados.length} Processo{resultados.length > 1 ? 's' : ''} Encontrado{resultados.length > 1 ? 's' : ''}
          </h3>
          
          {resultados.length === 1 ? (
            <ProcessoDetail processo={resultados[0]} />
          ) : (
            <ProcessosList processos={resultados} />
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultasProcessuais;
