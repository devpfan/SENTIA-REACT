
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NewsFilterAndSearchProps {
  tab: string;
  onTabChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function NewsFilterAndSearch({ 
  tab, 
  onTabChange, 
  searchQuery, 
  onSearchChange 
}: NewsFilterAndSearchProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <Tabs value={tab} onValueChange={onTabChange} className="w-full md:w-auto">
        <TabsList className="w-full md:w-auto overflow-x-auto">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="0">General</TabsTrigger>
          <TabsTrigger value="1">Anuncios</TabsTrigger>
          <TabsTrigger value="2">Clima</TabsTrigger>
          <TabsTrigger value="3">Eventos</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          className="pl-9"
          placeholder="Buscar noticias..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
