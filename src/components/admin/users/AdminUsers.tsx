
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { UserSearchBar } from "./UserSearchBar";
import { UserTable } from "./UserTable";
import { userService } from "@/services/userService";
import type { UserData } from "@/types/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function AdminUsers() {
  const [userFilter, setUserFilter] = useState("all");
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // Usamos react-query para obtener los datos del backend
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
    staleTime: 120000, // 2 minutos
    gcTime: 300000, // 5 minutos
  });

  // Filtrado de usuarios
  const filteredUsers = users.filter((user: UserData) => {
    const matchesFilter =
      userFilter === "all" ||
      user.status === userFilter ||
      (userFilter === "admin" && user.role === "Admin");
    const matchesSearch =
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <UserSearchBar
        filter={userFilter}
        searchQuery={userSearchQuery}
        onFilterChange={setUserFilter}
        onSearchChange={setUserSearchQuery}
      />
      <Card>
        <CardContent className="p-0">
          {isLoading && (
            <div className="p-8 text-center text-muted-foreground">Cargando usuarios...</div>
          )}
          {isError && (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ocurrió un error al cargar los usuarios. 
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={() => refetch()}
                >Reintentar</button>
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !isError && (
            <UserTable
              users={filteredUsers}
              filter={userFilter}
              searchQuery={userSearchQuery}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
