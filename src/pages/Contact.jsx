import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiPlus, FiMinus, FiMapPin, FiMail, FiPhone, FiSend, FiLoader, FiCheckCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    { question: "Typical project timeline?", answer: "Most projects take 2–6 weeks, depending on scope, features, and feedback cycles." },
    { question: "Do you offer retainers?", answer: "Yes, we offer flexible monthly retainers for ongoing marketing, design, and optimisation support, so your brand keeps growing consistently." },
    { question: "Will I have a dedicated point of contact?", answer: "Yes, you’ll work directly with a strategist who understands your brand inside out." }
];

const Contact = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const imageRef = useRef(null);

    const [activeService, setActiveService] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);

    // --- NEW STATES FOR PROCESSING & POPUP ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const toggleService = (service) => {
        activeService.includes(service)
            ? setActiveService(activeService.filter(s => s !== service))
            : setActiveService([...activeService, service]);
    };

    // --- SUBMIT HANDLER ---
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 1 second processing delay
        setTimeout(() => {
            setIsSubmitting(false);
            setShowThanks(true);
            
            // GSAP animation for popup entry
            gsap.fromTo(".thanks-card", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        }, 1000);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-char", {
                y: 100, opacity: 0, duration: 1, stagger: 0.05, ease: "power4.out"
            });

            gsap.to(".contact-img", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".contact-grid",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.from(formRef.current, {
                y: 50, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-white min-h-screen text-black overflow-x-hidden selection:bg-black selection:text-white">

            {/* --- THANK YOU POPUP --- */}
            {showThanks && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
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
                        <button 
                            onClick={() => setShowThanks(false)}
                            className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                        >
                            Back to site
                        </button>
                    </div>
                </div>
            )}

            {/* --- HERO HEADER --- */}
            <section className="pt-32 pb-16 px-6 md:px-20 border-b border-gray-100">
                <div className="max-w-screen-xl mx-auto">
                    <p className="text-blue-600 font-mono text-xs uppercase tracking-[0.3em] mb-6 font-bold">Get in Touch</p>
                    <h1 className="text-[12vw] md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase overflow-hidden">
                        {"LET'S TALK".split("").map((char, i) => (
                            <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
                        ))}
                    </h1>
                </div>
            </section>

            {/* --- MAIN GRID --- */}
            <section className="contact-grid px-6 md:px-20 py-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* LEFT: VISUAL STICKY CARD */}
                <div className="w-full lg:w-5/12 relative">
                    <div className="sticky top-10 h-[85vh] w-full rounded-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden">
                            <img
                                ref={imageRef}
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                                alt="Office Architecture"
                                className="contact-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                     <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-white">
    <div className="flex flex-col gap-8">
        {/* Email Section */}
        <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Email</h3>
            <a 
                href="mailto:growviadigitalmarketing26@gmail.com" 
                className="text-xl md:text-2xl font-bold hover:text-blue-400 transition-colors break-all"
            >
                growviadigitalmarketing26@gmail.com
            </a>
        </div>

        {/* Location Section */}
        <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Visit Us</h3>
            <p className="text-lg leading-snug">
                Indore, Madhya Pradesh, <br />
                India
            </p>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
            {[
                { name: 'Instagram', url: 'https://www.instagram.com/growviadigitalmarketing/' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/growvia-digital-marketing/' },
                { name: 'WhatsApp', url: 'https://wa.me/918962799979' }
            ].map((social) => (
                <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs md:text-sm font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                    {social.name}
                </a>
            ))}
        </div>
    </div>
</div>
                    </div>
                </div>

                {/* RIGHT: THE FORM */}
                <div ref={formRef} className="w-full lg:w-7/12 flex flex-col justify-center">
                    <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-xl">
                        Got an idea? We’d love to hear about it. Fill out the form below and we’ll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                        {/* Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="relative group">
                                <input type="text" required className="peer w-full py-4 bg-transparent border-b border-gray-300 text-xl font-medium outline-none text-black focus:border-black transition-colors placeholder-transparent" placeholder="Name" id="name" />
                                <label htmlFor="name" className="absolute left-0 -top-6 text-xs uppercase tracking-widest text-black peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-500 transition-all cursor-text peer-focus:-top-6 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black">
                                    What's your name?
                                </label>
                            </div>
                            <div className="relative group">
                                <input type="email" required className="peer w-full py-4 bg-transparent border-b border-gray-300 text-xl font-medium outline-none text-black focus:border-black transition-colors placeholder-transparent" placeholder="Email" id="email" />
                                <label htmlFor="email" className="absolute left-0 -top-6 text-xs uppercase tracking-widest text-black peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-500 transition-all cursor-text peer-focus:-top-6 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black">
                                    Your email address
                                </label>
                            </div>
                        </div>

                        <div className="relative group">
                            <input type="text" required className="peer w-full py-4 bg-transparent border-b border-gray-300 text-xl font-medium outline-none text-black focus:border-black transition-colors placeholder-transparent" placeholder="Organization" id="org" />
                            <label htmlFor="org" className="absolute left-0 -top-6 text-xs uppercase tracking-widest text-black peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-500 transition-all cursor-text peer-focus:-top-6 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black">
                                Organization / Company
                            </label>
                        </div>

                        {/* Services Selection */}
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">I'm interested in...</span>
                            <div className="flex flex-wrap gap-3">
                                {["Web Design", "Development", "Branding", "SEO", "Marketing", "Content"].map((service) => (
                                    <button
                                        type="button"
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider border transition-all duration-300 hover:scale-105
                                    ${activeService.includes(service)
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"}`}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="relative group mt-4">
                            <textarea rows="3" className="peer w-full py-4 bg-transparent border-b border-gray-300 text-xl font-medium outline-none text-black focus:border-black transition-colors placeholder-transparent resize-none" placeholder="Message" id="msg"></textarea>
                            <label htmlFor="msg" className="absolute left-0 -top-6 text-xs uppercase tracking-widest text-black peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-gray-500 transition-all cursor-text peer-focus:-top-6 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black">
                                Tell us about your project
                            </label>
                        </div>

                        {/* Submit */}
                        <button 
                            disabled={isSubmitting}
                            className={`group w-full md:w-fit px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xl 
                            ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-blue-600'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span>Processing...</span>
                                    <FiLoader className="animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <FiSend className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>

                    </form>

                    {/* FAQ SECTION */}
                    <div className="mt-24 pt-10 border-t border-gray-100">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">FAQ</h3>
                        <div className="flex flex-col gap-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="cursor-pointer group" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className={`text-lg font-bold transition-colors ${openFaq === i ? 'text-blue-600' : 'text-black'}`}>{faq.question}</h4>
                                        <FiPlus className={`transition-transform duration-300 ${openFaq === i ? 'rotate-45 text-blue-600' : ''}`} />
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;