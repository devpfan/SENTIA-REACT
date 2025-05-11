
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function SatisfactionPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-primary" />
          <span>Satisfacción general</span>
        </CardTitle>
        <CardDescription>
          Distribución de respuestas a la pregunta "¿Cómo te sientes en la empresa?"
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="h-40 w-40 rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-500">No hay datos disponibles</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
