import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiTag, FiMaximize2 } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- WORKS DATA ---
const projects = [
  {
    id: "01",
    client: "Nike Air",
    category: "Social Media Campaign",
    year: "2025",
    description: "Launching the new Air Max series with a high-energy AR filter campaign on Instagram.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    client: "Spotify Wrapped",
    category: "Data Visualization",
    year: "2025",
    description: "Turning user data into shareable art. A deep dive into the UX of the year's biggest viral event.",
    img: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: "03",
    client: "Tesla Motors",
    category: "Web Experience",
    year: "2024",
    description: "Reimagining the car configurator. A WebGL-powered 3D experience for the new Model Y.",
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "04",
    client: "Oura Ring",
    category: "Brand Identity",
    year: "2024",
    description: "Minimalist branding for the future of health tech. Typography, color systems, and packaging.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "05",
    client: "Aesop Skin",
    category: "E-Commerce",
    year: "2023",
    description: "A sensory digital store. merging audio-visual storytelling with seamless checkout flows.",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2070&auto=format&fit=crop"
  }
];

const WorkShowcase = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Pehla project khula rahega

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal
      gsap.from(".work-header-item", {
        y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // 2. List Entrance
      gsap.from(".project-row", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".projects-list", start: "top 85%" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 md:px-20 bg-white text-black z-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-200 pb-10">
        <div>
            <div className="overflow-hidden mb-2">
                <p className="work-header-item text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Selected Works</p>
            </div>
            <div className="overflow-hidden">
                <h2 className="work-header-item text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                    Made by<br/>Growvia.
                </h2>
            </div>
        </div>
        <div className="overflow-hidden mt-6 md:mt-0">
            <p className="work-header-item text-gray-500 max-w-xs text-right text-sm md:text-base font-medium">
                We build digital products that define categories and drive massive growth.
            </p>
        </div>
      </div>

      {/* --- PROJECTS ACCORDION LIST --- */}
      <div className="projects-list flex flex-col">
        {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
                <div 
                    key={index}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`project-row group border-b border-gray-200 cursor-pointer transition-all duration-500 ease-in-out
                        ${isActive ? 'pb-10 pt-10' : 'py-8 hover:bg-gray-50'}`}
                >
                    {/* TOP ROW: Title & Meta */}
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-baseline gap-4 md:gap-10">
                            <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                0{index + 1}
                            </span>
                            <h3 className={`text-3xl md:text-6xl font-black uppercase tracking-tight transition-all duration-500
                                ${isActive ? 'text-black translate-x-4' : 'text-gray-300 group-hover:text-gray-500'}`}>
                                {project.client}
                            </h3>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-12">
                            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400">
                                {project.category}
                            </span>
                            <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300
                                ${isActive ? 'bg-black text-white rotate-45 border-black' : 'text-gray-400 group-hover:border-black group-hover:text-black'}`}>
                                <FiArrowUpRight className="text-lg"/>
                            </div>
                        </div>
                    </div>

                    {/* HIDDEN CONTENT (Reveals on Hover) */}
                    <div 
                        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                        ${isActive ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            
                            {/* Left: Description & Button */}
                            <div className="lg:col-span-4 flex flex-col justify-end p-2 lg:pl-16">
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-wide text-gray-500">{project.year}</span>
                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-wide text-gray-500">Case Study</span>
                                </div>
                                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-black pb-1 w-fit hover:text-blue-600 hover:border-blue-600 transition-colors">
                                    View Full Project <FiMaximize2/>
                                </button>
                            </div>

                            {/* Right: Big Image */}
                            <div className="lg:col-span-8 h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative group/image">
                                <img 
                                    src={project.img} 
                                    alt={project.client} 
                                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out scale-105 group-hover/image:scale-100"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover/image:bg-transparent transition-colors duration-500"></div>
                            </div>

                        </div>
                    </div>

                </div>
            );
        })}
      </div>

      <div className="mt-20 text-center">
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 hover:scale-105 transition-all shadow-xl">
              View All Projects
          </button>
      </div>

    </section>
  );
};

export default WorkShowcase;