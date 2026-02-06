import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const BlogDetail = () => {
    const { id } = useParams(); // URL se ID nikalo
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`https://growviadigitalmarketing.com/php_backend/api/read_single.php?id=${id}`);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog:", err);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading Content...</div>;
    if (!blog) return <div className="h-screen flex items-center justify-center font-bold">Blog not found.</div>;

    return (
        <div className="min-h-screen bg-white text-black">

            {/* --- HERO SECTION --- */}
            <div className="relative h-[60vh] w-full bg-gray-900">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-xs font-bold uppercase tracking-widest transition-colors">
                            <FiArrowLeft /> Back to Journal
                        </Link>
                        <div className="mb-4 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-blue-400">
                            <span className="bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">{blog.category || "General"}</span>
                            <span className="flex items-center gap-2 text-white/80"><FiClock /> 5 Min Read</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                                {blog.author ? blog.author.charAt(0) : "A"}
                            </div>
                            <div>
                                <p className="text-white font-bold">{blog.author || "Growvia Team"}</p>
                                <p className="text-white/50 text-xs uppercase tracking-wide">{new Date(blog.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION (Rich Text) --- */}
            <div className="px-6 md:px-20 py-20">
                <div className="max-w-3xl mx-auto">

                    {/* Custom CSS for Rich Text Content */}
                    <style>{`
                .blog-content h1 { font-size: 2.5rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; }
                .blog-content h2 { font-size: 1.8rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
                .blog-content p { font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem; color: #374151; }
                .blog-content img { width: 100%; border-radius: 12px; margin: 2rem 0; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .blog-content blockquote { border-left: 4px solid black; padding-left: 1.5rem; font-style: italic; color: #555; background: #f9fafb; padding: 1.5rem; border-radius: 0 8px 8px 0; margin: 2rem 0; }
                .blog-content a { color: #2563eb; text-decoration: underline; }
            `}</style>

                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Footer / Share */}
                    <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
                        <p className="font-bold text-lg">Share this article</p>
                        <div className="flex gap-4">
                            {/* Social Icons Dummy */}
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">FB</button>
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">TW</button>
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all">LN</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default BlogDetail;