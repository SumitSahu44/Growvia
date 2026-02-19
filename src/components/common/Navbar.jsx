import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const location = useLocation();

  // --- 1. Smart Scroll Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- 2. Mobile Menu Animation (GSAP) ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Scroll disable karein jab menu open ho
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.8,
        ease: 'power4.out'
      });
      gsap.fromTo(mobileLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'power4.in'
      });
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

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
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 transform 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}
        `}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo - Rang badlega mobile menu open hone par */}
          <Link 
            to="/" 
            onClick={closeMenu}
            className={`z-[70] text-2xl font-black tracking-tighter uppercase transition-colors duration-300 
            ${isMobileMenuOpen ? 'text-white' : 'text-black'}`}
          >
            Growvia<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group overflow-hidden text-sm font-bold uppercase tracking-widest text-black"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-blue-600">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA & Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all rounded-full"
            >
              Let's Talk <FiArrowUpRight className="text-lg" />
            </Link>

            {/* Hamburger Button - Crucial Change Here */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden z-[70] text-3xl focus:outline-none transition-colors duration-300
              ${isMobileMenuOpen ? 'text-white' : 'text-black'}`}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#0a0a0a] z-[50] flex flex-col justify-center px-8 translate-x-full md:hidden"
      >
        <div className="flex flex-col gap-4">
          <p className="text-blue-600 font-mono text-xs uppercase tracking-[0.3em] mb-4">Navigation</p>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              ref={addToMobileLinks}
              className="text-5xl font-black text-white uppercase tracking-tighter hover:text-blue-600 transition-colors inline-block"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            ref={addToMobileLinks}
            className="text-5xl font-black text-white uppercase tracking-tighter hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Footer Info */}
        <div className="absolute bottom-10 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-6">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest leading-loose">
            Growvia Digital Agency <br />
            &copy; 2026 Indore, India
          </div>
          <div className="flex gap-4 text-white text-sm">
            <span className="opacity-50 italic">Follow us</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;