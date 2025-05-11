
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { NewsCreateRequest, NewsItem, NewsUpdateRequest } from "@/types/news";
import { newsService } from "@/services/newsService";
import { NewsFormData } from "./types";

interface UseNewsFormProps {
  initialData: NewsItem | null;
  onSave: () => void;
  onClose: () => void;
}

export function useNewsForm({ initialData, onSave, onClose }: UseNewsFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<NewsFormData>({
    titulo: "",
    contenido: "",
    tipo: "0",
    imagenBase64: null,
    publicada: true,
    fechaPublicacion: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo,
        contenido: initialData.contenido,
        tipo: initialData.tipo.toString(),
        imagenBase64: initialData.imagenBase64 || null,
        publicada: initialData.publicada,
        fechaPublicacion: initialData.fechaPublicacion 
          ? format(new Date(initialData.fechaPublicacion), "yyyy-MM-dd'T'HH:mm")
          : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      });
      
      if (initialData.imagenBase64) {
        setImagePreview(
          initialData.imagenBase64.startsWith('data:') 
            ? initialData.imagenBase64 
            : `data:image/jpeg;base64,${initialData.imagenBase64}`
        );
      } else {
        setImagePreview(null);
      }
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setFormData({
      titulo: "",
      contenido: "",
      tipo: "0",
      imagenBase64: null,
      publicada: true,
      fechaPublicacion: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    });
    setImagePreview(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      publicada: checked,
    }));
  };

  const handleImageChange = (base64String: string | null) => {
    setImagePreview(base64String);
    setFormData((prev) => ({
      ...prev,
      imagenBase64: base64String,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.contenido) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        throw new Error("No se encontró el ID del usuario");
      }
      
      // Formatear la fecha con el formato deseado sin el sufijo Z
      const formattedDate = format(new Date(formData.fechaPublicacion), "yyyy-MM-dd'T'HH:mm:ss");
      
      const newsData: NewsCreateRequest = {
        titulo: formData.titulo,
        contenido: formData.contenido,
        tipo: parseInt(formData.tipo),
        imagenBase64: formData.imagenBase64 ? 
          formData.imagenBase64.split(',')[1] : null, // Extract base64 data without prefix
        autorId: parseInt(userId),
        fechaEscritura: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        fechaPublicacion: formattedDate,
        publicada: formData.publicada,
      };

      if (initialData) {
        await newsService.updateNews({
          ...newsData,
          id: initialData.id,
        });
        toast({
          title: "Éxito",
          description: "Noticia actualizada correctamente",
        });
      } else {
        await newsService.createNews(newsData);
        toast({
          title: "Éxito",
          description: "Noticia creada correctamente",
        });
      }
      
      onSave();
    } catch (error) {
      console.error("Error saving news:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar la noticia",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    imagePreview,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleImageChange,
    handleSubmit
  };
}
