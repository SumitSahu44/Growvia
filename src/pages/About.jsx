import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDownRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const manifestoRef = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. HERO PARALLAX ---
      gsap.to(".hero-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0
        }
      });

      // --- 2. SPLIT MANIFESTO (Image Parallax) ---
      gsap.to(".manifesto-img", {
        yPercent: 20, // Image moves slower than scroll
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Manifesto Text Reveal
      const words = manifestoRef.current.querySelectorAll('.word');
      gsap.fromTo(words, 
        { opacity: 0.1, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: ".manifesto-section",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.5,
          }
        }
      );

      // --- 3. DNA GALLERY REVEAL (Clip Path Animation) ---
      // Images will reveal from bottom-up like a curtain
      const dnaItems = gsap.utils.toArray('.dna-item');
      dnaItems.forEach(item => {
        gsap.fromTo(item, 
            { clipPath: "inset(100% 0% 0% 0%)" }, // Hidden (Cropped from bottom)
            { 
                clipPath: "inset(0% 0% 0% 0%)",   // Fully Visible
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                }
            }
        );
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
      
      {/* --- 1. HERO SECTION (Visual Heavy) --- */}
      <section className="hero-section relative w-full h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
                alt="Office" 
                className="hero-img w-full h-[120%] object-cover origin-top"
            />
            {/* Dark Gradient at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-white">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.4em] mb-6 text-white/80">Who We Are</p>
            <h1 className="text-[13vw] font-black leading-[0.8] tracking-tighter">
                WE CRAFT<br/>LEGACIES.
            </h1>
        </div>
      </section>

      {/* --- 2. MANIFESTO (Split Layout: Image + Text) --- */}
      <section className="manifesto-section py-32 px-6 md:px-20 w-full">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left: Huge Text */}
            <div className="w-full lg:w-1/2">
                <p ref={manifestoRef} className="text-4xl md:text-5xl font-bold leading-[1.1] text-black">
                    {splitText("We believe digital products should be intuitive, beautiful, and deeply human. In a world of noise, we bring clarity.")}
                </p>
                <div className="mt-10 flex gap-10">
                    <div>
                        <span className="block text-4xl font-black">05+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-400">Years</span>
                    </div>
                    <div>
                        <span className="block text-4xl font-black">120+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-400">Projects</span>
                    </div>
                </div>
            </div>

            {/* Right: Parallax Image (Visual Break) */}
            <div className="w-full lg:w-1/2 h-[60vh] lg:h-[80vh] overflow-hidden rounded-2xl relative">
                <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
                    alt="Abstract Art"
                    className="manifesto-img w-full h-[130%] object-cover"
                />
            </div>
         </div>
      </section>

      {/* --- 3. OUR DNA (Visual Gallery Grid) --- */}
      {/* Changed from text boxes to Image Cards */}
      <section ref={galleryRef} className="py-20 px-6 md:px-20">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Our<br/>DNA</h2>
            <p className="text-gray-500 text-lg max-w-md text-right mt-8 md:mt-0 font-medium">
                Visualizing the core principles that drive our design philosophy.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Innovation */}
            <div className="dna-item relative h-[60vh] w-full overflow-hidden rounded-xl group cursor-pointer">
                <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
                    alt="Innovation" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">Innovation</h3>
                    <p className="opacity-80 text-sm leading-relaxed max-w-[200px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Setting trends, not following them. Pushing WebGL and GSAP to the limit.
                    </p>
                </div>
            </div>

            {/* Card 2: Precision */}
            <div className="dna-item relative h-[60vh] w-full overflow-hidden rounded-xl group cursor-pointer md:mt-20"> {/* Staggered Layout */}
                <img 
                    src="https://media.istockphoto.com/id/1709726425/photo/women-use-pens-to-tick-the-correct-sign-mark-in-the-checkbox-for-the-quality-document-control.webp?a=1&b=1&s=612x612&w=0&k=20&c=XmPu91vWoYyOUWlz6rkWBVAy1WsvjH2uZKK3yxb3ye8=" 
                    alt="Precision" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">Precision</h3>
                    <p className="opacity-80 text-sm leading-relaxed max-w-[200px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        God is in the details. Pixel-perfect layouts and silky smooth interactions.
                    </p>
                </div>
            </div>

            {/* Card 3: Empathy */}
            <div className="dna-item relative h-[60vh] w-full overflow-hidden rounded-xl group cursor-pointer">
                <img 
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop" 
                    alt="Empathy" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">Empathy</h3>
                    <p className="opacity-80 text-sm leading-relaxed max-w-[200px] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Designing for humans. We prioritize accessibility and emotional connection.
                    </p>
                </div>
            </div>

         </div>
      </section>

      {/* --- 4. THE TEAM (KEPT EXACTLY AS REQUESTED) --- */}
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
                    
                    <div className="relative z-30 pointer-events-none">
                        <h3 className="text-4xl md:text-7xl font-bold group-hover:translate-x-4 transition-transform duration-200 ease-out text-black">
                            {member.name}
                        </h3>
                        <p className="text-gray-500 mt-3 text-lg group-hover:translate-x-4 transition-transform duration-200 ease-out delay-0">
                            {member.role}
                        </p>
                    </div>

                    <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                         <img 
                            src={member.img} 
                            alt={member.name} 
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