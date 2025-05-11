
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { NewsFormData } from "./types";
import { NEWS_TYPES } from "@/types/news";
import { NewsImageUploader } from "./NewsImageUploader";

interface NewsFormFieldsProps {
  formData: NewsFormData;
  imagePreview: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleImageChange: (base64: string | null) => void;
}

export function NewsFormFields({
  formData,
  imagePreview,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
  handleImageChange
}: NewsFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo</Label>
        <Select 
          value={formData.tipo}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            {NEWS_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value.toString()}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contenido">Contenido</Label>
        <Textarea
          id="contenido"
          name="contenido"
          value={formData.contenido}
          onChange={handleInputChange}
          rows={8}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fechaPublicacion">Fecha de Publicación</Label>
        <Input
          id="fechaPublicacion"
          name="fechaPublicacion"
          type="datetime-local"
          value={formData.fechaPublicacion}
          onChange={handleInputChange}
        />
      </div>

      <NewsImageUploader 
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
      />

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="publicada" 
          checked={formData.publicada}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="publicada">Publicar noticia</Label>
      </div>
    </>
  );
}
