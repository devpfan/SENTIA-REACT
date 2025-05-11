
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DailySurveyDTO, WeeklySurveyDTO } from "@/types/survey";
import { useToast } from "@/hooks/use-toast";
import { SurveyOptionsField } from "./form/SurveyOptionsField";
import { WeeklySurveyFields } from "./form/WeeklySurveyFields";
import { DailySurveyFields } from "./form/DailySurveyFields";

interface CreateSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DailySurveyDTO | WeeklySurveyDTO) => Promise<void>;
  type: "daily" | "weekly";
}

export function CreateSurveyModal({
  isOpen,
  onClose,
  onSubmit,
  type,
}: CreateSurveyModalProps) {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<DailySurveyDTO | WeeklySurveyDTO>({
    defaultValues: type === "daily" 
      ? { pregunta: "", opciones: ["", ""] }
      : { preguntas: [""], opciones: ["", ""], fechaInicio: "", fechaFin: "" }
  });

  // Reset the form when the modal opens or type changes
  useEffect(() => {
    if (isOpen) {
      setOptions(["", ""]);
      setStartDate(undefined);
      setEndDate(undefined);
      setIsSubmitting(false);
      
      form.reset(type === "daily" 
        ? { pregunta: "", opciones: ["", ""] }
        : { preguntas: [""], opciones: ["", ""], fechaInicio: "", fechaFin: "" }
      );
      
      // Ensure opciones is set in form values
      form.setValue('opciones', ["", ""]);
    }
  }, [isOpen, type, form]);

  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    form.setValue('opciones', newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    form.setValue('opciones', newOptions);
  };

  const handleOptionsChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    form.setValue('opciones', newOptions);
  };

  const handleSubmit = async (data: DailySurveyDTO | WeeklySurveyDTO) => {
    try {
      setIsSubmitting(true);
      const validOptions = options.filter(opt => opt.trim() !== "");
      
      if (validOptions.length < 2) {
        toast({
          title: "Error",
          description: "Debe incluir al menos dos opciones para la encuesta",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (type === "daily") {
        const dailyData = data as DailySurveyDTO;
        dailyData.opciones = validOptions;
        
        if (!dailyData.pregunta?.trim()) {
          toast({
            title: "Error",
            description: "La pregunta no puede estar vacía",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      } else {
        const weeklyData = data as WeeklySurveyDTO;
        weeklyData.opciones = validOptions;
        weeklyData.fechaInicio = startDate?.toISOString().split('T')[0] || '';
        weeklyData.fechaFin = endDate?.toISOString().split('T')[0] || '';
        
        if (!weeklyData.preguntas[0]?.trim()) {
          toast({
            title: "Error",
            description: "La pregunta no puede estar vacía",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        if (!weeklyData.fechaInicio || !weeklyData.fechaFin) {
          toast({
            title: "Error",
            description: "Debe seleccionar fechas de inicio y fin",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      await onSubmit(data);
      toast({
        title: "Encuesta creada",
        description: "La encuesta ha sido creada exitosamente",
      });
      
      // Reset form after submission
      form.reset({
        pregunta: "",
        preguntas: [""],
        opciones: ["", ""],
        fechaInicio: "",
        fechaFin: ""
      });
      setOptions(["", ""]);
      setStartDate(undefined);
      setEndDate(undefined);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error("Error creating survey:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear la encuesta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "daily" ? "Crear Encuesta Diaria" : "Crear Encuesta Semanal"}
          </DialogTitle>
          <DialogDescription>
            Complete los campos para crear una nueva encuesta
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {type === "daily" ? (
              <DailySurveyFields form={form as any} />
            ) : (
              <WeeklySurveyFields
                form={form as any}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            )}

            <SurveyOptionsField
              options={options}
              onOptionChange={handleOptionsChange}
              onAddOption={addOption}
              onRemoveOption={removeOption}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear encuesta"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
