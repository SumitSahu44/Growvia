import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phrase = "In a digital world full of noise, we don't just shout louder. We speak clearer. We believe that true growth comes from the perfect balance of data-driven strategy and human-centric design.";

const Philosophy = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const words = textRef.current.querySelectorAll('.word');

      // Timeline bana rahe hain taaki control better ho
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // Jab section screen ke top pe chipak jaye
          end: "+=2000px",  // 2000px ka "Virtual Scroll" (Jitna badhaoge utna dheere animation hoga)
          scrub: 1,         // Thoda smooth lag (1 second)
          pin: true,        // Screen ko JAM kar dega
          pinSpacing: true, // Neeche wale section ko dhakka dega
        }
      });

      // Animation: Grey/Blur to Black/Clear
      tl.fromTo(words, 
        { 
          opacity: 0.1, 
          filter: "blur(4px)", // Shuru me thoda blur
          color: "#9ca3af" // Gray-400
        }, 
        {
          opacity: 1, 
          filter: "blur(0px)", // Blur hat jayega
          color: "#000000", // Pure Black
          stagger: 0.1, // Ek ke baad ek
          duration: 1,
          ease: "none",
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (phrase) => {
    return phrase.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[1.5vw] leading-tight will-change-[opacity,filter]">
        {word}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      // FIX: Height ko h-screen kar diya (200vh hata diya) taaki glitch na ho
      className="relative w-full h-screen bg-gray-50 flex flex-col items-center justify-center text-black overflow-hidden"
    >
      <div className="w-full max-w-[90%] md:max-w-[75%] h-full flex flex-col justify-center relative">
        
        {/* Label - Absolute positioning taaki text movement se na hile */}
        <div className="absolute top-20 md:top-24 left-0 flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
                Our Philosophy
            </span>
        </div>

        {/* The Text Reveal */}
        <p 
          ref={textRef} 
          className="text-3xl md:text-5xl lg:text-[5rem] font-black leading-[1.2] tracking-tight flex flex-wrap"
        >
          {splitWords(phrase)}
        </p>

        {/* Bottom Signature */}
        <div className="absolute bottom-10 left-0 w-full flex items-center justify-between border-t border-gray-300 pt-6">
            <p className="text-xs md:text-sm text-gray-400 font-mono">EST. 2024</p>
            <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <p className="text-xs md:text-sm text-gray-500 font-mono uppercase">Keep Scrolling</p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;