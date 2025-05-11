import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, BellRing, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { FeedbackItem } from "@/types/feedback";

interface FeedbackListProps {
  feedback: FeedbackItem[];
  filter: string;
  searchQuery: string;
}

export function FeedbackList({ feedback, filter, searchQuery }: FeedbackListProps) {
  const { toast } = useToast();

  const handleMarkAsReviewed = (id: string) => {
    toast({
      title: "Feedback revisado",
      description: "El feedback ha sido marcado como revisado",
    });
  };

  const handleCloseFeedback = (id: string) => {
    toast({
      title: "Feedback cerrado",
      description: "El feedback ha sido cerrado correctamente",
    });
  };

  const filteredFeedback = feedback.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch = item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filteredFeedback.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <h3 className="font-medium mb-2">No hay feedback que mostrar</h3>
          <p className="text-gray-600">
            No se encontraron resultados que coincidan con tu búsqueda
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {filteredFeedback.map((feedback) => (
        <Card key={feedback.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Feedback anónimo</h3>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${
                    feedback.type === 'suggestion' ? 'text-blue-600 bg-blue-50' :
                    feedback.type === 'concern' ? 'text-orange-600 bg-orange-50' :
                    'text-green-600 bg-green-50'
                  }`}
                >
                  {feedback.type === 'suggestion' ? 'Sugerencia' :
                   feedback.type === 'concern' ? 'Preocupación' :
                   'Reconocimiento'}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${
                    feedback.status === 'pending' ? 'text-gray-600 bg-gray-100' :
                    feedback.status === 'reviewed' ? 'text-blue-600 bg-blue-50' :
                    'text-green-600 bg-green-50'
                  }`}
                >
                  {feedback.status === 'pending' ? 'Pendiente' :
                   feedback.status === 'reviewed' ? 'Revisado' :
                   'Cerrado'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{feedback.message}</p>
            {feedback.status !== 'closed' && (
              <div className="mt-4 flex justify-end gap-2">
                {feedback.status === 'pending' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleMarkAsReviewed(feedback.id)}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Marcar como revisado</span>
                  </Button>
                )}
                <Button 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleCloseFeedback(feedback.id)}
                >
                  <BellRing className="h-4 w-4" />
                  <span>Cerrar feedback</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
