
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identificacion, setIdentificacion] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identificacion,
          password,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Error de autenticación. Por favor, verifica tus credenciales.");
      }
      
      const data = await response.json();
      
      // Store authentication state, identification, and userId in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", data.rol === "ADMIN" ? "true" : "false");
      localStorage.setItem("identificacion", identificacion);
      localStorage.setItem("userId", data.id.toString()); // Store the user ID
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido de nuevo a SENTIA${data.rol === "ADMIN" ? " como Administrador" : ""}`
      });
      
      navigate(data.rol === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
      toast({
        title: "Error de inicio de sesión",
        description: err instanceof Error ? err.message : "Error al iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="identificacion">Identificación</Label>
              <Input 
                id="identificacion" 
                type="text" 
                placeholder="Ingresa tu identificación" 
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button type="button" variant="link" className="p-0 h-auto text-xs text-primary">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
