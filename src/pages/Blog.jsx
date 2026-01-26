import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiX, FiClock, FiShare2, FiUser } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA ---
const posts = [
  {
    id: 1,
    category: "Design",
    title: "Designing for the Apple Vision Pro",
    excerpt: "Spatial computing is here. Here is how to adapt your UI/UX patterns for infinite canvases.",
    content: "Spatial computing introduces a paradigm shift in how we interact with digital content. Unlike traditional screens, the canvas is infinite. Designers must now consider depth, scale, and immersion. In this article, we explore the fundamental principles of spatial design, including eye-tracking navigation, hand gestures, and creating comfortable viewing distances.",
    date: "Oct 24, 2025",
    readTime: "6 min read",
    author: "Alex Morgan",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    category: "Strategy",
    title: "The Art of Silent Launches",
    excerpt: "Why the biggest brands are stopping the hype cycle and releasing products quietly.",
    content: "The era of loud, hype-driven product launches is fading. Consumers are tired of unfulfilled promises. Brands like OpenAI and Apple are increasingly adopting 'Silent Launches'—releasing products directly to users and letting the utility speak for itself. This strategy builds genuine trust and organic growth.",
    date: "Oct 20, 2025",
    readTime: "4 min read",
    author: "Sarah Jenkins",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Development",
    title: "React Server Components: A Real World Guide",
    excerpt: "Moving beyond the hype. When to actually use RSCs in your production apps.",
    content: "React Server Components (RSC) promise smaller bundles and faster loads, but they come with complexity. This guide breaks down the hydration architecture, when to keep components on the client, and how to structure your Next.js 15 project for maximum efficiency.",
    date: "Oct 15, 2025",
    readTime: "8 min read",
    author: "David Choi",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Branding",
    title: "Typography as the Primary Image",
    excerpt: "Why modern brands are ditching photography for massive, bold typefaces.",
    content: "Look at the rebranding of Patreon, Wise, or Discord. The trend is clear: Typography is no longer just for reading; it is the visual identity itself. We analyze how custom variable fonts are replacing generic stock imagery to create distinct brand voices.",
    date: "Oct 10, 2025",
    readTime: "5 min read",
    author: "Emily Carter",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "AI",
    title: "Generative UI: Interfaces on the Fly",
    excerpt: "The next step in personalization is AI generating the interface specifically for you.",
    content: "Imagine an app that doesn't have a fixed layout. Instead, an AI generates buttons, sliders, and text inputs based on exactly what you need at that moment. This is 'Generative UI', and it's set to revolutionize SaaS dashboards and complex tools.",
    date: "Oct 05, 2025",
    readTime: "3 min read",
    author: "Michael Ross",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  }
];

const Blog = () => {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  
  // State for Modal
  const [selectedPost, setSelectedPost] = useState(null);

  // --- GSAP ANIMATIONS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Page Load Animation
      gsap.from(".blog-item", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- MODAL OPEN/CLOSE LOGIC ---
  useEffect(() => {
    if (selectedPost) {
      // Open Animation
      document.body.style.overflow = 'hidden'; // Stop background scrolling
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }, [selectedPost]);

  const closeModal = () => {
    gsap.to(modalRef.current, {
        opacity: 0, scale: 0.95, y: 20, duration: 0.3, ease: "power2.in",
        onComplete: () => setSelectedPost(null)
    });
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-gray-900">
      
      {/* --- HEADER --- */}
      <div className="pt-32 pb-16 px-6 md:px-20 max-w-7xl mx-auto border-b border-gray-100">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">
          The Journal
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed">
           Deep dives into design, technology, and culture. Click on any story to read.
        </p>
      </div>

      <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto">
        
        {/* --- GRID LAYOUT --- */}
        {/* First item is full width (Featured), others are 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            
            {posts.map((post, index) => (
                <div 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className={`blog-item group cursor-pointer flex flex-col gap-4 
                        ${index === 0 ? 'md:col-span-2 mb-10' : ''}` // First item spans full width
                    }
                >
                    {/* Image Wrapper */}
                    <div className={`w-full overflow-hidden rounded-2xl bg-gray-100 relative
                         ${index === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}
                    >
                         <img 
                            src={post.img} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                         {/* Hover Overlay Icon */}
                         <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                             <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                 <FiArrowRight className="text-2xl text-black" />
                             </div>
                         </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-600">
                            <span>{post.category}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-400">{post.date}</span>
                        </div>
                        
                        <h2 className={`font-bold leading-tight group-hover:text-gray-600 transition-colors
                            ${index === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
                        >
                            {post.title}
                        </h2>
                        
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            ))}

        </div>
      </div>

      {/* --- THE MODAL (Overlay) --- */}
      {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              
              {/* Backdrop (Blur) */}
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={closeModal} // Click outside to close
              ></div>

              {/* Modal Card */}
              <div 
                ref={modalRef}
                className="relative w-full max-w-4xl max-h-full md:max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto no-scrollbar"
              >
                  {/* Close Button */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-md"
                  >
                      <FiX className="text-xl"/>
                  </button>

                  {/* Modal Image */}
                  <div className="w-full h-[40vh] md:h-[50vh] relative">
                      <img 
                        src={selectedPost.img} 
                        alt={selectedPost.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:left-10 text-white">
                          <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                              {selectedPost.category}
                          </span>
                          <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
                              {selectedPost.title}
                          </h2>
                      </div>
                  </div>

                  {/* Modal Content Body */}
                  <div className="p-6 md:p-12">
                      
                      {/* Meta Data Row */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium border-b border-gray-100 pb-8 mb-8">
                          <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <FiUser className="text-gray-500"/>
                              </div>
                              <span>{selectedPost.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <FiClock/> <span>{selectedPost.readTime}</span>
                          </div>
                          <div className="ml-auto">
                              <button className="flex items-center gap-2 hover:text-black transition-colors">
                                  <FiShare2/> Share Article
                              </button>
                          </div>
                      </div>

                      {/* Actual Content */}
                      <div className="prose prose-lg max-w-none text-gray-600">
                          <p className="lead text-xl text-black font-semibold mb-6">
                              {selectedPost.excerpt}
                          </p>
                          <p className="mb-6">
                              {selectedPost.content}
                          </p>
                          <p className="mb-6">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                          <h3 className="text-2xl font-bold text-black mb-4">Key Takeaways</h3>
                          <ul className="list-disc pl-5 space-y-2 mb-6">
                              <li>Focus on the user journey, not just the destination.</li>
                              <li>Simplicity is the ultimate sophistication.</li>
                              <li>Performance is a feature, not an afterthought.</li>
                          </ul>
                          <p>
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                      </div>

                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Blog;