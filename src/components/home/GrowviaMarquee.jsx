import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GrowviaMarquee() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  // Growvia ki services
  const services = [
    { name: "Web Design —", isBlue: false },
    { name: "Development —", isBlue: true },
    { name: "Strategy —", isBlue: false },
    { name: "Branding —", isBlue: true },
    { name: "Marketing —", isBlue: false },
  ];

  // Infinite scroll illusion
  const repeatedServices = [...services, ...services, ...services];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -33.33, 
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, 
        }
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-y border-slate-200 py-10 overflow-hidden z-10"
    >
      <div 
        ref={trackRef} 
        className="flex whitespace-nowrap w-max will-change-transform items-center"
      >
        {repeatedServices.map((service, index) => (
          <span
            key={index}
            className={`
              font-['Outfit',sans-serif] text-[6vw] font-black uppercase
              text-transparent px-[1.5vw] leading-none transition-all duration-300 ease-in-out cursor-default
              hover:text-blue-600
              ${
                service.isBlue
                  /* Blue item: 2px solid blue stroke, 0px on hover */
                  ? '[-webkit-text-stroke:2px_#2563EB] hover:[-webkit-text-stroke:0px]'
                  /* Normal item: 2px solid dark slate stroke, 0px on hover */
                  : '[-webkit-text-stroke:2px_#0F172A] hover:[-webkit-text-stroke:0px]'
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