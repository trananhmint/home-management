import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { authService } from "../services/AuthService";


type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. lấy session ban đầu
    authService.getSession().then((res) => {
      setSession(res.data?.session ?? null);
      setLoading(false);
    });

    // 2. lắng nghe auth change
    const { unsubscribe } = authService.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
