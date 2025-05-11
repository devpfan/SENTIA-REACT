
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function DepartmentsBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-primary" />
          <span>Comparativa por departamentos</span>
        </CardTitle>
        <CardDescription>
          Comparación de niveles de compromiso y satisfacción entre departamentos
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
            <p className="text-sm text-gray-500">No hay datos disponibles</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
