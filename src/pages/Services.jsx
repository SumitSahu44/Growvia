import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Google Ads",
    desc: "We build Google Ads accounts that are structured for scalability and profitability, not just initial performance.",
    features: ["High‑intent keyword strategy", "Clean account structure", "Conversion‑focused bidding", "Proper GA4 & GTM tracking", "Continuous data analysis"],
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "02",
    title: "Meta Ads",
    desc: "Meta Ads are not about boosting posts or chasing cheap leads. They’re about creative + audience + funnel alignment.",
    features: ["Clear offer positioning", "Funnel‑based structure", "Creative testing with intent", "Retargeting that converts", "Scaling without breaking "],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "LinkedIn Ads",
    desc: "LinkedIn Ads only work when they’re built for the right objective. We reach the people who make the calls.",
    features: ["B2B lead generation", "High‑value service funnels", "Decision‑maker targeting", "Cost‑controlled scaling"],
    img: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Microsoft / Bing Ads",
    desc: "Bing Ads are often ignored, which is exactly why they work. Capture untapped demand with higher efficiency.",
    features: ["Capture untapped demand", "Lower overall blended CPA", "Paid media efficiency", "Targeted search intent"],
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Organic Social Media",
    desc: "Organic social should support growth, not exist for aesthetics. We focus on content that builds genuine trust.",
    features: ["Trust-building content", "Messaging alignment", "Platform‑specific strategy", "Growth-led engagement"],
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: "06",
    title: "Website Development",
    desc: "A beautiful website that doesn’t convert is a liability. We build conversion-first sites that guide users clearly.",
    features: ["Fast loading speeds", "Clear user guidance", "Support paid traffic", "Lead & sales optimization"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    id: "07",
    title: "SEO Strategy",
    desc: "SEO isn’t about ranking for random keywords. It’s about attracting high‑intent traffic that actually converts.",
    features: ["Business intent research", "On‑page optimization", "Technical fundamentals", "Content for paid campaigns"],
    img: "https://images.unsplash.com/photo-1709281847981-73a69aa6f770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U0VPJTIwU3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: "08",
    title: "Email & Funnels",
    desc: "We build email systems that nurture leads, recover lost conversions, and increase customer lifetime value.",
    features: ["Lead nurturing systems", "Recovery of lost sales", "LTV optimization", "Paid traffic funnel support"],
    img: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServicesAlternate = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".srv-hero", {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out"
      });

      itemRefs.current.forEach((item, i) => {
        gsap.fromTo(item,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );

        if (imageRefs.current[i]) {
          gsap.fromTo(imageRefs.current[i],
            { yPercent: -15, scale: 1.1 },
            {
              yPercent: 15, scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }

        if (textRefs.current[i]) {
          gsap.from(textRefs.current[i], {
            y: 50, opacity: 0, duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRefs.current[i],
              start: "top 80%",
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addToItems = (el) => { if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el); };
  const addToImages = (el) => { if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el); };
  const addToText = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-black w-full selection:bg-blue-600 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 md:px-20 max-w-[1400px] mx-auto">
        <p className="srv-hero text-blue-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">GrowVia Expertise</p>
        <h1 className="srv-hero text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
          Systems That Scale,<br />Not Just Trends.
        </h1>
        <div className="w-full h-[1px] bg-gray-100 mt-10 srv-hero"></div>
      </section>

      {/* --- SERVICES LOOP --- */}
      <div className="flex flex-col gap-20 md:gap-40 pb-32">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <section key={index} className="w-full px-6 md:px-20 max-w-[1400px] mx-auto">
              <div className={`flex flex-col lg:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* IMAGE SIDE */}
                <div ref={addToItems} className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-3xl relative group bg-gray-50">
                  <div className="w-full h-full overflow-hidden">
                    <img ref={addToImages} src={service.img} alt={service.title} className="w-full h-[130%] object-cover object-center" />
                  </div>
                  <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-br-3xl border-b border-r border-gray-100 z-10">
                    <span className="text-xl font-black text-blue-600 italic">{service.id}</span>
                  </div>
                </div>

                {/* TEXT SIDE */}
                <div ref={addToText} className="w-full lg:w-1/2 flex flex-col gap-8">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6 tracking-tighter">{service.title}</h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium">{service.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 py-8 border-y border-gray-100">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3 text-sm font-bold uppercase tracking-wide text-gray-800">
                        <FiCheckCircle className="text-blue-600 text-lg flex-shrink-0 mt-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <button className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:text-blue-600 hover:border-blue-600 transition-all">
                      Scale Your Brand <FiArrowUpRight className="text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesAlternate;