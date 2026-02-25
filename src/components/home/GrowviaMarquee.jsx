import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GrowviaMarquee() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  // Growvia ki services yahan define ki gayi hain
  const services = [
    { name: "Web Design —", isBlue: false },
    { name: "Development —", isBlue: true },
    { name: "Strategy —", isBlue: false },
    { name: "Branding —", isBlue: true },
    { name: "Marketing —", isBlue: false },
  ];

  // Infinite scroll illusion ke liye array ko 3 baar repeat kiya hai
  const repeatedServices = [...services, ...services, ...services];

  useEffect(() => {
    // GSAP Context for proper cleanup in React
    let ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -33.33, // 3 sets banaye hain, isliye 1/3rd (33.33%) move karenge
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smooth scrolling effect
        }
      });
    });

    return () => ctx.revert(); // Component unmount par animation clean karega
  }, []);

  return (
    <div
      ref={wrapperRef}
      /* Full width viewport hack in Tailwind */
      className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-y border-slate-200 py-8 overflow-hidden z-10"
    >
      <div 
        ref={trackRef} 
        className="flex whitespace-nowrap w-max will-change-transform"
      >
        {repeatedServices.map((service, index) => (
          <span
            key={index}
            className={`
              font-['Outfit',sans-serif] text-[7vw] font-extrabold uppercase
              text-transparent px-[1vw] leading-none transition-all duration-400 ease-out cursor-default
              hover:text-blue-600 hover:opacity-100
              ${
                service.isBlue
                  /* Blue filled style with Tailwind arbitrary values for text-stroke */
                  ? '[-webkit-text-stroke:1px_#2563EB] hover:[-webkit-text-stroke:0px]'
                  /* Normal dark stroke style */
                  : '[-webkit-text-stroke:1px_rgba(2,6,23,0.2)] hover:[-webkit-text-stroke:0px]'
              }
            `}
          >
            {service.name}
          </span>
        ))}
      </div>
    </div>
  );
}