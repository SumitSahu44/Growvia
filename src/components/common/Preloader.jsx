import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Loading Bar & Counter Animation
    let progress = { value: 0 };
    
    tl.to(progress, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        // Update Text
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(progress.value) + "%";
        }
        // Update Bar Width
        if (progressRef.current) {
          progressRef.current.style.width = Math.round(progress.value) + "%";
        }
      }
    })
    
    // 2. Reveal Brand Name (Text moves up)
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out"
    }, "-=0.5")

    // 3. Slide Up the Whole Screen (Exit)
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.5
    });

  }, []);

  return (
    // Main Container: Fixed, Full Screen, Black Background, High Z-Index
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white h-screen w-screen"
    >
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        
        {/* Brand Name Wrapper with Overflow Hidden */}
        <div className="overflow-hidden mb-8">
          <h1 
            ref={textRef} 
            className="text-6xl md:text-8xl font-bold tracking-tighter translate-y-full opacity-0 uppercase"
          >
            Growvia
          </h1>
        </div>
        
        {/* Loading Bar Container */}
        <div className="w-full h-[2px] bg-gray-800 relative overflow-hidden rounded-full">
          {/* Moving White Bar */}
          <div 
            ref={progressRef} 
            className="absolute left-0 top-0 h-full bg-white w-0"
          ></div>
        </div>
        
        {/* Percentage Text */}
        <div className="mt-2 w-full flex justify-end">
           <span ref={percentRef} className="font-mono text-sm text-gray-400">0%</span>
        </div>

      </div>
    </div>
  );
};

export default Preloader;