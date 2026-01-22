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
      
      const totalMovement = -(slider.scrollWidth - window.innerWidth + 150);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth control
        }
      });

      // --- 1. HEADING EXIT (SUPER FAST) ---
      // Duration sirf 0.15 rakhi hai (Total scroll ka sirf 15% hissa)
      // Jaise hi user thoda sa scroll karega, heading gayab ho jayegi.
      tl.to(heading, {
        y: -300, // Bohot upar bhej diya
        opacity: 0, // Gayab bhi kar diya
        scale: 0.9,
        ease: "power2.in",
        duration: 0.15 
      }, 0); // Start at 0

      // --- 2. SLIDER MOVEMENT (NORMAL SPEED) ---
      // Ye poore time chalta rahega (Duration 1)
      tl.to(slider, {
        x: totalMovement,
        ease: "none",
        duration: 1 
      }, 0);

      // --- 3. BACKGROUND COLOR CHANGE ---
      // Ye bhi jaldi ho jayega taaki grey na dikhe
      tl.fromTo(stickySection, 
        { backgroundColor: "#ffffff", color: "#000000" },
        { backgroundColor: "#000000", color: "#ffffff", duration: 0.2 }, 
        0.3 // Thoda wait karke color change hoga
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
    <section 
      ref={targetRef} 
      className="relative h-[400vh]"
    >
      
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center will-change-[background-color]"
      >
        
        {/* --- HEADING --- */}
        {/* top-1/2 aur -translate-y-1/2 se center me rakha hai shuru me */}
        <div 
          ref={headingRef} 
          className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 z-30 pointer-events-none mix-blend-difference text-white will-change-transform"
        >
           <div className="flex items-center gap-4 mb-2">
             <span className="w-12 h-[2px] bg-white"></span>
             <span className="text-sm font-bold uppercase tracking-[0.3em]">Recent Cases</span>
           </div>
           <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              Work
           </h2>
        </div>

        {/* --- SLIDER CONTENT --- */}
        {/* items-center kar diya taaki cards beech me rahein jab heading chali jaye */}
        <div 
          ref={sliderRef}
          className="flex items-center gap-12 pl-[100vw] md:pl-[40vw] pr-20 w-fit h-full will-change-transform"
        >
          {works.map((work, index) => (
            <div 
              key={index} 
              className="relative w-[85vw] md:w-[45vw] aspect-[4/3] md:aspect-[16/9] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden rounded-lg shadow-2xl transition-all duration-700 ease-out">
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              
              <div className="absolute -bottom-14 left-0 w-full flex justify-between items-end text-current transition-colors">
                 <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{work.category}</p>
                    <h3 className="text-3xl md:text-5xl font-black uppercase leading-none">{work.title}</h3>
                 </div>
                 <span className="text-6xl md:text-8xl font-black opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                    {work.id}
                 </span>
              </div>
            </div>
          ))}

          {/* VIEW ALL BUTTON */}
          <div className="w-[40vw] md:w-[25vw] aspect-square flex-shrink-0 flex items-center justify-center">
             <div className="w-40 h-40 md:w-60 md:h-60 rounded-full border border-current hover:bg-white hover:text-black transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">See All Work</p>
                <FiArrowRight className="text-4xl group-hover:translate-x-2 transition-transform"/>
             </div>
          </div>

        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-10 left-6 md:left-20 w-[200px] h-[2px] bg-gray-200/20 overflow-hidden">
           <div ref={progressRef} className="h-full w-0 bg-current"></div>
        </div>
        
        <div className="absolute bottom-10 right-10 text-xs font-bold uppercase tracking-widest animate-pulse mix-blend-difference text-white">
            Scroll &rarr;
        </div>
        
      </div>

    </section>
  );
};

export default HorizontalScroll;