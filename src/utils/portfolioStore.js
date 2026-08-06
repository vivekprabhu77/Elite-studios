const API_BASE_URL = 'http://localhost:5000/api/projects';

const DEFAULT_PROJECTS = [];

const STORAGE_KEY = 'elite_portfolio_projects';

// Helper to format image URLs from local uploads or R2 server
function formatProjectSrc(src) {
  if (!src) return '';
  if (src.startsWith('/uploads/') || src.startsWith('/api/')) {
    return `http://localhost:5000${src}`;
  }
  return src;
}

export function getProjectsLocal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load local storage:', err);
  }
  return DEFAULT_PROJECTS;
}

export async function fetchProjects() {
  try {
    const res = await fetch(API_BASE_URL);
    if (res.ok) {
      const dbProjects = await res.json();
      if (Array.isArray(dbProjects)) {
        const formatted = dbProjects.map((p) => ({
          ...p,
          src: formatProjectSrc(p.src)
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formatted));
        window.dispatchEvent(new CustomEvent('portfolio-updated'));
        return formatted;
      }
    }
  } catch (err) {
    console.warn('[MySQL API Notice] Could not reach backend server at http://localhost:5000:', err.message);
  }
  return getProjectsLocal();
}

export function getProjects() {
  // Fire async fetch to update store if backend available
  fetchProjects();
  return getProjectsLocal();
}

export function saveProjectsLocal(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('portfolio-updated'));
  } catch (err) {
    console.error('Failed to save local storage:', err);
  }
}

export async function addProject({ title, client, category, year, websiteUrl, website_url, imageFile, imagePreview }) {
  const urlToSave = websiteUrl || website_url || '';
  // 1. Try sending to MySQL backend with multipart file upload
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('client', client);
    formData.append('category', category);
    formData.append('year', year || new Date().getFullYear().toString());
    if (urlToSave) {
      formData.append('website_url', urlToSave);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imagePreview) {
      formData.append('src', imagePreview);
    }

    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const created = await res.json();
      const formatted = {
        ...created,
        src: formatProjectSrc(created.src)
      };
      await fetchProjects();
      return formatted;
    }
  } catch (err) {
    console.warn('Backend server unavailable, saving project locally:', err.message);
  }

  // 2. Local fallback save
  const current = getProjectsLocal();
  const projectToAdd = {
    id: `project-${Date.now()}`,
    client,
    title,
    category,
    year: year || new Date().getFullYear().toString(),
    type: 'image',
    src: imagePreview || '',
    website_url: urlToSave
  };
  const updated = [projectToAdd, ...current];
  saveProjectsLocal(updated);
  return projectToAdd;
}

export async function deleteProject(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      await fetchProjects();
      return;
    }
  } catch (err) {
    console.warn('Backend server delete error, deleting locally:', err.message);
  }

  const current = getProjectsLocal();
  const updated = current.filter((p) => String(p.id) !== String(id));
  saveProjectsLocal(updated);
}

export async function clearAllProjects() {
  try {
    await fetch(`${API_BASE_URL}/clear-all`, { method: 'POST' });
  } catch (err) {
    console.warn('Could not clear backend DB:', err);
  }
  saveProjectsLocal([]);
}

export async function resetProjects() {
  await clearAllProjects();
}
