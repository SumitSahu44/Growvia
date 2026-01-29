import React, { useEffect, useRef, useState } from 'react';

const Preloader = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Sirf greetings ki list
  const greetings = ["Hello", "नमस्ते", "こんにちは", "Bonjour", "Hola", "Ciao"];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!gsapLoaded) return;

    const gsap = window.gsap;
    const tl = gsap.timeline({
      onComplete: () => setIsVisible(false) 
    });

    // Initial state
    gsap.set(containerRef.current, { clipPath: "inset(0% 0% 0% 0%)" });

    // 1. Language Cycle Animation
    greetings.slice(1).forEach((word) => {
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.1, // Thoda sa duration badhaya taaki readable rahe
        ease: "power1.in",
        onComplete: () => {
          if (textRef.current) textRef.current.innerText = word;
        }
      })
      .to(textRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power1.out",
      }, "+=0.02");
    });

    // 2. Final Exit (Growvia ke bina direct exit)
    tl.to(textRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 0.3,
      delay: 0.2, // Aakhri word ke baad thoda wait
      ease: "power2.inOut"
    })
    .to(containerRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.7,
      ease: "expo.inOut"
    }, "-=0.1");

    return () => tl.kill();
  }, [gsapLoaded]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white h-screen w-screen overflow-hidden select-none"
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        {/* Sirf Greetings wala text */}
        <div className="flex items-center justify-center">
          <h1 
            ref={textRef} 
            className="text-5xl md:text-8xl font-bold tracking-tight"
          >
            Hello
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Preloader;