import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDownRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const manifestoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. HERO PARALLAX (Slightly Faster) ---
      gsap.to(".hero-img", {
        yPercent: 15, // Thoda tight control
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0 // Instant scrub
        }
      });

      // --- 2. MANIFESTO REVEAL (Snappy) ---
      const words = manifestoRef.current.querySelectorAll('.word');
      gsap.fromTo(words, 
        { opacity: 0.1, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.02, // Faster stagger
          scrollTrigger: {
            trigger: ".manifesto-section",
            start: "top 70%", // Jaldi shuru hoga
            end: "bottom 60%",
            scrub: 0.5, // Faster reaction
          }
        }
      );

      // --- 3. STATS REVEAL ---
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)", // Pop effect
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text
  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-3 leading-tight will-change-[opacity,filter]">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black overflow-hidden selection:bg-black selection:text-white">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="hero-section relative w-full h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                alt="Office" 
                className="hero-img w-full h-[120%] object-cover origin-top"
            />
            <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 text-white mix-blend-difference">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.4em] mb-6">Who We Are</p>
            <h1 className="text-[13vw] font-black leading-[0.8] tracking-tighter">
                WE CRAFT<br/>LEGACIES.
            </h1>
        </div>
      </section>

      {/* --- 2. MANIFESTO --- */}
      <section className="manifesto-section py-40 px-6 md:px-20 max-w-6xl mx-auto">
         <p ref={manifestoRef} className="text-4xl md:text-7xl font-bold leading-[1.1] text-black">
            {splitText("We believe that digital products should be more than just functional. They should be intuitive, beautiful, and deeply human. In a world of noise, we bring clarity. We don't just build websites; we build the future.")}
         </p>
      </section>

      {/* --- 3. NUMBERS --- */}
      <section className="stats-section py-24 border-y border-gray-200">
         <div className="px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { label: "Years Active", value: "05+" },
                { label: "Projects Done", value: "120+" },
                { label: "Awards Won", value: "18" },
                { label: "Happy Clients", value: "98%" }
            ].map((stat, i) => (
                <div key={i} className="stat-item flex flex-col gap-2">
                    <span className="text-6xl md:text-8xl font-black tracking-tighter">{stat.value}</span>
                    <span className="text-sm font-bold font-mono uppercase tracking-widest text-gray-400">{stat.label}</span>
                </div>
            ))}
         </div>
      </section>

      {/* --- 4. VALUES GRID --- */}
      <section className="py-40 px-6 md:px-20">
         <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Our<br/>DNA</h2>
            <p className="text-gray-500 text-lg max-w-md text-right mt-8 md:mt-0 font-medium">
                The core principles that drive every pixel we push and every line of code we write.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
                { title: "Innovation", desc: "We don't follow trends; we set them. Constantly pushing the boundaries." },
                { title: "Precision", desc: "God is in the details. From 1px borders to millisecond micro-interactions." },
                { title: "Empathy", desc: "We design for humans. User experience is at the heart of every decision." }
            ].map((item, i) => (
                <div key={i} className="group p-10 border border-gray-200 rounded-3xl hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-white/20 flex items-center justify-center mb-10 transition-colors duration-300">
                        <FiArrowDownRight className="text-2xl group-hover:rotate-[-45deg] transition-transform duration-300"/>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed text-base font-medium">
                        {item.desc}
                    </p>
                </div>
            ))}
         </div>
      </section>

      {/* --- 5. THE TEAM (FAST & BIG) --- */}
      <section className="team-section py-40 bg-gray-50 px-6 md:px-20">
         <div className="flex justify-between items-end mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-400">The Minds</h2>
            <span className="hidden md:block text-xs text-gray-400 uppercase tracking-widest">(Hover to reveal)</span>
         </div>
         
         <div className="flex flex-col border-t border-gray-300">
            {[
                { name: "Arjun Sharma", role: "Founder & Creative Dir.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
                { name: "Sarah Jenkins", role: "Head of Strategy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" },
                { name: "David Miller", role: "Lead Developer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
                { name: "Priya Patel", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" }
            ].map((member, i) => (
                <div key={i} className="team-member group relative border-b border-gray-300 py-16 flex items-center justify-between cursor-pointer overflow-visible z-10 hover:z-20">
                    
                    {/* Text Content */}
                    <div className="relative z-30 pointer-events-none">
                        <h3 className="text-4xl md:text-7xl font-bold group-hover:translate-x-4 transition-transform duration-200 ease-out text-black">
                            {member.name}
                        </h3>
                        <p className="text-gray-500 mt-3 text-lg group-hover:translate-x-4 transition-transform duration-200 ease-out delay-0">
                            {member.role}
                        </p>
                    </div>

                    {/* BIG FAST IMAGE REVEAL */}
                    <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                         <img 
                            src={member.img} 
                            alt={member.name} 
                            // SIZE INCREASED: w-80 h-[28rem]
                            // SPEED INCREASED: duration-300 ease-out (No delay)
                            className="w-64 h-80 md:w-[22rem] md:h-[30rem] object-cover rounded-xl shadow-2xl
                            opacity-0 scale-90 rotate-6 translate-y-10
                            group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-y-0
                            transition-all duration-300 ease-out origin-center"
                        />
                    </div>

                    <span className="text-3xl opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out text-black relative z-30">
                        &rarr;
                    </span>
                </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default About;