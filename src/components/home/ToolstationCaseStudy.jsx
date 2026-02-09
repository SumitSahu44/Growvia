import React from 'react';

const ToolstationCaseStudy = () => {
  return (
    <div className="max-w-6xl mx-auto font-sans bg-white overflow-hidden">
      {/* Top Banner Image Section */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1603201667230-bd139210db18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3JlYXRpdmUlMjBhZ2VuY3l8ZW58MHx8MHx8fDA%3D" // Replace with your image
          alt="Toolstation Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-8 md:px-12">

        {/* Header and Button Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-lg md:text-3xl font-black tracking-tighter uppercase">
            TOOLSTATION: SWIFT & IMPACTFUL ACTIONS
          </h2>
          <button className="bg-[#f3b500] hover:bg-[#d49e00] text-white px-8 py-2 rounded-full font-serif italic text-sm transition-colors">
            Read Story
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">

          {/* Client Column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">Client</p>
            <div className="border-2 border-black inline-block px-3 py-1 rounded-full">
              <span className="font-black text-sm uppercase tracking-tighter">TOOLSTATION</span>
            </div>
          </div>

          {/* Mission Column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">Mission</p>
            <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
              We needed to deliver considerable uplift for Toolstation in a short period of time.
            </p>
          </div>

          {/* Results Column */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4">Results</p>
            <div className="flex gap-12">
              <div>
                <p className="text-xs text-gray-700 mb-1">Uplift yoy</p>
                <p className="text-4xl md:text-5xl font-black">40%</p>
              </div>
              <div>
                <p className="text-xs text-gray-700 mb-1">Stronger target roas</p>
                <p className="text-4xl md:text-5xl font-black">10%</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToolstationCaseStudy;