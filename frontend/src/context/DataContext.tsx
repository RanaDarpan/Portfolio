import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PortfolioData } from '../types';

interface DataContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  addProject: (project: FormData) => Promise<void>;
  updateProject: (id: string, project: FormData) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addCertificate: (cert: FormData) => Promise<void>;
  updateCertificate: (id: string, cert: FormData) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  updateFilterTags: (tags: string[]) => Promise<void>;
  resetData: () => Promise<void>;
  getImageUrl: (path: string) => string;
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

const mapId = (item: any) => ({ ...item, id: item._id || item.id });

const API_URL = import.meta.env.VITE_API_URL || '';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>({ projects: [], certificates: [], filterTags: [] });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, certsRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/certificates`),
        fetch(`${API_URL}/api/settings`),
      ]);

      if (!projectsRes.ok || !certsRes.ok) {
        throw new Error('Server returned an error');
      }

      const projects = await projectsRes.json();
      const certificates = await certsRes.json();
      const settings = settingsRes.ok ? await settingsRes.json() : { filterTags: [] };

      setData({
        projects: (Array.isArray(projects) ? projects : []).map(mapId),
        certificates: (Array.isArray(certificates) ? certificates : []).map(mapId),
        filterTags: Array.isArray(settings?.filterTags) ? settings.filterTags : [],
      });
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProject = async (projectData: FormData) => {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      body: projectData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create project');
    }
    const newProject = mapId(await res.json());
    setData((prev) => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const updateProject = async (id: string, projectData: FormData) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'PUT',
      body: projectData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update project');
    }
    const updated = mapId(await res.json());
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? updated : p)),
    }));
  };

  const deleteProject = async (id: string) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('Failed to delete project');
    }
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addCertificate = async (certData: FormData) => {
    const res = await fetch(`${API_URL}/api/certificates`, {
      method: 'POST',
      body: certData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create certificate');
    }
    const newCert = mapId(await res.json());
    setData((prev) => ({ ...prev, certificates: [newCert, ...prev.certificates] }));
  };

  const updateCertificate = async (id: string, certData: FormData) => {
    const res = await fetch(`${API_URL}/api/certificates/${id}`, {
      method: 'PUT',
      body: certData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update certificate');
    }
    const updated = mapId(await res.json());
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) => (c.id === id ? updated : c)),
    }));
  };

  const deleteCertificate = async (id: string) => {
    const res = await fetch(`${API_URL}/api/certificates/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('Failed to delete certificate');
    }
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    if (path.startsWith('/assets')) return path; // Resolutions relative to frontend
    if (path.startsWith('/src/Assets/')) return path.replace('/src/Assets/', '/assets/projects/'); // Old MongoDB fallback
    if (path.startsWith('/uploads/')) return `${API_URL}${path}`;
    if (path.startsWith('uploads/')) return `${API_URL}/${path}`;
    return path;
  };

  const updateFilterTags = async (tags: string[]) => {
    const res = await fetch(`${API_URL}/api/settings/tags`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filterTags: tags }),
    });
    if (!res.ok) {
      throw new Error('Failed to update filter tags');
    }
    const updatedSettings = await res.json();
    setData(prev => ({ ...prev, filterTags: updatedSettings.filterTags || [] }));
  };

  const resetData = async () => {
    await fetchData();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        addProject,
        updateProject,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateFilterTags,
        resetData,
        getImageUrl,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
