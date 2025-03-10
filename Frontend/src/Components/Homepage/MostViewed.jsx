import React from 'react';

const MostViewed = () => {
  const videos = [
    {
      id: 1,
      title: "Creative Pallet Recycling",
      embedUrl: "https://www.youtube.com/embed/fRrXL1Aq8CQ?start=10",
      category: "Carpentry"
    },
    {
      id: 2,
      title: "Power Outage",
      embedUrl: "https://www.youtube.com/embed/Q4fSUn4ojGM?start=10",
      category: "Electrical"
    },
    {
      id: 3,
      title: "How to Paint a Room",
      embedUrl: "https://www.youtube.com/embed/CRXCB_3gLok?start=10",
      category: "Painting"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Most Viewed</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <iframe
                      src={video.embedUrl}
                      className="w-full h-64 object-cover"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#FFA725] rounded-full">
                      {video.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#FFA725] transition-colors duration-300">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-gray-600 text-sm">Featured</span>
                    </div>
                    
                    <button className="px-4 py-2 bg-[#FFA725] text-white text-sm font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostViewed;