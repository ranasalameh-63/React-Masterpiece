// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// // Colors
// const PRIMARY = '#FFA725';
// const PRIMARY_LIGHT = '#FFEDCC';
// const PRIMARY_DARK = '#E08300';
// const WHITE = '#FFFFFF';
// const TEXT_DARK = '#374151';

// // Chart colors
// const CHART_COLORS = [PRIMARY, PRIMARY_DARK, '#FF8A00'];

// export default function AdminStatistics() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:7000/api/admin/statistics')
//       .then(res => {
//         setStats(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Failed to load statistics.');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <div className="p-6 text-red-600">{error}</div>;

//   const barData = [
//     { name: 'Users', value: stats.usersCount },
//     { name: 'Experts', value: stats.expertsCount },
//     { name: 'Videos', value: stats.videosCount },
//     { name: 'Bookings', value: stats.bookingsCount },
//   ];

//   const pieData = [
//     { name: 'Pending', value: stats.pendingBookings },
//     { name: 'Confirmed', value: stats.confirmedBookings },
//     { name: 'Canceled', value: stats.canceledBookings },
//   ];

//   return (
//     <div className="p-6 space-y-8 bg-gray-50">
//       {/* Header */}
//       <div className="flex items-center justify-between bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
//         <h1 className="text-2xl font-bold text-gray-800">BuildNest Dashboard</h1>
//       </div>
      
//       {/* Section 1: Stat Cards */}
//       <section className="space-y-6">
//         <h2 className="text-xl font-bold mb-4 text-gray-800 pl-2">Platform Overview</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <StatCard 
//             title="Total Users" 
//             value={stats.usersCount} 
//             icon={<UserIcon />} 
//           />
//           <StatCard 
//             title="Total Experts" 
//             value={stats.expertsCount} 
//             icon={<ExpertIcon />} 
//           />
//           <StatCard 
//             title="Total Videos" 
//             value={stats.videosCount} 
//             icon={<VideoIcon />} 
//           />
//         </div>
//       </section>

//       {/* Section 2: Booking Stats */}
//       <section className="space-y-6">
//         <h2 className="text-xl font-bold mb-4 text-gray-800 pl-2">Booking Analytics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <BookingStatCard 
//             title="Pending Bookings" 
//             value={stats.pendingBookings} 
//             color="bg-amber-100"
//             textColor="text-amber-800"
//           />
//           <BookingStatCard 
//             title="Confirmed Bookings" 
//             value={stats.confirmedBookings} 
//             color="bg-green-100"
//             textColor="text-green-800"
//           />
//           <BookingStatCard 
//             title="Canceled Bookings" 
//             value={stats.canceledBookings} 
//             color="bg-red-100"
//             textColor="text-red-800"
//           />
//         </div>
//       </section>

//       {/* Section 3: Charts */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Bar Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
//           <h2 className="text-lg font-semibold mb-6 text-gray-800">Totals Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: WHITE, 
//                   borderColor: PRIMARY,
//                   borderRadius: '8px'
//                 }} 
//               />
//               <Legend />
//               <Bar dataKey="value" fill={PRIMARY} radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
//           <h2 className="text-lg font-semibold mb-6 text-gray-800">Booking Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 innerRadius={60}
//                 outerRadius={90}
//                 paddingAngle={2}
//                 label
//               >
//                 {pieData.map((_, idx) => (
//                   <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: WHITE, 
//                   borderColor: PRIMARY,
//                   borderRadius: '8px'
//                 }} 
//               />
//               <Legend verticalAlign="bottom" height={40} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </section>
//     </div>
//   );
// }

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-amber-500">
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col space-y-1">
//           <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//           <span className="text-3xl font-bold text-amber-500">{value}</span>
//         </div>
//         <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full text-amber-500">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BookingStatCard({ title, value, color, textColor }) {
//   return (
//     <div className={`rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${color}`}>
//       <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//       <div className="flex items-end justify-between mt-2">
//         <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
//         <div className="text-right">
//           <span className="text-sm text-gray-500">Total</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Simple Icons
// function Loader() {
//   return (
//     <div className="flex justify-center items-center h-64">
//       <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//   );
// }

// function UserIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   );
// }

// function ExpertIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//     </svg>
//   );
// }

// function VideoIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//     </svg>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Colors
const PRIMARY       = '#FFA725';
const PRIMARY_LIGHT = '#FFEDCC';
const PRIMARY_DARK  = '#E08300';
const WHITE         = '#FFFFFF';
const TEXT_DARK     = '#374151';

// Chart palette
const CHART_COLORS = [ PRIMARY, PRIMARY_DARK, '#FF8A00' ];

export default function AdminStatistics() {
  const [stats, setStats] = useState(null);
  const [paymentData, setPaymentData] = useState({ status: [], method: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:7000/api/admin/statistics'),
      axios.get('http://localhost:7000/api/admin/payments')
    ])
    .then(([statRes, payRes]) => {
      setStats(statRes.data);

      // جمع بيانات عمليات الدفع
      const payments = payRes.data;
      const statusMap = {};
      const methodMap = {};

      payments.forEach(p => {
        const s = p.status || 'unknown';
        statusMap[s] = (statusMap[s] || 0) + 1;

        const m = p.paymentMethod || p.method || 'unknown';
        methodMap[m] = (methodMap[m] || 0) + 1;
      });

      const status  = Object.entries(statusMap).map(([name, value]) => ({ name, value }));
      const method  = Object.entries(methodMap).map(([name, value]) => ({ name, value }));
      setPaymentData({ status, method });

      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load statistics.');
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  // البيانات للـ bar & pie الأصليين
  const barData = [
    { name: 'Users',    value: stats.usersCount },
    { name: 'Experts',  value: stats.expertsCount },
    { name: 'Videos',   value: stats.videosCount },
    { name: 'Bookings', value: stats.bookingsCount },
  ];
  const pieData = [
    { name: 'Pending',   value: stats.pendingBookings   },
    { name: 'Confirmed', value: stats.confirmedBookings },
    { name: 'Canceled',  value: stats.canceledBookings  },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
        <h1 className="text-2xl font-bold text-gray-800">BuildNest Dashboard</h1>
      </div>

      {/* Section 1: Platform Overview */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 pl-2">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Users"   value={stats.usersCount}   icon={<UserIcon />} />
          <StatCard title="Total Experts" value={stats.expertsCount} icon={<ExpertIcon />} />
          <StatCard title="Total Videos"  value={stats.videosCount}  icon={<VideoIcon />} />
        </div>
      </section>

      {/* Section 2: Booking Analytics */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 pl-2">Booking Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BookingStatCard title="Pending Bookings"   value={stats.pendingBookings}   color="bg-amber-100"  textColor="text-amber-800" />
          <BookingStatCard title="Confirmed Bookings" value={stats.confirmedBookings} textColor="text-green-800" color="bg-green-100"  />
          <BookingStatCard title="Canceled Bookings"  value={stats.canceledBookings}  textColor="text-red-800"   color="bg-red-100"    />
        </div>
      </section>

      {/* Section 3: Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">Totals Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: WHITE, borderColor: PRIMARY, borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="value" fill={PRIMARY} radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">Booking Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                label
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: WHITE, borderColor: PRIMARY, borderRadius: 8 }} />
              <Legend verticalAlign="bottom" height={40} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Section 4: Payment Operations */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 pl-2">Payment Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pie: Payment Status */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Payment Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData.status}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  label
                >
                  {paymentData.status.map((_, idx) => (
                    <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: WHITE, borderColor: PRIMARY, borderRadius: 8 }} />
                <Legend verticalAlign="bottom" height={40} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar: Payment Methods */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Payment Methods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentData.method}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: WHITE, borderColor: PRIMARY, borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="value" fill={PRIMARY_DARK} radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>
    </div>
  );
}

// ===== Helper Components =====

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-amber-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <span className="text-3xl font-bold text-amber-500">{value}</span>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full text-amber-500">
          {icon}
        </div>
      </div>
    </div>
  );
}

function BookingStatCard({ title, value, color, textColor }) {
  return (
    <div className={`${color} rounded-xl p-6 shadow-md hover:shadow-lg transition-all`}>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        <span className="text-sm text-gray-500">Total</span>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function ExpertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 
        01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 
        00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}
