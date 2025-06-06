import { create } from 'zustand';
import { Project } from '@prisma/client';

type ProjectState = {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    yamId?: string;
    status?: string;
    type?: string;
  };

  // Actions
  fetchProjects: (yamId?: string) => Promise<void>;
  getProjectById: (id: string) => Promise<void>;
  createProject: (data: {
    name: string;
    type: string;
    namespace: string;
    yamId: string;
    workspaceId: string;
    chart?: string;
    valuesYaml?: string;
    url?: string;
    username?: string;
    password?: string;
  }) => Promise<Project | null>;
  updateProject: (id: string, data: Partial<Project>) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<void>;
  selectProject: (project: Project | null) => void;
  setFilters: (filters: Partial<ProjectState['filters']>) => void;
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
  filters: {},

  fetchProjects: async (yamId?: string) => {
    try {
      set({ isLoading: true, error: null });
      
      let url = '/api/projects';
      const filters = get().filters;
      
      // Construire les paramètres de requête basés sur les filtres
      const params = new URLSearchParams();
      
      if (yamId) {
        params.append('yamId', yamId);
      } else if (filters.yamId) {
        params.append('yamId', filters.yamId);
      }
      
      if (filters.status) {
        params.append('status', filters.status);
      }
      
      if (filters.type) {
        params.append('type', filters.type);
      }
      
      // Ajouter les paramètres à l'URL si nécessaire
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const projects = await response.json();
      set({ projects, isLoading: false });
      
      // Sélectionne automatiquement le premier projet si aucun n'est sélectionné
      if (!get().selectedProject && projects.length > 0) {
        set({ selectedProject: projects[0] });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch projects', 
        isLoading: false 
      });
    }
  },

  getProjectById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      
      const project = await response.json();
      set({ selectedProject: project, isLoading: false });
    } catch (error) {
      console.error('Error fetching project:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch project', 
        isLoading: false 
      });
    }
  },

  createProject: async (data) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      
      const newProject = await response.json();
      
      // Ajoute le nouveau projet à la liste et le sélectionne
      set(state => ({ 
        projects: [...state.projects, newProject],
        selectedProject: newProject,
        isLoading: false 
      }));
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create project', 
        isLoading: false 
      });
      return null;
    }
  },

  updateProject: async (id: string, data: Partial<Project>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      
      const updatedProject = await response.json();
      
      // Met à jour le projet dans la liste
      set(state => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, ...updatedProject } : p
        ),
        selectedProject: state.selectedProject?.id === id 
          ? { ...state.selectedProject, ...updatedProject } 
          : state.selectedProject,
        isLoading: false
      }));
      
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update project', 
        isLoading: false 
      });
      return null;
    }
  },

  deleteProject: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      
      // Retire le projet de la liste
      set(state => {
        const updatedProjects = state.projects.filter(project => project.id !== id);
        
        // Si le projet supprimé était sélectionné, sélectionne le premier de la liste ou null
        const newSelectedProject = 
          state.selectedProject?.id === id 
            ? updatedProjects[0] || null 
            : state.selectedProject;
        
        return { 
          projects: updatedProjects,
          selectedProject: newSelectedProject,
          isLoading: false 
        };
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete project', 
        isLoading: false 
      });
    }
  },

  selectProject: (project) => {
    set({ selectedProject: project });
  },
  
  setFilters: (filters) => {
    set(state => ({ 
      filters: { ...state.filters, ...filters } 
    }));
    // Refetch avec les nouveaux filtres appliqués
    get().fetchProjects();
  },
}));
