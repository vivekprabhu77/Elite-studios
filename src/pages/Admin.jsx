import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject, resetProjects } from '../utils/portfolioStore';
import { Upload, Trash2, Plus, RefreshCw, CheckCircle, Image as ImageIcon, ShieldCheck, ArrowUpRight, Globe } from 'lucide-react';
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
    setSuccessMsg('New project successfully saved to MySQL database & published to portfolio!');
    setTimeout(() => setSuccessMsg(''), 4000);
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
              to="/work"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-widest uppercase bg-[#d4b07c] text-black hover:bg-white transition-colors duration-300"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-8 p-4 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 rounded-none text-left">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Left Column: Upload Form */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-[#0b0b0b] border border-white/10">
              <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-6 font-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#d4b07c]" />
                <span>Upload New Project</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aurelia Luxury"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Editorial photography & visual identity"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                    >
                      <option value="Website Design & Development">Website Design</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Live Streaming">Live Streaming</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Entire Social Media Handling">Social Media Handling</option>
                      <option value="Branding & Web Design">Branding</option>
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
                      className="w-full px-4 py-3 bg-black border border-white/10 text-white text-xs font-light focus:outline-none focus:border-[#d4b07c] transition-colors"
                    />
                  </div>
                </div>

                {/* Conditional Website Link input when Website category selected */}
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
                          PNG, JPG, WEBP or GIF (Max 10MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#d4b07c] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish to Live Portfolio</span>
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

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {projects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  className="p-4 bg-[#0b0b0b] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-[#d4b07c]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail preview */}
                    <div className="w-20 h-14 bg-black border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                      {project.src ? (
                        <img src={project.src} alt={project.client} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-white/20" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                        <span className="text-[#d4b07c]">{project.client}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#d4b07c] transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 font-mono">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 transition-colors shrink-0"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
