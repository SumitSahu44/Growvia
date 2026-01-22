import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "01",
    title: "Strategic Branding",
    desc: "We build identities that speak louder than words.",
    img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Digital Campaigns",
    desc: "ROI-focused campaigns that dominate the feed.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Web Experience",
    desc: "Immersive websites that convert visitors into fans.",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Content Creation",
    desc: "Storytelling that connects on a human level.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Growth Hacking",
    desc: "Data-driven strategies to scale exponentially.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];

const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const slides = gsap.utils.toArray(".h-card");
      // Total scroll width calculate karna (width of all cards combined)
      // Hum container ko left ki taraf khiskayenge
      const totalWidth = slides.length * 100; // Roughly 100vw per slide logic (adjusted in tween)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true, // Screen ko pakad lega
          scrub: 1,  // Smooth scroll
          start: "top top", // Section top pe aate hi pin
          end: "+=3000", // 3000px tak horizontal scroll chalega
          
          // --- GLOBAL BACKGROUND COLOR MAGIC ---
          onEnter: () => {
            gsap.to("body", { backgroundColor: "#ffffff", color: "#000000", duration: 0.5 });
          },
          onLeave: () => {
            // Section khatam hone par Black ho jaye (Next Footer/Section ke liye)
            gsap.to("body", { backgroundColor: "#000000", color: "#ffffff", duration: 0.5 });
          },
          onEnterBack: () => {
            // Wapas aane par White ho jaye
            gsap.to("body", { backgroundColor: "#ffffff", color: "#000000", duration: 0.5 });
          },
          onLeaveBack: () => {
            // Upar nikal jane par wapas Black (Showcase section match)
            gsap.to("body", { backgroundColor: "#050505", color: "#ffffff", duration: 0.5 });
          }
        }
      });

      // Actual Horizontal Movement
      tl.to(containerRef.current, {
        xPercent: -100 * (cards.length - 1), // Saare cards khatam hone tak move karega
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-transparent" // bg-transparent taaki body color dikhe
    >
      
      {/* Fixed Header inside the pinned section */}
      <div className="absolute top-10 left-10 md:left-20 z-20">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
          Our Expertise
        </h2>
        <div className="w-20 h-1 bg-blue-600"></div>
      </div>

      {/* --- HORIZONTAL CONTAINER --- */}
      <div 
        ref={containerRef} 
        className="flex h-full w-fit items-center px-10 md:px-20 gap-10 md:gap-20"
      >
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="h-card relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 group cursor-pointer"
          >
            {/* Image Wrapper with Scale Effect */}
            <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl">
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl text-white">
              <span className="text-4xl md:text-6xl font-black text-white/10 absolute top-4 right-6 pointer-events-none">
                {card.id}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold uppercase mb-2 relative z-10">
                {card.title}
              </h3>
              <p className="text-sm md:text-lg text-gray-200 max-w-md relative z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
        
        {/* End Spacer for breathing room */}
        <div className="w-[10vw]"></div>

      </div>

      {/* Progress Bar (Optional Styling) */}
      <div className="absolute bottom-10 right-10 flex gap-2">
         <span className="text-xs font-bold uppercase tracking-widest opacity-50">Scroll to Explore</span>
      </div>

    </section>
  );
};

export default HorizontalScroll;