import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Award,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ArrowLeft,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Home,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Activity,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import type { Project, Certificate } from '../types';
import { AnalyticsTab } from '../components/AnalyticsTab';

type Tab = 'projects' | 'certificates' | 'analytics';

/* ─────────────── Subcomponents ─────────────── */

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  description: '',
  longDescription: '',
  image: '',
  tags: [],
  githubLink: '',
  liveLink: '',
  features: [],
};

const emptyCertificate: Omit<Certificate, 'id'> = {
  title: '',
  issuer: '',
  date: '',
  image: '',
  credentialLink: '',
  description: '',
};

/* ────── Tag Input Component ────── */
const TagInput: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}> = ({ tags, onChange, placeholder = 'Type and press Enter' }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.trim();
      if (value && !tags.includes(value)) {
        onChange([...tags, value]);
      }
      setInput('');
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="admin-input flex flex-wrap gap-2 min-h-[46px] !p-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-500/15 text-brand-300 text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((_, idx) => idx !== i))}
            className="hover:text-red-400 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-slate-300 placeholder:text-slate-600"
      />
    </div>
  );
};

/* ────── Image Upload Preview ────── */
const ImageUpload: React.FC<{
  existingUrl?: string;
  onFileChange: (file: File | null) => void;
}> = ({ existingUrl, onFileChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const { getImageUrl } = useData();
  const displayUrl = preview || getImageUrl(existingUrl || '');

  return (
    <div>
      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Image</label>
      <label className="cursor-pointer block">
        <div className="admin-input h-28 flex flex-col items-center justify-center gap-2 relative overflow-hidden group hover:border-brand-500/40 transition-colors">
          {displayUrl ? (
            <>
              <img src={displayUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center gap-1">
                <ImageIcon className="w-5 h-5 text-brand-400" />
                <span className="text-xs text-brand-300">Click to change</span>
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-slate-600" />
              <span className="text-xs text-slate-500">Click to upload image</span>
              <span className="text-xs text-slate-600">JPG, PNG, WebP (max 5MB)</span>
            </>
          )}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
};

/* ────── Project Form ────── */
const ProjectForm: React.FC<{
  project: Omit<Project, 'id'> | Project;
  onChange: (project: any) => void;
  onFileChange: (file: File | null) => void;
}> = ({ project, onChange, onFileChange }) => {
  const update = (key: string, value: any) => onChange({ ...project, [key]: value });

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Title *</label>
          <input
            className="admin-input"
            placeholder="Project title"
            value={project.title}
            onChange={(e) => update('title', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">GitHub Link</label>
          <input
            className="admin-input"
            placeholder="https://github.com/..."
            value={project.githubLink}
            onChange={(e) => update('githubLink', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Short Description *</label>
        <textarea
          className="admin-input resize-none"
          rows={2}
          placeholder="Brief description"
          value={project.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Full Description</label>
        <textarea
          className="admin-input resize-none"
          rows={3}
          placeholder="Detailed description"
          value={project.longDescription}
          onChange={(e) => update('longDescription', e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Live Link</label>
          <input
            className="admin-input"
            placeholder="https://example.com"
            value={project.liveLink}
            onChange={(e) => update('liveLink', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Tags</label>
          <TagInput tags={project.tags} onChange={(tags) => update('tags', tags)} placeholder="React, TypeScript..." />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Features</label>
        <TagInput tags={project.features} onChange={(f) => update('features', f)} placeholder="Feature name, press Enter" />
      </div>

      <ImageUpload existingUrl={project.image} onFileChange={onFileChange} />
    </div>
  );
};

/* ────── Certificate Form ────── */
const CertificateForm: React.FC<{
  cert: Omit<Certificate, 'id'> | Certificate;
  onChange: (cert: any) => void;
  onFileChange: (file: File | null) => void;
}> = ({ cert, onChange, onFileChange }) => {
  const update = (key: string, value: any) => onChange({ ...cert, [key]: value });

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Title *</label>
          <input
            className="admin-input"
            placeholder="Certificate title"
            value={cert.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Issuer *</label>
          <input
            className="admin-input"
            placeholder="Issuing organization"
            value={cert.issuer}
            onChange={(e) => update('issuer', e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Date</label>
          <input
            className="admin-input"
            placeholder="2024"
            value={cert.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Credential Link</label>
          <input
            className="admin-input"
            placeholder="https://credential.net/..."
            value={cert.credentialLink}
            onChange={(e) => update('credentialLink', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">Description</label>
        <textarea
          className="admin-input resize-none"
          rows={3}
          placeholder="Brief description of what you learned"
          value={cert.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>

      <ImageUpload existingUrl={cert.image} onFileChange={onFileChange} />
    </div>
  );
};

/* ─────────────── Toast Notification ─────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.9 }}
    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border shadow-xl ${
      type === 'success' ? 'border-emerald-500/30 shadow-emerald-500/10' : 'border-red-500/30 shadow-red-500/10'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
    )}
    <p className="text-sm text-white">{message}</p>
    <button onClick={onClose} className="ml-2 text-slate-500 hover:text-white transition-colors">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

/* ─────────────── Main Admin Panel ─────────────── */

const AdminPage = () => {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    resetData,
    getImageUrl,
    loading,
  } = useData();

  const [tab, setTab] = useState<Tab>('projects');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  /* New item form state */
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>(emptyProject);
  const [newCert, setNewCert] = useState<Omit<Certificate, 'id'>>(emptyCertificate);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  /* Edit item state */
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editCert, setEditCert] = useState<Certificate | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  /* Collapsible items */
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToastMsg = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* ─ Build FormData for project ─ */
  const buildProjectFormData = (project: Omit<Project, 'id'> | Project, imageFile: File | null) => {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('longDescription', project.longDescription || '');
    formData.append('githubLink', project.githubLink || '');
    formData.append('liveLink', project.liveLink || '');
    formData.append('tags', JSON.stringify(project.tags || []));
    formData.append('features', JSON.stringify(project.features || []));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return formData;
  };

  /* ─ Build FormData for certificate ─ */
  const buildCertFormData = (cert: Omit<Certificate, 'id'> | Certificate, imageFile: File | null) => {
    const formData = new FormData();
    formData.append('title', cert.title);
    formData.append('issuer', cert.issuer);
    formData.append('date', cert.date || '');
    formData.append('credentialLink', cert.credentialLink || '');
    formData.append('description', cert.description || '');
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return formData;
  };

  /* ─ Handlers ─ */
  const handleAddProject = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      showToastMsg('Title and description are required.', 'error');
      return;
    }
    setIsSaving(true);
    try {
      await addProject(buildProjectFormData(newProject, newImageFile));
      setNewProject(emptyProject);
      setNewImageFile(null);
      setShowAddForm(false);
      showToastMsg('Project added successfully!', 'success');
    } catch {
      showToastMsg('Failed to add project. Is the server running?', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCert = async () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      showToastMsg('Title and issuer are required.', 'error');
      return;
    }
    setIsSaving(true);
    try {
      await addCertificate(buildCertFormData(newCert, newImageFile));
      setNewCert(emptyCertificate);
      setNewImageFile(null);
      setShowAddForm(false);
      showToastMsg('Certificate added successfully!', 'success');
    } catch {
      showToastMsg('Failed to add certificate. Is the server running?', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEditProject = async () => {
    if (!editProject) return;
    setIsSaving(true);
    try {
      await updateProject(editProject.id, buildProjectFormData(editProject, editImageFile));
      setEditingId(null);
      setEditProject(null);
      setEditImageFile(null);
      showToastMsg('Project updated!', 'success');
    } catch {
      showToastMsg('Failed to update project.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEditCert = async () => {
    if (!editCert) return;
    setIsSaving(true);
    try {
      await updateCertificate(editCert.id, buildCertFormData(editCert, editImageFile));
      setEditingId(null);
      setEditCert(null);
      setEditImageFile(null);
      showToastMsg('Certificate updated!', 'success');
    } catch {
      showToastMsg('Failed to update certificate.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(id);
      showToastMsg('Project deleted.', 'success');
    } catch {
      showToastMsg('Failed to delete project.', 'error');
    }
  };

  const handleDeleteCert = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteCertificate(id);
      showToastMsg('Certificate deleted.', 'success');
    } catch {
      showToastMsg('Failed to delete certificate.', 'error');
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { key: 'analytics', label: 'Analytics', icon: Activity },
    { key: 'projects', label: 'Projects', icon: FolderKanban, count: data.projects.length },
    { key: 'certificates', label: 'Certificates', icon: Award, count: data.certificates.length },
  ];

  return (
    <div className="min-h-screen bg-surface-0 mesh-gradient">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="glass-strong border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2 rounded-xl glass text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-xl font-bold font-display text-white">Admin Panel</h1>
              <p className="text-xs text-slate-500">Manage your portfolio content</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetData}
            className="admin-btn admin-btn-secondary flex items-center gap-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Refresh
          </motion.button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
            <p className="text-slate-400">Loading data from database...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setShowAddForm(false);
                    setEditingId(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                    tab === t.key
                      ? 'bg-brand-500/15 text-brand-300 border border-brand-500/20'
                      : 'text-slate-500 hover:text-slate-300 glass'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                  {t.count !== undefined && (
                    <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-white/5">
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {tab === 'analytics' ? (
               <AnalyticsTab />
            ) : (
              <>
                {/* Add button */}
                {!showAddForm && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddForm(true)}
                className="w-full py-4 rounded-2xl glass border-2 border-dashed border-white/10 hover:border-brand-500/30 text-slate-500 hover:text-brand-400 transition-all flex items-center justify-center gap-2 mb-8"
              >
                <Plus className="w-5 h-5" />
                Add {tab === 'projects' ? 'Project' : 'Certificate'}
              </motion.button>
            )}

            {/* Add form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="glass rounded-2xl p-6 md:p-8 gradient-border mb-8 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white font-display">
                      New {tab === 'projects' ? 'Project' : 'Certificate'}
                    </h3>
                    <button
                      onClick={() => { setShowAddForm(false); setNewImageFile(null); }}
                      className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {tab === 'projects' ? (
                    <ProjectForm project={newProject} onChange={setNewProject} onFileChange={setNewImageFile} />
                  ) : (
                    <CertificateForm cert={newCert} onChange={setNewCert} onFileChange={setNewImageFile} />
                  )}

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/5">
                    <button
                      onClick={() => { setShowAddForm(false); setNewImageFile(null); }}
                      className="admin-btn admin-btn-secondary"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={tab === 'projects' ? handleAddProject : handleAddCert}
                      className="admin-btn admin-btn-primary flex items-center gap-2"
                      disabled={isSaving}
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      {isSaving ? 'Saving...' : 'Add'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            <div className="space-y-4">
              {tab === 'projects' &&
                data.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="glass rounded-2xl gradient-border overflow-hidden"
                  >
                    {editingId === project.id ? (
                      <div className="p-6 md:p-8">
                        <h3 className="text-lg font-bold text-white mb-6 font-display">Edit Project</h3>
                        <ProjectForm
                          project={editProject || project}
                          onChange={(p) => setEditProject({ ...p, id: project.id })}
                          onFileChange={setEditImageFile}
                        />
                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/5">
                          <button
                            onClick={() => { setEditingId(null); setEditProject(null); setEditImageFile(null); }}
                            className="admin-btn admin-btn-secondary"
                            disabled={isSaving}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEditProject}
                            className="admin-btn admin-btn-primary flex items-center gap-2"
                            disabled={isSaving}
                          >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                          >
                            <div className="flex items-center gap-3">
                              {project.image ? (
                                <img src={getImageUrl(project.image)} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                                  <FolderKanban className="w-5 h-5 text-brand-400" />
                                </div>
                              )}
                              <div>
                                <h4 className="text-white font-semibold">{project.title}</h4>
                                <p className="text-slate-500 text-sm line-clamp-1">{project.description}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => { setEditingId(project.id); setEditProject(project); }}
                              className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-brand-400 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id, project.title)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                              className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-colors"
                            >
                              {expandedId === project.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedId === project.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                                {project.longDescription && (
                                  <p className="text-slate-400 text-sm">{project.longDescription}</p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 text-xs rounded-md bg-brand-500/10 text-brand-300">{tag}</span>
                                  ))}
                                </div>
                                {project.features.length > 0 && (
                                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                                    {project.features.map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                )}
                                <div className="flex gap-3 text-xs">
                                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-brand-400 hover:underline">GitHub ↗</a>}
                                  {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Live ↗</a>}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}

              {tab === 'certificates' &&
                data.certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    layout
                    className="glass rounded-2xl gradient-border overflow-hidden"
                  >
                    {editingId === cert.id ? (
                      <div className="p-6 md:p-8">
                        <h3 className="text-lg font-bold text-white mb-6 font-display">Edit Certificate</h3>
                        <CertificateForm
                          cert={editCert || cert}
                          onChange={(c) => setEditCert({ ...c, id: cert.id })}
                          onFileChange={setEditImageFile}
                        />
                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/5">
                          <button
                            onClick={() => { setEditingId(null); setEditCert(null); setEditImageFile(null); }}
                            className="admin-btn admin-btn-secondary"
                            disabled={isSaving}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEditCert}
                            className="admin-btn admin-btn-primary flex items-center gap-2"
                            disabled={isSaving}
                          >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                          >
                            <div className="flex items-center gap-3">
                              {cert.image ? (
                                <img src={getImageUrl(cert.image)} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-white/5">
                                  <Award className="w-5 h-5 text-brand-400" />
                                </div>
                              )}
                              <div>
                                <h4 className="text-white font-semibold">{cert.title}</h4>
                                <p className="text-slate-500 text-sm">{cert.issuer} · {cert.date}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => { setEditingId(cert.id); setEditCert(cert); }}
                              className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-brand-400 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCert(cert.id, cert.title)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                              className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-colors"
                            >
                              {expandedId === cert.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedId === cert.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                {cert.description && <p className="text-slate-400 text-sm">{cert.description}</p>}
                                {cert.credentialLink && cert.credentialLink !== '#' && (
                                  <a href={cert.credentialLink} target="_blank" rel="noreferrer" className="text-xs text-brand-400 hover:underline">
                                    View Credential ↗
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>

            {/* Empty state */}
            {((tab === 'projects' && data.projects.length === 0) ||
              (tab === 'certificates' && data.certificates.length === 0)) && (
              <div className="text-center py-20">
                {tab === 'projects' ? (
                  <FolderKanban className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                ) : (
                  <Award className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                )}
                <p className="text-slate-500 text-lg mb-2">No {tab} yet.</p>
                <p className="text-slate-600 text-sm">Click "Add" above to create your first {tab === 'projects' ? 'project' : 'certificate'}.</p>
              </div>
            )}

            {/* Back to home */}
            <div className="mt-12 text-center">
              <a href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-400 transition-colors">
                <Home className="w-4 h-4" /> Back to Portfolio
              </a>
            </div>
            </>
            )}
            
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
