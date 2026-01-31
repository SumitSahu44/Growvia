import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { FiSave, FiEye, FiImage, FiMenu, FiX, FiTrash2, FiPlus, FiEdit3, FiUploadCloud } from 'react-icons/fi';

const RichAdmin = () => {
    // --- STATE ---
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [blogs, setBlogs] = useState([]);

    // Cover Image States
    const [coverImage, setCoverImage] = useState(null); // File Object (Upload ke liye)
    const [coverPreview, setCoverPreview] = useState(''); // Preview URL (Dikhane ke liye)

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [preview, setPreview] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const quillRef = useRef(null);

    const API_URL = "http://localhost:5000/api/blogs";
    const UPLOAD_URL = "http://localhost:5000/api/upload";

    useEffect(() => { fetchBlogs(); }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(API_URL);
            setBlogs(res.data);
        } catch (err) { console.error(err); }
    };

    // --- 1. HANDLE COVER IMAGE SELECTION ---
    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file); // File save karo upload ke liye
            setCoverPreview(URL.createObjectURL(file)); // Local preview dikhao turant
        }
    };

    // --- 2. HANDLE EDITOR IMAGE UPLOAD (Immediate) ---
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('image', file);
            try {
                const res = await axios.post(UPLOAD_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                const quill = quillRef.current.getEditor();
                quill.insertEmbed(quill.getSelection().index, 'image', res.data.url);
            } catch (err) { alert("Editor Image Upload Failed"); }
        };
    };

    // --- 3. MAIN PUBLISH FUNCTION ---
    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) return alert("Title and Content are required!");

        // Check if Cover Image is missing for new posts
        if (!isEditing && !coverImage) return alert("Please upload a cover image!");

        let finalCoverUrl = coverPreview; // Default to existing preview (for edits)

        try {
            // Step A: Agar naya Cover Image select kiya hai, to pehle use Upload karo
            if (coverImage) {
                const formData = new FormData();
                formData.append('image', coverImage);

                const uploadRes = await axios.post(UPLOAD_URL, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                finalCoverUrl = uploadRes.data.url; // Server ka naya URL mil gaya
            }

            // Step B: Ab sara data DB me bhejo (Image URL ke sath)
            const blogData = {
                title,
                content,
                image: finalCoverUrl, // ✅ Yahan URL jayega, file nahi
                author: "Growvia Team",
                category: "Tech"
            };

            if (isEditing) {
                await axios.put(`${API_URL}/${currentId}`, blogData);
                alert("Story Updated Successfully!");
            } else {
                await axios.post(`${API_URL}/create`, blogData);
                alert("Story Published Successfully!");
            }

            handleNew();
            fetchBlogs();

        } catch (err) {
            console.error(err);
            alert("Something went wrong during publish.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete?")) { await axios.delete(`${API_URL}/${id}`); fetchBlogs(); }
    };

    const handleEdit = (blog) => {
        setIsEditing(true);
        setCurrentId(blog._id);
        setTitle(blog.title);
        setContent(blog.content);
        setCoverPreview(blog.image); // Purani image dikhao
        setCoverImage(null); // Reset file input
        setPreview(false);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const handleNew = () => {
        setIsEditing(false);
        setCurrentId(null);
        setTitle('');
        setContent('');
        setCoverImage(null);
        setCoverPreview('');
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'blockquote'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image'], ['clean']],
            handlers: { image: imageHandler }
        }
    }), []);

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 overflow-x-hidden flex flex-col md:flex-row">

            {/* SIDEBAR */}
            <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 shrink-0
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">G.</div>
                        <span className="font-black text-xl tracking-tight">Admin</span>
                    </div>
                    <button onClick={handleNew} className="p-2 bg-black text-white rounded-full hover:bg-blue-600 transition shadow-lg"><FiPlus /></button>
                </div>
                <div className="p-4 overflow-y-auto flex-1 custom-scrollbar pb-20">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Stories ({blogs.length})</h3>
                    <div className="space-y-3">
                        {blogs.map((blog) => (
                            <div key={blog._id} onClick={() => handleEdit(blog)} className={`p-4 rounded-xl border cursor-pointer transition-all group relative
                        ${currentId === blog._id ? 'bg-black text-white border-black' : 'bg-white border-gray-100 hover:border-gray-300'}
                    `}>
                                {/* Thumbnail in Sidebar */}
                                <div className="h-20 w-full mb-3 rounded-lg overflow-hidden bg-gray-100">
                                    <img src={blog.image} alt="thumb" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-sm line-clamp-1 mb-1">{blog.title}</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] opacity-60">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    {currentId === blog._id && <FiEdit3 className="text-xs opacity-60" />}
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(blog._id); }} className="absolute top-2 right-2 p-2 text-red-500 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md hover:bg-red-50 transition-all z-10"><FiTrash2 size={12} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* OVERLAY */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 p-4 md:p-12 min-h-screen relative">
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"><FiMenu /></button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 mt-12 md:mt-0">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">{isEditing ? "Edit Story" : "New Story"}</h1>
                        <p className="text-gray-500 text-sm mt-1">{isEditing ? "Update your post." : "Share your thoughts."}</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto flex-wrap sticky top-4 z-30">
                        <button onClick={() => setPreview(!preview)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors shadow-sm"><FiEye /> {preview ? "Editor" : "Preview"}</button>
                        <button onClick={handlePublish} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-xl"><FiSave /> {isEditing ? "Update" : "Publish"}</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* EDITOR */}
                    <div className={`lg:col-span-2 space-y-8 ${preview ? 'hidden' : 'block'}`}>

                        {/* --- COVER IMAGE UPLOAD SECTION --- */}
                        <div className="relative group w-full h-64 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors cursor-pointer">
                            <input type="file" onChange={handleCoverChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-20" />

                            {coverPreview ? (
                                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-6 text-gray-400">
                                    <FiUploadCloud className="mx-auto text-4xl mb-2" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Click to Upload Cover Image</p>
                                </div>
                            )}

                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                <p className="text-white font-bold uppercase tracking-widest text-sm">Change Image</p>
                            </div>
                        </div>

                        <input type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-4xl md:text-6xl font-black bg-transparent border-none outline-none placeholder-gray-300 text-black leading-tight break-words" />

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative max-w-full">
                            <style>{`
                        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; background: white; position: sticky; top: 0; z-index: 10; }
                        .ql-container.ql-snow { border: none !important; font-size: 1.15rem; }
                        .ql-editor { min-height: 500px; padding: 20px md:40px; color: #1f2937; }
                        .ql-editor img { max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 20px 0; }
                    `}</style>
                            <ReactQuill ref={quillRef} theme="snow" value={content} onChange={setContent} modules={modules} placeholder="Write something..." />
                        </div>
                    </div>

                    {/* PREVIEW */}
                    <div className={`lg:col-span-1 ${preview ? 'lg:col-span-3 max-w-4xl mx-auto w-full' : ''}`}>
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-white rounded-[2.5rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden h-[750px] relative w-full max-w-full md:max-w-md mx-auto">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>
                                <div className="h-full overflow-y-auto no-scrollbar bg-white px-6 pb-20 pt-12 break-words">

                                    {/* Preview Cover Image */}
                                    {coverPreview && (
                                        <div className="w-full h-48 rounded-xl overflow-hidden mb-6 shadow-md">
                                            <img src={coverPreview} alt="Preview Cover" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Preview</span>
                                    <h1 className="text-3xl font-black leading-tight mb-4 text-gray-900">{title || "Untitled"}</h1>
                                    <div className="prose prose-sm max-w-none prose-img:rounded-xl prose-img:w-full prose-headings:font-bold prose-a:text-blue-600 break-words" dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-300 italic text-center'>...</p>" }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default RichAdmin;