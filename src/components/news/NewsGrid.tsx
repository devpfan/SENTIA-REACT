
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronRight } from "lucide-react";
import { NewsItem, getNewsTypeName } from "@/types/news";
import { format } from "date-fns";

interface NewsGridProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
}

export function NewsGrid({ news, onSelectArticle }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No hay noticias para mostrar</h3>
        <p className="text-gray-600">
          No se encontraron noticias que coincidan con tu búsqueda
        </p>
      </div>
    );
  }

  const formatImageSrc = (base64String?: string | null) => {
    if (!base64String) return null;
    return base64String.startsWith('data:') 
      ? base64String 
      : `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((newsItem) => (
        <Card key={newsItem.id} className="overflow-hidden">
          {newsItem.imagenBase64 && (
            <div className="h-48 overflow-hidden">
              <img 
                src={formatImageSrc(newsItem.imagenBase64)}
                alt={newsItem.titulo}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-xs">
                {getNewsTypeName(newsItem.tipo)}
              </Badge>
              <div className="flex items-center text-gray-600 text-sm">
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
                {format(new Date(newsItem.fechaPublicacion), "dd/MM/yyyy")}
              </div>
            </div>
            <CardTitle 
              className="line-clamp-2 hover:text-primary transition-colors cursor-pointer" 
              onClick={() => onSelectArticle(newsItem)}
            >
              {newsItem.titulo}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {newsItem.contenido.substring(0, 120)}...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  {newsItem.autorFotoBase64 ? (
                    <AvatarImage src={formatImageSrc(newsItem.autorFotoBase64)} alt={newsItem.autorNombre || 'Author'} />
                  ) : (
                    <AvatarFallback>{newsItem.autorNombre?.[0] || 'A'}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-xs text-gray-600">{newsItem.autorNombre || "Anónimo"}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center"
              onClick={() => onSelectArticle(newsItem)}
            >
              <span>Leer más</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
