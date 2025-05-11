import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { UserCheck, UserX, Shield } from "lucide-react";
import type { UserData } from "@/types/user";

interface UserTableProps {
  users: UserData[];
  filter: string;
  searchQuery: string;
}

export function UserTable({ users, filter, searchQuery }: UserTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [userAvatars, setUserAvatars] = useState<Record<number, string>>({});
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false);

  useEffect(() => {
    const loadAvatars = async () => {
      setIsLoadingAvatars(true);
      
      for (const user of users) {
        if (user.avatarId !== undefined) {
          try {
            const avatar = await userService.getUserAvatar(user.avatarId);
            if (avatar) {
              setUserAvatars(prev => ({ ...prev, [user.id]: avatar }));
            }
          } catch (error) {
            console.error(`Error al cargar avatar para usuario ${user.id}:`, error);
          }
          await new Promise(r => setTimeout(r, 50));
        }
      }
      
      setIsLoadingAvatars(false);
    };
    
    loadAvatars();
  }, [users]);

  const handleActivateUser = async (id: number) => {
    try {
      await userService.reactivateUser(id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuario activado",
        description: "El usuario ha sido activado correctamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al activar usuario",
        description: "Ocurrió un error al intentar activar el usuario",
      });
    }
  };

  const handleDeactivateUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuario desactivado",
        description: "El usuario ha sido desactivado correctamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al desactivar usuario",
        description: "Ocurrió un error al intentar desactivar el usuario",
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.status === filter || 
                         (filter === "admin" && user.role === "Admin");
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Último acceso</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  {userAvatars[user.id] ? (
                    <AvatarImage 
                      src={userAvatars[user.id]} 
                      alt={user.name} 
                      onError={(e) => {
                        console.error("Error loading avatar:", user.id);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.department}</TableCell>
            <TableCell>
              <Badge variant={user.role === "Admin" ? "default" : "outline"} className="flex items-center gap-1 w-fit">
                {user.role === "Admin" && <Shield className="h-3 w-3" />}
                {user.role === "Admin" ? "Administrador" : "Usuario"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === "active" ? "secondary" : "outline"} className="bg-opacity-80">
                {user.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">{user.lastLogin}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {user.status === "active" ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleDeactivateUser(user.id)}
                  >
                    <UserX className="h-4 w-4 text-red-500" />
                    <span className="text-xs">Desactivar</span>
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleActivateUser(user.id)}
                  >
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="text-xs">Activar</span>
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
