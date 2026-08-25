import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject, resetProjects } from '../utils/portfolioStore';
import {
  Upload,
  Trash2,
  Plus,
  RefreshCw,
  CheckCircle,
  Image as ImageIcon,
  ShieldCheck,
  ArrowUpRight,
  Globe,
  Loader2,
  Lock,
  User,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';
import logo from '../assets/ELITE STUDIOS.webp';
const ADMIN_USER_LOWER = "elite studios";
const ADMIN_PASS_HASH = "d4b0e8187e174067d572493e9e3e963a2e9a8be34838faaa996c322a176cc81f";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Portfolio Management States
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

  // Check existing session
  useEffect(() => {
    const authStatus = sessionStorage.getItem('elite_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects());
      const handleUpdate = () => setProjects(getProjects());
      window.addEventListener('portfolio-updated', handleUpdate);
      return () => window.removeEventListener('portfolio-updated', handleUpdate);
    }
  }, [isAuthenticated]);

  // Compute Web Crypto SHA-256 Hash
  const hashPassword = async (pwd) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pwd);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!username.trim() || !password) {
      setLoginError('Please enter both username and password.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const userMatch = username.trim().toLowerCase() === ADMIN_USER_LOWER;
      const enteredHash = await hashPassword(password);
      const passMatch = enteredHash === ADMIN_PASS_HASH;

      if (userMatch && passMatch) {
        sessionStorage.setItem('elite_admin_auth', 'true');
        setIsAuthenticated(true);
        setPassword('');
        setUsername('');
      } else {
        setLoginError('Invalid Username or Password. Please try again.');
      }
    } catch (err) {
      setLoginError('Authentication error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elite_admin_auth');
    setIsAuthenticated(false);
  };

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
      setSuccessMsg('New project successfully published!');
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

  // ═══════════════════════════════════════════════════════════
  // LOGIN SCREEN (UNTIL AUTHENTICATED)
  // ═══════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 md:pt-36 pb-20 px-6 flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
        {/* Background Spotlight Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#d4b07c]/10 rounded-full blur-[140px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>

        <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-left">

          {/* Logo & Portal Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4b07c]/20 via-black to-[#d4b07c]/05 border border-[#d4b07c]/50 p-2.5 shadow-[0_0_25px_rgba(212,176,124,0.3)]">
              <img src={logo} alt="Elite Studios" className="w-full h-full object-contain" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4b07c]/10 border border-[#d4b07c]/30 text-[#d4b07c] text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>PORTAL ACCESS</span>
            </div>

            <h1 className="text-2xl font-extrabold text-white uppercase tracking-tight font-display">
              ADMIN LOGIN
            </h1>
            <p className="text-xs text-gray-400 font-light mt-1">
              Sign in with your admin credentials to manage portfolio items.
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center animate-fade-in">
              {loginError}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-mono font-bold mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4b07c] transition-all"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 font-mono font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-3 bg-[#121212] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d4b07c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-[#c39f6b] transition-all duration-300 shadow-[0_0_20px_rgba(212,176,124,0.3)] cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>VERIFYING HASH...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN TO PORTAL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              SECURED VIA SHA-256 HASH VERIFICATION
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // AUTHENTICATED ADMIN MANAGEMENT PORTAL
  // ═══════════════════════════════════════════════════════════
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

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-none cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Samples</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4b07c] text-black font-extrabold text-xs font-mono tracking-wider uppercase transition-all rounded-none cursor-pointer hover:bg-[#c39f6b]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOG OUT</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-8 p-4 bg-[#d4b07c]/10 border border-[#d4b07c]/40 text-[#d4b07c] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Add Project */}
          <div className="lg:col-span-5 bg-[#0b0b0b] p-6 sm:p-8 border border-white/10 text-left">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display mb-6 pb-3 border-b border-white/10 flex items-center justify-between">
              <span>ADD NEW PROJECT</span>
              <Plus className="w-4 h-4 text-[#d4b07c]" />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. Aurelia Group, Kundapura Event"
                  className="w-full px-4 py-3 bg-black border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d4b07c] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Festival Poster Design, Lyrical Video"
                  className="w-full px-4 py-3 bg-black border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d4b07c] transition-all"
                  required
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
                    className="w-full px-3 py-3 bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4b07c] transition-all cursor-pointer"
                  >
                    <option value="Website Design & Development">Website Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Live Streaming">Live Streaming</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Entire Social Media Handling">Social Media</option>
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
                    placeholder="2026"
                    className="w-full px-3 py-3 bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#d4b07c] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                  Live Website URL (Optional)
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 absolute left-3 top-3.5 text-white/30" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-9 pr-4 py-3 bg-black border border-white/10 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#d4b07c] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-2">
                  Project Image *
                </label>

                <div className="border border-dashed border-white/20 p-4 text-center bg-black hover:border-[#d4b07c]/50 transition-all cursor-pointer relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {imagePreview ? (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-[#d4b07c] uppercase">
                        Change Image
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-[#d4b07c]" />
                      <span className="text-xs text-gray-300 font-semibold">Click or drag image to upload</span>
                      <span className="text-[10px] text-white/30 font-mono">PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-4 bg-[#d4b07c] text-black font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-[#c39f6b] transition-all shadow-[0_0_20px_rgba(212,176,124,0.3)] cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>PUBLISHING PROJECT...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>PUBLISH TO LIVE PORTFOLIO</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Existing Live Projects List */}
          <div className="lg:col-span-7 bg-[#0b0b0b] p-6 sm:p-8 border border-white/10 text-left">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
                LIVE PROJECTS ({projects.length})
              </h2>
              <span className="text-[10px] font-mono text-[#d4b07c] uppercase tracking-widest">
                ACTIVE ON SITE
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 bg-black">
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
                  No projects currently published.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[680px] overflow-y-auto pr-1 no-scrollbar">
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
                        className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
