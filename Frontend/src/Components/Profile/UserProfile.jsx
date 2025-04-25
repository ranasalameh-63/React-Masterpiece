import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { MapPin, Calendar, Clock, Star, MessageCircle, Phone, Mail, Cake, User, Edit, CheckCircle, XCircle, Clock3 } from 'lucide-react';

function UserProfile() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [showVoucherPopup, setShowVoucherPopup] = useState(false);
  const [voucherData, setVoucherData] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios.get(`http://localhost:7000/api/user/details/${userId}`)
        .then((response) => {
          setUserData(response.data);
          setOriginalData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data.");
          setLoading(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7000/api/user/booking/${userId}`)
        .then((response) => {
          setBookings(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (!originalData) return;

    const hasChanges =
      userData.fullName !== originalData.fullName ||
      file !== null;

    setIsModified(hasChanges);
  }, [userData, file, originalData]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    if (file) formData.append("profilePicture", file);

    try {
      const response = await axios.put(`http://localhost:7000/api/user/edit/${userData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserData(response.data.user);
      setOriginalData(response.data.user);
      setMessage("Profile updated successfully!");
      setFile(null);
      setIsModified(false);
    } catch (err) {
      console.error("Error updating profile", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVoucher = async (bookingId) => {
    if (!bookingId) {
      console.error("Booking ID is missing!");
      return;
    }
    console.log(bookingId);
    try {
      const response = await axios.get(`http://localhost:7000/api/voucher/booking/${bookingId}`);
      setVoucherData(response.data);
      setShowVoucherPopup(true);
    } catch (error) {
      console.error("Error fetching voucher:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <CheckCircle size={14} className="mr-1 text-green-600" />;
      case 'canceled':
        return <XCircle size={14} className="mr-1 text-red-600" />;
      default:
        return <Clock3 size={14} className="mr-1 text-yellow-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {message && (
          <div className="text-green-600 bg-green-100 p-3 rounded-md mb-4 text-sm border-l-4 border-green-500 flex items-center">
            <CheckCircle size={16} className="mr-2" />
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border-l-4 border-red-500 flex items-center">
            <XCircle size={16} className="mr-2" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#FFA725] to-amber-400 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="relative group mb-4 md:mb-0 md:mr-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {userData.profilePicture ? (
                    <img
                      src={`http://localhost:7000${userData.profilePicture}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white bg-opacity-20 flex items-center justify-center">
                      <User size={40} className="text-white" />
                    </div>
                  )}
                </div>
                <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Edit size={24} className="text-white" />
                </label>
                <input
                  id="profile-picture"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{userData.fullName}</h1>
                <div className="flex items-center justify-center md:justify-start mt-2">
                  <Mail size={16} className="mr-2" />
                  <p className="text-white text-opacity-90 text-sm">{userData.email}</p>
                </div>
              </div>
              
              {isModified && (
                <div className="flex space-x-2 mt-4 md:mt-0 md:ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setUserData(originalData);
                      setFile(null);
                      setIsModified(false);
                    }}
                    className="px-4 py-2 text-sm bg-white text-gray-700 rounded-md hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm text-[#FFA725] bg-white rounded-md hover:bg-gray-50 shadow-sm transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b">
            <div className="flex px-6">
              <button
                className={`py-4 px-4 font-medium text-sm ${activeTab === "about" ? "text-[#FFA725] border-b-2 border-[#FFA725]" : "text-gray-600 hover:text-gray-800"}`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm ${activeTab === "timeline" ? "text-[#FFA725] border-b-2 border-[#FFA725]" : "text-gray-600 hover:text-gray-800"}`}
                onClick={() => setActiveTab("timeline")}
              >
                Bookings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "about" && (
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-[#FFA725] text-sm uppercase mb-4">Recent Bookings</h3>
                    
                    {bookings.length > 0 ? (
                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking._id} className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="font-semibold text-sm">{booking.expertId?.userId?.fullName || "Expert"}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar size={12} className="mr-1" />
                              <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                              <span className="mx-1">•</span>
                              <Clock size={12} className="mr-1" />
                              <span>{booking.preferredTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No recent bookings</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#FFA725] text-sm uppercase mb-4">User Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Full Name</p>
                          <p className="text-sm font-medium">{userData.fullName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium">{userData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-6 md:border-l">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Favorite Videos</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
                    <p className="text-gray-500 text-sm">No favorite videos yet</p>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h3>
                  
                  <form className="space-y-4 bg-gray-50 p-6 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                        placeholder="you@example.com"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Your Bookings</h3>

                {bookings.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-2">You have no bookings yet.</p>
                    <p className="text-sm text-gray-400">Book an expert to see your bookings here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className={`p-4 ${
                          booking.status === 'confirmed' ? 'bg-green-50 border-l-4 border-green-500' :
                          booking.status === 'canceled' ? 'bg-red-50 border-l-4 border-red-500' :
                          'bg-yellow-50 border-l-4 border-yellow-500'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{booking.expertId?.userId?.fullName || "Expert"}</h4>
                              <p className="text-sm text-gray-500">{booking.expertId?.skills?.join(', ')}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs rounded-full flex items-center ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'canceled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <Clock size={16} className="mr-2" />
                            <span>{booking.preferredTime}</span>
                          </div>

                          {booking.serviceDetails && (
                            <p className="text-sm text-gray-600 mb-4 border-l-2 border-gray-200 pl-3">
                              {booking.serviceDetails}
                            </p>
                          )}

                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => fetchVoucher(booking._id)}
                              className="w-full py-2 px-4 bg-[#FFA725] text-white rounded-md hover:bg-amber-600 transition flex items-center justify-center"
                            >
                              <Star size={16} className="mr-2" />
                              View Voucher
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voucher Popup */}
      {showVoucherPopup && voucherData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative border-2 border-[#FFA725]">
            <button
              onClick={() => setShowVoucherPopup(false)}
              className="absolute top-2 right-2 text-[#FFA725] hover:text-[#E08600] text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-6 text-[#FFA725] text-center">Voucher Details</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Voucher Number</p>
                <p className="font-semibold">{voucherData.voucherNumber}</p>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="font-semibold text-[#FFA725]">{voucherData.amount} JD</p>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Details</p>
                <p className="text-sm">{voucherData.details}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Creation Date</p>
                <p className="text-sm">{new Date(voucherData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowVoucherPopup(false)}
              className="w-full py-2 bg-[#FFA725] text-white rounded-md hover:bg-amber-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
