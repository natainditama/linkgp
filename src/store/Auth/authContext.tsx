import React, { useContext, useEffect, useState } from "react";
import { supabaseClient } from "../../services/Supabase/supabaseClient";
import { ApiError, AuthChangeEvent, Session, User } from "@supabase/supabase-js";

interface AuthContextInterface {
  isAuthenticated?: boolean;
  user: User | null;
  login: ({ email }: { email: string }, userData?: any) => Promise<{ user: User | null, error: ApiError | null, session: Session | null }>;
  signup: ({ email, password }: { email: string, password: string }) => void;
  logout: () => void;
  loginWithGoogle: () => Promise<{ user: User | null, error: ApiError | null, session: Session | null }>;
}

const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  isAuthenticated: false,
  login: (data) => supabaseClient.auth.signIn(data),
  signup: (data) => supabaseClient.auth.signUp(data),
  logout: () => supabaseClient.auth.signOut(),
  loginWithGoogle: () => supabaseClient.auth.signIn({ provider: "google" }),
});

const useAuthContext = () => useContext(AuthContext);
function AuthProvider(props: any) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setisAuthenticated] = useState(true)

  useEffect(() => {
    const session = supabaseClient.auth.session()
    setUser(session?.user as User);

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user as User)
        if (event === "SIGNED_IN") setisAuthenticated(true)
        else if (event === "SIGNED_OUT") setisAuthenticated(false)
      }
    );
    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const valueAuthContext: AuthContextInterface = {
    user,
    isAuthenticated,
    login: (data, userData) => supabaseClient.auth.signIn(data, userData),
    signup: (data) => supabaseClient.auth.signUp(data),
    logout: () => supabaseClient.auth.signOut(),
    loginWithGoogle: () => supabaseClient.auth.signIn({ provider: "google" }),
  };

  return (
    <AuthContext.Provider value={valueAuthContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, useAuthContext };
export default AuthProvider;