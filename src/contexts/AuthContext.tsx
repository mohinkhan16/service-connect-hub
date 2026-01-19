import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserRole = "customer" | "business";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  active_role: UserRole;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userRoles: UserRole[];
  activeRole: UserRole;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  addBusinessRole: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [activeRole, setActiveRole] = useState<UserRole>("customer");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data as Profile | null;
  };

  const fetchUserRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
    return data.map((r) => r.role as UserRole);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer Supabase calls with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(async () => {
            const [profileData, roles] = await Promise.all([
              fetchProfile(session.user.id),
              fetchUserRoles(session.user.id),
            ]);
            setProfile(profileData);
            setUserRoles(roles);
            setActiveRole(profileData?.active_role || "customer");
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setUserRoles([]);
          setActiveRole("customer");
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        Promise.all([
          fetchProfile(session.user.id),
          fetchUserRoles(session.user.id),
        ]).then(([profileData, roles]) => {
          setProfile(profileData);
          setUserRoles(roles);
          setActiveRole(profileData?.active_role || "customer");
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error };
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setUserRoles([]);
    setActiveRole("customer");
  };

  const switchRole = async (role: UserRole) => {
    if (!user || !userRoles.includes(role)) return;

    const { error } = await supabase
      .from("profiles")
      .update({ active_role: role })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to switch role",
        variant: "destructive",
      });
      return;
    }

    setActiveRole(role);
    setProfile((prev) => (prev ? { ...prev, active_role: role } : null));
    
    toast({
      title: role === "business" ? "🏪 Business Mode" : "👤 Customer Mode",
      description: `Switched to ${role} account`,
    });
  };

  const addBusinessRole = async () => {
    if (!user) return { error: new Error("Not authenticated") };

    if (userRoles.includes("business")) {
      return { error: new Error("Already have business role") };
    }

    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: user.id, role: "business" as UserRole });

    if (error) {
      return { error };
    }

    setUserRoles((prev) => [...prev, "business"]);
    
    toast({
      title: "🏪 Business Account Created!",
      description: "You can now switch to your business account",
    });

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        userRoles,
        activeRole,
        isLoading,
        signUp,
        signIn,
        signOut,
        switchRole,
        addBusinessRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
