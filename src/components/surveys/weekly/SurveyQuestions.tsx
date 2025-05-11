
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WeeklySurvey } from "@/types/survey";

interface SurveyQuestionsProps {
  survey: WeeklySurvey;
  selectedQuestion: number;
  selectedOption: string | null;
  isPending: boolean;
  onOptionChange: (value: string) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onSubmit: () => void;
}

export const SurveyQuestions = ({
  survey,
  selectedQuestion,
  selectedOption,
  isPending,
  onOptionChange,
  onPrevQuestion,
  onNextQuestion,
  onSubmit,
}: SurveyQuestionsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
        <span>Pregunta {selectedQuestion + 1} de {survey.preguntas.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
        <div 
          className="bg-primary h-1.5 rounded-full" 
          style={{ width: `${((selectedQuestion + 1) / survey.preguntas.length) * 100}%` }}
        ></div>
      </div>
      <h3 className="text-lg font-medium mb-4">{survey.preguntas[selectedQuestion]}</h3>
      <RadioGroup value={selectedOption || ""} onValueChange={onOptionChange} className="space-y-4">
        {survey.opciones && survey.opciones.length > 0 ? (
          survey.opciones.map((option, index) => (
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
      
      <div className="flex justify-between pt-4 border-t mt-4">
        <div>
          {selectedQuestion > 0 && (
            <Button variant="outline" onClick={onPrevQuestion}>
              Anterior
            </Button>
          )}
        </div>
        <div>
          {selectedQuestion < survey.preguntas.length - 1 ? (
            <Button 
              onClick={onNextQuestion} 
              disabled={!selectedOption}
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              onClick={onSubmit} 
              disabled={!selectedOption || isPending}
            >
              {isPending ? "Enviando..." : "Enviar respuesta"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
