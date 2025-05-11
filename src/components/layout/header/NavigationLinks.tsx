
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

interface NavigationLinksProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const NavigationLinks = ({ isAuthenticated, isAdmin }: NavigationLinksProps) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link to="/surveys" className="text-gray-700 hover:text-primary transition-colors">
        Encuestas
      </Link>
      <Link to="/rewards" className="text-gray-700 hover:text-primary transition-colors">
        Recompensas
      </Link>
      <Link to="/news" className="text-gray-700 hover:text-primary transition-colors">
        Noticias
      </Link>
      <Link to="/feedback" className="text-gray-700 hover:text-primary transition-colors">
        Feedback
      </Link>
      {isAdmin && (
        <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
          <Shield size={16} />
          <span>Admin</span>
        </Link>
      )}
    </nav>
  );
};

export default NavigationLinks;
