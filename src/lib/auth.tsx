import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "ntoc.auth.v1";

export type AuthUser = {
  email: string;
  name: string;
  role: string;
  initials: string;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
};

const DEMO_EMAIL = "demo@ntoc.com";
const DEMO_PASSWORD = "demo123";

const DEMO_USER: AuthUser = {
  email: DEMO_EMAIL,
  name: "Jordan Miller",
  role: "Administrator",
  initials: "JM",
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw =
        (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) ||
        (typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY));
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        if (parsed?.email) setUser(parsed);
      }
    } catch {
      /* ignore */
    }
    setIsReady(true);
  }, []);

  const login: AuthState["login"] = async (email, password, remember = true) => {
    await new Promise((r) => setTimeout(r, 350));
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUser(DEMO_USER);
      try {
        const store = remember ? localStorage : sessionStorage;
        store.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
        (remember ? sessionStorage : localStorage).removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password. Try demo@ntoc.com / demo123." };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isReady, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const DEMO_CREDENTIALS = { email: DEMO_EMAIL, password: DEMO_PASSWORD };
