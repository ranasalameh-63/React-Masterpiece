import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader'

function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:7000/api/admin/statistics')
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('There was an error fetching the statistics.');
        setLoading(false);
      });
  }, []);
 
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ">BuildNest Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.usersCount} />
        <StatCard title="Total Experts" value={stats.expertsCount} />
        <StatCard title="Total Videos" value={stats.videosCount} />
        <StatCard title="Pending Bookings" value={stats.pendingBookings} />
        <StatCard title="Confirmed Bookings" value={stats.confirmedBookings} />
        <StatCard title="Canceled Bookings" value={stats.canceledBookings} />
      </div>
    </div>
  );
}

// Extracted stat card component for reusability
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:scale-105 border-l-4 border-amber-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="bg-white rounded-full p-3 shadow-sm">
          <span className="text-2xl font-bold" style={{ color: '#FFA725' }}>{value}</span>
        </div>
      </div>
    </div>
  );
}
 
export default Statistics;