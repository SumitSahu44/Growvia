import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SmoothScroll from '../utils/SmoothScroll';

const MainLayout = ({ children }) => {
  const location = useLocation();

  // 👇 Admin route check
  const isAdminRoute = location.pathname.startsWith('/AdminPanel');

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-white text-black">

        {/* Navbar only for non-admin pages */}
        {!isAdminRoute && <Navbar />}

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer only for non-admin pages */}
        {!isAdminRoute && <Footer />}
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;
