import React from 'react';
import { FiTarget, FiZap, FiEye, FiTrendingUp, FiSettings, FiAward, FiShield, FiBarChart2 } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const whyData = [
    {
        icon: <FiAward className="text-3xl text-blue-600" />,
        title: "Founders‑led strategy",
        desc: "Direct involvement from the experts, ensuring your brand gets high-level strategy, not junior execution."
    },
    {
        icon: <FiZap className="text-3xl text-blue-600" />,
        title: "No cookie‑cutter frameworks",
        desc: "We don't believe in one-size-fits-all. Every solution is custom-built for your specific business goals."
    },
    {
        icon: <FiEye className="text-3xl text-blue-600" />,
        title: "Transparent communication",
        desc: "No jargon, no hidden reports. You get clear, honest, and real-time updates on every move we make."
    },
    {
        icon: <FiTrendingUp className="text-3xl text-blue-600" />,
        title: "Performance over appearances",
        desc: "We focus on real metrics that impact your bottom line, moving beyond vanity likes and impressions."
    },
    {
        icon: <FiTarget className="text-3xl text-blue-600" />,
        title: "Long‑term thinking",
        desc: "Sustainable growth over short-term hacks. We build brands that stand the test of time and market shifts."
    },
    {
        icon: <FiSettings className="text-3xl text-blue-600" />,
        title: "Systems that scale",
        desc: "We grow businesses by building predictable systems, not by chasing temporary social media trends."
    }
];

const WhyGrowVia = () => {
    return (
        <section className="bg-white py-24 px-6 md:px-20">
            <div className="max-w-screen-xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="mb-20">
                    <p className="text-blue-600 font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold">Why Choose Us</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                        Why GrowVia <br /> Digital Marketing
                    </h2>
                    <p className="max-w-2xl text-xl text-gray-600 leading-relaxed">
                        Let’s turn traffic into revenue, and growth into something predictable. GrowVia is built for owners who value ownership and performance.
                    </p>
                </div>

                {/* --- CARDS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyData.map((item, index) => (
                        <div 
                            key={index} 
                            className="group p-10 bg-gray-50 rounded-[2rem] border border-transparent hover:border-blue-600/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="mb-6 inline-block p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- BOTTOM CTA CARD --- */}
                <div className="mt-16 p-10 md:p-16 bg-black rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Let’s Grow the Right Way</h3>
                        <p className="text-gray-400 text-lg">
                            We understand your business, take full ownership of performance, and treat your ad spend like our own.
                        </p>
                    </div>
                <Link to="/contact">
                    <button className="whitespace-nowrap bg-blue-600 hover:bg-white hover:text-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-300 shadow-xl">
                        Start Growing Now
                    </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default WhyGrowVia;