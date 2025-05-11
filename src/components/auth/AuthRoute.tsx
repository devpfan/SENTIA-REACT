
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { toast } = useToast();
  
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    toast({
      title: "Acceso denegado",
      description: "Debes iniciar sesión para acceder a esta página",
      variant: "destructive",
    });
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
