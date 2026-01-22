import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaBehance } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  
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

  // --- MAGNETIC BUTTON EFFECT ---
  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const moveButton = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      // Button thoda zyada move karega
      gsap.to(button, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: "power3.out" });
      // Text thoda kam move karega (Parallax feel)
      gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
    };

    const leaveButton = () => {
      gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    button.addEventListener('mousemove', moveButton);
    button.addEventListener('mouseleave', leaveButton);

    return () => {
      button.removeEventListener('mousemove', moveButton);
      button.removeEventListener('mouseleave', leaveButton);
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-black text-white pt-20 md:pt-32 overflow-hidden"
    >
      
      {/* --- SECTION 1: TOP CONTENT & CTA --- */}
      <div className="px-6 md:px-20 flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32">
        
        {/* Left: Heading */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Have an<br /> Idea?
          </h2>
          <div className="mt-8 flex items-center gap-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-gray-400 font-mono text-sm">ACCEPTING NEW PROJECTS</p>
          </div>
        </div>

        {/* Right: Magnetic CTA Button */}
        <div className="w-full md:w-1/2 flex justify-start md:justify-end relative z-10">
          <div 
            ref={buttonRef}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-600 hover:bg-white hover:text-black transition-colors duration-500 flex items-center justify-center cursor-pointer group"
          >
            <div ref={textRef} className="flex flex-col items-center">
              <span className="text-sm md:text-lg font-bold uppercase tracking-widest">Let's Talk</span>
              <FiArrowUpRight className="text-2xl mt-1 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
        </div>

      </div>

      {/* --- SECTION 2: LINKS GRID --- */}
      <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 border-t border-white/10 pt-16 pb-16">
        
        {/* Col 1: Navigation */}
        <div className="flex flex-col gap-4">
            <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Explore</h4>
            {['Home', 'Work', 'Services', 'Agency', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-lg hover:text-gray-400 transition-colors w-fit group">
                    {item}
                    <span className="block h-[1px] w-0 bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
            ))}
        </div>

        {/* Col 2: Socials */}
        <div className="flex flex-col gap-4">
            <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Socials</h4>
            <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><FaInstagram/> Instagram</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors"><FaLinkedinIn/> LinkedIn</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><FaTwitter/> Twitter</a>
                <a href="#" className="flex items-center gap-2 hover:text-blue-500 transition-colors"><FaBehance/> Behance</a>
            </div>
        </div>

        {/* Col 3: Contact Info */}
        <div className="flex flex-col gap-4">
             <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Contact</h4>
             <p className="text-lg">hello@agency.com</p>
             <p className="text-lg">+91 98765 43210</p>
             <p className="text-gray-400 text-sm mt-2 max-w-[200px]">
                123, Innovation Tower,<br />Indore, India
             </p>
        </div>

        {/* Col 4: Time & Location */}
        <div className="flex flex-col justify-between">
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
      {/* Ye text itna bada hai ki screen ke end tak jayega */}
      <div className="w-full overflow-hidden border-t border-white/10">
        <h1 className="text-[13vw] md:text-[18vw] font-black text-center leading-none tracking-tighter text-white opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none -mb-4 md:-mb-10">
            AGENCY
        </h1>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="w-full px-6 md:px-20 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono border-t border-white/5">
        <p>© 2026 Agency Inc. All Rights Reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;