import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();

  // --- ANIMATIONS ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Magnetic Button Effect
      const button = buttonRef.current;
      const text = textRef.current;

      const moveButton = (e) => {
        const { left, top, width, height } = button.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power3.out" });
        gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
      };

      const leaveButton = () => {
        gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      };

      if (button) {
        button.addEventListener('mousemove', moveButton);
        button.addEventListener('mouseleave', leaveButton);
      }

      // 2. Reveal Animation
      gsap.fromTo(linksRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", 
            toggleActions: "play none none none"
          }
        }
      );
    }, footerRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => ctx.revert();
  }, [location.pathname]);

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050505] text-slate-200 pt-20 md:pt-32 overflow-hidden"
    >
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="relative z-10">
        
        {/* SECTION 1: TOP CONTENT */}
        <div className="px-6 md:px-20 flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-5xl md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.95] text-white">
              Let's grow<br /> Your Brand
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]"></div>
              <p className="text-slate-400 font-mono text-xs md:text-sm uppercase tracking-wide">Available for Digital Excellence</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-start md:justify-end">
            <a 
              href="mailto:growviadigitalmarketing26@gmail.com"
              ref={buttonRef}
              className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-blue-600 hover:bg-white hover:text-black transition-colors duration-500 flex items-center justify-center cursor-pointer group shadow-[0_0_40px_rgba(37,99,235,0.2)] text-white"
            >
              <div ref={textRef} className="flex flex-col items-center">
                <span className="text-sm md:text-base font-bold uppercase tracking-widest text-center mt-1">Get in<br/>Touch</span>
                <FiArrowUpRight className="text-2xl mt-1 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>

        {/* SECTION 2: LINKS GRID - Changed to grid-cols-2 for mobile */}
        <div className="px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-8 border-t border-white/10 pt-16 pb-16">
          
          {/* Col 1: Navigation */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">Explore</h4>
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Blogs', path: '/blogs' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-base md:text-lg text-slate-300 hover:text-white transition-colors w-fit group flex items-center gap-2">
                <span className="w-0 h-[1px] bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Col 2: Socials */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">Socials</h4>
            <div className="flex flex-col gap-4">
              <a href="https://www.instagram.com/growviadigitalmarketing/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base md:text-lg text-slate-300 hover:text-white transition-colors group">
                <FaInstagram className="group-hover:text-pink-500 transition-colors" /> Instagram
              </a>
              <a href="https://www.linkedin.com/company/growvia-digital-marketing/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base md:text-lg text-slate-300 hover:text-white transition-colors group">
                <FaLinkedinIn className="group-hover:text-blue-500 transition-colors" /> LinkedIn
              </a>
              <a href="https://wa.me/918962799979" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base md:text-lg text-slate-300 hover:text-white transition-colors group">
                <FaWhatsapp className="group-hover:text-green-500 transition-colors" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Col 3: Contact Info */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">Contact</h4>
            {/* break-words instead of break-all so it wraps nicely in mobile 2-col layout */}
            <a href="mailto:growviadigitalmarketing26@gmail.com" className="text-sm md:text-base break-words text-slate-300 hover:text-blue-400 transition-colors pr-4">
              growviadigitalmarketing26@gmail.com
            </a>
            <a href="tel:+918962799979" className="text-base md:text-lg text-slate-300 hover:text-blue-400 transition-colors">
              +91 89627 99979
            </a>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Indore, Madhya Pradesh,<br />India
            </p>
          </div>

          {/* Col 4: Core Expertise (Replaced Newsletter) */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">Expertise</h4>
            <ul className="flex flex-col gap-3">
              {[
                "Performance Marketing",
                "Brand Strategy",
                "Web Development",
                "SEO & Content"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm md:text-base text-slate-300">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-70"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SECTION 3: GIANT BRAND NAME */}
        <div className="w-full overflow-hidden border-t border-white/10">
          <h1 className="text-[14vw] font-black text-center leading-none tracking-tighter text-white opacity-[0.05] hover:opacity-100 transition-opacity duration-700 cursor-default select-none -mb-2 md:-mb-8 uppercase">
            Growvia
          </h1>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full px-6 md:px-20 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono border-t border-white/5 bg-[#030303]">
          <p className="text-center md:text-left mb-4 md:mb-0">© 2026 Growvia Digital Marketing. Crafted for Growth.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;