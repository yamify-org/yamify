import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@prisma/client';
import { useClerk } from '@clerk/nextjs';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  getUserProfile: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      
      setUser: (user) => {
        set({ 
          user,
          isAuthenticated: !!user,
          error: null
        });
      },
      
      logout: async () => {
        try {
          set({ isLoading: true });
          // Utiliser useClerk pour le logout doit être fait dans un composant React
          // Ici nous préparons juste le state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
          set({ 
            error: 'Failed to logout', 
            isLoading: false 
          });
        }
      },
      
      getUserProfile: async () => {
        try {
          set({ isLoading: true });
          // Dans un composant React, vous récupéreriez les données utilisateur depuis Clerk
          // puis mettriez à jour le store avec setUser
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to get user profile:', error);
          set({ 
            error: 'Failed to get user profile', 
            isLoading: false 
          });
        }
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Hook pour utiliser l'authentification avec Clerk et Zustand ensemble
export const useAuth = () => {
  const authStore = useAuthStore();
  const clerk = useClerk();
  
  const login = async () => {
    try {
      authStore.setLoading(true);
      // Rediriger vers la page de login Clerk
      clerk.openSignIn({
        redirectUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Login error:', error);
      authStore.setError('Failed to login');
      authStore.setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      authStore.setLoading(true);
      await clerk.signOut();
      authStore.setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      authStore.setError('Failed to logout');
    } finally {
      authStore.setLoading(false);
    }
  };
  
  return {
    ...authStore,
    login,
    logout
  };
};
