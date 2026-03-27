import { Link } from 'react-router-dom';

const FooterNew = () => {
  return (
    <>
      <footer className="bg-dark px-8 md:px-16 pt-16 md:pt-20 pb-10 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-Logo text-base text-white mb-4">
              Pin drop silence
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Blogs by Dr. Amrita Vohra. Quiet words, loud thoughts.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <div className="text-[10px] tracking-[3px] uppercase text-white/40 mb-5">
              Sitemap
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link>
              <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">Blog</Link>
              <Link to="/signin" className="text-sm text-white/80 hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="text-[10px] tracking-[3px] uppercase text-white/40 mb-5">
              Socials
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://in.linkedin.com/in/dr-amrita-vohra-a4625b91" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                LinkedIn <span className="text-white/40 ml-1">↗</span>
              </a>
              <a href="https://www.instagram.com/amrita.aneja" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                Instagram <span className="text-white/40 ml-1">↗</span>
              </a>
              <a href="https://www.facebook.com/dramrita5/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                Facebook <span className="text-white/40 ml-1">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex justify-between items-center">
          <p className="text-xs text-white/30">
            © 2026 Pin Drop Silence. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            designed by va
          </p>
        </div>
      </footer>

      {/* Watermark */}
      <div className="bg-dark px-8 md:px-16 overflow-hidden pb-4">
        <div className="font-sans text-[clamp(80px,15vw,220px)] font-extrabold text-dark-gray whitespace-nowrap select-none translate-y-[20%] leading-[0.8]">
          PIN.DROP.SILENCE
        </div>
      </div>
    </>
  );
};

export default FooterNew;
