import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { fetchProfile } from '../services/auth';
import type { Role, UserProfile } from '../types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  role: Role | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(u: User | null) {
    if (!u) {
      setProfile(null);
      return;
    }
    const p = await fetchProfile(u.uid);
    setProfile(p);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      await loadProfile(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value: AuthState = {
    user,
    profile,
    role: profile?.role ?? null,
    loading,
    refreshProfile: () => loadProfile(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
