
import { Link } from "react-router-dom";
import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userPhoto: string | null;
  points: number;
  toggleAdmin: () => void;
  handleLogout: () => void;
  toggleMenu: () => void;
}

const MobileMenu = ({
  isOpen,
  isAuthenticated,
  isAdmin,
  userPhoto,
  points,
  toggleAdmin,
  handleLogout,
  toggleMenu
}: MobileMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden bg-white p-4 border-t">
      {isAuthenticated ? (
        <nav className="flex flex-col gap-4">
          <Link to="/surveys" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>
            Encuestas
          </Link>
          <Link to="/rewards" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>
            Recompensas
          </Link>
          <Link to="/news" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>
            Noticias
          </Link>
          <Link to="/feedback" className="text-gray-700 hover:text-primary py-2 transition-colors" onClick={toggleMenu}>
            Feedback
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-primary py-2 transition-colors flex items-center gap-2" onClick={toggleMenu}>
              <Shield size={18} />
              <span>Admin</span>
            </Link>
          )}
          
          <div className="border-t pt-4 mt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">{points} puntos</span>
            </div>
            <Link to="/profile" className="flex items-center gap-2" onClick={toggleMenu}>
              <Avatar className="h-8 w-8 mr-2">
                {userPhoto ? (
                  <AvatarImage src={userPhoto} alt="Profile" />
                ) : (
                  <AvatarFallback><User size={18} /></AvatarFallback>
                )}
              </Avatar>
              <span>Mi Perfil</span>
            </Link>
            <Button variant="outline" onClick={toggleAdmin} className="mb-2">
              {isAdmin ? "Cambiar a Usuario" : "Cambiar a Admin"}
            </Button>
            <Button variant="outline" onClick={() => { handleLogout(); toggleMenu(); }}>
              Cerrar sesión
            </Button>
          </div>
        </nav>
      ) : (
        <div className="border-t pt-4 mt-2">
          <Link to="/login" onClick={toggleMenu}>
            <Button className="w-full">Iniciar sesión</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
