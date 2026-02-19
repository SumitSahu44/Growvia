import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
    const manifestoRef = useRef(null);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect for the image
            gsap.to(".manifesto-img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text reveal animation (word by word)
            const words = manifestoRef.current.querySelectorAll('.word');
            gsap.fromTo(words,
                { opacity: 0.1, filter: "blur(8px)" },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 60%",
                        scrub: 0.5,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper to split text for the GSAP reveal effect
    const splitText = (text) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-2 leading-tight will-change-[opacity,filter]">
                {word}
            </span>
        ));
    };

    return (
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
    );
};

export default Manifesto;