import React, { useRef, useEffect, useState } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  { id: 1, name: "Alex Morgan", role: "CEO, Nexus", text: "They didn't just build a website; they built a legacy. The attention to detail is unmatched.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Sarah Jenkins", role: "CMO, Bloom", text: "Our conversion rates doubled within a month. The horizontal scroll section is a game changer!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "David Choi", role: "Founder, TechFlow", text: "I've worked with many agencies, but this team operates on a different frequency. Pure genius.", img: "https://randomuser.me/api/portraits/men/86.jpg" },
  { id: 4, name: "Emily Carter", role: "Director, Vogue", text: "Aesthetic perfection. They understood our brand voice better than we did.", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 5, name: "Michael Ross", role: "VP, Spotify", text: "Seamless animation, buttery smooth scroll. The tech stack they use is top-tier.", img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 6, name: "Jessica Lee", role: "Product Lead, Uber", text: "They turned a chaotic idea into a structured masterpiece. Highly recommended.", img: "https://randomuser.me/api/portraits/women/33.jpg" },
];

// Helper Component for a Single Card
const ReviewCard = ({ review }) => (
  <div className="w-[300px] md:w-[400px] flex-shrink-0 bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-grab active:cursor-grabbing group mx-3">
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-1 text-yellow-500 text-sm">
        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
      </div>
      <FaQuoteLeft className="text-2xl text-white/20 group-hover:text-blue-500 transition-colors" />
    </div>

    <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-white transition-colors">
      "{review.text}"
    </p>

    <div className="flex items-center gap-4">
      <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white/10 object-cover pointer-events-none" />
      <div>
        <h4 className="text-white font-bold">{review.name}</h4>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{review.role}</p>
      </div>
    </div>
  </div>
);

// Marquee Row Component to handle logic per row
const MarqueeRow = ({ items, speed = 1, reverse = false }) => {
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    let animationFrameId;

    const autoScroll = () => {
      if (container && !isHovered && !isDragging) {
        if (reverse) {
           container.scrollLeft -= speed;
           if (container.scrollLeft <= 0) {
             container.scrollLeft = container.scrollWidth / 2;
           }
        } else {
           container.scrollLeft += speed;
           if (container.scrollLeft >= container.scrollWidth / 2) {
             container.scrollLeft = 0;
           }
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    
    // Initial setup for reverse to start in the middle so it can scroll left immediately
    if (reverse && container) {
       container.scrollLeft = container.scrollWidth / 2;
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, speed, reverse]);

  // Mouse Drag Logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full">
      {/* Side Gradients for Fade Effect */}
      <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div 
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Duplicate data enough times to allow infinite scroll illusion */}
        {[...items, ...items, ...items, ...items].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
};


const Testimonials = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black text-white overflow-hidden">
      
      {/* Hide scrollbar globally for webkit browsers as inline style might not cover it all */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* --- HEADER --- */}
      {/* Changed to flex-col and text-left on all sizes */}
      <div className="px-6 md:px-20 mb-20 flex flex-col items-start text-left">
        <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">Testimonials</span>
        <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none text-white">
          Client Stories.
        </h2>
        <p className="text-gray-400 max-w-xl text-lg md:text-xl">
          Don't just take our word for it. Here is what the industry leaders have to say about our craft and commitment to excellence.
        </p>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="flex flex-col gap-6 md:gap-8">
        {/* ROW 1: Moves LEFT normally */}
        <MarqueeRow items={reviews} speed={1.5} reverse={false} />
        
        {/* ROW 2: Moves RIGHT (Reverse) */}
        <MarqueeRow items={reviews} speed={1.5} reverse={true} />
      </div>

    </section>
  );
};

export default Testimonials;