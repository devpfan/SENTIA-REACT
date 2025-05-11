
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSentimentAnalysis } from "@/hooks/useSentimentAnalysis";

export function KeywordsList() {
  const { sentimentData, isLoading } = useSentimentAnalysis();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Palabras clave identificadas</span>
          </CardTitle>
          <CardDescription>
            Temas más mencionados en los comentarios y su puntuación de sentimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sentimentData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Palabras clave identificadas</span>
          </CardTitle>
          <CardDescription>
            Temas más mencionados en los comentarios y su puntuación de sentimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-gray-500 py-4">No hay palabras clave disponibles</p>
        </CardContent>
      </Card>
    );
  }

  // Extract keywords from text (simple implementation - words with 4+ characters)
  const allTexts = sentimentData.map(item => item.feedback.texto.toLowerCase());
  const commonWords = ["para", "como", "esto", "esta", "están", "están", "porque", "debe", "deben", "mucho", "mucha", "muchas", "muchos"];
  
  const wordCounts: Record<string, { count: number, sentiment: Record<string, number> }> = {};
  
  allTexts.forEach((text, index) => {
    const sentiment = sentimentData[index].resultado;
    const words = text.split(/\s+/)
      .map(word => word.replace(/[.,;:!?()'"]/g, ''))
      .filter(word => word.length >= 4 && !commonWords.includes(word));
    
    words.forEach(word => {
      if (!wordCounts[word]) {
        wordCounts[word] = { count: 0, sentiment: { POS: 0, NEU: 0, NEG: 0 } };
      }
      wordCounts[word].count += 1;
      wordCounts[word].sentiment[sentiment] += 1;
    });
  });
  
  // Sort and get top keywords
  const topKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 6)
    .map(([word, data]) => {
      const dominantSentiment = Object.entries(data.sentiment)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      return {
        word,
        count: data.count,
        sentiment: dominantSentiment
      };
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Palabras clave identificadas</span>
        </CardTitle>
        <CardDescription>
          Temas más mencionados en los comentarios y su puntuación de sentimiento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topKeywords.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className={`h-3 w-3 rounded-full ${
                    keyword.sentiment === 'POS' ? 'bg-green-500' : 
                    keyword.sentiment === 'NEG' ? 'bg-red-500' : 
                    'bg-yellow-500'
                  }`}
                />
                <span className="font-medium">{keyword.word}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  keyword.sentiment === 'POS' ? 'bg-green-100 text-green-800' : 
                  keyword.sentiment === 'NEG' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {keyword.sentiment === 'POS' ? 'Positivo' : 
                   keyword.sentiment === 'NEG' ? 'Negativo' : 
                   'Neutral'}
                </span>
                <span className="text-gray-500 text-sm">{keyword.count} menciones</span>
              </div>
            </div>
          ))}
          {topKeywords.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-4">No hay palabras clave disponibles</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
