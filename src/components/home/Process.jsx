import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Discovery & Audit",
    description: "We analyze your brand from every angle, competitors, audiences, and data, to identify exactly where scale is waiting.",
  },
  {
    id: "02",
    title: "Strategy Blueprint",
    description: "We map out a focused strategy combining creative, targeting, and channel planning designed for performance from day one.",
  },
  {
    id: "03",
    title: "Execution & Scale",
    description: "We execute campaigns with a clear structure, closely monitor performance, and continuously refine targeting, creatives, and strategy to improve results and scale what works best.",
  },
  {
    id: "04",
    title: "Data & Growth Insights",
    description: "We don’t guess, we measure. From conversion data to audience signals, we analyse everything to refine campaigns, improve ROI, and unlock consistent growth.",
  },
];

const Process = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // --- 1. THE CONNECTING LINE ANIMATION ---
      // Jaise section scroll hoga, line upar se neeche grow karegi
      gsap.fromTo(lineRef.current,
        { scaleY: 0 }, // Start with 0 height
        {
          scaleY: 1, // Grow to full height
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center", // Jab section screen ke beech me aaye
            end: "bottom center",
            scrub: 1, // Smooth connection with scroll
          }
        }
      );

      // --- 2. INDIVIDUAL STEPS REVEAL ---
      stepRefs.current.forEach((step, index) => {
        // Determine direction (even left, odd right on desktop)
        const isEven = index % 2 === 0;
        const xStart = isEven ? -100 : 100;

        // Content slide-in animation
        gsap.fromTo(step.querySelector('.step-content'),
          { opacity: 0, x: xStart },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%", // Thoda jaldi reveal ho taaki smooth lage
              toggleActions: "play none none reverse"
            }
          }
        );

        // Dot pop-up animation
        gsap.fromTo(step.querySelector('.step-dot'),
          { scale: 0, backgroundColor: "#e5e7eb" }, // gray-200
          {
            scale: 1,
            backgroundColor: "#2563eb", // blue-600 (Active color)
            duration: 0.5,
            ease: "back.out(1.7)", // Thoda bounce effect
            scrollTrigger: {
              trigger: step,
              start: "top center",
            }
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Helper to add refs
  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) stepRefs.current.push(el);
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative">

        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 text-black">
            THE FRAMEWORK FOR SCALE.

          </h2>
        </div>


        {/* --- THE BACKBONE LINE (Static Gray Background Line) --- */}
        {/* Mobile: Left side | Desktop: Center */}
        <div className="absolute left-8 md:left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2 md:translate-x-0"></div>

        {/* --- THE ANIMATED LINE (Growing Blue Line) --- */}
        <div
          ref={lineRef}
          className="absolute left-8 md:left-1/2 top-0 h-full w-[2px] bg-blue-600 origin-top -translate-x-1/2 md:translate-x-0 scale-y-0"
        ></div>


        {/* --- STEPS --- */}
        <div className="relative z-10 flex flex-col gap-16 md:gap-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.id}
                ref={addToRefs}
                // Responsive Layout: Mobile=Flex Start, Desktop=Alternating
                className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-start md:justify-center w-full relative`}
              >

                {/* The Content Box */}
                {/* Mobile: Left margin for line | Desktop: Width 50% and padding */}
                <div className={`step-content ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <span className="block text-6xl font-black text-gray-300 mb-2 leading-none">{step.id}</span>
                  <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                </div>

                {/* The Connecting Dot (Marker) */}
                {/* Mobile: Left positioned | Desktop: Center positioned */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 md:translate-x-0 flex items-center justify-center">
                  {/* Outer Glow Ring */}
                  <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-100 shadow-sm flex items-center justify-center z-20">
                    {/* Inner Animated Dot */}
                    <div className="step-dot w-3 h-3 rounded-full bg-gray-200"></div>
                  </div>
                </div>

                {/* Empty Space for balancing desktop layout */}
                <div className="hidden md:block md:w-1/2"></div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Process;