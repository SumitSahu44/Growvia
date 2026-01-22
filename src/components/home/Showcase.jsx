import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  // --- ITEM 1: TOP LEFT IMAGE ---
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    speed: 0.05,
    scrollSpeed: 100,
    className: "w-[60vw] md:w-[30vw] top-[5%] left-[5%] z-20 rotate-[-2deg]"
  },
  // --- ITEM 2: BIG TEXT (VISION) ---
  {
    id: 2,
    type: "text",
    content: "VISION",
    speed: 0.02,
    scrollSpeed: -80, // Text thoda slow reverse jayega
    // Outline Text Style added via CSS below
    className: "text-[7rem] md:text-[14rem] font-black top-[15%] right-[0%] z-0 select-none leading-none outline-text"
  },
  // --- ITEM 3: MIDDLE RIGHT IMAGE ---
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    speed: 0.08,
    scrollSpeed: 200,
    className: "w-[55vw] md:w-[28vw] top-[35%] right-[10%] z-20 rotate-[4deg]"
  },
  // --- ITEM 4: BIG TEXT (FUTURE) ---
  {
    id: 4,
    type: "text",
    content: "FUTURE",
    speed: 0.04,
    scrollSpeed: -120,
    className: "text-[7rem] md:text-[14rem] font-black top-[55%] left-[5%] z-0 select-none leading-none outline-text"
  },
  // --- ITEM 5: BOTTOM CENTER IMAGE ---
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    speed: 0.06,
    scrollSpeed: 150,
    className: "w-[65vw] md:w-[35vw] top-[75%] left-[30%] z-20 rotate-[-3deg]"
  },
  // --- ITEM 6: EXTRA DECORATIVE TEXT ---
  {
    id: 6,
    type: "text",
    content: "AGENCY",
    speed: 0.01,
    scrollSpeed: -50,
    className: "text-[5rem] md:text-[8rem] font-black top-[85%] right-[5%] z-0 select-none leading-none outline-text opacity-50"
  }
];

const Showcase = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. BACKGROUND COLOR TRANSITION ---
      gsap.fromTo(containerRef.current, 
        { backgroundColor: "#f9fafb" },
        {
          backgroundColor: "#050505",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: true,      
          }
        }
      );

      // --- 2. SCROLL PARALLAX ---
      elementsRef.current.forEach((el, i) => {
        if(!el) return;
        const speed = projects[i].scrollSpeed;
        
        gsap.to(el, {
          y: -speed * 1.5, // Speed multiply ki kyunki height badi hai
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5, 
          }
        });
      });

      // --- 3. MOUSE MOVEMENT ---
      const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;

        elementsRef.current.forEach((el, i) => {
          if(!el) return;
          const speed = projects[i].speed * 100;
          
          gsap.to(el, {
            x: xPos * speed,
            y: yPos * speed,
            duration: 1.5,
            ease: "power2.out"
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(`.showcase-item`, { opacity: 0.2, filter: "grayscale(100%) blur(4px)", scale: 0.95, duration: 0.5 });
    gsap.to(`.item-${index}`, { opacity: 1, filter: "grayscale(0%) blur(0px)", scale: 1.1, zIndex: 100, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(`.showcase-item`, { opacity: 1, filter: "grayscale(0%) blur(0px)", scale: 1, zIndex: 20, duration: 0.5 });
  };

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) elementsRef.current.push(el);
  };

  return (
    <section 
      ref={containerRef} 
      // HEIGHT INCREASED TO 350vh
      className="relative w-full min-h-[350vh] overflow-hidden"
    >
      {/* Styles for Outline Text */}
      <style>{`
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); /* Visible White Outline */
          transition: all 0.5s ease;
        }
        .outline-text:hover {
          color: rgba(255, 255, 255, 0.1); /* Hover pe thoda fill */
          -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
        }
      `}</style>

      {/* Decorative Header */}
      <div className="absolute top-24 left-0 w-full text-center z-20 pointer-events-none">
        <span className="text-sm font-bold tracking-[0.6em] uppercase text-gray-400 opacity-60 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
          Selected Works
        </span>
      </div>

      {/* --- ITEMS --- */}
      {projects.map((item, index) => {
        const isImage = item.type === 'image';

        return (
          <div 
            key={item.id}
            ref={addToRefs}
            className={`showcase-item item-${index} absolute transition-all duration-700 ${item.className}`}
            onMouseEnter={isImage ? () => handleMouseEnter(index) : null}
            onMouseLeave={isImage ? handleMouseLeave : null}
          >
            {isImage ? (
              // IMAGE
              <div className="relative group cursor-pointer">
                <div className="overflow-hidden rounded-lg shadow-2xl">
                    <img 
                      src={item.src} 
                      alt="Portfolio" 
                      className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    />
                </div>
                {/* Floating Label */}
                <div className="absolute -bottom-10 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xl font-bold">Project 0{item.id}</p>
                </div>
              </div>
            ) : (
              // TEXT (Now Visible Outline)
              // Added hover effect class defined in <style>
              <h2 className="leading-none tracking-tighter cursor-default">
                {item.content}
              </h2>
            )}
          </div>
        );
      })}

      {/* Bottom Hint */}
      <div className="absolute bottom-20 w-full text-center opacity-40 text-white text-xs tracking-[0.5em] uppercase pointer-events-none">
        Scroll for more
      </div>

    </section>
  );
};

export default Showcase;