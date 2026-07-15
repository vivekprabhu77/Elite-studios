import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      // Fallback for slower renders
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

// Separate component that re-runs reveal observer on every route change
function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to let React finish rendering the new route's DOM
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -60px 0px',
        }
      );

      revealElements.forEach((el) => {
        // Reset elements so they animate in fresh on each navigation
        el.classList.remove('active');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default function App() {
  // Handle static preloader fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        // Fade out and scale up slightly for a premium exit effect
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(1.05)';
        preloader.style.pointerEvents = 'none';

        // Unlock scroll and remove from DOM after transition completes
        setTimeout(() => {
          preloader.remove();
          document.body.style.overflow = '';
        }, 600);
      } else {
        document.body.style.overflow = '';
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#050505] text-[#f3f4f6] min-h-screen selection:bg-white selection:text-black overflow-x-hidden">

      {/* Subtle Grain Overlay over the whole site */}
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Floating Header Navbar */}
      <Navbar />

      <main>
        <ScrollToTop />
        <RevealObserver />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}

