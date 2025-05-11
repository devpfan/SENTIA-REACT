
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getUserPoints } from "@/services/rewardService";
import { useQuery } from "@tanstack/react-query";

export const useHeaderState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
  
  // Get user points using query
  const { data: points = 0 } = useQuery({
    queryKey: ['userPoints'],
    queryFn: getUserPoints,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const fetchUserPhoto = async () => {
      const identificacion = localStorage.getItem('identificacion');
      if (!identificacion) return;

      try {
        const response = await fetch(`http://localhost:8080/usuarios/info/${identificacion}`);
        if (!response.ok) return;
        
        const userData = await response.json();
        
        if (userData && userData.id) {
          try {
            const photoResponse = await fetch(`http://localhost:8080/usuarios/foto/${userData.id}`);
            if (photoResponse.ok) {
              const photoData = await photoResponse.text();
              
              let photoUrl = '';
              
              try {
                // Check if the response is a JSON object
                const jsonData = JSON.parse(photoData);
                if (jsonData && typeof jsonData.foto === 'string') {
                  // Extract just the base64 data from the JSON
                  photoUrl = `data:image/jpeg;base64,${jsonData.foto}`;
                }
              } catch (e) {
                // Not JSON, assume it's already base64 data
                if (photoData.startsWith('data:image')) {
                  photoUrl = photoData;
                } else {
                  // Just add the prefix if it's only the base64 content
                  photoUrl = `data:image/jpeg;base64,${photoData}`;
                }
              }
              
              if (photoUrl) {
                setUserPhoto(photoUrl);
              }
            }
          } catch (error) {
            console.error('Error al cargar la foto específica del usuario:', error);
          }
        }
      } catch (error) {
        console.error('Error al cargar la información del usuario:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserPhoto();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    localStorage.setItem("isAdmin", isAdmin.toString());
  }, [isAuthenticated, isAdmin]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("points");
    localStorage.removeItem("identificacion");
    
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
    
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    toast({
      title: isAdmin ? "Rol de usuario" : "Rol de administrador",
      description: isAdmin 
        ? "Ahora tienes permisos de usuario" 
        : "Ahora tienes permisos de administrador",
    });
  };

  return {
    isAuthenticated,
    isAdmin,
    points,
    userPhoto,
    isMenuOpen,
    toggleMenu,
    handleLogout,
    toggleAdmin
  };
};
