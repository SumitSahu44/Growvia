import React, { useEffect, useRef, useState } from 'react';
import { Mail, ArrowUpRight, MessageSquare, Instagram, Twitter, ArrowRight } from 'lucide-react';

/**
 * UTILITY: GSAP load karne ke liye
 */
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const ContactCTA = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
      .then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.gsap) return;

    const { gsap } = window;
    
    // Magnetic Effect Logic
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - (left + width / 2)) * 0.25;
      const y = (clientY - (top + height / 2)) * 0.25;

      gsap.to(containerRef.current, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power2.out"
      });
      
      gsap.to(textRef.current, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([containerRef.current, textRef.current], {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const section = sectionRef.current;
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLoaded]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-[#000000] flex flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      {/* Subtle Background Glow (Pure White/Grey instead of colors) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-7xl">
        
        {/* Top Badge */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 px-6 py-2 border border-white/20 rounded-full backdrop-blur-sm group hover:border-white transition-colors duration-500">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/80">
              Available for new projects
            </p>
          </div>
        </div>

        {/* The Main Heading - Stark White on Black */}
        <div className="group cursor-pointer select-none">
          <div 
            ref={containerRef}
            className="relative inline-block"
          >
            <h2 
              ref={textRef}
              className="text-[15vw] md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] text-white transition-all duration-700 group-hover:italic"
            >
              Let's <br className="md:hidden" /> Talk
            </h2>
            
            {/* Animated Underline */}
            <div className="h-[2px] md:h-[4px] bg-white w-0 group-hover:w-full transition-all duration-700 ease-in-out mt-4" />
          </div>
        </div>

        {/* Info Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-24 border-t border-white/10 pt-12">
          
          <a href="mailto:hello@studio.com" className="group flex flex-col items-start p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 text-left">
            <div className="flex justify-between w-full mb-8">
              <Mail className="w-6 h-6" />
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 mb-1">Send an enquiry</p>
            <p className="text-xl md:text-2xl font-black uppercase tracking-tight">hello@studio.com</p>
          </a>

          <a href="#" className="group flex flex-col items-start p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 text-left">
            <div className="flex justify-between w-full mb-8">
              <MessageSquare className="w-6 h-6" />
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 mb-1">Quick Chat</p>
            <p className="text-xl md:text-2xl font-black uppercase tracking-tight">WhatsApp Us</p>
          </a>

          <div className="flex flex-col p-8 border border-white/10 rounded-3xl text-left justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-8">Socials</p>
            <div className="flex items-center gap-8">
               <a href="#" className="text-xl font-black uppercase hover:line-through transition-all tracking-tighter">Instagram</a>
               <a href="#" className="text-xl font-black uppercase hover:line-through transition-all tracking-tighter">Twitter</a>
            </div>
          </div>

        </div> */}

        {/* Footer Text */}
        {/* <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          <p>© 2026 YOUR STUDIO — INDIA</p>
          <p className="mt-4 md:mt-0">Back to Top ↑</p>
        </div> */}

      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 left-0 w-full text-[25vw] font-black text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter leading-none whitespace-nowrap">
        Get In Touch
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
        section { font-family: 'Inter', sans-serif; }
      `}} />
    </section>
  );
};

export default ContactCTA;