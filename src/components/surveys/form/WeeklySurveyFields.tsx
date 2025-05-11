
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { WeeklySurveyDTO } from "@/types/survey";

interface WeeklySurveyFieldsProps {
  form: UseFormReturn<WeeklySurveyDTO>;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date?: Date) => void;
  onEndDateChange: (date?: Date) => void;
}

export function WeeklySurveyFields({
  form,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: WeeklySurveyFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="preguntas.0"
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
      <div className="space-y-2">
        <FormLabel>Período de la encuesta</FormLabel>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Fecha inicio</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Fecha fin</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
