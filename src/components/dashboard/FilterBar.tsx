
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, FilterIcon } from 'lucide-react';

interface FilterBarProps {
  filters: {
    ano: number;
    mes: number;
    uf: string;
    status: string;
  };
  onFilterChange: (filterName: string, value: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];
  
  const states = [
    'Todos', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
    'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  
  const statusOptions = ['Todos', 'Ativo', 'Encerrado', 'Suspenso'];

  return (
    <Card className="p-4 flex flex-wrap gap-4 items-center bg-gray-50">
      <div className="flex items-center mr-2">
        <FilterIcon className="w-5 h-5 text-sky-500 mr-2" />
        <span className="font-semibold text-gray-700">Filtros:</span>
      </div>
      
      <div className="flex items-center">
        <CalendarIcon className="w-4 h-4 text-sky-500 mr-2" />
        <Select 
          value={filters.ano.toString()} 
          onValueChange={(value) => onFilterChange('ano', parseInt(value))}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select 
          value={filters.mes.toString()} 
          onValueChange={(value) => onFilterChange('mes', parseInt(value))}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select 
          value={filters.uf} 
          onValueChange={(value) => onFilterChange('uf', value)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="UF" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select 
          value={filters.status} 
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <button className="ml-auto bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded flex items-center">
        <span className="mr-2">Exportar PDF</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
        </svg>
      </button>
    </Card>
  );
};

export default FilterBar;
