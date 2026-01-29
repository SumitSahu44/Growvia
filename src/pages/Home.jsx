import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About'; // Import kiya
import Philosophy from '../components/home/Philosophy';
import Services from '../components/home/Services';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';
import { gsap } from 'gsap';
import Showcase from '../components/home/Showcase';
import HorizontalScroll from '../components/home/HorizontalScroll';
import Capabilities from '../components/home/Capabilities';
import MagicSection from '../components/home/MagicSection';
import ToolstationCaseStudy from '../components/home/ToolstationCaseStudy';

const Home = () => {
  
  // Page specific animations yahan trigger kar sakte ho
  useEffect(() => {
    // Example: Fade in content when Home mounts
    gsap.fromTo('.home-section', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div className="w-full">
      {/* Har section ek alag component hai */}

      <div className="home-section">
        <Hero />
      </div>

       <div className="home-section">
        <About />
      </div>

       <div className="home-section">
        <Philosophy />
      </div>

      
       <div className="home-section">
        <ToolstationCaseStudy />
      </div>
      
      <div className="home-section">
        <Services />
      </div>




        {/* <div className="home-section">
        <MagicSection />
      </div> */}
      

       <div className="home-section">
        <Process />
      </div>
      

       {/* <div className="home-section">
        <Showcase />
      </div> */}

       <div className="home-section">
        <HorizontalScroll />
      </div>


        <div className="home-section">
        <Capabilities />
      </div>

      <div className="home-section">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;