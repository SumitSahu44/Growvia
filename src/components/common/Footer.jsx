import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Added for SPA navigation
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

  // --- LIVE TIME LOGIC ---
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }));
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
        gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power3.out" });
        gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
      };

      const leaveButton = () => {
        gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      };

      button.addEventListener('mousemove', moveButton);
      button.addEventListener('mouseleave', leaveButton);

      // 2. Reveal Animation
      gsap.fromTo(linksRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
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
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
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
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Let's grow<br /> Your Brand
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <p className="text-gray-400 font-mono text-sm uppercase">Available for Digital Excellence</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-start md:justify-end">
            <a 
              href="mailto:growviadigitalmarketing26@gmail.com"
              ref={buttonRef}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-600 hover:bg-white hover:text-black transition-colors duration-500 flex items-center justify-center cursor-pointer group shadow-2xl shadow-blue-900/20"
            >
              <div ref={textRef} className="flex flex-col items-center">
                <span className="text-sm md:text-lg font-bold uppercase tracking-widest text-center">Get in<br/>Touch</span>
                <FiArrowUpRight className="text-2xl mt-1 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>

        {/* SECTION 2: LINKS GRID */}
        <div className="px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-0 border-t border-white/10 pt-16 pb-16">
          
          {/* Col 1: Navigation */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Explore</h4>
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Blogs', path: '/blogs' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-lg hover:text-gray-300 transition-colors w-fit group">
                {link.name}
                <span className="block h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Col 2: Socials */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Socials</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/growviadigitalmarketing/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-pink-500 transition-colors"><FaInstagram /> Instagram</a>
              <a href="https://www.linkedin.com/company/growvia-digital-marketing/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FaLinkedinIn /> LinkedIn</a>
              <a href="https://wa.me/918962799979" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors"><FaWhatsapp /> WhatsApp</a>
            </div>
          </div>

          {/* Col 3: Contact Info */}
          <div ref={addToLinksRef} className="flex flex-col gap-4">
            <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Contact</h4>
            <a href="mailto:growviadigitalmarketing26@gmail.com" className="text-base md:text-lg break-all hover:text-blue-400 transition-colors">growviadigitalmarketing26@gmail.com</a>
            <a href="tel:+918962799979" className="text-lg hover:text-blue-400 transition-colors">+91 89627 99979</a>
            <p className="text-gray-400 text-sm mt-2 max-w-[200px]">
              Indore, Madhya Pradesh,<br />India
            </p>
          </div>

          {/* Col 4: Time & Location */}
          {/* <div ref={addToLinksRef} className="flex flex-col justify-between">
            <div>
              <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Local Time</h4>
              <p className="text-2xl font-mono">{time}</p>
              <p className="text-gray-400 text-sm">Indore, M.P.</p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mt-8 uppercase tracking-widest"
            >
              Back to Top <span className="text-lg">↑</span>
            </button>
          </div> */}
        </div>

        {/* SECTION 3: GIANT BRAND NAME */}
        <div className="w-full overflow-hidden border-t border-white/10">
          <h1 className="text-[14vw] font-black text-center leading-none tracking-tighter text-white opacity-10 hover:opacity-100 transition-opacity duration-1000 cursor-default select-none -mb-4 md:-mb-10 mix-blend-overlay uppercase">
            Growvia
          </h1>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full px-6 md:px-20 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 font-mono border-t border-white/5 bg-black">
          <p>© 2026 Growvia Digital Marketing. Crafted for Growth.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;