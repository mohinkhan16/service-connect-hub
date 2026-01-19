import { useState } from "react";
import { User, Store, ChevronDown, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const RoleSwitcher = () => {
  const { profile, userRoles, activeRole, switchRole, addBusinessRole, signOut } = useAuth();
  const { toast } = useToast();
  const [isAddingRole, setIsAddingRole] = useState(false);

  const handleAddBusinessRole = async () => {
    setIsAddingRole(true);
    const { error } = await addBusinessRole();
    setIsAddingRole(false);
    
    if (error && !error.message.includes("Already have")) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className={activeRole === "business" ? "bg-amber-500/20 text-amber-600" : "bg-primary/20 text-primary"}>
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-medium truncate max-w-[100px]">
              {profile?.full_name || profile?.email?.split("@")[0]}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {activeRole === "business" ? (
                <>
                  <Store className="h-3 w-3" />
                  Business
                </>
              ) : (
                <>
                  <User className="h-3 w-3" />
                  Customer
                </>
              )}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{profile?.full_name}</p>
          <p className="text-xs text-muted-foreground">{profile?.email}</p>
        </div>
        <DropdownMenuSeparator />
        
        {/* Role Switching */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Switch Account</p>
          
          {userRoles.includes("customer") && (
            <DropdownMenuItem 
              onClick={() => switchRole("customer")}
              className={`cursor-pointer ${activeRole === "customer" ? "bg-primary/10" : ""}`}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="flex-1">👤 Customer</span>
              {activeRole === "customer" && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Active</span>
              )}
            </DropdownMenuItem>
          )}
          
          {userRoles.includes("business") && (
            <DropdownMenuItem 
              onClick={() => switchRole("business")}
              className={`cursor-pointer ${activeRole === "business" ? "bg-amber-500/10" : ""}`}
            >
              <Store className="h-4 w-4 mr-2" />
              <span className="flex-1">🏪 Business</span>
              {activeRole === "business" && (
                <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded-full">Active</span>
              )}
            </DropdownMenuItem>
          )}
          
          {!userRoles.includes("business") && (
            <DropdownMenuItem 
              onClick={handleAddBusinessRole}
              disabled={isAddingRole}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>{isAddingRole ? "Adding..." : "Add Business Account"}</span>
            </DropdownMenuItem>
          )}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
