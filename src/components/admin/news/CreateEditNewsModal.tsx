
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewsItem } from "@/types/news";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewsFormFields } from "./form/NewsFormFields";
import { useNewsForm } from "./form/useNewsForm";

interface CreateEditNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData: NewsItem | null;
}

export function CreateEditNewsModal({ 
  isOpen, 
  onClose, 
  onSave,
  initialData 
}: CreateEditNewsModalProps) {
  const {
    formData,
    imagePreview,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleImageChange,
    handleSubmit
  } = useNewsForm({ initialData, onSave, onClose });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <ScrollArea className="max-h-[80vh] pr-4">
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Editar Noticia" : "Crear Nueva Noticia"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <NewsFormFields 
              formData={formData}
              imagePreview={imagePreview}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
              handleImageChange={handleImageChange}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading 
                  ? "Guardando..." 
                  : initialData ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
