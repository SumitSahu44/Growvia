import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const WhyGrowViaMinimal = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal animation
            const items = gsap.utils.toArray('.why-item');
            items.forEach((item) => {
                gsap.from(item.querySelector('.item-content'), {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    }
                });
            });

            // Line growth animation
            gsap.from(".divider-line", {
                width: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "expo.out",
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
        { label: "Philosophy", title: "No cookie‑cutter frameworks", desc: "Every business is a new system. We build unique models, not generic templates." },
        { label: "Core", title: "Performance over appearances", desc: "We prioritize revenue over vanity metrics. If it doesn't scale the bank, it's noise." },
        { label: "Mindset", title: "Long‑term thinking", desc: "Predictable systems win over short-term hacks. We build for sustainable growth." }
    ];

    return (
        <section ref={sectionRef} className="bg-white py-24 md:py-48 px-6 md:px-20 selection:bg-black selection:text-white">
            <div className="max-w-7xl mx-auto">
                
                {/* --- TOP HEADER --- */}
                <div className="mb-32 overflow-hidden">
                    <h2 className="text-[10vw] md:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter mb-10">
                        Why GrowVia<span className="text-gray-200">?</span>
                    </h2>
                    <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl leading-snug">
                        Built for brands that refuse to stand still. We turn traffic into revenue, and growth into something predictable.
                    </p>
                </div>

                {/* --- THE LIST (MINIMALIST) --- */}
                <div className="flex flex-col mb-32">
                    {whyData.map((item, i) => (
                        <div key={i} className="why-item group relative py-12 md:py-20 border-t border-gray-100 last:border-b overflow-hidden">
                            <div className="item-content flex flex-col md:flex-row md:items-start gap-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                                
                                {/* Label/Number */}
                                <div className="w-full md:w-1/4">
                                    <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">
                                        {item.label} — 0{i + 1}
                                    </span>
                                </div>

                                {/* Title & Desc */}
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 group-hover:text-blue-600 transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="w-full md:w-1/4">
                                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Hover Background Accent */}
                            <div className="absolute inset-0 bg-gray-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo"></div>
                        </div>
                    ))}
                </div>

                {/* --- OWNERSHIP STRIP (TEXT ONLY) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-b border-gray-100 mb-32">
                    {[
                        { t: "Ownership", d: "We take full ownership of performance and scale." },
                        { t: "Empathy", d: "We treat your ad spend like it’s our own money." },
                        { t: "Clarity", d: "Predictable revenue, zero guesswork, total transparency." }
                    ].map((card, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 italic">[{card.t}]</h4>
                            <p className="text-xl font-bold leading-tight">{card.d}</p>
                        </div>
                    ))}
                </div>

                {/* --- FINAL CTA (CREATIVE TYPOGRAPHY) --- */}
                <div className="group cursor-pointer">
                    <div className="flex items-center justify-between border-b-2 border-black pb-10 overflow-hidden">
                        <h3 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-700">
                            Let's Talk Growth
                        </h3>
                        <FiArrowRight className="text-5xl md:text-[6vw] -rotate-45 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                    <p className="mt-8 text-gray-400 font-medium uppercase tracking-[0.2em] text-sm">
                        GrowVia Digital Marketing — Built For You.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default WhyGrowViaMinimal;