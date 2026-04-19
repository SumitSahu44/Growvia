import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Values from '../components/about/Values';
import MissionVision from '../components/about/MissionVision';
import WhyGrowVia from '../components/common/WhyGrowVia';
import { Link, useLocation } from 'react-router-dom';

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
                        src="/images/new/website photo  (2).png"
                        alt="Office"
                        className="hero-img w-full h-[120%] object-cover origin-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 text-white">
                    <p className="font-mono text-sm bg-[#155dfc] p-1 px-5 w-[185px] rounded-full font-bold uppercase tracking-[0.4em] mb-6 text-white/80">Who We Are</p>
                    <h1 className="text-[10vw] font-black leading-[0.8] tracking-tighter">
                        Growth without <br />guesswork.
                    </h1>
                </div>
            </section>

            {/* --- 2. MANIFESTO (Clean Left-Aligned Layout) --- */}
            <section ref={sectionRef} className="manifesto-section py-20 w-full bg-white">

                {/* LAYER 1: Header & Main Intro */}
                <div className="w-full px-6 md:px-20 mb-20">
                    <div className="max-w-8xl">
                        {/* Pill Style Origins Badge */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-[1px] bg-blue-600"></div>
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-blue-600">GrowVia Origins</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black mb-12">
                            Our Story<span className="text-blue-600">.</span>
                        </h2>

                        <p className="text-3xl md:text-5xl font-bold leading-[1.1] text-black tracking-tight max-w-8xl">
                            GrowVia Digital Marketing was built by three founders who have spent years inside real ad accounts, real businesses, and real pressure situations, where performance matters and excuses don’t.
                        </p>
                    </div>
                </div>

                {/* LAYER 2: Large Parallax Image */}
                <div className="w-full px-4 md:px-20 mb-20">
                    <div className="w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-[1.5rem] md:rounded-[3rem] relative shadow-2xl">
                        <img
                            src="/images/new/about.png"
                            alt="High Performance Work Environment"
                            className="manifesto-img w-full h-[130%] object-cover"
                        />
                        {/* Subtle dark overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>

                {/* LAYER 3: Secondary Content (Now Left Aligned) */}
                <div className="w-full px-6 md:px-20">
                    <div className="max-w-4xl">
                        <div className="space-y-10">
                            {/* Accent Border Line */}
                            <div className="w-20 h-2 bg-black mb-10"></div>

                            <div className="space-y-8 text-2xl md:text-3xl text-gray-600 leading-snug">
                                <p className="italic border-l-4 border-blue-600 pl-6 md:pl-10">
                                    We are not a <span className="font-bold text-black not-italic uppercase tracking-tighter">"full-service agency"</span> that dabbles in everything. We are specialists who focus on what actually moves revenue:
                                    <span className="text-black font-semibold not-italic"> paid media, scalable funnels, and conversion-driven websites.</span>
                                </p>

                                <p className="font-black text-black text-3xl md:text-5xl tracking-tighter leading-none pt-4">
                                    If you’re tired of agencies that speak in impressions, vanity metrics, and buzzwords, you’re in the right place.
                                </p>
                            </div>

                            {/* Optional Call to Action Link */}
                            <div className="pt-6">
                                <Link to="/contact">
                                    <button className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                                        Work with us &rarr;
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MissionVision />
            <Values />
            <WhyGrowVia />

            {/* --- 4. THE TEAM --- */}
            <section className="team-section py-10 bg-gray-50 px-6 mb-20 md:px-20">
                <div className="flex justify-between items-end mb-20">
                    <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-gray-600">The Minds</h2>
                    <span className="hidden md:block text-xs text-gray-600 uppercase tracking-widest">(Hover to reveal)</span>
                </div>

                <div className="flex flex-col border-t border-gray-300">
                    {[
                        { name: "Vinita Raheja", role: "Co-Founder", img: "/images/founders/Vinita Raheja.jpeg" },
                        { name: "Simran Dodwani", role: "Co-Founder", img: "/images/founders/Simran Dodwani.jpeg" }
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