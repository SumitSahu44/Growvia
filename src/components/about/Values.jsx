import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GrowViaValues = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animation for each value card
            const valueItems = gsap.utils.toArray('.value-item');
            valueItems.forEach((item) => {
                gsap.fromTo(item,
                    { 
                        clipPath: "inset(100% 0% 0% 0%)", 
                        opacity: 0, 
                        y: 50 
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
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
        <section ref={sectionRef} className="py-20 px-6 md:px-20 bg-black text-white w-full overflow-hidden">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-10">
                <div className="w-full md:w-1/2">
                    <span className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 block">Core Values</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        Our<br />Values
                    </h2>
                </div>
                <div className="w-full md:w-1/3 mt-8 md:mt-0">
                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed md:text-right">
                        The core principles that drive our performance-first culture and performance precision.
                    </p>
                </div>
            </div>

            {/* Responsive Staggered Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {values.map((value, idx) => (
                    <div 
                        key={idx} 
                        className={`value-item relative h-[45vh] md:h-[55vh] overflow-hidden rounded-xl group cursor-pointer 
                        ${idx % 2 !== 0 ? 'md:mt-12' : ''} /* Staggered effect only on desktop */
                        `}
                    >
                        {/* Background Image */}
                        <img 
                            src={value.img} 
                            alt={value.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="overflow-hidden">
                                <span className="text-red-500 font-bold text-lg block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    0{idx + 1}
                                </span>
                                <h3 className="text-xl md:text-2xl font-black leading-tight uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                    {value.title}
                                </h3>
                            </div>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-all duration-500"></div>
                    </div>
                ))}
            </div>

            {/* Bottom Subtle Text for SEO/Context */}
            {/* <div className="mt-24 text-center">
                <p className="text-white/20 font-black text-[12vw] leading-none select-none">
                    GROWVIA.DNA
                </p>
            </div> */}
        </section>
    );
};

export default GrowViaValues;