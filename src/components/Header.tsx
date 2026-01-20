import { Button } from "@/components/ui/button";
import { MapPin, Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RoleSwitcher from "./RoleSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-warm">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">LocalHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categories
          </a>
          <a href="#featured" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Featured
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          ) : user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/chat">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
              <RoleSwitcher />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/auth">List Your Business</Link>
              </Button>
            </>
          )}
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background p-4 animate-fade-in">
          <nav className="flex flex-col gap-3">
            <a href="#categories" className="text-sm font-medium py-2">Categories</a>
            <a href="#featured" className="text-sm font-medium py-2">Featured</a>
            <a href="#how-it-works" className="text-sm font-medium py-2">How it Works</a>
            <div className="flex gap-3 pt-3 border-t border-border">
              {user ? (
                <div className="w-full flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <Link to="/chat">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chats
                    </Link>
                  </Button>
                  <RoleSwitcher />
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="flex-1" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to="/auth">List Business</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
