
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TrendsLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-primary" />
          <span>Tendencia temporal</span>
        </CardTitle>
        <CardDescription>
          Evolución del compromiso y satisfacción durante los últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-full mb-4">
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-2 w-5/6 mb-2" />
              <Skeleton className="h-2 w-4/6 mb-2" />
              <Skeleton className="h-2 w-5/6 mb-2" />
              <Skeleton className="h-2 w-3/6 mb-2" />
              <Skeleton className="h-2 w-full" />
            </div>
            <p className="text-sm text-gray-500">No hay datos disponibles</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
