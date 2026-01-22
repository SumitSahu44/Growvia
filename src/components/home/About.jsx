import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. THE IMAGE REVEAL (Neeche se Upar) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Jab section screen ke 60% par aaye tab chalu ho
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        }
      });

      // Step A: Container grows from height 0 to Full
      tl.fromTo(imageContainerRef.current, 
        { 
          scaleY: 0, // Height 0
          transformOrigin: "bottom center" // Grow from Bottom
        },
        { 
          scaleY: 1, // Full Height
          duration: 1.5,
          ease: "power4.inOut" // Slow start, fast middle, slow end (Premium feel)
        }
      )
      // Step B: Image scales down inside (Zoom Out effect)
      .fromTo(imageRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 1.5, ease: "power4.out" },
        "<" // Starts at same time as Step A
      );


      // --- 2. TEXT CONTENT REVEAL ---
      // Hum text elements ko tab reveal karenge jab image aadha grow ho jaye
      gsap.fromTo(".about-text-item", 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, // Ek ke baad ek
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-24 md:py-32 px-6 md:px-12 bg-black text-white relative overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div ref={textRef} className="order-2 lg:order-1 flex flex-col justify-center">
          
          <div className="about-text-item flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-blue-500"></span>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
              Who We Are
            </span>
          </div>

          <h2 className="about-text-item text-4xl md:text-6xl font-black leading-tight mb-8">
            NOT JUST AN AGENCY. <br />
            <span className="text-gray-500">WE ARE YOUR GROWTH ENGINE.</span>
          </h2>

          <p className="about-text-item text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
            At Growvia, we don't believe in "trying". We believe in data-driven dominance. 
            We blend creative storytelling with aggressive performance marketing to turn clicks into customers.
          </p>

          {/* Stats / Checkpoints */}
          <div className="about-text-item grid grid-cols-2 gap-6 mb-10 border-t border-gray-800 pt-8">
            <div>
              <h3 className="text-4xl font-bold text-white mb-1">150+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Brands Scaled</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-1">10X</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Average ROI</p>
            </div>
          </div>

          <div className="about-text-item">
             <button className="flex items-center gap-3 text-white border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 group">
                <span className="text-sm font-bold uppercase tracking-widest">Read Our Story</span>
                <FiArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
             </button>
          </div>

        </div>


        {/* --- RIGHT: ANIMATED IMAGE (Niche se Upar Effect) --- */}
        <div className="order-1 lg:order-2 h-[500px] md:h-[700px] w-full relative flex items-end justify-center">
            {/* Wrapper Logic: 
               Is div ki height hum GSAP se control kar rahe hain (scaleY).
               Overflow hidden hai taaki image reveal effect bane.
            */}
            <div 
              ref={imageContainerRef}
              className="w-full h-full overflow-hidden relative rounded-lg"
            >
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Growvia Team" 
                className="absolute top-0 left-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Optional Creative Overlay Badge */}
              <div className="absolute top-6 right-6 bg-white text-black p-4 rounded-full z-10 animate-spin-slow hidden md:block">
                 <svg viewBox="0 0 100 100" width="80" height="80">
                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent"/>
                    <text>
                      <textPath xlinkHref="#curve" className="text-[11px] font-bold uppercase tracking-widest">
                        • Est. 2024 • Growvia Agency •
                      </textPath>
                    </text>
                 </svg>
              </div>

            </div>
            
            {/* Background Decorative Element (Behind image) */}
            <div className="absolute -z-10 bottom-[-20px] right-[-20px] w-full h-full border-2 border-gray-800 rounded-lg hidden md:block"></div>
        </div>

      </div>
    </section>
  );
};

export default About;