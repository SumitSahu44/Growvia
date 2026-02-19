import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDownRight } from 'react-icons/fi';
import Values from '../components/about/Values';
import MissionVision from '../components/about/MissionVision';
import WhyGrowVia from '../components/common/WhyGrowVia';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const manifestoRef = useRef(null);
    const galleryRef = useRef(null);
const sectionRef = useRef(null);
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
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFnZW5jeXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Office"
                        className="hero-img w-full h-[120%] object-cover origin-top"
                    />
                    {/* Dark Gradient at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-white">
                    <p className="font-mono text-sm font-bold uppercase tracking-[0.4em] mb-6 text-white/80">Who We Are</p>
                    <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter">
                        Growth without <br />guesswork.
                    </h1>
                </div>
            </section>

            {/* --- 2. MANIFESTO (Split Layout: Image + Text) --- */}
           <section ref={sectionRef} className="manifesto-section py-32 px-6 md:px-20 w-full bg-white">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

                {/* Left: Content Area */}
                <div className="w-full lg:w-1/2">
                    <div className="mb-8">
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">GrowVia Origins</span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black">
                            Our Story.
                        </h2>
                    </div>

                    {/* Animated Manifesto Text */}
                    <div ref={manifestoRef} className="text-3xl md:text-4xl font-bold leading-[1.1] text-black mb-10">
                        {splitText("GrowVia Digital Marketing was built by three founders who have spent years inside real ad accounts, real businesses, and real pressure situations, where performance matters and excuses don’t.")}
                    </div>

                    {/* Secondary Detail Text */}
                    <div className="space-y-6 text-lg text-gray-700 max-w-xl border-l-2 border-black pl-6 italic">
                        <p>
                            We are not a <span className="font-bold text-black">"full-service agency"</span> that dabbles in everything. We are specialists who focus on what actually moves revenue: <span className="underline decoration-red-500 decoration-2 underline-offset-4">paid media, scalable funnels, and conversion-driven websites.</span>
                        </p>
                        <p className="font-medium">
                            If you’re tired of agencies that speak in impressions, vanity metrics, and buzzwords, you’re in the right place.
                        </p>
                    </div>

                    {/* Counter/Stat section */}
                    <div className="mt-12 flex gap-12">
                        <div>
                            <span className="block text-4xl font-black italic">03</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Founders</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black italic">ROI</span>
                            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Focused</span>
                        </div>
                    </div>
                </div>

                {/* Right: Parallax Image */}
                <div className="w-full lg:w-1/2 h-[60vh] lg:h-[85vh] overflow-hidden rounded-3xl relative shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                        alt="High Performance Work Environment"
                        className="manifesto-img w-full h-[130%] object-cover"
                    />
                    {/* Subtle Overlay to match modern aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                </div>

            </div>
        </section>


             <MissionVision />
            <Values />

          <WhyGrowVia />




           

         
            {/* --- 4. THE TEAM (KEPT EXACTLY AS REQUESTED) --- */}
            <section className="team-section py-40 bg-gray-50 px-6 md:px-20">
                <div className="flex justify-between items-end mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-600">The Minds</h2>
                    <span className="hidden md:block text-xs text-gray-600 uppercase tracking-widest">(Hover to reveal)</span>
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
                                <p className="text-gray-700 mt-3 text-lg group-hover:translate-x-4 transition-transform duration-200 ease-out delay-0">
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