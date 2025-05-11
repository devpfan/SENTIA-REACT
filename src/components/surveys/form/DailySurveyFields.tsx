
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { DailySurveyDTO } from "@/types/survey";

interface DailySurveyFieldsProps {
  form: UseFormReturn<DailySurveyDTO>;
}

export function DailySurveyFields({ form }: DailySurveyFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="pregunta"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pregunta</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Ingrese la pregunta" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
