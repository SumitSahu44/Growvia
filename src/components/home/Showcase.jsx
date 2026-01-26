import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    speed: 0.05,
    scrollSpeed: 100,
    className: "w-[50vw] md:w-[25vw] aspect-[3/4] top-[8%] left-[8%] z-10" 
  },
  {
    id: 2,
    type: "text",
    content: "VISION",
    speed: 0.02,
    scrollSpeed: -50,
    // Added 'hover:text-white' transition via CSS/GSAP later
    className: "text-[8rem] md:text-[16rem] font-black top-[15%] right-[5%] z-0 leading-none opacity-20 text-white select-none transition-colors duration-500"
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    speed: 0.08,
    scrollSpeed: 220,
    className: "w-[60vw] md:w-[35vw] aspect-[16/9] top-[38%] right-[10%] z-20"
  },
  {
    id: 4,
    type: "text",
    content: "FUTURE",
    speed: 0.04,
    scrollSpeed: -100,
    className: "text-[8rem] md:text-[16rem] font-black top-[55%] left-[5%] z-30 leading-none mix-blend-difference text-white pointer-events-none select-none"
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    speed: 0.06,
    scrollSpeed: 160,
    className: "w-[50vw] md:w-[30vw] aspect-square top-[75%] left-[35%] z-10"
  },
  {
    id: 6,
    type: "text",
    content: "AGENCY",
    speed: 0.01,
    scrollSpeed: -20,
    className: "text-[6rem] md:text-[10rem] font-black top-[80%] right-[15%] z-0 leading-none opacity-10 text-white writing-vertical select-none"
  }
];

const Showcase = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Initial Load Animation
      gsap.from(elementsRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out"
      });

      // Scroll Parallax
      elementsRef.current.forEach((el, i) => {
        if(!el) return;
        const speed = projects[i].scrollSpeed;
        
        gsap.to(el, {
          y: -speed * 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
          }
        });
      });

      // Mouse Float
      const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;

        elementsRef.current.forEach((el, i) => {
          if(!el) return;
          const speed = projects[i].speed * 50; 
          
          gsap.to(el, {
            x: xPos * speed,
            y: yPos * speed,
            duration: 2,
            ease: "power3.out"
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- GLITCH-FREE HOVER LOGIC ---
  
  const handleMouseEnter = (index) => {
    // 1. Sabko Dim Karo (Images & Text)
    // Lekin 'mix-blend-difference' wale text ko dim mat karo, wo kharab dikhta hai
    elementsRef.current.forEach((el, i) => {
        if (i !== index) {
            gsap.to(el, { 
                opacity: 0.1, 
                filter: "grayscale(100%) blur(2px)", 
                scale: 1,
                duration: 0.4 
            });
        }
    });

    // 2. Target ko Highlight Karo
    const target = elementsRef.current[index];
    if (target) {
        gsap.to(target, { 
            opacity: 1, 
            filter: "grayscale(0%) blur(0px)", 
            scale: 1.05, 
            zIndex: 50, 
            color: "#ffffff", // Force Text White
            duration: 0.4, 
            ease: "power2.out" 
        });
    }
  };

  const handleMouseLeave = () => {
    // Sab kuch Normal Reset karo
    projects.forEach((item, i) => {
        const el = elementsRef.current[i];
        if(!el) return;

        // Original Opacity wapas lao
        const originalOpacity = item.className.includes('opacity-20') ? 0.2 : 
                                item.className.includes('opacity-10') ? 0.1 : 1;
        
        // Agar mix-blend hai to uski opacity 1 hi rehti hai usually
        const finalOpacity = item.className.includes('mix-blend-difference') ? 1 : originalOpacity;

        gsap.to(el, { 
            opacity: finalOpacity, 
            filter: "grayscale(100%) blur(0px)", // Images back to grayscale
            scale: 1, 
            zIndex: item.className.includes('z-30') ? 30 : (item.className.includes('z-20') ? 20 : 10),
            color: "", // Clear forced color
            duration: 0.4 
        });
    });
  };

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) elementsRef.current.push(el);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[300vh] overflow-hidden bg-[#050505]"
    >
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
         <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>

      <style>{`
        .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
        .showcase-image {
            filter: grayscale(100%);
            transition: filter 0.7s ease;
        }
        .showcase-image:hover {
            filter: grayscale(0%);
        }
      `}</style>

      {/* Header */}
      <div className="absolute top-20 w-full flex justify-between px-10 md:px-20 z-40 text-white/40 uppercase text-xs tracking-[0.2em] font-mono">
        <span>Portfolio 2026</span>
        <span>Scroll to Explore</span>
      </div>

      {/* Items */}
      {projects.map((item, index) => {
        const isImage = item.type === 'image';

        return (
          <div 
            key={item.id}
            ref={addToRefs}
            className={`showcase-item absolute will-change-transform ${item.className}`}
            // Ab Mouse Events Parent Div pe hain, taaki area bada mile
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isImage ? (
              // IMAGE
              <div className="relative group cursor-none">
                <div className="overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-white/5">
                    <img 
                      src={item.src} 
                      alt="Work" 
                      className="showcase-image w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                    />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full opacity-0 group-hover:opacity-100 transition-all duration-500 pl-4">
                    <div className="flex items-center gap-3">
                        <span className="h-[1px] w-8 bg-white"></span>
                        <span className="text-white font-mono text-sm tracking-widest uppercase whitespace-nowrap">
                            Case Study 0{item.id}
                        </span>
                    </div>
                </div>
              </div>
            ) : (
              // TEXT (Now Interactive)
              <h2 className="cursor-default">
                {item.content}
              </h2>
            )}
          </div>
        );
      })}

      {/* Decorative Grid Lines */}
      <div className="absolute left-10 md:left-20 top-0 h-full w-[1px] bg-white/5 z-0"></div>
      <div className="absolute right-10 md:right-20 top-0 h-full w-[1px] bg-white/5 z-0"></div>

    </section>
  );
};

export default Showcase;