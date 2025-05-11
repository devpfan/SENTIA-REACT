
import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
    <p className="text-lg">Cargando encuesta semanal...</p>
  </div>
);
