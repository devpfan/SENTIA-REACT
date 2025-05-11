
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-md p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-5h10v2H7v-2zm0-4h10v2H7v-2z" fill="white"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-primary">SENTIA</span>
            </Link>
            <p className="text-sm text-gray-600">
              Sistema de Evaluación y Notificación del Talento con Inteligencia Artificial
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/surveys" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Encuestas diarias
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Tienda de recompensas
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/feedback" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Enviar feedback
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Ayuda y soporte
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Términos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SENTIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
