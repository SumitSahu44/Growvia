import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GrowviaMarquee() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  const services = [
    "Web Design ✦",
    "Development ✦",
    "Strategy ✦",
    "Branding ✦",
    "Marketing ✦",
    "Performance ✦",
  ];

  // Infinite feel ke liye array ko multiply kiya
  const repeatedServices = [...services, ...services, ...services, ...services];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Single Track Animation
      gsap.to(trackRef.current, {
        xPercent: -50, // Move left
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Scroll speed ke sath sync rahega
        }
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full relative bg-white border-y border-gray-100 py-12 md:py-20 overflow-hidden z-10"
    >
      {/* Track Container */}
      <div 
        ref={trackRef} 
        className="flex whitespace-nowrap w-max items-center will-change-transform"
      >
        {repeatedServices.map((name, index) => (
          <span
            key={index}
            className="font-black text-[10vw] md:text-[8vw] uppercase tracking-tighter text-black px-[4vw] leading-none transition-colors duration-300 hover:text-blue-600 cursor-default"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Optional: Subtle Overlay for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
    </div>
  );
}