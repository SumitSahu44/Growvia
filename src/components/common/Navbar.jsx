import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'; // Icons install karein: npm install react-icons

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true); // Navbar show/hide state
  const [lastScrollY, setLastScrollY] = useState(0); // Scroll direction track
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Top pe transparent, neeche solid

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const location = useLocation();

  // --- 1. Smart Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Agar scroll 50px se zyada hai to background solid/blur karein
      setIsScrolled(currentScrollY > 50);

      // Hide/Show Logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Neeche ja rahe hain -> Hide
      } else {
        setIsVisible(true); // Upar aa rahe hain -> Show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  // --- 2. Mobile Menu Animation (GSAP) ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Menu Open Animation
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      // Links Stagger Animation
      gsap.fromTo(mobileLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4 }
      );
    } else {
      // Menu Close Animation
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isMobileMenuOpen]);

  // Helper to close menu on link click
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Helper for adding refs to array
  const addToMobileLinks = (el) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Services', path: '/services' },
    { name: 'Blogs', path: '/blogs' },
  ];

  return (
    <>
      {/* --- DESKTOP & MAIN NAVBAR --- */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}
        `}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="z-50 text-2xl font-black tracking-tighter uppercase flex items-center gap-1">
            Growvia<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group overflow-hidden text-sm font-medium uppercase tracking-wider text-black hover:text-gray-700 transition-colors"
              >
                {/* Text Scramble Effect or Simple Underline */}
                <span className="block">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* "Contact Us" Button (Different Design) */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-full"
            >
              Let's Talk <FiArrowUpRight className="text-lg" />
            </Link>

            {/* Mobile Hamburger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 text-2xl focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black z-40 flex flex-col justify-center px-8 translate-x-full md:hidden"
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              ref={addToMobileLinks}
              className="text-5xl font-black text-white uppercase tracking-tighter hover:text-gray-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link

            to="/contact"
            onClick={closeMenu}
            ref={addToMobileLinks}
            className="text-5xl font-black text-white uppercase tracking-tighter hover:text-gray-400 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="absolute bottom-10 left-8 text-gray-400 text-xs uppercase tracking-widest">
          Growvia Digital Agency &copy; 2024
        </div>
      </div>
    </>
  );
};

export default Navbar;