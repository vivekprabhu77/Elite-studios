import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject, resetProjects } from '../utils/portfolioStore';
import { Upload, Trash2, Plus, RefreshCw, CheckCircle, Image as ImageIcon, ShieldCheck, ArrowUpRight, Globe, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('Website Design & Development');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setProjects(getProjects());
    const handleUpdate = () => setProjects(getProjects());
    window.addEventListener('portfolio-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-updated', handleUpdate);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !client || (!imageFile && !imagePreview)) {
      alert('Please provide a Client Name, Title, and upload an Image file.');
      return;
    }

    setIsUploading(true);

    try {
      await addProject({
        title,
        client,
        category,
        year: year || new Date().getFullYear().toString(),
        websiteUrl,
        imageFile,
        imagePreview
      });

      setTitle('');
      setClient('');
      setWebsiteUrl('');
      setImageFile(null);
      setImagePreview(null);
      setSuccessMsg('New project successfully saved to Cloudflare R2 & published live!');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      alert('Failed to publish project: ' + (err.message || 'Error occurred during upload'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this project from the portfolio?')) {
      deleteProject(id);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset portfolio items to default sample projects?')) {
      resetProjects();
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-6 md:px-12 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#d4b07c]" />
              <span className="text-xs uppercase tracking-widest text-[#d4b07c] font-bold font-mono">
                ADMIN PORTAL
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight font-creative">
              PORTFOLIO <span className="text-[#d4b07c]">MANAGEMENT</span>
            </h1>
            <p className="text-xs text-gray-400 font-light mt-1">
              Upload images and publish projects directly to the live portfolio section.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all duration-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4b07c] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300"
            >
              <span>View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
          {/* Left Column: Upload New Project Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 md:p-8 bg-[#0a0a0a] border border-white/10 rounded-none relative">
              <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-6 font-display border-b border-white/10 pb-3">
                Publish New Project
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Dynamics"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    disabled={isUploading}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Project Title / Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. High-performance SaaS Landing Page"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isUploading}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors placeholder:text-white/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={isUploading}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                    >
                      <option value="Website Design & Development">Website Design</option>
                      <option value="Graphic Design & Branding">Graphic Design</option>
                      <option value="Digital Marketing Campaign">Digital Marketing</option>
                      <option value="Video Editing & Post-Production">Video Editing</option>
                      <option value="Live Streaming Setup">Live Streaming</option>
                      <option value="Social Media Management">Social Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      Year
                    </label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      disabled={isUploading}
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                    />
                  </div>
                </div>

                {/* Conditional Website Link input */}
                {(category.toLowerCase().includes('website') || category.toLowerCase().includes('web')) && (
                  <div className="p-4 bg-[#121212] border border-[#d4b07c]/40 text-left">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#d4b07c] mb-2 font-bold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website Link / URL</span>
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://www.example.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      disabled={isUploading}
                      className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors placeholder:text-white/30"
                    />
                  </div>
                )}

                {/* File Upload Box */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Upload Image File *
                  </label>
                  <div className="relative border border-dashed border-white/20 hover:border-[#d4b07c] transition-colors bg-black p-6 text-center cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {imagePreview ? (
                      <div className="relative aspect-video w-full overflow-hidden border border-white/10">
                        <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono">
                          Click to change image
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Upload className="w-6 h-6 text-[#d4b07c] group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-white/70 font-light">
                          Click or drag image file here
                        </span>
                        <span className="text-[9px] font-mono text-white/30">
                          PNG, JPG, WEBP or GIF (Auto-compressed)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button with Loading State */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-4 bg-[#d4b07c] text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 mt-4 ${
                    isUploading
                      ? 'opacity-80 cursor-not-allowed bg-[#d4b07c]/80'
                      : 'hover:bg-white cursor-pointer'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Uploading to Cloudflare R2...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Publish to Live Portfolio</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Manage Live Projects */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white uppercase tracking-tight font-display">
                Active Projects ({projects.length})
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
                Live Synced
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center bg-[#0a0a0a] border border-white/10">
                <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-xs text-gray-400">No custom projects published yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-video w-full bg-black overflow-hidden mb-3 relative border border-white/5">
                        {item.src ? (
                          <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4b07c] block mb-1">
                        {item.category} ({item.year})
                      </span>
                      <h3 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light mt-0.5 line-clamp-1">
                        Client: {item.client}
                      </p>
                      {item.website_url && (
                        <a
                          href={item.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-[#d4b07c] underline block mt-1 truncate"
                        >
                          {item.website_url}
                        </a>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/30">ID: {item.id}</span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
