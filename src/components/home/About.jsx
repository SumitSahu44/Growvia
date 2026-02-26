import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiGlobe, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // --- 1. CREATIVE IMAGE REVEAL (Clip Path) ---
      // Image starts as a thin line in center, then expands full width & height
      gsap.fromTo(imageRef.current,
        {
          clipPath: "inset(40% 45% 40% 45% round 20px)", // Chota sa rounded box beech me
          scale: 1.1,
          filter: "grayscale(100%)"
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)", // Full visible rectangle
          scale: 1,
          filter: "grayscale(0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          }
        }
      );

      // --- 2. TEXT STAGGER REVEAL ---
      const textItems = textContainerRef.current.querySelectorAll('.reveal-text');
      gsap.fromTo(textItems,
        { y: 50, opacity: 0, rotate: 2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%",
          }
        }
      );

      // --- 3. FLOATING BADGE PARALLAX ---
      gsap.to(".floating-badge", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // WHITE BG, BLACK TEXT
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 md:px-20 bg-white text-black relative overflow-hidden"
    >

      {/* Decorative Background Text (Subtle) */}
      <div className="absolute top-10 right-0 text-[15vw] font-black text-gray-100 leading-none pointer-events-none select-none z-0">
        AGENCY
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* --- LEFT: TEXT CONTENT --- */}
        <div ref={textContainerRef} className="order-2 lg:order-1 flex flex-col justify-center">

          <div className="reveal-text flex items-center gap-3 mb-8">
            <span className="w-3 h-3 bg-black rounded-full"></span>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
              Our Philosophy
            </span>
          </div>

          <h2 className="reveal-text text-3xl md:text-5xl font-black leading-[0.9] mb-8 tracking-tight">
            WE DON’T JUST CREATE.<br />
            WE BUILD BRANDS THAT
            <span className="text-blue-600 md:text-6xl"> LEAD.</span>
          </h2>

          <p className="reveal-text text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
            In a world saturated with content, we craft distinction. Growvia empowers brands to stand out, scale strategically, and command attention where it matters most.  </p>

          {/* Minimalist Stats Row */}
          <div className="reveal-text flex gap-12 border-t border-gray-200 pt-8 mb-10">
            <div>
              <span className="block text-4xl font-black">10+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Years Exp</span>
            </div>
            <div>
              <span className="block text-4xl font-black">50+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Projects</span>
            </div>
          </div>

          <div className="reveal-text">
            <Link to="/about" >
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2">
              Discover More <FiArrowUpRight className="text-lg" />
            </button>
            </Link>
          </div>

        </div>


        {/* --- RIGHT: CREATIVE IMAGE COMPONENT --- */}
        <div className="order-1 lg:order-2 relative h-[500px] md:h-[700px] w-full flex items-center justify-center">

          {/* The Main Image (Animated via GSAP ClipPath) */}
          <div className="w-full h-full relative z-10">
            <img
              ref={imageRef}
              src="/images/hero2.jpeg"
              alt="Creative Team"
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>

          {/* Floating Badge 1 (Top Right) */}
          <div className="floating-badge absolute -top-10 -right-10 md:right-[-40px] z-20 bg-white p-6 shadow-2xl rounded-2xl border border-gray-100 hidden md:block rotate-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full text-green-600"><FiGlobe /></div>
              <span className="font-bold text-sm">Global Reach</span>
            </div>
            <p className="text-xs text-gray-400">Working with clients<br />worldwide.</p>
          </div>

          {/* Floating Badge 2 (Bottom Left) */}
          <div className="floating-badge absolute -bottom-10 -left-10 md:left-[-40px] z-20 bg-black text-white p-6 shadow-2xl rounded-2xl rotate-[-6deg] hidden md:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-full text-white"><FiUsers /></div>
              <span className="font-bold text-sm">Creative Team</span>
            </div>
            <p className="text-xs text-white/60">Designers, Devs &<br />Strategists.</p>
          </div>

          {/* Abstract Shape (Behind) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gray-100 -rotate-3 rounded-[3rem] -z-10"></div>

        </div>

      </div>
    </section>
  );
};

export default About;