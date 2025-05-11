
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { UserInfo } from "@/types/user";

export const useProfileForm = (userData: UserInfo, onImagePreviewChange: (preview: string | null) => void) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    foto: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Inicializar formData con los datos del usuario cuando se cargan
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        email: userData.email || "",
        telefono: userData.telefono || "",
        foto: userData.foto || "",
      }));
      
      // Si hay una foto, actualizar la vista previa
      if (userData.foto) {
        onImagePreviewChange(userData.foto);
      }
    }
  }, [userData, onImagePreviewChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 1024 * 1024) {
        toast({
          title: "Error",
          description: "La imagen es demasiado grande. El tamaño máximo es 1MB.",
          variant: "destructive"
        });
        return;
      }
      
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
        
        setFormData(prev => ({ ...prev, foto: base64 }));
        onImagePreviewChange(base64);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        toast({
          title: "Error",
          description: "No se pudo procesar la imagen",
          variant: "destructive"
        });
      }
    }
  };

  const handleSaveProfile = async () => {
    const identificacion = localStorage.getItem('identificacion');
    if (!identificacion) {
      toast({
        title: "Error",
        description: "No se pudo identificar al usuario",
        variant: "destructive"
      });
      return;
    }

    try {
      // First update user info without the photo
      const response = await fetch(`http://localhost:8080/usuarios/actualizar/${identificacion}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar el usuario');
      
      // Handle photo upload separately to avoid 431 error
      if (formData.foto && formData.foto !== userData.foto) {
        let base64Data = formData.foto;
        
        // Extract only the base64 part without the prefix to reduce header size
        if (base64Data.includes(',')) {
          base64Data = base64Data.split(',')[1];
        }
        
        const photoResponse = await fetch(`http://localhost:8080/usuarios/foto/${identificacion}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ foto: base64Data }),
        });

        if (!photoResponse.ok) {
          toast({
            title: "Advertencia",
            description: "Tus datos se actualizaron pero hubo un problema con la foto",
            variant: "destructive"
          });
          return;
        }
      }

      setIsEditing(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados exitosamente",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la información del usuario",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    const identificacion = localStorage.getItem('identificacion');
    if (!identificacion) {
      toast({
        title: "Error",
        description: "No se pudo identificar al usuario",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/usuarios/cambiar-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identificacion,
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Éxito",
          description: data.mensaje || "Tu contraseña ha sido actualizada exitosamente",
        });
        
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast({
          title: "Error",
          description: data.mensaje || "Error al cambiar la contraseña",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al cambiar la contraseña",
        variant: "destructive",
      });
    }
  };

  return {
    isEditing,
    formData,
    setIsEditing,
    handleInputChange,
    handleImageChange,
    handleSaveProfile,
    handleChangePassword,
  };
};
