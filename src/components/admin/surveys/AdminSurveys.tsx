
import { useState } from "react"
import { PenSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DailySurveyList } from "./DailySurveyList"
import { WeeklySurveyList } from "./WeeklySurveyList"
import { CreateSurveyModal } from "@/components/surveys/CreateSurveyModal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { surveyService } from "@/services/surveyService"
import { useToast } from "@/hooks/use-toast"
import type { DailySurveyDTO, WeeklySurveyDTO } from "@/types/survey"

export function AdminSurveys() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [surveyType, setSurveyType] = useState<"daily" | "weekly">("daily")
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: dailySurveys = [], isLoading: loadingDailySurveys } = useQuery({
    queryKey: ["dailySurveys"],
    queryFn: surveyService.getDailySurveys
  })

  const { data: weeklySurveys = [], isLoading: loadingWeeklySurveys } = useQuery({
    queryKey: ["weeklySurveys"],
    queryFn: surveyService.getWeeklySurveys
  })

  const toggleDailySurveyMutation = useMutation({
    mutationFn: async ({ id, activate }: { id: number; activate: boolean }) => {
      try {
        if (activate) {
          await surveyService.activateDailySurvey(id);
        } else {
          await surveyService.deactivateDailySurvey(id);
        }
        return true;
      } catch (error) {
        console.error("Error toggling daily survey:", error);
        toast({
          title: "Error",
          description: "No se pudo cambiar el estado de la encuesta diaria.",
          variant: "destructive"
        });
        return false;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailySurveys"] });
    },
  })

  const createDailySurveyMutation = useMutation({
    mutationFn: surveyService.createDailySurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailySurveys"] });
      setCreateModalOpen(false);
      toast({
        title: "Éxito",
        description: "Encuesta diaria creada correctamente."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo crear la encuesta diaria.",
        variant: "destructive"
      });
    }
  })

  const createWeeklySurveyMutation = useMutation({
    mutationFn: surveyService.createWeeklySurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weeklySurveys"] });
      setCreateModalOpen(false);
      toast({
        title: "Éxito",
        description: "Encuesta semanal creada correctamente."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo crear la encuesta semanal.",
        variant: "destructive"
      });
    }
  })

  const toggleWeeklySurveyMutation = useMutation({
    mutationFn: async ({ id, activate }: { id: number; activate: boolean }) => {
      try {
        if (activate) {
          await surveyService.activateWeeklySurvey(id);
        } else {
          await surveyService.deactivateWeeklySurvey(id);
        }
        return true;
      } catch (error) {
        console.error("Error toggling weekly survey:", error);
        return false;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weeklySurveys"] });
    },
  })

  const handleCreateSurvey = async (data: DailySurveyDTO | WeeklySurveyDTO) => {
    if (surveyType === "daily") {
      await createDailySurveyMutation.mutateAsync(data as DailySurveyDTO);
    } else {
      await createWeeklySurveyMutation.mutateAsync(data as WeeklySurveyDTO);
    }
  }

  const handleToggleWeeklySurvey = async (id: number, activate: boolean): Promise<boolean> => {
    return await toggleWeeklySurveyMutation.mutateAsync({ id, activate });
  }

  const handleToggleDailySurvey = async (id: number, activate: boolean): Promise<boolean> => {
    return await toggleDailySurveyMutation.mutateAsync({ id, activate });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenSquare className="h-5 w-5 text-primary" />
          <span>Gestión de encuestas</span>
        </CardTitle>
        <CardDescription>
          Configura y programa las encuestas para los empleados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Encuestas diarias</h3>
                <p className="text-sm text-gray-500">
                  {dailySurveys.length} encuestas configuradas
                </p>
              </div>
              <Button 
                onClick={() => {
                  setSurveyType("daily");
                  setCreateModalOpen(true);
                }}
              >
                Crear encuesta diaria
              </Button>
            </div>
            <DailySurveyList 
              surveys={dailySurveys}
              onToggleSurvey={handleToggleDailySurvey}
            />
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Encuestas semanales</h3>
                <p className="text-sm text-gray-500">
                  {weeklySurveys.length} encuestas configuradas
                </p>
              </div>
              <Button
                onClick={() => {
                  setSurveyType("weekly");
                  setCreateModalOpen(true);
                }}
              >
                Crear encuesta semanal
              </Button>
            </div>
            <WeeklySurveyList 
              surveys={weeklySurveys}
              onToggleSurvey={handleToggleWeeklySurvey}
            />
          </div>
        </div>
      </CardContent>

      <CreateSurveyModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSurvey}
        type={surveyType}
      />
    </Card>
  )
}
