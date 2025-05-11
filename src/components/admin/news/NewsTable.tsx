
import { NewsItem, getNewsTypeName } from "@/types/news";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { newsService } from "@/services/newsService";
import { useQueryClient } from "@tanstack/react-query";

interface NewsTableProps {
  news: NewsItem[];
  onEdit: (news: NewsItem) => void;
  onDelete: (id: number) => void;
}

export function NewsTable({ news, onEdit, onDelete }: NewsTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handlePublishToggle = async (newsItem: NewsItem) => {
    try {
      await newsService.updateNews({
        ...newsItem,
        publicada: !newsItem.publicada,
        imagenBase64: newsItem.imagenBase64 || null,
        fechaEscritura: newsItem.fechaEscritura,
        fechaPublicacion: newsItem.fechaPublicacion
      });
      
      queryClient.invalidateQueries({ queryKey: ["news"] });
      
      toast({
        title: "Éxito",
        description: `Noticia ${!newsItem.publicada ? "publicada" : "despublicada"} correctamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la noticia",
        variant: "destructive",
      });
    }
  };

  const formatImageSrc = (base64String?: string | null) => {
    if (!base64String) return null;
    return base64String.startsWith('data:') 
      ? base64String 
      : `data:image/jpeg;base64,${base64String}`;
  };

  if (news.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No hay noticias para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Fecha de Publicación</TableHead>
            <TableHead>Publicada</TableHead>
            <TableHead className="w-[100px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.titulo}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getNewsTypeName(item.tipo)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    {item.autorFotoBase64 ? (
                      <AvatarImage src={formatImageSrc(item.autorFotoBase64)} alt={item.autorNombre || 'Author'} />
                    ) : (
                      <AvatarFallback>{item.autorNombre?.[0] || 'A'}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>
                    {item.autorNombre ? 
                      `${item.autorNombre} ${item.autorApellido || ''}` : 
                      "Anónimo"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {item.fechaPublicacion ? 
                  format(new Date(item.fechaPublicacion), 'dd/MM/yyyy HH:mm') : 
                  "Sin fecha"}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Switch 
                    checked={item.publicada} 
                    onCheckedChange={() => handlePublishToggle(item)}
                    aria-label={`${item.publicada ? 'Despublicar' : 'Publicar'} noticia`}
                  />
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.publicada ? 'Publicada' : 'Borrador'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará la noticia "{item.titulo}" de forma permanente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => onDelete(item.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
