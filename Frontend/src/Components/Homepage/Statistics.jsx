import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader'

function Statistics() {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/view/statistics");
        setStatsData(res.data);
      } catch (err) {
        console.error("Failed to load statistics", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Issues Fixed",
      value: statsData?.bookings || "0",
      description: "Successful Repairs",
      image: "https://i.pinimg.com/736x/51/d8/53/51d85370f19c3619083f53682e5add3a.jpg"
    },
    {
      title: "Active Users",
      value: statsData?.users || "0",
      description: "Engaged Users",
      image: "https://i.pinimg.com/736x/e0/11/80/e01180c0e6eccb5328826a29a6b57044.jpg"
    },
    {
      title: "Tutorial Videos",
      value: statsData?.videos || "0",
      description: "DIY Learning Resources",
      image: "https://i.pinimg.com/736x/d9/5b/69/d95b69ff6e716b718d68759b0c4c82a1.jpg"
    },
    {
      title: "Professionals",
      value: statsData?.experts || "0",
      description: "Our Talented",
      image: "https://i.pinimg.com/736x/fd/3c/08/fd3c083d11fdf5407da811cd7b6e4a27.jpg"
    }
  ];

  if (!statsData) {
    return <Loader/>
  }

  return (
    <div className="py-16 px-4">
      {/* Header */}
      <div className="text-center text-gray-800 mb-16 pt-20 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Achievements in 2025</h1>
        <p className="text-xl text-amber-500 font-medium">
          Statistics reflecting our community's success in home repairs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="group relative transform transition-all duration-300 hover:-translate-y-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-100">
              {/* Image with overlay gradient */}
              <div className="relative">
                <img src={stat.image} alt={stat.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white relative">
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-500"></div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{stat.title}</h2>
                <p className="text-4xl font-bold mb-3 text-amber-500">{stat.value}</p>
                <p className="text-lg text-gray-600">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
