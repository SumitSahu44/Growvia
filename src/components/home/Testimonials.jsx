import React from 'react';
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
  <div className="w-[350px] md:w-[450px] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group mx-4">
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-1 text-yellow-500 text-sm">
        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
      </div>
      <FaQuoteLeft className="text-2xl text-white/20 group-hover:text-blue-500 transition-colors" />
    </div>

    <p className="text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-white transition-colors">
      "{review.text}"
    </p>

    <div className="flex items-center gap-4">
      <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white/10 object-cover" />
      <div>
        <h4 className="text-white font-bold">{review.name}</h4>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{review.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="relative w-full py-24 md:py-40 bg-black text-white overflow-hidden">

      {/* CSS for infinite animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        /* Pause on Hover */
        .marquee-container:hover .animate-marquee,
        .marquee-container:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- HEADER --- */}
      <div className="px-6 md:px-20 mb-20 flex flex-col md:flex-row items-end justify-between gap-10">
        <div>
          <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm">Testimonials</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 leading-none">
            Client<br />Stories.
          </h2>
        </div>
        <p className="text-gray-300 max-w-sm text-lg text-right md:text-left">
          Don't just take our word for it. Here is what the industry leaders have to say about our craft.
        </p>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="marquee-container flex flex-col gap-8">

        {/* ROW 1: Moves LEFT */}
        <div className="relative w-full overflow-hidden">
          {/* Side Gradients for Fade Effect */}
          <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

          <div className="flex w-max animate-marquee">
            {/* Duplicate data to create seamless loop */}
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>

        {/* ROW 2: Moves RIGHT (Reverse) */}
        <div className="relative w-full overflow-hidden">
          {/* Side Gradients */}
          <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

          <div className="flex w-max animate-marquee-reverse">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </div>
        </div>

      </div>

      {/* Background Glow Decoration */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div> */}

    </section>
  );
};

export default Testimonials;