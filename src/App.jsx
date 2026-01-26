import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
// import About from './pages/About';
// import WhyUs from './pages/WhyUs';
import MainLayout from './layout/MainLayout';
import Preloader from './components/common/Preloader';
import Cursor from './components/common/Cursor';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Mobile check (Optional: Mobile pe custom cursor mat dikhao)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
     const handleResize = () => setIsDesktop(window.innerWidth > 768);
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <Router>
      <ScrollToTop />

      {/* FIX: Preloader condition ke andar hai, lekin MainLayout condition ke BAHAR hai.
         Isse content loader ke peeche load ho jayega aur reveal effect kaam karega.
      */}
    {/* Sirf Desktop pe custom cursor dikhao */}
     <Cursor />

     {/* 2. Preloader uske baad */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Content Hamesha Render rahega */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blogs" element={<Blog />} />
          <Route path="/About" element={<About />} />
           <Route path="/Services" element={<Services />} />
              <Route path="/Contact" element={<Contact />} />
        </Routes>
      </MainLayout>
      
    </Router>
  );
}

export default App;