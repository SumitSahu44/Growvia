import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaBehance } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef([]); // Links animation ke liye

  // --- LIVE TIME LOGIC ---
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Magnetic Button Effect
      const button = buttonRef.current;
      const text = textRef.current;

      const moveButton = (e) => {
        const { left, top, width, height } = button.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        gsap.to(button, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: "power3.out" });
        gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
      };

      const leaveButton = () => {
        gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      };

      button.addEventListener('mousemove', moveButton);
      button.addEventListener('mouseleave', leaveButton);

      // 2. Reveal Animation (Links pop up when scrolled into view)
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // Ek ke baad ek aayenge
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%", // Jab footer 20% dikh jaye
          }
        }
      );

      return () => {
        button.removeEventListener('mousemove', moveButton);
        button.removeEventListener('mouseleave', leaveButton);
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#050505] text-white pt-20 md:pt-32 overflow-hidden"
    >
      
      {/* --- EXTRA 1: NOISE OVERLAY (Consistent Theme) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
         <svg className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
         </svg>
      </div>

      {/* --- EXTRA 2: SUBTLE GLOW (Top Right) --- */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* --- CONTENT START --- */}
      <div className="relative z-10">
        
        {/* SECTION 1: TOP CONTENT & CTA */}
        <div className="px-6 md:px-20 flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32">
          
          {/* Left: Heading */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Have an<br /> Idea?
            </h2>
            <div className="mt-8 flex items-center gap-4">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
               <p className="text-gray-400 font-mono text-sm">ACCEPTING NEW PROJECTS</p>
            </div>
          </div>

          {/* Right: Magnetic CTA Button */}
          <div className="w-full md:w-1/2 flex justify-start md:justify-end">
            <div 
              ref={buttonRef}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-600 hover:bg-white hover:text-black transition-colors duration-500 flex items-center justify-center cursor-pointer group shadow-2xl shadow-blue-900/20"
            >
              <div ref={textRef} className="flex flex-col items-center">
                <span className="text-sm md:text-lg font-bold uppercase tracking-widest">Let's Talk</span>
                <FiArrowUpRight className="text-2xl mt-1 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
          </div>

        </div>

        {/* --- SECTION 2: LINKS GRID (UPDATED) --- */}
        {/* Changed: grid-cols-2 for mobile, gap-y-10 to separate rows */}
        <div className="px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-0 border-t border-white/10 pt-16 pb-16">
          
          {/* Col 1: Navigation */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
              <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Explore</h4>
              {['Home', 'Work', 'Services', 'Agency', 'Contact'].map((item) => (
                  <a key={item} href="#" className="text-lg hover:text-gray-400 transition-colors w-fit group">
                      {item}
                      <span className="block h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
                  </a>
              ))}
          </div>

          {/* Col 2: Socials */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
              <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Socials</h4>
              <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><FaInstagram/> Instagram</a>
                  <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FaLinkedinIn/> LinkedIn</a>
                  <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><FaTwitter/> Twitter</a>
                  <a href="#" className="flex items-center gap-2 hover:text-blue-500 transition-colors"><FaBehance/> Behance</a>
              </div>
          </div>

          {/* Col 3: Contact Info */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
               <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Contact</h4>
               <p className="text-lg">hello@agency.com</p>
               <p className="text-lg">+91 98765 43210</p>
               <p className="text-gray-400 text-sm mt-2 max-w-[200px]">
                  123, Innovation Tower,<br />Indore, India
               </p>
          </div>

          {/* Col 4: Time & Location */}
          <div ref={addToLinksRef} className="flex flex-col justify-between">
              <div>
                  <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Local Time</h4>
                  <p className="text-2xl font-mono">{time}</p>
                  <p className="text-gray-500 text-sm">Bhopal, India</p>
              </div>
              
              <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mt-8"
              >
                  Back to Top <span className="text-lg">↑</span>
              </button>
          </div>

        </div>

        {/* --- SECTION 3: GIANT BRAND NAME --- */}
        <div className="w-full overflow-hidden border-t border-white/10">
          <h1 className="text-[13vw] md:text-[18vw] font-black text-center leading-none tracking-tighter text-white opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none -mb-4 md:-mb-10 mix-blend-overlay">
              AGENCY
          </h1>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="w-full px-6 md:px-20 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono border-t border-white/5 bg-black/50 backdrop-blur-sm">
          <p>© 2026 Agency Inc. All Rights Reserved.</p>
          <div className="flex gap-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;