import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phrase = "In a digital world full of noise, we don't just shout louder. We speak clearer. We believe that true growth comes from the perfect balance of data-driven strategy and human-centric design. We don't chase trends; we set the standards that others follow.";

const Philosophy = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bodyRef = useRef(null);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {

    const words = gsap.utils.toArray(
      textRef.current.querySelectorAll('.word')
    );

    gsap.fromTo(
      words,
      {
        opacity: 0.15,
      },
      {
        opacity: 1,
        ease: "none",
        stagger: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", // 👈 40–50px niche se start
          end: `+=${words.length * 120}`, // 👈 natural scroll length
          scrub: true,
          pin: true,
          pinSpacing: false, // 👈 GLITCH FIX
          anticipatePin: 1,
        },
      }
    );

  }, containerRef);

  return () => ctx.revert();
}, []);


  // Helper function to split text into words
  const splitWords = (phrase) => {
    return phrase.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[1.5vw] opacity-10">
        {word}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[200vh] bg-gray-50 flex items-center justify-center text-black"
    >
      <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] h-screen flex flex-col justify-center">
        
        {/* Small Label */}
        <div className="mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
                Our Philosophy
            </span>
        </div>

        {/* The Giant Text Reveal */}
        <p 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tight text-black flex flex-wrap"
        >
          {splitWords(phrase)}
        </p>

        {/* Bottom Signature / CTA */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-300 pt-6">
            <p className="text-sm text-gray-500 font-mono">EST. 2024</p>
            <p className="text-sm text-gray-500 font-mono">SCROLL TO READ</p>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;