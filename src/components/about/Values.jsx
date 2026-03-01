import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GrowViaValues = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const valueItems = gsap.utils.toArray('.value-item');
            valueItems.forEach((item) => {
                gsap.fromTo(item,
                    { 
                        clipPath: "inset(100% 0% 0% 0%)", 
                        opacity: 0, 
                        y: 30 
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

 const values = [

        { title: "Curiosity First", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600" },

        { title: "Meaningful Connections", img: "https://plus.unsplash.com/premium_photo-1726826626814-a9098b1a68a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhbmluZ2Z1bCUyMGNvbm5lY3Rpb25zfGVufDB8fDB8fHww" },

        { title: "Respect Always", img: "/images/respect.jpeg" },

        { title: "Excellence Standard", img: "/images/excellence.jpeg" },

        { title: "Celebrate Wins", img: "/images/celebrate.jpeg" }

    ];



    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-20 bg-black text-white w-full overflow-hidden">
            
            {/* Header Area - Sab kuch Left Aligned */}
            <div className="max-w-4xl mb-12 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-blue-600 font-mono text-xs tracking-widest uppercase">03</span>
                    <div className="h-[1px] bg-blue-600 w-16"></div>
                    <span className="text-blue-500 font-mono text-xs tracking-widest uppercase">Core Values</span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                    Our Values
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    The core principles that drive our performance-first culture and performance precision.
                </p>
            </div>

            {/* Grid Area - No staggered effect for tighter look */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                {values.map((value, idx) => (
                    <div 
                        key={idx} 
                        className="value-item relative h-[35vh] md:h-[50vh] overflow-hidden rounded-lg group cursor-pointer"
                    >
                        {/* Background Image */}
                        <img 
                            src={value.img} 
                            alt={value.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-blue-900/20 transition-colors duration-500"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                            <span className="text-blue-500 font-black text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                0{idx + 1}
                            </span>
                            <h3 className="text-sm md:text-lg font-bold leading-tight uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                {value.title}
                            </h3>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/30 rounded-lg transition-all duration-500"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GrowViaValues;