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
  return (
    <section className="marquee-section">
      <div className="container mx-auto px-6">
        <div className="section-header">
          <div className="eyebrow-tag">POWERED BY THE WORLD'S BEST TECHNOLOGIES</div>
          <h2 className="heading-lg">OFFICIAL CREATIVE SOFTWARE & PLATFORMS</h2>
        </div>
      </div>

      <div className="marquee-wrapper">
        {/* Top Row — Scrolls Left */}
        <div className="marquee-track marquee-left">
          {/* Repeat the card set 4 times for infinite loop illusion */}
          {[...Array(4)].map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {row1Logos.map((logo, i) => (
                <div className="tech-logo-card" key={`${loopIdx}-${i}`}>
                  <div className="tech-icon-wrapper">
                    <img 
                      src={`/assets/logos/${logo.file}`} 
                      alt={logo.name} 
                      className="tech-svg-img" 
                      loading="lazy"
                      decodings="async"
                      width="30"
                      height="30"
                    />
                  </div>
                  <span className="tech-logo-name">{logo.name}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Row — Scrolls Right */}
        <div className="marquee-track marquee-right">
          {[...Array(4)].map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              {row2Logos.map((logo, i) => (
                <div className="tech-logo-card" key={`${loopIdx}-${i}`}>
                  <div className="tech-icon-wrapper">
                    <img 
                      src={`/assets/logos/${logo.file}`} 
                      alt={logo.name} 
                      className="tech-svg-img" 
                      loading="lazy"
                      decodings="async"
                      width="30"
                      height="30"
                    />
                  </div>
                  <span className="tech-logo-name">{logo.name}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
