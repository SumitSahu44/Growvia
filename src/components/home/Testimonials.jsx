import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const reviews = [
  { id: 1, name: "Alex Morgan", role: "CEO, Nexus", text: "They didn't just build a website; they built a legacy. The attention to detail is unmatched.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Sarah Jenkins", role: "CMO, Bloom", text: "Our conversion rates doubled within a month. The horizontal scroll section is a game changer!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 3, name: "David Choi", role: "Founder, TechFlow", text: "I've worked with many agencies, but this team operates on a different frequency. Pure genius.", img: "https://randomuser.me/api/portraits/men/86.jpg" },
  { id: 4, name: "Emily Carter", role: "Director, Vogue", text: "Aesthetic perfection. They understood our brand voice better than we did.", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 5, name: "Michael Ross", role: "VP, Spotify", text: "Seamless animation, buttery smooth scroll. The tech stack they use is top-tier.", img: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 6, name: "Jessica Lee", role: "Product Lead, Uber", text: "They turned a chaotic idea into a structured masterpiece. Highly recommended.", img: "https://randomuser.me/api/portraits/women/33.jpg" },
];

// Reusable Single Review Card (RESTORED TO ORIGINAL GLASSY COLORS)
const ReviewCard = ({ review }) => (
  <div className="w-full h-full bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-grab active:cursor-grabbing group flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1 text-yellow-500 text-sm">
          {[...Array(5)].map((_, i) => <FaStar key={i} />)}
        </div>
        <FaQuoteLeft className="text-2xl text-white/20 group-hover:text-blue-500 transition-colors" />
      </div>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-white transition-colors">
        "{review.text}"
      </p>
    </div>

    <div className="flex items-center gap-4 mt-auto">
      <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white/10 object-cover pointer-events-none" />
      <div>
        <h4 className="text-white font-bold">{review.name}</h4>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{review.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-black text-white overflow-hidden relative">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-start text-left max-w-7xl relative z-10">
        <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white">
          Client Stories.
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed">
          Don't just take our word for it. Here is what industry leaders have to say about our craft, strategy, and commitment to driving scale.
        </p>
      </div>

      {/* SWIPER CONTAINER - ROW 1 (Moves Left) */}
      <div className="relative w-full mb-8">
         {/* Fade Gradients for smooth edge blending */}
         <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto" 
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true, 
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false, 
            pauseOnMouseEnter: true, 
          }}
          speed={5000} 
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2, 
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5, 
            },
            1024: {
              slidesPerView: 3.5, 
            },
            1536: {
              slidesPerView: 4.5, 
            }
          }}
          className="w-full swiper-linear-easing px-6 md:px-0"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="h-auto"> 
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
          {/* Duplicate for smoother looping visually */}
          {reviews.map((review, i) => (
            <SwiperSlide key={`dup-${i}`} className="h-auto"> 
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* SWIPER CONTAINER - ROW 2 (Moves Right / Reverse) */}
      <div className="relative w-full">
         <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true, 
          }}
          speed={5000}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
            1536: {
              slidesPerView: 4.5,
            }
          }}
          className="w-full swiper-linear-easing px-6 md:px-0"
        >
          {/* We reverse the array here just so the cards don't line up perfectly with row 1 vertically */}
          {[...reviews].reverse().map((review, i) => (
            <SwiperSlide key={i} className="h-auto"> 
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
          {[...reviews].reverse().map((review, i) => (
            <SwiperSlide key={`dup2-${i}`} className="h-auto"> 
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS to make the autoplay smooth and not "snap" to next slides */}
      <style>{`
        .swiper-linear-easing .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

    </section>
  );
};

export default Testimonials;