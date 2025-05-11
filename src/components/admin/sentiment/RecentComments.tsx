
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { FeedbackItem } from "@/types/feedback";

interface RecentCommentsProps {
  feedback: FeedbackItem[];
}

export function RecentComments({ feedback }: RecentCommentsProps) {
  const getSentimentColor = (score?: number) => {
    if (score === undefined) return 'bg-gray-200';
    if (score >= 0.7) return 'bg-green-500';
    if (score >= 0.3) return 'bg-green-300';
    if (score >= -0.3) return 'bg-yellow-200';
    if (score >= -0.7) return 'bg-red-300';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Comentarios recientes</span>
        </CardTitle>
        <CardDescription>
          Últimos comentarios y su análisis de sentimiento 
          (los comentarios son anónimos para proteger la privacidad)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {feedback.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="outline"
                  className={`${
                    item.sentimentLabel === 'Positivo' || item.sentimentLabel === 'Muy positivo' ? 'text-green-600 bg-green-50' :
                    item.sentimentLabel === 'Negativo' || item.sentimentLabel === 'Muy negativo' ? 'text-red-600 bg-red-50' :
                    'text-yellow-600 bg-yellow-50'
                  }`}
                >
                  {item.sentimentLabel}
                </Badge>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <p className="text-sm text-gray-700">{item.message}</p>
              <div className="mt-2 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getSentimentColor(item.sentimentScore)}`}
                    style={{ width: `${((item.sentimentScore || 0) + 1) / 2 * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
