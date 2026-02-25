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
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // --- 1. THE CONNECTING LINE ANIMATION ---
      // Line ab timeline container ke respect me chalegi, header ke nahi
      gsap.fromTo(lineRef.current,
        { scaleY: 0 }, 
        {
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center", // Jab timeline area screen ke center me aaye
            end: "bottom center",
            scrub: 1, 
          }
        }
      );

      // --- 2. INDIVIDUAL STEPS REVEAL ---
      stepRefs.current.forEach((step, index) => {
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
              start: "top 80%", 
              toggleActions: "play none none reverse"
            }
          }
        );

        // Dot pop-up animation
        gsap.fromTo(step.querySelector('.step-dot'),
          { scale: 0, backgroundColor: "#e5e7eb" }, 
          {
            scale: 1,
            backgroundColor: "#2563eb", 
            duration: 0.5,
            ease: "back.out(1.7)", 
            scrollTrigger: {
              trigger: step,
              start: "top center",
            }
          }
        );
      });

    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) stepRefs.current.push(el);
  };

  return (
    <section className="relative py-24 md:py-30 bg-[#f8fafc] overflow-hidden text-slate-900">
      <div className="container mx-auto px-6 md:px-12 relative max-w-6xl">

        {/* --- Section Header (Line iske upar nahi aayegi ab) --- */}
        <div className="text-center mb-24 relative z-20">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 text-slate-900">
            THE FRAMEWORK FOR SCALE.
          </h2>
        </div>

        {/* --- TIMELINE AREA --- */}
        {/* Is naye wrapper ki wajah se line header ko cut nahi karegi */}
        <div ref={timelineRef} className="relative pt-8 pb-8">
          
          {/* THE BACKBONE LINE (Static Light Gray) */}
          <div className="absolute left-8 md:left-1/2 top-0 h-full w-[2px] bg-slate-200 -translate-x-1/2 md:translate-x-0"></div>

          {/* THE ANIMATED LINE (Growing Blue Line) */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 h-full w-[2px] bg-blue-600 origin-top -translate-x-1/2 md:translate-x-0 scale-y-0 z-10"
          ></div>

          {/* --- STEPS --- */}
          <div className="relative z-20 flex flex-col gap-16 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.id}
                  ref={addToRefs}
                  className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between w-full relative`}
                >

                  {/* The Content Card Wrapper */}
                  <div className={`step-content w-full md:w-1/2 ml-12 md:ml-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    
                    {/* Light Glassy Premium Card */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                      
                      {/* Background Watermark Number */}
                      <span className="absolute -top-6 right-2 text-[8rem] font-black text-slate-100 select-none leading-none z-0">
                        {step.id}
                      </span>

                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                          <span className="text-blue-600 font-bold text-lg">{step.id}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>
                        <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                      </div>

                    </div>
                  </div>

                  {/* The Connecting Dot (Marker) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 md:translate-x-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#f8fafc] border-4 border-slate-200 shadow-sm flex items-center justify-center z-20">
                      <div className="step-dot w-3.5 h-3.5 rounded-full bg-slate-300"></div>
                    </div>
                  </div>

                  {/* Empty Space for balancing desktop layout */}
                  <div className="hidden md:block w-1/2"></div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;