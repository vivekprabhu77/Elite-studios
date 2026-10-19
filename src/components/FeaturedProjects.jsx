import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
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
      className="flex flex-col bg-[#393E41] border border-[#F6F7EB]/10 rounded-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Image Container Skeleton matching aspect-[16/10] */}
      <div className="relative aspect-[16/10] bg-[#2f3336] overflow-hidden border-b border-[#F6F7EB]/10">
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
        <div className="pt-4 border-t border-[#F6F7EB]/10 mt-auto">
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
    <div className="group flex flex-col bg-[#393E41] border border-transparent hover:border-[#E94F37]/50 transition-all duration-500 rounded-none overflow-hidden shadow-md">
      {/* Top Image Container - fixed aspect-ratio prevents layout shift */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[16/10] bg-[#2f3336] overflow-hidden cursor-pointer border-b border-[#F6F7EB]/10 block"
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
            className={`w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 block ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#2f3336] text-[#F6F7EB]/40 p-4 font-mono text-center">
            <ImageIcon className="w-6 h-6 mb-2 text-[#E94F37]/50" />
            <span className="text-[10px] uppercase tracking-widest text-[#F6F7EB]/40">
              {imageError ? 'Preview Unavailable' : 'No Image'}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Arrow Button */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#E94F37] text-[#F6F7EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </a>

      {/* Bottom Info Stacked Below Image */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
        <div>
          {/* Client & Year Header */}
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-[#F6F7EB]/50 mb-2">
            <span className="text-[#E94F37] font-bold">{project.client}</span>
            <span>•</span>
            <span>{project.year || '2026'}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#F6F7EB] tracking-tight leading-snug mb-3 font-display group-hover:text-[#E94F37] transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          {/* Category Badge */}
          <span className="text-[10px] uppercase tracking-widest text-[#E94F37] font-bold block mb-4 font-display">
            {project.category}
          </span>
        </div>

        {/* Action Button Link - Opens in new tab */}
        <div className="pt-4 border-t border-[#F6F7EB]/10 mt-auto">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F6F7EB]/80 hover:text-[#E94F37] transition-colors duration-300 group py-1"
          >
            <span>{linkLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#E94F37]" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const resolveMatchingCategory = useCallback((catName) => {
    if (!catName) return null;
    const clean = catName.trim().toLowerCase();
    return CATEGORY_TABS.find(
      (tab) => tab.toLowerCase() === clean ||
               clean.includes(tab.toLowerCase()) ||
               tab.toLowerCase().includes(clean)
    ) || null;
  }, []);

  const getInitialCategory = () => {
    const fromSearch = searchParams.get('category');
    const fromState = location.state?.category;
    const match = resolveMatchingCategory(fromSearch || fromState);
    return match || 'ALL';
  };

  const cached = getCachedProjects();
  const [projects, setProjects] = useState(cached || []);
  const [status, setStatus] = useState(cached && cached.length > 0 ? 'success' : 'loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState(getInitialCategory);

  // Sync category if URL search params or route state change
  useEffect(() => {
    const fromSearch = searchParams.get('category');
    const fromState = location.state?.category;
    const target = fromSearch || fromState;
    if (target) {
      const match = resolveMatchingCategory(target);
      if (match) {
        setActiveCategory(match);
      }
    } else if (fromSearch === null && !fromState) {
      setActiveCategory('ALL');
    }
  }, [searchParams, location.state, resolveMatchingCategory]);

  const handleCategorySelect = (tab) => {
    setActiveCategory(tab);
    const newParams = new URLSearchParams(searchParams);
    if (tab === 'ALL') {
      newParams.delete('category');
    } else {
      newParams.set('category', tab);
    }
    setSearchParams(newParams, { replace: true });
  };

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
    <section id="work" className="scroll-mt-28 md:scroll-mt-36 pt-10 md:pt-14 pb-16 md:pb-24 px-6 md:px-12 bg-[#F6F7EB] relative overflow-hidden text-left min-h-[500px]">
      {/* Background Spotlight */}
      <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-[#E94F37]/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#E94F37] font-bold block mb-2 font-display">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#393E41] tracking-tight leading-none font-creative">
            OUR <span className="text-[#E94F37]">PORTFOLIO</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 pb-4 border-b border-[#393E41]/15 overflow-x-auto no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => handleCategorySelect(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#E94F37] text-[#F6F7EB] shadow-[0_0_20px_rgba(233,79,55,0.3)]'
                    : 'bg-[#393E41]/10 text-[#393E41]/70 hover:text-[#393E41] hover:bg-[#393E41]/20 border border-[#393E41]/15'
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
          <div className="py-16 px-6 text-center border border-[#393E41]/20 bg-[#393E41] text-[#F6F7EB]">
            <p className="text-xs text-red-300 uppercase tracking-widest font-mono mb-4">
              {errorMessage || 'Unable to load portfolio projects at this time.'}
            </p>
            <button
              onClick={() => loadData(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E94F37] text-[#F6F7EB] font-extrabold text-xs uppercase tracking-widest hover:bg-[#d43f28] transition-all cursor-pointer shadow-[0_0_20px_rgba(233,79,55,0.3)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* 3. EMPTY STATE: Database confirmed 0 projects exist */}
        {status === 'empty' && (
          <div className="py-20 text-center border border-dashed border-[#393E41]/25 bg-[#393E41] text-[#F6F7EB]">
            <p className="text-xs text-[#F6F7EB]/60 uppercase tracking-widest font-mono">
              No projects currently published.
            </p>
          </div>
        )}

        {/* 4. SUCCESS STATE: Real Projects Grid */}
        {status === 'success' && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#393E41]/25 bg-[#393E41] text-[#F6F7EB]">
                <p className="text-xs text-[#F6F7EB]/60 uppercase tracking-widest font-mono">
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
