
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { WeeklySurvey } from "@/types/survey";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface WeeklySurveyListProps {
  surveys: WeeklySurvey[];
  onToggleSurvey?: (id: number, activate: boolean) => Promise<boolean>;
}

export function WeeklySurveyList({ surveys, onToggleSurvey }: WeeklySurveyListProps) {
  const { toast } = useToast();
  const [activeStates, setActiveStates] = useState<Record<number, boolean>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const newActiveStates = surveys.reduce((acc, survey) => {
      acc[survey.id] = survey.estado === 'A';
      return acc;
    }, {} as Record<number, boolean>);
    
    setActiveStates(newActiveStates);
  }, [surveys]);

  const handleToggle = async (id: number, checked: boolean) => {
    if (onToggleSurvey && !isProcessing) {
      setIsProcessing(true);
      try {
        const success = await onToggleSurvey(id, checked);
        
        if (!success) {
          // Revert the switch state if the operation failed
          setActiveStates(prev => ({
            ...prev,
            [id]: !checked
          }));
          
          toast({
            title: "Error",
            description: "Solo puede haber una encuesta activa a la vez.",
            variant: "destructive"
          });
        } else {
          // If activation was successful, update all other surveys to inactive
          if (checked) {
            const updatedStates = { ...activeStates };
            Object.keys(updatedStates).forEach(surveyId => {
              const numId = Number(surveyId);
              if (numId !== id) {
                updatedStates[numId] = false;
              }
            });
            setActiveStates(updatedStates);
          } else {
            setActiveStates(prev => ({
              ...prev,
              [id]: checked
            }));
          }
        }
      } catch (error) {
        console.error("Error toggling survey:", error);
        // Revert the switch state on error
        setActiveStates(prev => ({
          ...prev,
          [id]: !checked
        }));
        
        toast({
          title: "Error",
          description: "No se pudo cambiar el estado de la encuesta.",
          variant: "destructive"
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div key={survey.id} className="mt-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              {survey.preguntas.map((pregunta, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium">{pregunta}</h4>
                </div>
              ))}
            </div>
            {onToggleSurvey && (
              <Switch
                checked={activeStates[survey.id] || false}
                onCheckedChange={(checked) => handleToggle(survey.id, checked)}
                disabled={isProcessing}
              />
            )}
          </div>
          <div className="mt-2 space-y-1">
            {survey.opciones.map((option, index) => (
              <div key={index} className="text-sm text-gray-600">
                {option}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 text-sm text-gray-500">
            <span>Período:</span>
            <span>{survey.fechaInicio} - {survey.fechaFin}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
