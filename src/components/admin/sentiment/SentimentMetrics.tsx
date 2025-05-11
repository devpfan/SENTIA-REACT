
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";
import { ArrowUp, ArrowDown, ThumbsUp, ThumbsDown, Check } from "lucide-react";

export function SentimentMetrics() {
  const { sentimentMetrics, isLoading } = useSentimentAnalysis();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>Cargando...</CardDescription>
              <CardTitle className="text-2xl">
                <Skeleton className="h-6 w-16" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const sentimentColor = sentimentMetrics.sentimentIndex > 0 
    ? "text-green-600" 
    : sentimentMetrics.sentimentIndex < 0 
      ? "text-red-600"
      : "text-yellow-600";

  const sentimentIcon = sentimentMetrics.sentimentIndex > 0 
    ? <ArrowUp className="h-4 w-4 text-green-600" />
    : sentimentMetrics.sentimentIndex < 0 
      ? <ArrowDown className="h-4 w-4 text-red-600" />
      : <Check className="h-4 w-4 text-yellow-600" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Índice de sentimiento</CardDescription>
          <CardTitle className={`text-2xl ${sentimentColor}`}>
            {sentimentMetrics.sentimentIndex.toFixed(1)}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm gap-1">
            {sentimentIcon}
            <span>
              {sentimentMetrics.sentimentIndex > 0 
                ? "Sentimiento positivo" 
                : sentimentMetrics.sentimentIndex < 0 
                  ? "Sentimiento negativo"
                  : "Sentimiento neutral"}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Comentarios positivos</CardDescription>
          <CardTitle className="text-2xl text-green-600">
            {sentimentMetrics.positive}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm gap-1">
            <ThumbsUp className="h-4 w-4 text-green-600" />
            <span>{((sentimentMetrics.positive / sentimentMetrics.total) * 100).toFixed(1)}% del total</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Comentarios negativos</CardDescription>
          <CardTitle className="text-2xl text-red-600">
            {sentimentMetrics.negative}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm gap-1">
            <ThumbsDown className="h-4 w-4 text-red-600" />
            <span>{((sentimentMetrics.negative / sentimentMetrics.total) * 100).toFixed(1)}% del total</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total comentarios analizados</CardDescription>
          <CardTitle className="text-2xl">
            {sentimentMetrics.total}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm gap-1">
            <Check className="h-4 w-4 text-primary" />
            <span>{sentimentMetrics.neutral} comentarios neutrales ({((sentimentMetrics.neutral / sentimentMetrics.total) * 100).toFixed(1)}%)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
