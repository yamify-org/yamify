import { create } from 'zustand';
import { Workspace } from '@prisma/client';

type WorkspaceState = {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWorkspaces: (userId: string) => Promise<void>;
  createWorkspace: (data: { name: string; userId: string }) => Promise<Workspace | null>;
  deleteWorkspace: (id: string) => Promise<void>;
  selectWorkspace: (workspace: Workspace | null) => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  selectedWorkspace: null,
  isLoading: false,
  error: null,

  fetchWorkspaces: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Appel API pour récupérer les workspaces de l'utilisateur
      const response = await fetch(`/api/workspaces/list?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch workspaces');
      }
      
      const workspaces = await response.json();
      set({ workspaces, isLoading: false });
      
      // Sélectionne automatiquement le premier workspace si aucun n'est sélectionné
      if (!get().selectedWorkspace && workspaces.length > 0) {
        set({ selectedWorkspace: workspaces[0] });
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch workspaces', 
        isLoading: false 
      });
    }
  },

  createWorkspace: async (data) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      
      const newWorkspace = await response.json();
      
      // Ajoute le nouveau workspace à la liste et le sélectionne
      set(state => ({ 
        workspaces: [...state.workspaces, newWorkspace],
        selectedWorkspace: newWorkspace,
        isLoading: false 
      }));
      
      return newWorkspace;
    } catch (error) {
      console.error('Error creating workspace:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create workspace', 
        isLoading: false 
      });
      return null;
    }
  },

  deleteWorkspace: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/workspaces/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete workspace');
      }
      
      // Retire le workspace de la liste
      set(state => {
        const updatedWorkspaces = state.workspaces.filter(workspace => workspace.id !== id);
        
        // Si le workspace supprimé était sélectionné, sélectionne le premier de la liste ou null
        const newSelectedWorkspace = 
          state.selectedWorkspace?.id === id 
            ? updatedWorkspaces[0] || null 
            : state.selectedWorkspace;
        
        return { 
          workspaces: updatedWorkspaces,
          selectedWorkspace: newSelectedWorkspace,
          isLoading: false 
        };
      });
    } catch (error) {
      console.error('Error deleting workspace:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete workspace', 
        isLoading: false 
      });
    }
  },

  selectWorkspace: (workspace) => {
    set({ selectedWorkspace: workspace });
  },
}));
