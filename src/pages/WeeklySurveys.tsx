
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { weeklySurveyService } from "@/services/weeklySurveyService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/surveys/weekly/LoadingState";
import { SuccessState } from "@/components/surveys/weekly/SuccessState";
import { SurveyQuestions } from "@/components/surveys/weekly/SurveyQuestions";

const WeeklySurveys = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [userId, setUserId] = useState<string>(() => localStorage.getItem("identificacion") || "");

  React.useEffect(() => {
    const storedId = localStorage.getItem("identificacion");
    console.log("User ID from localStorage:", storedId);
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  const { 
    data: hasAnswered, 
    isLoading: checkingAnswer,
    error: checkError
  } = useQuery({
    queryKey: ["checkWeeklySurvey", userId],
    queryFn: () => weeklySurveyService.checkWeeklySurveyResponse(userId),
    enabled: !!userId,
    staleTime: 60000, // Cache results for 1 minute
    gcTime: 300000, // Keep in cache for 5 minutes (formerly cacheTime)
  });

  const { 
    data: activeSurvey, 
    isLoading: loadingSurvey, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["activeWeeklySurvey"],
    queryFn: weeklySurveyService.getActiveWeeklySurvey,
    enabled: !hasAnswered && !checkError,
    staleTime: 60000, // Cache results for 1 minute
    gcTime: 300000, // Keep in cache for 5 minutes (formerly cacheTime)
  });

  const answerMutation = useMutation({
    mutationFn: () => {
      if (!activeSurvey) throw new Error("No hay encuesta activa");
      return weeklySurveyService.answerWeeklySurvey(activeSurvey.id, userId);
    },
    onSuccess: () => {
      toast({
        title: "¡Encuesta completada!",
        description: "Has ganado 20 puntos por tu participación en la encuesta semanal.",
      });
      queryClient.invalidateQueries({ queryKey: ["activeWeeklySurvey"] });
      queryClient.invalidateQueries({ queryKey: ["checkWeeklySurvey"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Define the handler functions
  const handleSubmit = () => {
    if (!selectedOption) return;
    answerMutation.mutate();
  };

  const handleNextQuestion = () => {
    if (!activeSurvey) return;
    if (selectedQuestion < activeSurvey.preguntas.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevQuestion = () => {
    if (selectedQuestion > 0) {
      setSelectedQuestion(selectedQuestion - 1);
      setSelectedOption(null);
    }
  };

  if (checkingAnswer || loadingSurvey) {
    return (
      <PageLayout>
        <LoadingState />
      </PageLayout>
    );
  }

  // Check if the error is related to date range
  const isDateRangeError = checkError?.message?.includes("rango de fechas") || 
                          error?.message?.includes("rango de fechas");

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Encuesta semanal</h1>
          <p className="text-gray-600">
            Participa en nuestra encuesta semanal y ayúdanos a mejorar.
          </p>
        </div>

        {isDateRangeError ? (
          <Alert className="mb-6">
            <Clock className="h-4 w-4" />
            <AlertTitle>Encuesta fuera de plazo</AlertTitle>
            <AlertDescription>
              La encuesta semanal activa ya no está dentro del rango de fechas válido.
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ocurrió un error al cargar la encuesta. Por favor, intenta de nuevo más tarde.
              <Button variant="outline" className="mt-2" onClick={() => refetch()}>
                Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        ) : hasAnswered ? (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Encuesta completada</AlertTitle>
            <AlertDescription>
              Ya has respondido la encuesta semanal de esta semana. ¡Gracias por tu participación!
            </AlertDescription>
          </Alert>
        ) : !activeSurvey ? (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No hay encuestas disponibles</AlertTitle>
            <AlertDescription>
              No hay encuestas semanales activas en este momento. Vuelve a consultar más tarde.
              <Button variant="outline" className="mt-2" onClick={() => refetch()}>
                Comprobar de nuevo
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Encuesta semanal</CardTitle>
              <CardDescription>
                {activeSurvey.fechaInicio} - {activeSurvey.fechaFin}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {answerMutation.isSuccess ? (
                <SuccessState />
              ) : (
                <SurveyQuestions
                  survey={activeSurvey}
                  selectedQuestion={selectedQuestion}
                  selectedOption={selectedOption}
                  isPending={answerMutation.isPending}
                  onOptionChange={setSelectedOption}
                  onPrevQuestion={handlePrevQuestion}
                  onNextQuestion={handleNextQuestion}
                  onSubmit={handleSubmit}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default WeeklySurveys;
