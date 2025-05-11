
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { UserInfo } from "@/types/user";

export const useProfileData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserInfo>({
    nombre: "",
    apellido: "",
    email: "",
    departamento: "",
    rol: "",
    telefono: "",
    cargo: "",
    foto: "",
    points: 0,
    nextReward: 100,
    streak: 0,
    dateJoined: "",
    badges: []
  });

  const fetchUserInfo = async () => {
    const identificacion = localStorage.getItem('identificacion');
    if (!identificacion) {
      toast({
        title: "Error",
        description: "No se pudo identificar al usuario",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // First fetch user info without the photo
      const response = await fetch(`http://localhost:8080/usuarios/info/${identificacion}`);
      if (!response.ok) throw new Error('Error al obtener información del usuario');
      
      const data = await response.json();
      console.log("Datos del usuario cargados:", data);
      
      // Handle the photo separately to avoid 431 error
      // Store user data without the photo first
      const userDataWithoutPhoto = { 
        ...data, 
        foto: "",
        // Remove streak data
        streak: 0
      };
      setUserData(userDataWithoutPhoto);
      
      // Now fetch the photo separately if it exists
      if (data.id) {
        try {
          const photoResponse = await fetch(`http://localhost:8080/usuarios/foto/${data.id}`);
          if (photoResponse.ok) {
            const photoData = await photoResponse.text();
            
            // Process the photo data properly
            let photoUrl = '';
            
            try {
              // Check if the response is a JSON object (which would be incorrect format)
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
            
            // Update user data with correctly formatted photo URL
            if (photoUrl) {
              console.log("Photo URL format:", photoUrl.substring(0, 50) + "...");
              setUserData(prev => ({ ...prev, foto: photoUrl }));
            }
          }
        } catch (photoError) {
          console.error('Error fetching user photo:', photoError);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del usuario",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return { userData, loading, setUserData, fetchUserInfo };
};
