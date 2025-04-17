import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryVideos = () => {
  const { categoryName } = useParams(); 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/video/category/${categoryName}`);
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [categoryName]);

  const getCategoryColor = (category) => {
    const colors = {
      Carpentry: "bg-orange-400",
      Electrical: "bg-orange-400",
      Painting: "bg-orange-400",
      Plumbing: "bg-orange-400",
      Gardening: "bg-orange-400",
      HomeDecor: "bg-orange-400"
    };
    return colors[category] || "bg-gray-500";
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        {categoryName} Tutorials
      </h1>

      {videos.length === 0 ? (
        <div className="text-center text-gray-600 py-12">No videos found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              <div className="relative">
                {/* YouTube thumbnail with play button overlay */}
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`text-white text-sm font-medium px-3 py-1 rounded ${getCategoryColor(categoryName)}`}>
                      {categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <div className="font-bold text-lg">{video.title}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h2>
                  <p className="text-gray-600 line-clamp-2">{video.description}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600 text-sm">Featured</span>
                  </div>
                  <a 
                    href={video.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-amber-500 hover:bg-orange-400 text-white font-medium px-4 py-2 rounded-md transition"
                  >
                    Watch Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryVideos;