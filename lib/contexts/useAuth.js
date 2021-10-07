import { createContext, useContext } from "react";
import useFirebaseAuth from "@lib/hooks/useFirebaseAuth";

export const authContext = createContext({
  user: null,
  loading: true,
  loginWithEmail: async () => {},
  createUserWithEmail: async () => {},
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginWithGithub: async () => {},
});

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
