import React from 'react';

const row1Logos = [
  { name: 'Adobe Photoshop', file: 'adobe-photoshop-icon.png' },
  { name: 'Adobe Illustrator', file: 'adobe-illustrator.png' },
  { name: 'Adobe Premiere Pro', file: 'premier-pro.jpg' },
  { name: 'Adobe After Effects', file: 'after-effect.jpg' },
  { name: 'Adobe Lightroom', file: 'light-room.jpg' },
  { name: 'Adobe InDesign', file: 'adobe-indesign.webp' },
  { name: 'DaVinci Resolve', file: 'davinci.jpg' },
  { name: 'Figma', file: 'figma.png' },
  { name: 'Canva', file: 'canva.png' },
  { name: 'Visual Studio Code', file: 'vs-code.png' },
  { name: 'GitHub', file: 'github.png' },
  { name: 'Git', file: 'git.png' },
  { name: 'Antigravity IDE', file: 'antigravity.png' },
  { name: 'MySQL', file: 'mysql.png' }
];

const row2Logos = [
  { name: 'Cloudflare', file: 'cloudflare.png' },
  { name: 'cPanel', file: 'cpanel.png' },
  { name: 'GoDaddy', file: 'godaddy.png' },
  { name: 'Hostinger', file: 'hostinger.png' },
  { name: 'MilesWeb', file: 'milesweb.png' },
  { name: 'Stripe', file: 'strip.png' },
  { name: 'Razorpay', file: 'razorpay.png' },
  { name: 'Docker', file: 'docker.png' },
  { name: 'vMix Live Stream', file: 'vmix.png' },
  { name: 'ChatGPT / OpenAI', file: 'chatgpt.png' },
  { name: 'Google Gemini', file: 'gemini.png' },
  { name: 'Google Ads', file: 'google-ads.png' },
  { name: 'Meta Ads', file: 'meta-ads.png' }
];

export default function Technologies() {
  // 4 identical sets ensure wide track width and exact 50% shift matching full sets
  const row1Items = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
  const row2Items = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <section className="marquee-section">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <div className="eyebrow-tag">POWERED BY THE WORLD'S BEST TECHNOLOGIES</div>
          <h2 className="heading-lg">OFFICIAL CREATIVE SOFTWARE & PLATFORMS</h2>
        </div>
      </div>

      <div className="marquee-wrapper relative">
        {/* Left and Right Smooth Edge Fades (replaces expensive mask-image) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Top Row — Scrolls Left */}
        <div className="marquee-track marquee-left">
          {row1Items.map((logo, i) => (
            <div className="tech-logo-card" key={`r1-${i}`}>
              <div className="tech-icon-wrapper">
                <img 
                  src={`/assets/logos/${logo.file}`} 
                  alt={logo.name} 
                  className="tech-svg-img" 
                  loading="lazy"
                />
              </div>
              <span className="tech-logo-name">{logo.name}</span>
            </div>
          ))}
        </div>

        {/* Bottom Row — Scrolls Right */}
        <div className="marquee-track marquee-right">
          {row2Items.map((logo, i) => (
            <div className="tech-logo-card" key={`r2-${i}`}>
              <div className="tech-icon-wrapper">
                <img 
                  src={`/assets/logos/${logo.file}`} 
                  alt={logo.name} 
                  className="tech-svg-img" 
                  loading="lazy"
                />
              </div>
              <span className="tech-logo-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
