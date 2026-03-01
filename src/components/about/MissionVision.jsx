import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
    const componentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-line", {
                width: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: "top 85%",
                }
            });

            gsap.from(".fade-up", {
                y: 30, // Pehle 60 tha, ab kam kiya taaki jump chota lage
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: "top 80%",
                }
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        // Py-24/40 ko kam karke py-16/24 kiya hai
        <section ref={componentRef} className="bg-black py-16 md:py-24 px-6 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Mission Section - Mb-32/48 ko kam karke mb-16/24 kiya hai */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-24 mb-16 md:mb-24">
                    <div className="w-full md:w-1/3">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">01</span>
                            <div className="reveal-line h-[1px] bg-white w-16 md:w-20"></div>
                        </div>
                        <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter">Mission</h2>
                    </div>
                    <div className="w-full md:w-2/3">
                        <p className="fade-up text-white text-2xl md:text-5xl font-medium leading-[1.15] tracking-tight">
                            To unlock <span className="text-gray-400 italic">bold growth</span> for brands that refuse to stand still.
                        </p>
                        {/* Divider space kam kiya (mt-6) */}
                        <div className="fade-up mt-6 h-[1px] bg-white/10 w-full"></div>
                        <p className="fade-up mt-6 text-base md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                            We drive meaningful business outcomes through strategic thinking, creative execution, and performance precision, while fostering a culture where our team is empowered.
                        </p>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-24">
                    <div className="w-full md:w-1/3 md:text-right">
                        <div className="flex items-center md:justify-end gap-3 mb-2">
                            <div className="reveal-line h-[1px] bg-white w-16 md:w-20"></div>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">02</span>
                        </div>
                        <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter">Vision</h2>
                    </div>
                    <div className="w-full md:w-2/3">
                        <p className="fade-up text-white text-2xl md:text-5xl font-medium leading-[1.15] tracking-tight">
                            Shaping a future where brands grow <span className="text-gray-400 italic">faster and smarter</span>.
                        </p>
                        <div className="fade-up mt-6 h-[1px] bg-white/10 w-full"></div>
                        <p className="fade-up mt-6 text-base md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                            By uniting creativity, media, and data into one seamless growth engine, we transform how ambitious companies scale in the digital age.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;