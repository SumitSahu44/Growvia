import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiLayout, FiSave, FiEye, FiSettings, FiImage, FiMenu, FiX } from 'react-icons/fi';

const RichAdmin = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [preview, setPreview] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle

    // --- EDITOR CONFIGURATION ---
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'link', 'image'
    ];

    const handlePublish = () => {
        console.log("Saving to DB:", { title, content });
        alert("Published! (Check Console)");
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900">

            {/* --- MOBILE HEADER (Visible only on small screens) --- */}
            <div className="md:hidden flex justify-between items-center p-4 bg-black text-white sticky top-0 z-30">
                <div className="font-bold text-lg">Admin.</div>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                </button>
            </div>

            {/* --- SIDEBAR (Fixed Position) --- */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-black text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">G.</div>
                    <span className="font-bold text-xl tracking-tight">Admin</span>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    <button className="flex items-center gap-4 w-full px-4 py-3 bg-white/10 text-white rounded-xl transition-all border border-white/5">
                        <FiLayout className="text-lg" /> <span className="text-sm font-bold uppercase tracking-widest">Write</span>
                    </button>
                    <button className="flex items-center gap-4 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <FiSettings className="text-lg" /> <span className="text-sm font-bold uppercase tracking-widest">Settings</span>
                    </button>
                </nav>

                <div className="p-6 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Logged in as Admin</p>
                </div>
            </aside>

            {/* --- OVERLAY FOR MOBILE SIDEBAR --- */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* --- MAIN CONTENT (Scrollable Body) --- */}
            {/* 'md:ml-64' creates space for fixed sidebar */}
            <main className="md:ml-64 p-6 md:p-12 min-h-screen">

                {/* Header Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">New Story</h1>
                        <p className="text-gray-500 text-sm mt-1">Share your thoughts with the world.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setPreview(!preview)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <FiEye /> {preview ? "Edit" : "Preview"}
                        </button>
                        <button
                            onClick={handlePublish}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200"
                        >
                            <FiSave /> Publish
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* --- EDITOR AREA --- */}
                    <div className={`lg:col-span-2 space-y-8 ${preview ? 'hidden' : 'block'}`}>

                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Article Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl md:text-6xl font-black bg-transparent border-none outline-none placeholder-gray-300 text-black leading-tight"
                        />

                        {/* RICH TEXT EDITOR CARD */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px] relative">

                            {/* Styling Quill to look like Notion/Word */}
                            <style>{`
                        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; padding: 12px 24px !important; background: white; position: sticky; top: 0; z-index: 10; }
                        .ql-container.ql-snow { border: none !important; font-size: 1.15rem; font-family: sans-serif; }
                        .ql-editor { min-height: 600px; padding: 40px; color: #1f2937; }
                        .ql-editor.ql-blank::before { color: #d1d5db; font-style: normal; }
                        .ql-editor img { border-radius: 12px; margin: 30px 0; width: 100%; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1); }
                        .ql-editor h1 { font-size: 2.5em; font-weight: 800; margin-top: 1em; }
                        .ql-editor h2 { font-size: 1.8em; font-weight: 700; margin-top: 1em; }
                        .ql-editor p { margin-bottom: 1.2em; line-height: 1.8; }
                        .ql-editor blockquote { border-left: 4px solid black; padding-left: 1rem; font-style: italic; background: #f9fafb; padding: 1rem; border-radius: 0 8px 8px 0; }
                    `}</style>

                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                placeholder="Start writing... Use the toolbar to add images."
                            />
                        </div>

                    </div>

                    {/* --- PREVIEW AREA (Sticky Sidebar) --- */}
                    <div className={`lg:col-span-1 ${preview ? 'lg:col-span-3 max-w-4xl mx-auto w-full' : ''}`}>

                        {/* Sticky Container */}
                        <div className="sticky top-10 space-y-6">

                            {!preview && (
                                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex gap-4 items-start">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FiImage /></div>
                                    <div>
                                        <h4 className="font-bold text-sm text-blue-900 mb-1">Add Images</h4>
                                        <p className="text-xs text-blue-700 leading-relaxed">Click the image icon in the toolbar to insert photos directly between your text.</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-[2.5rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden h-[700px] relative">
                                {/* Phone Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl z-20"></div>

                                {/* Internal Scrollable Content */}
                                <div className="h-full overflow-y-auto no-scrollbar bg-white">
                                    {/* Fake Status Bar */}
                                    <div className="h-10 bg-white sticky top-0 z-10 w-full"></div>

                                    <div className="px-6 pb-12">
                                        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                                            Blog Preview
                                        </span>
                                        <h1 className="text-2xl font-black leading-tight mb-4 text-gray-900">
                                            {title || "Untitled Story"}
                                        </h1>

                                        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                            <div>
                                                <div className="text-xs font-bold text-black">Growvia Team</div>
                                                <div className="text-[10px] text-gray-400">Just now</div>
                                            </div>
                                        </div>

                                        {/* RENDER HTML CONTENT */}
                                        <div
                                            className="prose prose-sm max-w-none prose-img:rounded-xl prose-headings:font-bold prose-a:text-blue-600 prose-p:text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: content || "<p class='text-gray-300 text-center py-10'>Start writing to see preview...</p>" }}
                                        />
                                    </div>
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