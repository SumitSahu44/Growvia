import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    speed: 0.2, // Dheere chalega
    className: "w-[60vw] md:w-[25vw] top-[10%] left-[5%] md:left-[15%] z-10 rotate-[-6deg]"
  },
  {
    type: "text",
    content: "UNEXPECTED",
    speed: 0.8, // Tez chalega
    className: "text-6xl md:text-9xl font-black top-[25%] right-[5%] md:right-[10%] z-0 text-gray-800 opacity-20"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
    speed: 0.5, // Medium speed
    className: "w-[50vw] md:w-[20vw] top-[45%] right-[10%] md:right-[20%] z-20 rotate-[12deg]"
  },
  {
    type: "text",
    content: "BOLD MOVES",
    speed: 1.2, // Bohot tez
    className: "text-4xl md:text-7xl font-bold top-[60%] left-[10%] z-30 mix-blend-difference text-white"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    speed: 0.3,
    className: "w-[70vw] md:w-[30vw] top-[75%] left-[20%] md:left-[35%] z-10 rotate-[-3deg]"
  }
];

const Showcase = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. BACKGROUND COLOR CHANGE ---
      // White se Black smooth transition
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center", // Jab section beech me aaye
        end: "bottom center",
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: "#0a0a0a", color: "#ffffff", duration: 0.8 }),
        onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: "#f9fafb", color: "#000000", duration: 0.8 }),
      });

      // --- 2. PARALLAX EFFECT (The "Unexpected" Movement) ---
      // Har element ko uski speed ke hisab se move karenge
      projects.forEach((proj, i) => {
        const el = document.querySelector(`.floating-item-${i}`);
        
        gsap.to(el, {
          y: -200 * proj.speed, // Upar ki taraf move karega speed ke hisab se
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrolling connection
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // Height badi rakhi hai (200vh) taaki scroll karne me maza aaye
      className="relative w-full min-h-[180vh] bg-gray-50 overflow-hidden transition-colors duration-500"
    >
      
      {/* Decorative Branding Text (Static) */}
      <div className="absolute top-10 left-10 text-sm font-bold tracking-widest uppercase opacity-50">
        Selected Works
      </div>

      {/* --- THE FLOATING ELEMENTS --- */}
      {projects.map((item, index) => {
        if (item.type === 'image') {
          return (
            <div 
              key={index}
              className={`floating-item-${index} absolute shadow-2xl brightness-90 hover:brightness-110 transition-all duration-500 hover:scale-105 cursor-pointer ${item.className}`}
            >
              <img 
                src={item.src} 
                alt="Work" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          );
        } else {
          return (
            <h2 
              key={index}
              className={`floating-item-${index} absolute leading-none tracking-tighter ${item.className}`}
            >
              {item.content}
            </h2>
          );
        }
      })}

      {/* Bottom Text */}
      <div className="absolute bottom-20 w-full text-center opacity-50 text-sm tracking-widest uppercase">
        Creativity has no grid
      </div>

    </section>
  );
};

export default Showcase;