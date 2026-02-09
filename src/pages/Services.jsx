import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Brand Architecture",
    desc: "We build brands that stand the test of time. From logo marks to complete visual systems, we define the DNA of your business.",
    features: ["Visual Identity", "Brand Guidelines", "Typography Systems", "Motion Branding"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Digital Experiences",
    desc: "Websites shouldn't just display information; they should evoke emotion. We craft immersive web journeys using WebGL and React.",
    features: ["UI/UX Design", "Frontend Dev", "3D Web Experiences", "CMS Integration"],
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Performance Marketing",
    desc: "Turning clicks into customers. Our data-driven approach ensures your ad spend translates directly into revenue.",
    features: ["SEO Optimization", "PPC Campaigns", "Social Media Strategy", "Conversion Rate Optimization"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Content Production",
    desc: "High-fidelity assets for a high-speed world. We produce photography, video, and copy that cuts through the noise.",
    features: ["Art Direction", "Product Photography", "Video Editing", "Copywriting"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServicesAlternate = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. HERO FADE IN
      gsap.from(".srv-hero", {
        y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: "power4.out"
      });

      // 2. IMAGE PARALLAX & TEXT REVEAL
      services.forEach((_, i) => {
        // Image Parallax (Image moves inside container)
        gsap.fromTo(imageRefs.current[i],
          { scale: 1.2, yPercent: -20 }, // Start position
          {
            yPercent: 20, // Move down
            ease: "none",
            scrollTrigger: {
              trigger: imageRefs.current[i].parentElement, // Container is trigger
              start: "top bottom",
              end: "bottom top",
              scrub: true // Mouse scroll se link hoga
            }
          }
        );

        // Text Reveal
        gsap.from(textRefs.current[i], {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: textRefs.current[i],
            start: "top 80%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToImages = (el) => { if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el); };
  const addToText = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black overflow-hidden w-full">

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-[1400px] mx-auto">
        <p className="srv-hero text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">What We Do</p>
        <h1 className="srv-hero text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
          Solving Problems<br />With Design.
        </h1>
        <div className="w-full h-[1px] bg-gray-200 mt-10 srv-hero"></div>
      </section>

      {/* --- SERVICES LOOP --- */}
      <div className="flex flex-col gap-0 md:gap-32 pb-32">
        {services.map((service, index) => {
          // Check if index is even (0, 2, 4...)
          const isEven = index % 2 === 0;

          return (
            <section key={index} className="w-full px-6 md:px-20 max-w-[1400px] mx-auto">
              <div className={`flex flex-col lg:flex-row items-center gap-10 md:gap-24 
                        ${isEven ? '' : 'lg:flex-row-reverse'} 
                    `}>

                {/* --- IMAGE SIDE --- */}
                <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl relative group">
                  {/* Inner Image with Parallax Ref */}
                  <div className="w-full h-full overflow-hidden">
                    <img
                      ref={addToImages}
                      src={service.img}
                      alt={service.title}
                      className="w-full h-[140%] object-cover object-center will-change-transform" // h-140% for parallax space
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                  {/* Floating Number (Corner) */}
                  <div className="absolute top-0 left-0 bg-white px-6 py-4 rounded-br-2xl border-b border-r border-gray-100 z-10">
                    <span className="text-2xl font-black">{service.id}</span>
                  </div>
                </div>

                {/* --- TEXT SIDE --- */}
                <div ref={addToText} className="w-full lg:w-1/2 flex flex-col gap-6">

                  {/* Title & Desc */}
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 mt-4 border-t border-gray-100 pt-8">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-gray-800">
                        <FiCheckCircle className="text-blue-600 text-lg flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all w-fit">
                      View Projects
                      <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* --- FOOTER CTA --- */}
      <section className="px-6 md:px-20 py-24 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">Not sure what you need?</h2>
        <button className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 hover:scale-105 transition-all">
          Book a Free Consultation
        </button>
      </section>

    </div>
  );
};

export default ServicesAlternate;