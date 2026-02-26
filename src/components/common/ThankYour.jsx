import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { gsap } from 'gsap';

const ThankYou = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Popup wala same slide-up animation
            gsap.fromTo(".thanks-card", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        }, containerRef);
        
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="thanks-card bg-white text-black p-10 md:p-16 rounded-[2rem] max-w-2xl shadow-2xl text-center border border-gray-100">
                
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
                    <FiCheckCircle />
                </div>
                
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Thank you page</h2>
                
                <p className="text-xl text-gray-700 leading-relaxed mb-10">
                    Thanks for reaching out! That click might be the smartest move you made today.
                    <br /><br />
                    We’ve received your submission and our team is already mapping out possibilities. Expect to hear from us soon.
                </p>
                
                {/* Button ki jagah React Router ka Link laga diya */}
                <Link 
                    to="/"
                    className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                >
                    Back to site
                </Link>

            </div>
        </section>
    );
};

export default ThankYou;