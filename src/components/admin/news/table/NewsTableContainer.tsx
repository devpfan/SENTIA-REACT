
import { Card, CardContent } from "@/components/ui/card";
import { NewsItem } from "@/types/news";
import { NewsTable } from "../NewsTable";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface NewsTableContainerProps {
  news: NewsItem[];
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
  onEdit: (news: NewsItem) => void;
  onDelete: (id: number) => void;
}

export function NewsTableContainer({ 
  news, 
  isLoading, 
  isError, 
  onRefetch,
  onEdit, 
  onDelete 
}: NewsTableContainerProps) {
  return (
    <Card>
      <CardContent className="p-0">
        {isLoading && <LoadingState />}
        {isError && <ErrorState onRetry={onRefetch} />}
        {!isLoading && !isError && (
          <NewsTable 
            news={news} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        )}
      </CardContent>
    </Card>
  );
}
