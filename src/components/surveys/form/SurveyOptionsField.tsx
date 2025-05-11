
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface SurveyOptionsFieldProps {
  options: string[];
  onOptionChange: (index: number, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

export function SurveyOptionsField({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}: SurveyOptionsFieldProps) {
  return (
    <div className="space-y-2">
      <FormLabel>Opciones</FormLabel>
      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Input 
            value={option}
            onChange={(e) => onOptionChange(index, e.target.value)}
            placeholder={`Opción ${index + 1}`}
            className="flex-1"
          />
          {options.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveOption(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={onAddOption}>
        Agregar opción
      </Button>
    </div>
  );
}
