
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-primary rounded-md p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-5h10v2H7v-2zm0-4h10v2H7v-2z" fill="white"/>
        </svg>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-bold text-lg text-primary">SENTIA</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              Sistema de Evaluación y Notificación del Talento con Inteligencia Artificial
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export default Logo;