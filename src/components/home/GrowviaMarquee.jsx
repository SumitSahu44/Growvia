import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GrowviaMarquee() {
  const wrapperRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  // Growvia ki services - Changed dash to a modern sparkle ✦
  const services = [
    { name: "Web Design ✦", isBlue: false },
    { name: "Development ✦", isBlue: true },
    { name: "Strategy ✦", isBlue: false },
    { name: "Branding ✦", isBlue: true },
    { name: "Marketing ✦", isBlue: false },
  ];

  // Increased repetition slightly for seamless infinite dual-scrolling
  const repeatedServices = [...services, ...services, ...services, ...services];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Top row: Moves Left
      gsap.to(track1Ref.current, {
        xPercent: -50, 
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, 
        }
      });

      // Bottom row: Moves Right
      gsap.set(track2Ref.current, { xPercent: -50 }); // Start halfway so it has room to move right
      gsap.to(track2Ref.current, {
        xPercent: 0, 
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Slightly slower for a cool parallax feel
        }
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <div
      ref={wrapperRef}
      // Fixed X-axis overflow by using w-full. Added a slight padding and gap for the dual rows.
      className="w-full relative bg-slate-50 border-y border-slate-200 py-16 overflow-hidden z-10 flex flex-col gap-4"
    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2563EB_0%,_transparent_70%)] opacity-[0.04] pointer-events-none"></div>

      {/* TRACK 1 (Moving Left) */}
      <div 
        ref={track1Ref} 
        className="flex whitespace-nowrap w-max items-center will-change-transform"
      >
        {repeatedServices.map((service, index) => (
          <span
            key={`t1-${index}`}
            className={`
              font-['Outfit',sans-serif] text-[6vw] font-black uppercase tracking-tight
              text-transparent px-[1.5vw] leading-none transition-all duration-300 ease-out cursor-crosshair
              hover:text-blue-600 hover:scale-105 hover:-translate-y-1
              ${
                service.isBlue
                  ? '[-webkit-text-stroke:2px_#2563EB] hover:[-webkit-text-stroke:0px]'
                  : '[-webkit-text-stroke:2px_#0F172A] hover:[-webkit-text-stroke:0px]'
              }
            `}
          >
            {service.name}
          </span>
        ))}
      </div>

      {/* TRACK 2 (Moving Right) */}
      <div 
        ref={track2Ref} 
        className="flex whitespace-nowrap w-max items-center will-change-transform"
      >
        {repeatedServices.map((service, index) => (
          <span
            key={`t2-${index}`}
            className={`
              font-['Outfit',sans-serif] text-[6vw] font-black uppercase tracking-tight
              text-transparent px-[1.5vw] leading-none transition-all duration-300 ease-out cursor-crosshair
              hover:text-blue-600 hover:scale-105 hover:-translate-y-1
              ${
                service.isBlue
                  ? '[-webkit-text-stroke:2px_#2563EB] hover:[-webkit-text-stroke:0px]'
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