
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuDesktopProps {
  isAuthenticated: boolean;
  userPhoto: string | null;
  points: number;
  handleLogout: () => void;
}

const UserMenuDesktop = ({ isAuthenticated, userPhoto, points, handleLogout }: UserMenuDesktopProps) => {
  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <Button>Iniciar sesión</Button>
      </Link>
    );
  }
  
  return (
    <>
      <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1 rounded-full">
        <span className="text-sm font-medium">{points}</span>
        <span className="text-xs text-gray-600">puntos</span>
      </div>
      <Button size="icon" variant="ghost" className="relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </Button>
      <Link to="/profile">
        <Button size="icon" variant="outline" className="rounded-full">
          <Avatar className="h-8 w-8">
            {userPhoto ? (
              <AvatarImage src={userPhoto} alt="Profile" />
            ) : (
              <AvatarFallback><User size={18} /></AvatarFallback>
            )}
          </Avatar>
        </Button>
      </Link>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </>
  );
};

export default UserMenuDesktop;
