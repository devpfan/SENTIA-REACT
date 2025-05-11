
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface NewsImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (base64: string | null) => void;
}

export function NewsImageUploader({ imagePreview, onImageChange }: NewsImageUploaderProps) {
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen no puede ser mayor a 1MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      onImageChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Imagen (opcional, máx 1MB)</Label>
      <div className="flex items-center gap-2">
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={removeImage}
          >
            Quitar
          </Button>
        )}
      </div>
      
      {imagePreview && (
        <div className="mt-2 border rounded-md overflow-hidden">
          <img
            src={imagePreview}
            alt="Vista previa"
            className="max-h-[200px] w-auto mx-auto object-contain"
          />
        </div>
      )}
    </div>
  );
}
