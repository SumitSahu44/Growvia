import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand Identity",
    desc: "We craft visual systems that are impossible to ignore.",
    tags: ["Logo Design", "Visual Language", "Brand Guidelines"],
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Digital Product",
    desc: "User-centric interfaces that drive engagement and retention.",
    tags: ["UI/UX Design", "Web Design", "App Prototyping"],
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Development",
    desc: "Robust, scalable code that powers your digital empire.",
    tags: ["React/Next.js", "WebGL", "eCommerce"],
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Content Strategy",
    desc: "Stories that resonate and convert visitors into believers.",
    tags: ["Copywriting", "Art Direction", "Social Media"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  }
];

const Capabilities = () => {
  // Active Index track karenge taaki text ko highlight kar sakein
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const serviceRefs = useRef([]);

  // --- 1. IMAGE CHANGE ANIMATION (Smooth Fade/Blur) ---
  useLayoutEffect(() => {
    // Jab activeIndex badlega, image animate hogi
    const tl = gsap.timeline();

    tl.fromTo(imgRef.current,
      { opacity: 0, scale: 1.1, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    );

  }, [activeIndex]);

  // --- 2. SCROLL DETECTION (The Auto Logic) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      serviceRefs.current.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top center", // Jab element ka top screen ke center me aaye
          end: "bottom center", // Jab element ka bottom center cross kare

          // Jab user niche scroll karke enter kare
          onEnter: () => setActiveIndex(index),

          // Jab user wapas upar scroll karke enter kare
          onEnterBack: () => setActiveIndex(index),

          // markers: true // Debugging ke liye (baad me hata dena)
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to collect refs
  const addToRefs = (el) => {
    if (el && !serviceRefs.current.includes(el)) {
      serviceRefs.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white py-20 md:py-32 px-6 md:px-20 flex flex-col md:flex-row gap-10 md:gap-20"
    >

      {/* --- LEFT COLUMN: Sticky Image (Auto Changes) --- */}
      <div className="w-full md:w-[40%] relative hidden md:block">
        {/* h-[50vh] rakha hai taaki center me dikhe */}
        <div className="sticky top-[25vh] h-[50vh] w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl">

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>

          {/* Image Source directly activeIndex se le rahe hain */}
          <img
            ref={imgRef}
            src={services[activeIndex].img}
            alt="Service Preview"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6 z-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 mb-2">Capabilities</p>
            {/* Dynamic Title on Image */}
            <h3 className="text-2xl font-bold text-white transition-all duration-300">
              {services[activeIndex].title}
            </h3>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: Scrollable List --- */}
      <div className="w-full md:w-[60%] flex flex-col justify-center pb-20">

        <div className="mb-20 border-b border-white/20 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">What We Do</h2>
          <p className="text-3xl md:text-5xl font-light leading-tight text-white/90">
            We partner with brands to create smart strategies, powerful campaigns, and strong digital experiences that don’t just look good, they perform.
          </p>
        </div>

       
      </div>

    </section>
  );
};




// line number 131 ka code 
 {/* List Items */}
        // <div className="flex flex-col gap-20"> {/* Gap badha diya taaki scroll trigger clear ho */}
        //   {services.map((service, index) => {
        //     // Check if this item is currently active
        //     const isActive = index === activeIndex;

        //     return (
        //       <div
        //         key={index}
        //         ref={addToRefs}
        //         // Agar Active hai to Bright White, nahi to Dim Grey (Auto Focus Effect)
        //         className={`group relative border-l-2 pl-8 md:pl-12 transition-all duration-500 cursor-pointer 
        //           ${isActive ? 'border-white opacity-100' : 'border-white/10 opacity-30 blur-[1px]'}`}
        //         // Manual click/hover support bhi rakha hai
        //         onMouseEnter={() => setActiveIndex(index)}
        //       >
        //         <div className="flex flex-col gap-4">
        //           <span className="text-sm font-mono text-gray-400">/{service.id}</span>

        //           <h3 className={`text-4xl md:text-6xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
        //             {service.title}
        //           </h3>

        //           <p className="text-gray-300 max-w-md text-base md:text-lg leading-relaxed">
        //             {service.desc}
        //           </p>

        //           {/* Tags */}
        //           <div className="flex flex-wrap gap-2 mt-2">
        //             {service.tags.map((tag, i) => (
        //               <span key={i} className={`text-xs border px-3 py-1 rounded-full transition-colors ${isActive ? 'border-white/30 text-gray-300' : 'border-white/5 text-gray-500'}`}>
        //                 {tag}
        //               </span>
        //             ))}
        //           </div>

        //           {/* Active Indicator Arrow */}
        //           <FiArrowUpRight className={`text-3xl mt-4 transition-all duration-500 ${isActive ? 'text-blue-500 rotate-45 opacity-100' : 'text-gray-700 rotate-0 opacity-0'}`} />
        //         </div>
        //       </div>
        //     );
        //   })}
        // </div>


export default Capabilities;