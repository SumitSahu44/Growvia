import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SmoothScroll from '../utils/SmoothScroll'; // Wahi Lenis wala file
// import ContactCTA from '../components/common/ContactCTA';
const MainLayout = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-white text-black">
        {/* Navbar Fixed Top */}
        <Navbar />
        
        {/* Main Page Content changes here */}
        <main className="flex-grow">
          {children}
        </main>


        {/* <ContactCTA /> */}
        {/* Footer Fixed Bottom */}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;