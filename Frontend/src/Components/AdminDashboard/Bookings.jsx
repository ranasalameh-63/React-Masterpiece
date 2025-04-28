import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:7000/api/admin/allBookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA725]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#FFA725]">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
        </div>
        <div className="bg-[#FFA725] text-white px-4 py-2 rounded-lg shadow-md">
          <span className="font-medium">{bookings.length}</span> Total Bookings
        </div>
      </div>
      
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white">
          <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#FFF5E6] text-[#FFA725]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg">No bookings found in the system</p>
          <p className="text-sm text-[#FFA725] mt-2">Bookings will appear here once customers make reservations</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white">
          <table className="min-w-full bg-white border border-gray-100">
            <thead>
              <tr className="bg-[#FFF5E6]">
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">User</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Expert</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Date</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Time</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Type</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Status</th>
                <th className="py-3 px-4 border-b text-[#FFA725] font-semibold">Service Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-[#FFF5E6] transition-colors duration-150">
                  <td className="py-3 px-4 border-b">
                    {booking.userId?.fullName || "Unknown User"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {booking.expertId?.userId?.fullName || "Unknown Expert"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(booking.preferredDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {booking.preferredTime}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    <span className="px-2 py-1 bg-[#FFF5E6] text-[#FFA725] rounded-md text-xs">
                      {booking.bookingType}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        booking.status === "pending"
                          ? "bg-yellow-500"
                          : booking.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {booking.serviceDetails || "No details"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6 text-sm text-gray-500 bg-white p-4 border border-gray-100 rounded">
            <p>This table displays all bookings in the system. You can view detailed information about each booking, including the assigned expert, scheduled date and time, and current status.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBookings;