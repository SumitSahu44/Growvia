import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Values from '../components/about/Values';
import MissionVision from '../components/about/MissionVision';
import WhyGrowVia from '../components/common/WhyGrowVia';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
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

            // --- 2. MANIFESTO IMAGE PARALLAX ---
            gsap.to(".manifesto-img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".manifesto-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white min-h-screen text-black overflow-hidden selection:bg-black selection:text-white">

            {/* --- 1. HERO SECTION --- */}
            <section className="hero-section relative w-full h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/about1.jpeg"
                        alt="Office"
                        className="hero-img w-full h-[120%] object-cover origin-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-white">
                    <p className="font-mono text-sm font-bold uppercase tracking-[0.4em] mb-6 text-white/80">Who We Are</p>
                    <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter">
                        Growth without <br />guesswork.
                    </h1>
                </div>
            </section>

            {/* --- 2. MANIFESTO (Editorial Layout) --- */}
            <section ref={sectionRef} className="manifesto-section py-32 w-full bg-white flex flex-col items-center">
                
                {/* LAYER 1: Centered Stats & Our Story Intro */}
                <div className="max-w-6xl w-full px-6 md:px-20 mb-24">
                    {/* Centered Gap Stats */}
                    <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 mb-24">
                        <div className="text-center">
                            <span className="block text-6xl md:text-8xl font-black italic text-black leading-none">03</span>
                            <span className="text-sm md:text-base uppercase tracking-widest text-gray-500 font-bold mt-2 block">Founders</span>
                        </div>
                        {/* Divider Dot (Optional, looks premium) */}
                        <div className="hidden md:block w-3 h-3 bg-black rounded-full"></div>
                        <div className="text-center">
                            <span className="block text-6xl md:text-8xl font-black italic text-black leading-none">ROI</span>
                            <span className="text-sm md:text-base uppercase tracking-widest text-gray-500 font-bold mt-2 block">Focused</span>
                        </div>
                    </div>

                    {/* Our Story Header & Main Content */}
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 block mb-6">GrowVia Origins</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black mb-10">
                            Our Story.
                        </h2>
                        <p className="text-3xl md:text-5xl font-bold leading-[1.15] text-black tracking-tight">
                            GrowVia Digital Marketing was built by three founders who have spent years inside real ad accounts, real businesses, and real pressure situations, where performance matters and excuses don’t.
                        </p>
                    </div>
                </div>

                {/* LAYER 2: Large Parallax Image */}
                <div className="w-full px-4 md:px-10 mb-24">
                    <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-[2rem] relative shadow-2xl">
                        <img
                            src="/images/about2.jpeg"
                            alt="High Performance Work Environment"
                            className="manifesto-img w-full h-[130%] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                    </div>
                </div>

                {/* LAYER 3: Offset Secondary Text */}
                <div className="max-w-6xl w-full px-6 md:px-20 flex justify-end">
                    <div className="w-full lg:w-1/2">
                        <div className="space-y-8 text-xl md:text-2xl text-gray-600 border-l-4 border-black pl-6 md:pl-10 italic">
                            <p>
                                We are not a <span className="font-bold text-black not-italic">"full-service agency"</span> that dabbles in everything. We are specialists who focus on what actually moves revenue: <span className="text-black font-semibold not-italic">paid media, scalable funnels, and conversion-driven websites.</span>
                            </p>
                            <p className="font-medium text-black not-italic text-2xl md:text-3xl">
                                If you’re tired of agencies that speak in impressions, vanity metrics, and buzzwords, you’re in the right place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <MissionVision />
            <Values />
            <WhyGrowVia />

            {/* --- 4. THE TEAM --- */}
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