
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { surveyService } from "@/services/surveyService";
import { useToast } from "@/hooks/use-toast";

interface DailySurveySectionProps {
  userId: string;
}

export const DailySurveySection = ({ userId }: DailySurveySectionProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const { 
    data: hasAnsweredDaily, 
    isLoading: checkingDailyAnswer 
  } = useQuery({
    queryKey: ["checkDailySurvey", userId],
    queryFn: () => surveyService.checkDailySurveyResponse(userId),
    enabled: !!userId,
  });

  const { 
    data: activeDailySurvey, 
    isLoading: loadingDailySurvey,
    error: dailyError,
    refetch: refetchDaily
  } = useQuery({
    queryKey: ["activeDailySurvey"],
    queryFn: surveyService.getActiveDailySurvey,
    enabled: !hasAnsweredDaily,
  });

  const answerMutation = useMutation({
    mutationFn: () => {
      if (!activeDailySurvey) throw new Error("No hay encuesta activa");
      return surveyService.answerDailySurvey(activeDailySurvey.id, userId);
    },
    onSuccess: () => {
      toast({
        title: "¡Encuesta completada!",
        description: "Has ganado 10 puntos por tu participación.",
      });
      queryClient.invalidateQueries({ queryKey: ["activeDailySurvey"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!selectedOption) return;
    answerMutation.mutate();
  };

  if (checkingDailyAnswer || loadingDailySurvey) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Encuesta diaria</h2>
      {dailyError ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ocurrió un error al cargar la encuesta diaria.
            <Button variant="outline" className="mt-2" onClick={() => refetchDaily()}>
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      ) : hasAnsweredDaily ? (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Encuesta completada</AlertTitle>
          <AlertDescription>
            Ya has respondido la encuesta diaria de hoy. ¡Gracias por tu participación!
          </AlertDescription>
        </Alert>
      ) : !activeDailySurvey ? (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay encuestas disponibles</AlertTitle>
          <AlertDescription>
            No hay encuestas diarias activas en este momento.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Encuesta del día</CardTitle>
            <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            {answerMutation.isSuccess ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-center">¡Gracias por tu participación!</h3>
                <p className="text-gray-600 text-center mb-4">
                  Has completado la encuesta de hoy y has ganado 10 puntos.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Puntos ganados:</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">+10</span>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-4">{activeDailySurvey.pregunta}</h3>
                <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-4">
                  {activeDailySurvey.opciones && activeDailySurvey.opciones.length > 0 ? (
                    activeDailySurvey.opciones.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay opciones disponibles para esta encuesta.</p>
                  )}
                </RadioGroup>
              </div>
            )}
          </CardContent>
          {!answerMutation.isSuccess && activeDailySurvey.opciones && activeDailySurvey.opciones.length > 0 && (
            <CardFooter className="flex justify-end space-x-4 pt-4 border-t">
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedOption || answerMutation.isPending}
              >
                {answerMutation.isPending ? "Enviando..." : "Enviar respuesta"}
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </section>
  );
};
