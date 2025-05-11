
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { toast } = useToast();
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAuthenticated) {
    toast({
      title: "Acceso denegado",
      description: "Debes iniciar sesión para acceder a esta página",
      variant: "destructive",
    });
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    toast({
      title: "Acceso denegado",
      description: "No tienes permisos para acceder a la zona de administración",
      variant: "destructive",
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
