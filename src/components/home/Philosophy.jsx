import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = ({
  title = "The Future We’re Building",
  text = "We’re building a future where brands don’t compete for attention, they command it. Through strategy, design, and performance marketing, we help businesses evolve into industry leaders that set trends instead of following them. Every project we take on is crafted to be scalable, impactful, and built for long-term dominance."
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const words = textRef.current.querySelectorAll('.word');

      // --- TEXT REVEAL ANIMATION ---
      gsap.fromTo(words,
        {
          opacity: 0.1,
          filter: "blur(8px)",
          y: 10 // Thoda neeche se aayega
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.05, // Ek-ek karke word reveal hoga
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%", // Jab section screen ke 70% height pe aayega tab start hoga
            end: "bottom 60%", // End point
            scrub: 1, // Smooth scrolling control (Mouse ke sath chalega)
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Text Splitter Helper
  const splitText = (content) => {
    return content.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-3 md:mr-4 leading-tight will-change-[opacity,filter,transform]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 md:py-20 px-3 md:px-20 bg-white text-black overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto text-center md:text-left w-full">

        {/* Small Label */}
        <div className="mb-8 md:mb-12 flex items-center justify-center md:justify-start gap-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-sm font-bold font-mono uppercase tracking-[0.3em] text-gray-400">
            {title}
          </span>
        </div>

        {/* Main Manifesto Text */}
        <p
          ref={textRef}
          className="text-2xl md:text-3xl lg:text-[45px] font-black leading-[1.1] tracking-tight text-black"
        >
          {splitText(text)}
        </p>

      </div>
    </section>
  );
};

export default Manifesto;