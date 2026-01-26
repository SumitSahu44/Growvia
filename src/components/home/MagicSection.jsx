import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagicSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Data for the cards (Images similar to your reference)
  const cards = [
    {
      id: 1,
      title: "Tsunami Art",
      src: "https://images.unsplash.com/photo-1695514666014-5264b9777174?q=80&w=800&auto=format&fit=crop",
      initial: { x: -150, y: -50, rotate: -12, z: 10 },
    },
    {
      id: 2,
      title: "Whisk Nature",
      src: "https://images.unsplash.com/photo-1518531933037-9a8478d0344d?q=80&w=800&auto=format&fit=crop", // Placeholder for the Whisk card
      isSpecial: true, // This is the middle card with the border
      initial: { x: 0, y: -80, rotate: 5, z: 20 },
    },
    {
      id: 3,
      title: "Abstract Ladder",
      src: "https://images.unsplash.com/photo-1533158676154-1d30411e8e66?q=80&w=800&auto=format&fit=crop",
      initial: { x: 150, y: -20, rotate: 10, z: 10 },
    },
    {
      id: 4,
      title: "Monk Mode",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop",
      initial: { x: -120, y: 80, rotate: 8, z: 5 },
    },
    {
      id: 5,
      title: "Snow Forest",
      src: "https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=80&w=800&auto=format&fit=crop",
      initial: { x: 20, y: 100, rotate: -5, z: 15 },
    },
    {
      id: 6,
      title: "Future Home",
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      initial: { x: 180, y: 60, rotate: -15, z: 8 },
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Set Initial Scattered Positions
      // We set the "from" state immediately so it looks scattered on load
      cards.forEach((card, index) => {
        if (cardsRef.current[index]) {
          gsap.set(cardsRef.current[index], {
            x: card.initial.x,
            y: card.initial.y,
            rotation: card.initial.rotate,
            zIndex: card.initial.z,
          });
        }
      });

      // 2. The Scroll Animation (Scrub)
      // This animates them FROM scattered TO grid (0,0,0)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // When top of section hits top of viewport
          end: "+=150%", // How long the scroll lasts
          scrub: 1, // Smoothness of the scrub
          pin: true, // Pin the container while animating
          // markers: true, // Uncomment to debug
        },
      });

      // Animate all cards to their natural grid position (x:0, y:0, rotation:0)
      tl.to(cardsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.05, // Slight delay between cards for organic feel
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover Effect Logic
  const handleMouseEnter = (index, initialRotation) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.1,
      rotation: 0, // Straighten up
      zIndex: 100, // Bring to top
      boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
      duration: 0.3,
      ease: "back.out(1.7)",
      overwrite: "auto" // Important to override the scroll tween temporarily
    });
  };

  const handleMouseLeave = (index, initialRotation) => {
    // We rely on the ScrollTrigger to define the state, 
    // but if we are simply hovering, we revert to the *current* state of the scroll
    // A simple fix is to just clear props or animate back to scale 1
    // The ScrollTrigger scrub will fight this, so we animate to scale 1 
    // and let the scrolltrigger handle the rotation/position on the next update.
    
    gsap.to(cardsRef.current[index], {
      scale: 1,
      zIndex: cards[index].initial.z, // Reset Z-index
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power2.out",
      // We don't force rotation here, we let the timeline take over again
    });
  };

  return (
    <div className='w-full bg-black'>
        
        {/* Dummy spacer to allow scrolling into the section */}
        <div className="h-[50vh] w-full bg-gray-900 flex items-center justify-center text-white">
            <p>Scroll Down to see the Magic</p>
        </div>

        {/* --- MAGIC SECTION --- */}
        <section 
            ref={containerRef} 
            className="relative w-full h-screen bg-[#FFD700] overflow-hidden flex flex-col items-center justify-center py-10"
        >
            {/* Header Content */}
            <div className="text-center mb-8 relative z-50">
                <h2 className="text-xl md:text-3xl font-mono tracking-widest text-black mb-6 uppercase font-bold">
                    Create Some Magic
                </h2>
                
                <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform">
                    ENTER TOOL &rarr;
                </button>

                {/* "Get Inspired" Arrow (SVG) */}
                <div className="absolute top-10 right-[-120px] hidden md:block">
                    <p className="font-handwriting text-sm font-bold rotate-12 mb-2">GET <br/> INSPIRED!</p>
                    <svg width="40" height="40" viewBox="0 0 50 50" className="rotate-12">
                         <path d="M10,10 Q30,40 10,40" fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    </svg>
                </div>
            </div>

            {/* The Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 perspective-1000">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => (cardsRef.current[index] = el)}
                        onMouseEnter={() => handleMouseEnter(index, card.initial.rotate)}
                        onMouseLeave={() => handleMouseLeave(index, card.initial.rotate)}
                        className={`
                            relative w-full h-64 rounded-2xl overflow-hidden cursor-pointer bg-white
                            ${card.isSpecial ? 'border-4 border-black' : 'shadow-lg'}
                        `}
                        // Important: Will-change helps with performance during the scrub
                        style={{ willChange: "transform" }}
                    >
                        {/* Special "Whisk" Text Overlay for Card 2 */}
                        {card.isSpecial && (
                             <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
                                <span className="text-[10px] font-bold tracking-widest -rotate-90 origin-top-left absolute left-4 top-full">IMAGEN 4 X VEO 2</span>
                                <div className="w-full h-full flex items-center justify-center">
                                    <h3 className="text-6xl font-black text-green-700 drop-shadow-md" style={{ fontFamily: 'cursive' }}>
                                        Whisk
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold tracking-widest -rotate-90 origin-top-right absolute right-4 top-full">TRY ANIMATE!</span>
                             </div>
                        )}

                        {/* Card Image */}
                        <img 
                            src={card.src} 
                            alt={card.title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        
                        {/* Overlay on hover (Optional polish) */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                    </div>
                ))}
            </div>
            
            {/* SVG Definition for Arrow */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                    </marker>
                </defs>
            </svg>
        </section>

        {/* Spacer for scroll */}
        <div className="h-screen bg-white"></div>
    </div>
  );
};

export default MagicSection;

