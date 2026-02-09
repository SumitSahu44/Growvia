import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCalendar, FiUser } from 'react-icons/fi';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se blogs fetch karna
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://growviadigitalmarketing.com/php_backend/api/read.php');
        let data = res.data;

        // --- BUG FIX: Handle "Connected successfully" prefix from server ---
        if (typeof data === 'string' && data.includes('Connected successfully')) {
          const jsonPart = data.replace('Connected successfully', '').trim();
          try {
            data = JSON.parse(jsonPart);
          } catch (e) {
            console.error("Failed to parse fixed JSON", e);
          }
        }

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setBlogs([]);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center text-xl font-bold">Loading Stories...</div>;

  return (
    <div className="min-h-screen bg-white text-black py-24 px-6 md:px-20">

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-20 border-b border-gray-100 pb-10">
        <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">The Journal</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
          Insights & <br /><span className="text-gray-500">Updates.</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
          Explore our latest thoughts on design, technology, and business growth.
        </p>
      </div>

      {/* --- BLOG GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="group block"
          >
            {/* Image Card */}
            <div className="overflow-hidden rounded-2xl mb-6 relative h-[300px] w-full bg-gray-100">
              <img
                src={blog.image || "https://placehold.co/600x400"}
                alt={blog.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {blog.category || "Tech"}
              </div>
            </div>

            {/* Content */}
            <div className="pr-4">
              <div className="flex items-center gap-4 text-xs text-gray-600 font-medium uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1"><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><FiUser /> {blog.author || "Team"}</span>
              </div>

              <h2 className="text-2xl font-bold leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h2>

              {/* HTML Content ka Plain Text Preview nikalne ka hack */}
              <div
                className="text-gray-700 leading-relaxed mb-4 line-clamp-3 text-sm"
                dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + "..." }}
              ></div>

              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 group-hover:text-blue-600 group-hover:border-blue-600 transition-all">
                Read Full Story <FiArrowUpRight />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Blogs;