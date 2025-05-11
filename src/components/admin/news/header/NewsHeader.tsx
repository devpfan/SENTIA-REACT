
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NewsHeaderProps {
  onCreateNews: () => void;
}

export function NewsHeader({ onCreateNews }: NewsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Gestión de Noticias</h2>
      <Button onClick={onCreateNews} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nueva Noticia
      </Button>
    </div>
  );
}
