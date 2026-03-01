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
  const headingRef = useRef(null); 
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      const heading = headingRef.current;
      const stickySection = stickyRef.current;
      const isDesktop = window.innerWidth > 768;
      
      const totalMovement = -(slider.scrollWidth - window.innerWidth + (isDesktop ? 150 : 50));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // --- 1. HEADING ANIMATION (ONLY FOR DESKTOP) ---
      if (isDesktop) {
        tl.to(heading, {
          y: -300, 
          opacity: 0,
          scale: 0.9,
          ease: "power2.in",
          duration: 0.15 
        }, 0);
      } else {
        // Mobile par heading ko static rakhne ke liye sirf halka sa scale ya opacity change de sakte hain
        // ya fir isko khali chorr dein taaki wo wahi rahe.
        tl.to(heading, { opacity: 1, duration: 0.15 }, 0); 
      }

      // --- 2. SLIDER MOVEMENT ---
      tl.to(slider, {
        x: totalMovement,
        ease: "none",
        duration: 1 
      }, 0);

      // --- 3. COLOR CHANGE ---
      tl.fromTo(stickySection, 
        { backgroundColor: "#ffffff", color: "#000000" },
        { backgroundColor: "#000000", color: "#ffffff", duration: 0.2 }, 
        0.2 
      );

      // --- 4. PROGRESS BAR ---
      tl.to(progressRef.current, {
        width: "100%",
        ease: "none",
        duration: 1
      }, 0);

    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-white">
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:justify-center justify-start pt-24 md:pt-0 will-change-[background-color]"
      >
        
        {/* --- HEADING (Mobile: Static at Top | Desktop: Absolute Center) --- */}
        <div 
          ref={headingRef} 
          className="relative md:absolute md:top-1/2 left-6 md:left-20 md:-translate-y-1/2 z-30 pointer-events-none mix-blend-difference text-white will-change-transform mb-16 md:mb-0"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 md:w-12 h-[2px] bg-white"></span>
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em]">Recent Cases</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            Work
          </h2>
        </div>

        {/* --- SLIDER CONTENT --- */}
        <div 
          ref={sliderRef}
          className="flex items-center gap-8 md:gap-12 pl-6 md:pl-[40vw] pr-20 w-fit h-fit md:h-full will-change-transform"
        >
          {works.map((work, index) => (
            <div 
              key={index} 
              className="relative w-[82vw] md:w-[45vw] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden rounded-lg shadow-xl">
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              
              <div className="absolute -bottom-10 md:-bottom-14 left-0 w-full flex justify-between items-end text-current transition-colors">
                 <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{work.category}</p>
                    <h3 className="text-2xl md:text-5xl font-black uppercase leading-none">{work.title}</h3>
                 </div>
                 <span className="text-4xl md:text-8xl font-black opacity-10">
                    {work.id}
                 </span>
              </div>
            </div>
          ))}

          {/* VIEW ALL BUTTON */}
          <div className="w-[60vw] md:w-[25vw] aspect-square flex-shrink-0 flex items-center justify-center">
             <div className="w-36 h-36 md:w-60 md:h-60 rounded-full border border-current hover:bg-white hover:text-black transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group">
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1">See All</p>
                <FiArrowRight className="text-2xl md:text-4xl group-hover:translate-x-2 transition-transform"/>
             </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-10 left-6 md:left-20 w-[120px] md:w-[200px] h-[2px] bg-gray-200/20 overflow-hidden">
           <div ref={progressRef} className="h-full w-0 bg-current"></div>
        </div>
        
      </div>
    </section>
  );
};

export default HorizontalScroll;