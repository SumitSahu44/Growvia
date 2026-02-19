import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
    const componentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Line animations for titles
            gsap.from(".reveal-line", {
                width: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".reveal-line",
                    start: "top 85%",
                }
            });

            // Content fade-up
            gsap.from(".fade-up", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".fade-up",
                    start: "top 80%",
                }
            });
        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={componentRef} className="bg-white py-24 md:py-40 px-6 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Mission Section */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-32 md:mb-48">
                    <div className="w-full md:w-1/3">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">01</span>
                            <div className="reveal-line h-[2px] bg-black w-24"></div>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Mission</h2>
                    </div>
                    <div className="w-full md:w-2/3">
                        <p className="fade-up text-3xl md:text-5xl font-medium leading-[1.1] text-black tracking-tight">
                            To unlock <span className="text-gray-400 italic">bold growth</span> for brands that refuse to stand still.
                        </p>
                        <div className="fade-up mt-8 h-[1px] bg-gray-100 w-full"></div>
                        <p className="fade-up mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                            We drive meaningful business outcomes through strategic thinking, creative execution, and performance precision — while fostering a culture where our team is empowered to experiment, learn, and excel.
                        </p>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-24">
                    <div className="w-full md:w-1/3 md:text-right">
                        <div className="flex items-center md:justify-end gap-4 mb-4">
                            <div className="reveal-line h-[2px] bg-black w-24"></div>
                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">02</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Vision</h2>
                    </div>
                    <div className="w-full md:w-2/3">
                        <p className="fade-up text-3xl md:text-5xl font-medium leading-[1.1] text-black tracking-tight">
                            Shaping a future where brands grow <span className="text-gray-400 italic">faster and smarter</span>.
                        </p>
                        <div className="fade-up mt-8 h-[1px] bg-gray-100 w-full"></div>
                        <p className="fade-up mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                            By uniting creativity, media, and data into one seamless growth engine, we transform how ambitious companies scale in the digital age.
                        </p>
                    </div>
                </div>

            </div>
         
        </section>
    );
};

export default MissionVision;