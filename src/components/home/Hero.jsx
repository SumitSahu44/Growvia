import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const heroMediaRef = useRef(null);
  const imageRef = useRef(null);

  // --- ADVANCED TYPING/SWAPPER LOGIC ---
  const words = ["BOUNDARIES", "LIMITS", "EXPECTATIONS", "CONVENTIONS"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Text Reveal Animation
      tl.from(".hero-line span", {
        y: "110%",
        duration: 1.5,
        stagger: 0.2,
      })
        .from(".hero-subtext", {
          opacity: 0,
          y: 30,
          duration: 1,
        }, "-=0.8")
        .from(".hero-btn", {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
        }, "-=1");

      // 2. Media Reveal
      tl.fromTo(heroMediaRef.current,
        { clipPath: "inset(30% 20% 30% 20% rounded 60px)" },
        { clipPath: "inset(0% 0% 0% 0% rounded 20px)", duration: 2, ease: "expo.inOut" },
        "-=1.5"
      );

      // 3. Parallax on Scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      /* Yahan pt-32 add kiya hai navbar ke niche space ke liye */
      className="relative w-full min-h-screen pt-32 md:pt-40 pb-20 bg-white text-black overflow-hidden flex flex-col items-center"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-48 left-1/2 -translate-x-1/2 text-[18vw] font-black text-gray-50 opacity-[0.03] select-none pointer-events-none uppercase">
        Growvia
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10">

        {/* --- CREATIVE TYPOGRAPHY --- */}
        <div className="text-center mb-16">
          {/* Font size slightly reduced for better fitting */}
          <h1 className="text-[10vw] md:text-[7.5vw] font-black leading-[0.85] tracking-tighter uppercase">
            <div className="hero-line overflow-hidden py-2">
              <span className="inline-block">Growth</span>
            </div>
            <div className="hero-line overflow-hidden py-2 text-blue-600 italic">
              <span className="inline-block">Beyond</span>
            </div>

            {/* Swapping Word Area */}
            <div className="hero-line overflow-hidden h-[1.1em] relative py-2">
              <span
                key={words[index]}
                className="inline-block animate-typing-reveal"
              >
                {words[index]}
                <span className="inline-block w-[4px] h-[0.8em] bg-blue-600 ml-2 animate-pulse" />
              </span>
            </div>
          </h1>
        </div>

        {/* --- BUTTON --- */}
        <div className="flex flex-col items-center justify-center gap-10 max-w-6xl mx-auto mb-14">
          <div className="hero-btn">
            <Link to="/contact">
              <button className="group relative px-10 py-5 bg-black text-white rounded-full font-bold overflow-hidden transition-all flex items-center gap-3">
                <span className="relative z-10">Book Your Free Consultation</span>
                <FiArrowRight className="relative z-10 text-xl group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>

        {/* --- THE MEDIA WINDOW --- */}
        <div
          ref={heroMediaRef}
          className="relative w-full max-w-7xl aspect-video md:aspect-[21/9] mx-auto overflow-hidden shadow-2xl z-20"
          style={{ willChange: 'clip-path' }}
        >
          <img
            ref={imageRef}
            src="/images/new/website photo .png"
            alt="Showcase"
            className="w-full h-full object-cover scale-125"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-[1px] bg-white/50" />
              <span className="text-xs tracking-[0.4em] font-light">EST. 2025</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">CRAFTING DIGITAL SUCCESS</h2>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes typing-reveal {
          0% { transform: translateY(100%); opacity: 0; filter: blur(10px); }
          20% { transform: translateY(0); opacity: 1; filter: blur(0px); }
          80% { transform: translateY(0); opacity: 1; filter: blur(0px); }
          100% { transform: translateY(-100%); opacity: 0; filter: blur(10px); }
        }
        .animate-typing-reveal {
          animation: typing-reveal 3s infinite ease-in-out;
        }
      `}} />
    </section>
  );
};

export default Hero;