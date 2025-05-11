
import { CheckCircle } from "lucide-react";

export const SuccessState = () => (
  <div className="flex flex-col items-center py-8">
    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h3 className="text-xl font-medium mb-2 text-center">¡Gracias por tu participación!</h3>
    <p className="text-gray-600 text-center mb-4">
      Has completado la encuesta semanal y has ganado 20 puntos.
    </p>
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">Puntos ganados:</span>
      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">+20</span>
    </div>
  </div>
);
