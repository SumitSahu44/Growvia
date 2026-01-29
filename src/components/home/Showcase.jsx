import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    speed: 0.03,
    scrollSpeed: 60,
    className: "w-[70vw] sm:w-[50vw] md:w-[25vw] aspect-[3/4] top-[8%] left-[5%] md:left-[8%] z-10"
  },
  {
    id: 2,
    type: "text",
    content: "VISION",
    speed: 0.015,
    scrollSpeed: -30,
    className: "text-[4rem] sm:text-[8rem] md:text-[16rem] font-black top-[15%] right-[2%] md:right-[5%] z-0 leading-none opacity-20 text-white select-none transition-colors duration-500"
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    speed: 0.05,
    scrollSpeed: 120,
    className: "w-[75vw] sm:w-[60vw] md:w-[35vw] aspect-[16/9] top-[38%] right-[5%] md:right-[10%] z-20"
  },
  {
    id: 4,
    type: "text",
    content: "FUTURE",
    speed: 0.025,
    scrollSpeed: -50,
    className: "text-[4rem] sm:text-[8rem] md:text-[16rem] font-black top-[55%] left-[2%] md:left-[5%] z-30 leading-none mix-blend-difference text-white pointer-events-none select-none"
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    speed: 0.04,
    scrollSpeed: 90,
    className: "w-[65vw] sm:w-[50vw] md:w-[30vw] aspect-square top-[75%] left-[20%] sm:left-[35%] z-10"
  },
  {
    id: 6,
    type: "text",
    content: "AGENCY",
    speed: 0.01,
    scrollSpeed: -15,
    className: "text-[3rem] sm:text-[6rem] md:text-[10rem] font-black top-[85%] md:top-[80%] right-[8%] md:right-[15%] z-0 leading-none opacity-10 text-white select-none"
  }
];

const Showcase = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
      // Initial Load Animation - Optimized
      gsap.from(elementsRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out"
      });

      // Scroll Parallax - Optimized with will-change
      elementsRef.current.forEach((el, i) => {
        if (!el) return;
        const speed = projects[i].scrollSpeed;
        
        // Add will-change for performance
        el.style.willChange = 'transform';
        
        gsap.to(el, {
          y: isMobile ? -speed * 0.5 : -speed * 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, // Reduced scrub for smoother performance
            invalidateOnRefresh: true
          }
        });
      });

      // Mouse Float - Throttled for performance (Desktop only)
      if (!isMobile) {
        let rafId;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
          mouseX = (e.clientX / window.innerWidth) - 0.5;
          mouseY = (e.clientY / window.innerHeight) - 0.5;
          
          if (!rafId) {
            rafId = requestAnimationFrame(() => {
              elementsRef.current.forEach((el, i) => {
                if (!el) return;
                const speed = projects[i].speed * 40;
                
                gsap.to(el, {
                  x: mouseX * speed,
                  y: mouseY * speed,
                  duration: 1.5,
                  ease: "power2.out",
                  overwrite: 'auto'
                });
              });
              rafId = null;
            });
          }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          if (rafId) cancelAnimationFrame(rafId);
        };
      }
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const handleMouseEnter = (index) => {
    if (isMobile) return; // Disable hover on mobile
    
    elementsRef.current.forEach((el, i) => {
      if (i !== index && el) {
        gsap.to(el, {
          opacity: 0.15,
          filter: "grayscale(100%) blur(3px)",
          scale: 0.98,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    const target = elementsRef.current[index];
    if (target) {
      gsap.to(target, {
        opacity: 1,
        filter: "grayscale(0%) blur(0px)",
        scale: 1.05,
        zIndex: 100,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    projects.forEach((item, i) => {
      const el = elementsRef.current[i];
      if (!el) return;

      const originalOpacity = item.className.includes('opacity-20') ? 0.2 :
                              item.className.includes('opacity-10') ? 0.1 : 1;
      
      const finalOpacity = item.className.includes('mix-blend-difference') ? 1 : originalOpacity;

      gsap.to(el, {
        opacity: finalOpacity,
        filter: "grayscale(100%) blur(0px)",
        scale: 1,
        zIndex: 'auto',
        duration: 0.5,
        ease: "power2.out"
      });
    });
  };

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300vh] bg-black overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)'
      }}
    >
      {/* Modern Noise Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Gradient Orbs for Modern Look */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-40 flex justify-between items-start p-4 sm:p-6 md:p-8 pointer-events-none">
        <h1 className="text-white text-sm sm:text-base md:text-lg font-light tracking-[0.3em] pointer-events-auto">
          PORTFOLIO 2026
        </h1>
        <p className="text-white/40 text-xs sm:text-sm md:text-base font-light tracking-wider pointer-events-auto">
          SCROLL TO EXPLORE
        </p>
      </div>

      {/* Items */}
      {projects.map((item, index) => {
        const isImage = item.type === 'image';
        return (
          <div
            key={item.id}
            ref={addToRefs}
            className={`absolute ${item.className} ${!isMobile ? 'cursor-pointer' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isImage ? (
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                <img
                  src={item.src}
                  alt={`Project ${item.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-lg shadow-2xl"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-white/30 transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-lg">
                  <p className="text-white/60 text-[10px] sm:text-xs tracking-widest mb-1">CASE STUDY</p>
                  <h3 className="text-white text-sm sm:text-base md:text-xl font-light tracking-wider">PROJECT 0{item.id}</h3>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <h2 className="font-black leading-none tracking-tighter group-hover:tracking-tight transition-all duration-500 drop-shadow-2xl">
                  {item.content}
                </h2>
              </div>
            )}
          </div>
        );
      })}

      {/* Modern Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{
            width: '0%',
            animation: 'progress 1s ease-out forwards'
          }}
        />
      </div>
    </div>
  );
};

export default Showcase;