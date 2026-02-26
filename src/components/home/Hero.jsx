import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiPlay } from 'react-icons/fi'; // Icons
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const heroMediaRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Text Elements Reveal (Staggered Up)
      // Hum text-container ke andar ke sabhi children ko target karenge
      tl.from(".hero-anim-item", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2
      })
        // 2. The Big Media Reveal (Scale Up effect)
        .from(heroMediaRef.current, {
          y: 100,
          scale: 0.9,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        }, "-=1.0"); // Text ke saath saath start hoga

      // 3. Scroll Parallax for the Media Container
      gsap.to(heroMediaRef.current, {
        y: -50, // Scroll karne par ye thoda upar jayega (floating feel)
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth interaction
        },
      });

      // 4. Image Scale inside container (Zoom effect)
      gsap.to(imageRef.current, {
        scale: 1.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen pt-32 pb-20 px-4 md:px-8 bg-white text-black flex flex-col items-center"
    >

      {/* --- CENTERED TEXT CONTENT --- */}
      <div ref={textContainerRef} className="max-w-4xl w-full text-center flex flex-col items-center z-10 mb-16">

        {/* 1. Pill Badge */}
        <div className="hero-anim-item mb-6">
          <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-600">
            Reimagining Digital
          </span>
        </div>

        {/* 2. Main Headline (Clean, Solid, Centered) */}
        <h1 className="hero-anim-item text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
          GROWTH BEYOND <br />
          <span className="text-gray-500">BOUNDARIES.</span>
        </h1>

        {/* 3. Subtext */}
        <p className="hero-anim-item max-w-xl text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-10">
          Growvia is a performance-led digital growth partner helping brands attract attention, convert audiences, and scale revenue through strategy, design, and paid media.
        </p>

        {/* 4. Action Buttons */}
        <div className="hero-anim-item flex  flex-row sm:flex-row gap-4 w-full justify-center">
          <Link to="/contact">
            <button className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
              Start a Project <FiArrowRight />
            </button>
          </Link>
          {/* <button className="px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-bold text-sm tracking-wide hover:bg-gray-50 hover:border-black transition-all duration-300 flex items-center justify-center gap-2">
            View Showreel <FiPlay className="fill-current" />
          </button> */}
        </div>

      </div>


      {/* --- THE FLOATING MEDIA CONTAINER --- */}
      {/* Ye wo element hai jo "Tagda" look dega. Ek dum clean window. */}
      <div
        ref={heroMediaRef}
        className="w-full max-w-6xl h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl relative z-0"
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} // Soft premium shadow
      >
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>

        {/* Image/Video */}
        <img
          ref={imageRef}
          src="/images/hero1.jpeg"
          alt="Agency Work Showcase"
          className="w-full h-full object-cover"
        />

        {/* Optional: Floating Badge on Image */}
        <div className="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl hidden md:block">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Featured Work</p>
          <p className="text-sm font-black text-black">Nike Campaign 2024 &rarr;</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;