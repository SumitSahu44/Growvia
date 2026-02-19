import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const WhyGrowViaFinal = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal animation
            gsap.from(".reveal-up", {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".reveal-up",
                    start: "top 90%",
                }
            });

            // Line reveal
            gsap.from(".divider-line", {
                scaleX: 0,
                duration: 1.5,
                ease: "expo.out",
                transformOrigin: "left center",
                scrollTrigger: {
                    trigger: ".divider-line",
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const whyData = [
        { label: "Execution", title: "Founders‑led strategy", desc: "No junior execution. Your business deserves veterans who've managed millions in spend." },
        { label: "Method", title: "No cookie‑cutter frameworks", desc: "Every business is a new system. We build unique models, not generic templates." },
        { label: "Reporting", title: "Transparent communication", desc: "Real-time insights and honest data. We speak the language of profit, not vanity metrics." },
        { label: "Priority", title: "Performance over appearances", desc: "We prioritize revenue over aesthetics. If it doesn't scale the bank, it's just noise." },
        { label: "Mindset", title: "Long‑term thinking", desc: "Predictable systems win over short-term hacks. We build for sustainable, compounding growth." }
    ];

    const ownershipPoints = [
        { t: "Alignment", d: "Understands your business inside out." },
        { t: "Responsibility", d: "Takes full ownership of performance." },
        { t: "Empathy", d: "Treats your ad spend like their own money." }
    ];

    return (
        <section ref={sectionRef} className="bg-white py-24 md:py-48 px-6 md:px-20 selection:bg-black selection:text-white">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="mb-32">
                    <h2 className="reveal-up text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-10">
                        Why GrowVia<span className="text-gray-200">?</span>
                    </h2>
                    <p className="reveal-up text-xl md:text-3xl text-gray-500 font-medium max-w-4xl leading-tight">
                        We grow businesses by building systems that scale, not by chasing trends. Predictable growth starts here.
                    </p>
                </div>

                {/* --- MAIN LIST --- */}
                <div className="flex flex-col mb-32">
                    {whyData.map((item, i) => (
                        <div key={i} className="why-item group relative py-12 md:py-16 border-t border-gray-100 last:border-b transition-colors duration-500 hover:bg-gray-50/50">
                            <div className="reveal-up flex flex-col md:flex-row md:items-start gap-8 px-4">
                                <div className="w-full md:w-1/4">
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                                        [{item.label}] — 0{i + 1}
                                    </span>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-3">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="w-full md:w-1/4">
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- OWNERSHIP SECTION --- */}
                <div className="reveal-up mb-32">
                    <h4 className="text-sm font-black uppercase tracking-[0.4em] text-blue-600 mb-16 italic">Let’s Grow the Right Way</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                        {ownershipPoints.map((point, i) => (
                            <div key={i} className="relative pl-8 border-l-2 border-gray-100 hover:border-black transition-colors duration-500">
                                <h5 className="font-black uppercase text-xs tracking-widest text-gray-400 mb-4">{point.t}</h5>
                                <p className="text-2xl font-bold leading-tight tracking-tight">{point.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- FINAL STATEMENT & CTA --- */}
                <div className="reveal-up pt-20 border-t-2 border-black flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 group cursor-pointer">
                    <div className="max-w-2xl">
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                            GrowVia is<br />built for you.
                        </h3>
                        <p className="text-xl text-gray-500 font-medium italic">
                            Let’s turn traffic into revenue, and growth into something predictable.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-4 text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                            <span>Ready to Scale</span>
                            <FiArrowUpRight className="text-4xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                        </div>
                        <div className="h-[2px] w-full bg-black origin-right group-hover:bg-blue-600 transition-all"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyGrowViaFinal;