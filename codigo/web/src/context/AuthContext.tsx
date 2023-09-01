import * as React from "react";

import { isBrowserReady } from "@/shared/utils/isBrowserReady";

type AuthParams = {
  token: string;
  profile: {
    name: string;
    email: string;
    role: string;
    lastLoginAt: string;
  };
};

type AuthContextData = {
  isAuthenticated: boolean;
  profile: {};
  authenticate: ({ token, profile }: AuthParams) => void;
  logout: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  authenticate: () => {},
  profile: {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: ProviderProps) {
  const localToken = isBrowserReady() && localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => Boolean(localToken) ?? false
  );

  const [profile, setProfile] = React.useState({});

  function authenticate({ token, profile }: AuthParams) {
    setIsAuthenticated(true);

    if (isBrowserReady()) {
      localStorage.setItem("token", token);
      localStorage.setItem("profile", JSON.stringify(profile));

      setProfile(profile);
    }
  }

  function logout() {
    setIsAuthenticated(false);
    if (isBrowserReady()) {
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      setProfile({});
    }
  }

  return (
    <AuthContext.Provider
      value={{ authenticate, isAuthenticated, profile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be within its context");
  }
  return context;
}
