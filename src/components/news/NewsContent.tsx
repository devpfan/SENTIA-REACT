
import { TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { NewsItem } from "@/types/news";
import { NewsGrid } from "./NewsGrid";

interface NewsContentProps {
  tab: string;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  filteredNews: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
}

export function NewsContent({
  tab,
  isLoading,
  isError,
  refetch,
  filteredNews,
  onSelectArticle
}: NewsContentProps) {
  return (
    <TabsContent value={tab} className="mt-0">
      {isLoading && (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">Cargando noticias...</h3>
        </div>
      )}
      
      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ocurrió un error al cargar las noticias. 
            <button
              className="ml-2 text-blue-600 underline"
              onClick={() => refetch()}
            >Reintentar</button>
          </AlertDescription>
        </Alert>
      )}
      
      {!isLoading && !isError && (
        <NewsGrid 
          news={filteredNews} 
          onSelectArticle={onSelectArticle} 
        />
      )}
    </TabsContent>
  );
}
