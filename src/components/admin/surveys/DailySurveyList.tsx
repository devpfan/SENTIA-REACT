
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { DailySurvey } from "@/types/survey";

interface DailySurveyListProps {
  surveys: DailySurvey[];
  onToggleSurvey: (id: number, activate: boolean) => void;
}

export function DailySurveyList({ surveys, onToggleSurvey }: DailySurveyListProps) {
  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div key={survey.id} className="mt-4 p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium">{survey.pregunta}</h4>
              <div className="mt-2 space-y-1">
                {survey.opciones.map((option, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {survey.estado === 'A' ? 'Activa' : 'Inactiva'}
              </span>
              <Switch
                checked={survey.estado === 'A'}
                onCheckedChange={(checked) => {
                  onToggleSurvey(survey.id, checked);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
