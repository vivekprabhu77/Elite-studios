const API_BASE_URL = '/api/projects';
const UPLOAD_API_URL = '/api/upload';

const STORAGE_KEY = 'elite_portfolio_projects_v2';
const MEMORY_CACHE_TTL = 30000; // 30 seconds fresh memory cache
const STORAGE_CACHE_TTL = 5 * 60 * 1000; // 5 minutes storage fallback

let memoryCache = null;
let lastFetchedTime = 0;
let inFlightPromise = null;

// No-op export for backwards compatibility (browser native eager/lazy loading replaces this)
export function preloadProjectImages(_projects) {
  // Intentionally avoided: native browser loading="eager" and fetchpriority="high"
  // handles visible images without flooding the network pipeline.
}

// Helper to compress & convert image File to lightweight WebP/JPEG Base64
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

        // Prefer modern WebP format for smaller file size, fallback to JPEG
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
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
    const domain = typeof window !== 'undefined' ? window.location.origin : '';
    return `${domain}${src}`;
  }
  return src;
}

/**
 * Returns cached projects if available and recent, or null if uninitialized/expired.
 * This allows components to know data is loading instead of incorrectly assuming projects.length === 0.
 */
export function getCachedProjects() {
  if (memoryCache && Array.isArray(memoryCache) && memoryCache.length > 0) {
    return memoryCache;
  }

  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.data) && parsed.data.length > 0) {
        const age = Date.now() - (parsed.timestamp || 0);
        if (age < STORAGE_CACHE_TTL) {
          memoryCache = parsed.data;
          lastFetchedTime = parsed.timestamp;
          return parsed.data;
        }
      }
    }
  } catch (err) {
    console.warn('[Cache Notice] Unable to read localStorage:', err.message);
  }
  return null;
}

export function getProjectsLocal() {
  const cached = getCachedProjects();
  return cached || [];
}

/**
 * Intelligent project fetcher with:
 * - In-flight deduplication (multiple calls share the same promise)
 * - In-memory cache freshness check
 * - Force refresh bypass option (used by admin uploads/deletes)
 * - Safe error handling
 */
export async function fetchProjects(options = {}) {
  const forceRefresh = Boolean(options.forceRefresh);

  // Return fresh memory cache if available and not forcing refresh
  if (!forceRefresh && memoryCache && (Date.now() - lastFetchedTime < MEMORY_CACHE_TTL)) {
    return memoryCache;
  }

  // Deduplicate in-flight requests
  if (!forceRefresh && inFlightPromise) {
    return inFlightPromise;
  }

  const fetchPromise = (async () => {
    try {
      const url = forceRefresh ? `${API_BASE_URL}?fresh=true` : API_BASE_URL;
      const res = await fetch(url, {
        headers: forceRefresh ? { 'Cache-Control': 'no-cache' } : {}
      });

      if (res.ok) {
        const dbProjects = await res.json();
        if (Array.isArray(dbProjects)) {
          const formatted = dbProjects.map((p) => ({
            ...p,
            src: formatProjectSrc(p.src)
          }));

          memoryCache = formatted;
          lastFetchedTime = Date.now();

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({
                data: formatted,
                timestamp: lastFetchedTime
              }));
            } catch (storageErr) {
              console.warn('[Cache Storage Warning]', storageErr.message);
            }
          }

          return formatted;
        }
      }
    } catch (err) {
      console.warn('[Portfolio API Notice] Fetch error:', err.message);
    }

    // Fallback to cached data if network failed
    const fallback = getCachedProjects();
    if (fallback) {
      return fallback;
    }
    return memoryCache || [];
  })();

  if (!forceRefresh) {
    inFlightPromise = fetchPromise;
  }

  try {
    const result = await fetchPromise;
    return result;
  } finally {
    if (!forceRefresh) {
      inFlightPromise = null;
    }
  }
}

export function getProjects() {
  fetchProjects();
  return getProjectsLocal();
}

export function saveProjectsLocal(projects) {
  try {
    memoryCache = projects;
    lastFetchedTime = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      data: projects,
      timestamp: lastFetchedTime
    }));
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
        const isWebP = imageBase64.startsWith('data:image/webp');
        const uploadRes = await fetch(UPLOAD_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64,
            filename: imageFile.name,
            mimeType: isWebP ? 'image/webp' : (imageFile.type || 'image/jpeg')
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
      // Force refresh cache and notify components
      await fetchProjects({ forceRefresh: true });
      window.dispatchEvent(new CustomEvent('portfolio-updated'));
      return formatted;
    }
  } catch (err) {
    console.warn('[API Notice] Serverless DB offline, saving locally:', err.message);
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
      await fetchProjects({ forceRefresh: true });
      window.dispatchEvent(new CustomEvent('portfolio-updated'));
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
  saveProjectsLocal([]);
}
