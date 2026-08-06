const API_BASE_URL = '/api/projects';
const UPLOAD_API_URL = '/api/upload';

const DEFAULT_PROJECTS = [
  {
    id: 'default-1',
    client: 'Virtue Arch',
    title: 'Minimalist brutalist villa & architectural identity.',
    category: 'Website Design',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  },
  {
    id: 'default-2',
    client: 'Aura Cosmetics',
    title: 'Luxury skincare e-commerce & bottle mockups.',
    category: 'Graphic Design',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  },
  {
    id: 'default-3',
    client: 'Kinetic Lab',
    title: 'Fluid kinetic sculpture motion design system.',
    category: 'Video Editing',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  },
  {
    id: 'default-4',
    client: 'Elevate Partners',
    title: 'Next-gen venture investment web platform.',
    category: 'Website Design',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  },
  {
    id: 'default-5',
    client: 'Vogue Studios',
    title: 'High-fashion editorial campaign & social branding.',
    category: 'Social Media',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  },
  {
    id: 'default-6',
    client: 'Apex Marketing',
    title: 'Global omnichannel digital marketing strategy.',
    category: 'Digital Marketing',
    year: '2026',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    website_url: ''
  }
];

const STORAGE_KEY = 'elite_portfolio_projects';

// Background Image Preloader for Ultra Fast Portfolio Image Loading
export function preloadProjectImages(projects) {
  if (!Array.isArray(projects) || typeof window === 'undefined') return;
  projects.forEach((p) => {
    if (p && p.src) {
      const img = new Image();
      img.src = p.src;
    }
  });
}

// Helper to compress & convert image File to lightweight Base64
function compressImage(file, maxWidth = 1920, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = () => resolve(null);
  });
}

function formatProjectSrc(src) {
  if (!src) return '';
  if (src.startsWith('/uploads/') || src.startsWith('/api/r2-image/')) {
    const domain = window.location.origin;
    return `${domain}${src}`;
  }
  return src;
}

export function getProjectsLocal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        preloadProjectImages(parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load local storage:', err);
  }
  preloadProjectImages(DEFAULT_PROJECTS);
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

        // Merge DB projects on top of default showcases
        const dbIds = new Set(formatted.map(f => String(f.id)));
        const combined = [...formatted, ...DEFAULT_PROJECTS.filter(d => !dbIds.has(String(d.id)))];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
        preloadProjectImages(combined);
        window.dispatchEvent(new CustomEvent('portfolio-updated'));
        return combined;
      }
    }
  } catch (err) {
    console.warn('[Vercel API Notice] Backend API offline:', err.message);
  }
  const local = getProjectsLocal();
  preloadProjectImages(local);
  return local;
}

export function getProjects() {
  fetchProjects();
  const local = getProjectsLocal();
  preloadProjectImages(local);
  return local;
}

export function saveProjectsLocal(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    preloadProjectImages(projects);
    window.dispatchEvent(new CustomEvent('portfolio-updated'));
  } catch (err) {
    console.error('Failed to save local storage:', err);
  }
}

export async function addProject({ title, client, category, year, websiteUrl, website_url, imageFile, imagePreview }) {
  const urlToSave = websiteUrl || website_url || '';
  let finalImageSrc = imagePreview || '';

  if (imageFile) {
    try {
      const imageBase64 = await compressImage(imageFile);
      if (imageBase64) {
        const uploadRes = await fetch(UPLOAD_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64,
            filename: imageFile.name,
            mimeType: 'image/jpeg'
          })
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.publicUrl) {
            finalImageSrc = uploadData.publicUrl;
          }
        }
      }
    } catch (uploadErr) {
      console.warn('[Cloudflare R2 Upload Notice] Falling back to preview src:', uploadErr.message);
    }
  }

  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        client,
        category,
        year: year || new Date().getFullYear().toString(),
        website_url: urlToSave,
        src: finalImageSrc
      })
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
    console.warn('[API Notice] Vercel Serverless DB offline, saving locally:', err.message);
  }

  const current = getProjectsLocal();
  const projectToAdd = {
    id: `project-${Date.now()}`,
    client,
    title,
    category,
    year: year || new Date().getFullYear().toString(),
    type: 'image',
    src: finalImageSrc || '',
    website_url: urlToSave
  };
  const updated = [projectToAdd, ...current];
  saveProjectsLocal(updated);
  return projectToAdd;
}

export async function deleteProject(id) {
  try {
    const res = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      await fetchProjects();
      return;
    }
  } catch (err) {
    console.warn('Delete error, deleting locally:', err.message);
  }

  const current = getProjectsLocal();
  const updated = current.filter((p) => String(p.id) !== String(id));
  saveProjectsLocal(updated);
}

export async function clearAllProjects() {
  saveProjectsLocal([]);
}

export async function resetProjects() {
  saveProjectsLocal(DEFAULT_PROJECTS);
}
