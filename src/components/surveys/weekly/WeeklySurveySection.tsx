
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { weeklySurveyService } from "@/services/weeklySurveyService";

interface WeeklySurveySectionProps {
  userId: string;
}

export const WeeklySurveySection = ({ userId }: WeeklySurveySectionProps) => {
  const { 
    data: hasAnsweredWeekly, 
    isLoading: checkingWeeklyAnswer,
    error: checkError
  } = useQuery({
    queryKey: ["checkWeeklySurvey", userId],
    queryFn: () => weeklySurveyService.checkWeeklySurveyResponse(userId),
    enabled: !!userId,
    staleTime: 60000, // Cache results for 1 minute
    gcTime: 300000, // Keep in cache for 5 minutes (formerly cacheTime)
  });

  const { 
    data: activeWeeklySurvey, 
    isLoading: loadingWeeklySurvey,
    error: weeklyError,
    refetch: refetchWeekly
  } = useQuery({
    queryKey: ["activeWeeklySurvey"],
    queryFn: weeklySurveyService.getActiveWeeklySurvey,
    enabled: !hasAnsweredWeekly && !checkError,
    staleTime: 60000, // Cache results for 1 minute
    gcTime: 300000, // Keep in cache for 5 minutes (formerly cacheTime)
  });

  if (checkingWeeklyAnswer || loadingWeeklySurvey) {
    return null;
  }

  // Check if the error is related to date range
  const isDateRangeError = checkError?.message?.includes("rango de fechas") || 
                          weeklyError?.message?.includes("rango de fechas");

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Encuesta semanal</h2>
      {isDateRangeError ? (
        <Alert className="mb-6">
          <Clock className="h-4 w-4" />
          <AlertTitle>Encuesta fuera de plazo</AlertTitle>
          <AlertDescription>
            La encuesta semanal activa ya no está dentro del rango de fechas válido.
          </AlertDescription>
        </Alert>
      ) : weeklyError ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ocurrió un error al cargar la encuesta semanal.
            <Button variant="outline" className="mt-2" onClick={() => refetchWeekly()}>
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      ) : hasAnsweredWeekly ? (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Encuesta completada</AlertTitle>
          <AlertDescription>
            Ya has respondido la encuesta semanal. ¡Gracias por tu participación!
          </AlertDescription>
        </Alert>
      ) : !activeWeeklySurvey ? (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay encuestas disponibles</AlertTitle>
          <AlertDescription>
            No hay encuestas semanales activas en este momento.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Encuesta semanal</CardTitle>
            <CardDescription>
              {activeWeeklySurvey.fechaInicio} - {activeWeeklySurvey.fechaFin}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/weekly-surveys">Completar encuesta semanal</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
