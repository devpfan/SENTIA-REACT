
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderState } from "@/hooks/useHeaderState";
import Logo from "./header/Logo";
import NavigationLinks from "./header/NavigationLinks";
import UserMenuDesktop from "./header/UserMenuDesktop";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const {
    isAuthenticated,
    isAdmin,
    points,
    userPhoto,
    isMenuOpen,
    toggleMenu,
    handleLogout,
    toggleAdmin
  } = useHeaderState();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        <NavigationLinks isAuthenticated={isAuthenticated} isAdmin={isAdmin} />

        {!isAuthenticated && (
          <div className="hidden md:block flex-1"></div>
        )}

        <div className="hidden md:flex items-center gap-4">
          <UserMenuDesktop 
            isAuthenticated={isAuthenticated} 
            userPhoto={userPhoto} 
            points={points} 
            handleLogout={handleLogout}
          />
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        userPhoto={userPhoto}
        points={points}
        toggleAdmin={toggleAdmin}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

export default Header;
