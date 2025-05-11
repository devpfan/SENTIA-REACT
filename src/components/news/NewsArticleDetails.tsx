
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { NewsItem, getNewsTypeName } from "@/types/news";
import { format } from "date-fns";

interface NewsArticleDetailsProps {
  article: NewsItem;
  onBack: () => void;
}

export function NewsArticleDetails({ article, onBack }: NewsArticleDetailsProps) {
  const authorFullName = article.autorNombre 
    ? `${article.autorNombre} ${article.autorApellido || ''}`
    : "Anónimo";
    
  const authorInitial = article.autorNombre ? article.autorNombre[0] : 'A';
  
  const formatImageSrc = (base64String?: string | null) => {
    if (!base64String) return null;
    return base64String.startsWith('data:') 
      ? base64String 
      : `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={onBack}
      >
        ← Volver a noticias
      </Button>
      
      <div className="overflow-hidden rounded-lg mb-8">
        {article.imagenBase64 && (
          <img 
            src={formatImageSrc(article.imagenBase64)} 
            alt={article.titulo}
            className="w-full h-64 object-cover"
          />
        )}
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{article.titulo}</h1>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {article.autorFotoBase64 ? (
              <AvatarImage 
                src={formatImageSrc(article.autorFotoBase64)} 
                alt={article.autorNombre || 'Author'}
              />
            ) : (
              <AvatarFallback>{authorInitial}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm">{authorFullName}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">
            {format(new Date(article.fechaPublicacion), "dd MMMM, yyyy")}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {getNewsTypeName(article.tipo)}
        </Badge>
      </div>
      
      <div className="prose max-w-none">
        <div className="whitespace-pre-line text-gray-700">
          {article.contenido}
        </div>
      </div>
    </div>
  );
}
