import { create } from 'zustand';
import { Yam } from '@prisma/client';

type YamState = {
  yams: Yam[];
  selectedYam: Yam | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchYams: (workspaceId?: string) => Promise<void>;
  createYam: (data: {
    name: string;
    namespace: string;
    workspaceId: string;
    kubeConfig: string;
    domain?: string;
  }) => Promise<Yam | null>;
  getYamById: (id: string) => Promise<void>;
  getYamByName: (name: string, workspaceId: string) => Promise<void>;
  deleteYam: (id: string) => Promise<void>;
  selectYam: (yam: Yam | null) => void;
};

export const useYamStore = create<YamState>((set, get) => ({
  yams: [],
  selectedYam: null,
  isLoading: false,
  error: null,

  fetchYams: async (workspaceId?: string) => {
    try {
      set({ isLoading: true, error: null });
      
      let url = '/api/yams';
      if (workspaceId) {
        url = `/api/yams/${workspaceId}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch yams');
      }
      
      const yams = await response.json();
      set({ yams, isLoading: false });
      
      // Sélectionne automatiquement le premier yam si aucun n'est sélectionné
      if (!get().selectedYam && yams.length > 0) {
        set({ selectedYam: yams[0] });
      }
    } catch (error) {
      console.error('Error fetching yams:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch yams', 
        isLoading: false 
      });
    }
  },

  createYam: async (data) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('/api/yams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create yam');
      }
      
      const newYam = await response.json();
      
      // Ajoute le nouveau yam à la liste et le sélectionne
      set(state => ({ 
        yams: [...state.yams, newYam],
        selectedYam: newYam,
        isLoading: false 
      }));
      
      return newYam;
    } catch (error) {
      console.error('Error creating yam:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create yam', 
        isLoading: false 
      });
      return null;
    }
  },

  getYamById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/yams/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch yam');
      }
      
      const yam = await response.json();
      set({ selectedYam: yam, isLoading: false });
    } catch (error) {
      console.error('Error fetching yam by id:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch yam', 
        isLoading: false 
      });
    }
  },

  getYamByName: async (name: string, workspaceId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/yams/get/${name}?workspaceId=${workspaceId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch yam');
      }
      
      const yam = await response.json();
      set({ selectedYam: yam, isLoading: false });
    } catch (error) {
      console.error('Error fetching yam by name:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch yam', 
        isLoading: false 
      });
    }
  },

  deleteYam: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/yams/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete yam');
      }
      
      // Retire le yam de la liste
      set(state => {
        const updatedYams = state.yams.filter(yam => yam.id !== id);
        
        // Si le yam supprimé était sélectionné, sélectionne le premier de la liste ou null
        const newSelectedYam = 
          state.selectedYam?.id === id 
            ? updatedYams[0] || null 
            : state.selectedYam;
        
        return { 
          yams: updatedYams,
          selectedYam: newSelectedYam,
          isLoading: false 
        };
      });
    } catch (error) {
      console.error('Error deleting yam:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete yam', 
        isLoading: false 
      });
    }
  },

  selectYam: (yam) => {
    set({ selectedYam: yam });
  },
}));
