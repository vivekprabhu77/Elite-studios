import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { getCachedProjects, fetchProjects } from '../utils/portfolioStore';

const CATEGORY_TABS = [
  'ALL',
  'Website Design',
  'Graphic Design',
  'Digital Marketing',
  'Video Editing',
  'Live Streaming',
  'Social Media'
];

/**
 * Premium Skeleton Card matching the exact dimensions and layout of real project cards.
 * Uses GPU-accelerated CSS shimmer with prefers-reduced-motion support.
 */
function ProjectSkeletonCard() {
  return (
    <div
      className="flex flex-col bg-[#0b0b0b] border border-white/5 rounded-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Image Container Skeleton matching aspect-[16/10] */}
      <div className="relative aspect-[16/10] bg-[#070707] overflow-hidden border-b border-white/5">
        <div className="w-full h-full skeleton-shimmer" />
      </div>

      {/* Bottom Info Stacked Below Image */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
        <div>
          {/* Client & Year Header Skeleton */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-2.5 w-24 skeleton-shimmer rounded-none" />
            <div className="h-2.5 w-2 skeleton-shimmer rounded-none" />
            <div className="h-2.5 w-10 skeleton-shimmer rounded-none" />
          </div>

          {/* Title Skeleton (2 lines) */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-5/6 skeleton-shimmer rounded-none" />
            <div className="h-4 w-1/2 skeleton-shimmer rounded-none" />
          </div>

          {/* Category Badge Skeleton */}
          <div className="h-2.5 w-28 skeleton-shimmer rounded-none mb-6" />
        </div>

        {/* Action Button Link Skeleton */}
        <div className="pt-4 border-t border-white/5 mt-auto">
          <div className="h-3.5 w-32 skeleton-shimmer rounded-none" />
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Project Card with:
 * - Fixed aspect-[16/10] reservation to eliminate Cumulative Layout Shift (CLS)
 * - Amazon-style prioritization (eager + fetchpriority="high" for top cards, lazy for below-the-fold)
 * - Independent progressive rendering (each card renders immediately when loaded)
 * - Graceful per-image error fallback
 */
function ProjectCard({ project, idx }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasExternalLink = Boolean(project.website_url);
  const targetUrl = project.website_url || project.src;
  const linkLabel = hasExternalLink ? 'Visit Live Website' : 'View Full Image';

  // Prioritize the first viewport (first 3 cards on desktop, 1-2 on mobile)
  const isAboveTheFold = idx < 3;

  return (
    <div className="group flex flex-col bg-[#0b0b0b] border border-white/5 hover:border-[#d4b07c]/40 transition-all duration-500 rounded-none overflow-hidden">
      {/* Top Image Container - fixed aspect-ratio prevents layout shift */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[16/10] bg-[#050505] overflow-hidden cursor-pointer border-b border-white/5 block"
        title={`Open ${project.title} in new tab`}
      >
        {/* Skeleton Shimmer visible while image is downloading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton-shimmer pointer-events-none" />
        )}

        {project.src && !imageError ? (
          <img
            src={project.src}
            alt={project.client || project.title}
            width="800"
            height="500"
            loading={isAboveTheFold ? 'eager' : 'lazy'}
            fetchPriority={isAboveTheFold ? 'high' : 'low'}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 block ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d0d0d] text-white/30 p-4 font-mono text-center">
            <ImageIcon className="w-6 h-6 mb-2 text-[#d4b07c]/40" />
            <span className="text-[10px] uppercase tracking-widest text-white/30">
              {imageError ? 'Preview Unavailable' : 'No Image'}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Arrow Button */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#d4b07c] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </a>

      {/* Bottom Info Stacked Below Image */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
        <div>
          {/* Client & Year Header */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">
            <span className="text-[#d4b07c] font-bold">{project.client}</span>
            <span>•</span>
            <span>{project.year || '2026'}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-3 font-display group-hover:text-[#d4b07c] transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Category Badge */}
          <span className="text-[10px] uppercase tracking-widest text-[#d4b07c] font-bold block mb-4 font-display">
            {project.category}
          </span>
        </div>

        {/* Action Button Link - Opens in new tab */}
        <div className="pt-4 border-t border-white/5 mt-auto">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-[#d4b07c] transition-colors duration-300 group py-1"
          >
            <span>{linkLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#d4b07c]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const cached = getCachedProjects();
  const [projects, setProjects] = useState(cached || []);
  const [status, setStatus] = useState(cached && cached.length > 0 ? 'success' : 'loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const loadData = useCallback(async (isRetry = false) => {
    if (isRetry) {
      setStatus('loading');
      setErrorMessage('');
    }

    try {
      const data = await fetchProjects({ forceRefresh: isRetry });
      if (Array.isArray(data)) {
        setProjects(data);
        setStatus(data.length > 0 ? 'success' : 'empty');
      } else {
        setStatus('error');
        setErrorMessage('Unable to retrieve portfolio data.');
      }
    } catch (err) {
      console.error('[Portfolio Load Error]', err);
      // If we already had cached projects, maintain display without crashing
      if (!projects || projects.length === 0) {
        setStatus('error');
        setErrorMessage('Failed to connect to the database. Please check your connection.');
      }
    }
  }, [projects]);

  useEffect(() => {
    let isMounted = true;

    // Load fresh data
    loadData();

    // Listen for live updates (e.g. from Admin upload/delete)
    const handleUpdate = () => {
      if (isMounted) {
        loadData(true);
      }
    };

    window.addEventListener('portfolio-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio-updated', handleUpdate);
    };
  }, [loadData]);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'ALL') return true;
    const cat = (p.category || '').toLowerCase();
    const filter = activeCategory.toLowerCase();
    return cat.includes(filter) || filter.includes(cat);
  });

  return (
    <section id="work" className="scroll-mt-28 md:scroll-mt-36 pt-10 md:pt-14 pb-16 md:pb-24 px-6 md:px-12 bg-black relative overflow-hidden text-left min-h-[500px]">
      {/* Background Spotlight */}
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-white/[0.005] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold block mb-2 font-display">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none font-creative">
            OUR <span className="text-[#d4b07c]">PORTFOLIO</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 pb-4 border-b border-white/10 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#d4b07c] text-black shadow-[0_0_20px_rgba(212,176,124,0.3)]'
                    : 'bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 1. LOADING STATE: Premium Card Skeletons (Never display "No projects found" while fetching) */}
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        )}

        {/* 2. ERROR STATE: Dedicated graceful error notification */}
        {status === 'error' && (
          <div className="py-16 px-6 text-center border border-white/10 bg-[#080808]">
            <p className="text-xs text-red-400 uppercase tracking-widest font-mono mb-4">
              {errorMessage || 'Unable to load portfolio projects at this time.'}
            </p>
            <button
              onClick={() => loadData(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#c39f6b] transition-all cursor-pointer shadow-[0_0_20px_rgba(212,176,124,0.3)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* 3. EMPTY STATE: Database confirmed 0 projects exist */}
        {status === 'empty' && (
          <div className="py-20 text-center border border-dashed border-white/10 bg-[#080808]">
            <p className="text-xs text-white/40 uppercase tracking-widest font-mono">
              No projects currently published.
            </p>
          </div>
        )}

        {/* 4. SUCCESS STATE: Real Projects Grid */}
        {status === 'success' && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 bg-[#080808]">
                <p className="text-xs text-white/40 uppercase tracking-widest font-mono">
                  No projects found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id || idx}
                    project={project}
                    idx={idx}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
