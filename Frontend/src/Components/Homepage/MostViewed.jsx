import { useEffect, useState } from "react";
import axios from "axios";

const RecentlyAdded = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/video/recent")
      .then((res) => setVideos(res.data.videos))
      .catch((err) => console.error("Error loading videos:", err));
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Recently Added
        <span className="block w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <iframe
                className="w-full h-48"
                src={`https://www.youtube.com/embed/${getYoutubeID(video.youtubeUrl)}`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {video.categories[0] || "General"}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {video.title}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center">
                  ⭐ Featured
                </span>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-white text-xs px-3 py-1 rounded hover:bg-amber-600 transition"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 View All Button */}
      <div className="text-center mt-8">
        <a
          href="/categories"
          className="inline-block bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-amber-600 transition"
        >
          View All Videos
        </a>
      </div>
    </section>
  );
};

// Helper to extract YouTube ID
const getYoutubeID = (url) => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export default RecentlyAdded;
