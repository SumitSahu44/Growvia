import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { id: "01", category: "Branding", title: "Nike Air", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
  { id: "02", category: "Strategy", title: "Coca Cola", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop" },
  { id: "03", category: "Web Design", title: "Spotify Wrapped", img: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2074&auto=format&fit=crop" },
  { id: "04", category: "App Dev", title: "Uber 2.0", img: "https://images.unsplash.com/photo-1559163263-e31c2a5e1895?q=80&w=2070&auto=format&fit=crop" },
  { id: "05", category: "Marketing", title: "Red Bull", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
];

const HorizontalScroll = () => {
  const targetRef = useRef(null);
  const stickyRef = useRef(null);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const slider = sliderRef.current;
      const stickySection = stickyRef.current;
      const totalMovement = -(slider.scrollWidth - window.innerWidth + 150);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smoothness
        }
      });

      // --- 1. MOVEMENT (0% se 100% tak chalega) ---
      // duration: 1 ka matlab hai ye timeline ka base time hai
      tl.to(slider, {
        x: totalMovement,
        ease: "none",
        duration: 1 
      });

      // --- 2. COLOR SWITCH (Timing is Key) ---
      // Hum isko start karenge '0.7' par (Yani 70% scroll hone ke baad)
      // Duration rakhenge '0.15' (Bohot fast transition)
      // Isse "Grey" color user ko dikhega hi nahi, bas White -> Black transition feel hoga.
      
      tl.fromTo(stickySection, 
        { backgroundColor: "#ffffff", color: "#000000" },
        { 
          backgroundColor: "#000000", 
          color: "#ffffff",
          ease: "power2.inOut", // Thoda smooth curve
          duration: 0.15 
        }, 
        0.7 // <--- YE HAI MAGIC NUMBER (Start late)
      );

      // Progress bar (Colors bhi sync honge)
      tl.fromTo(progressRef.current, 
        { width: "0%", backgroundColor: "#000000" },
        { width: "100%", backgroundColor: "#ffffff", duration: 1, ease: "none" },
        0
      );

    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[400vh]"
    >
      
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center transition-colors will-change-[background-color,color]"
      >
        
        {/* HEADER */}
        <div className="absolute top-10 left-6 md:left-20 z-30 pointer-events-none">
           <div className="flex items-center gap-4 mb-2">
             <span className="w-12 h-[2px] bg-current transition-colors"></span>
             <span className="text-sm font-bold uppercase tracking-[0.3em]">Recent Cases</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Selected<br />Work
           </h2>
        </div>

        {/* SLIDER */}
        <div 
          ref={sliderRef}
          className="flex items-center gap-12 pl-[100vw] md:pl-[40vw] pr-20 w-fit will-change-transform"
        >
          {works.map((work, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[45vw] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              
              <div className="absolute -bottom-12 left-0 w-full flex justify-between items-end">
                 <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{work.category}</p>
                    <h3 className="text-3xl md:text-4xl font-black uppercase">{work.title}</h3>
                 </div>
                 <span className="text-6xl font-black opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                    {work.id}
                 </span>
              </div>
            </div>
          ))}

          {/* VIEW ALL BUTTON (Black Theme me aayega) */}
          <div className="w-[30vw] md:w-[20vw] aspect-square flex-shrink-0 flex items-center justify-center">
             <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-current hover:bg-white hover:text-black transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">View All</p>
                <FiArrowRight className="text-3xl group-hover:translate-x-2 transition-transform"/>
             </div>
          </div>

        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-10 left-6 md:left-20 w-[200px] h-[2px] bg-gray-300/30 overflow-hidden">
           <div ref={progressRef} className="h-full w-0"></div>
        </div>
        
        <div className="absolute bottom-10 right-6 md:right-20 text-xs font-bold uppercase tracking-widest animate-pulse">
           Scroll &rarr;
        </div>
        
      </div>

    </section>
  );
};

export default HorizontalScroll;