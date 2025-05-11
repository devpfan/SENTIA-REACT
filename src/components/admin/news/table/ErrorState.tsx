
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Ocurrió un error al cargar las noticias. 
        <button
          className="ml-2 text-blue-600 underline"
          onClick={onRetry}
        >
          Reintentar
        </button>
      </AlertDescription>
    </Alert>
  );
}
