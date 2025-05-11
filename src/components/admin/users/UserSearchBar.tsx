
import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateUserModal } from "./CreateUserModal";

interface UserSearchBarProps {
  filter: string;
  searchQuery: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function UserSearchBar({ filter, searchQuery, onFilterChange, onSearchChange }: UserSearchBarProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Select value={filter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar usuarios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full md:w-64 flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar usuario..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <Button 
          className="w-full md:w-auto flex items-center gap-1"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          <span>Nuevo usuario</span>
        </Button>
      </div>

      <CreateUserModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
}
