
import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TRIBUNAIS } from '@/data/tribunaisData';

interface SearchFormProps {
  numeroProcesso: string;
  documento: string;
  tribunal: string;
  isLoading: boolean;
  setNumeroProcesso: (value: string) => void;
  setDocumento: (value: string) => void;
  setTribunal: (value: string) => void;
  handleSearch: (e: React.FormEvent) => Promise<void>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  numeroProcesso,
  documento,
  tribunal,
  isLoading,
  setNumeroProcesso,
  setDocumento,
  setTribunal,
  handleSearch
}) => {
  return (
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
  );
};

export default SearchForm;
