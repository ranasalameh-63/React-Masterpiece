import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { MapPin, Calendar, Clock, Star, MessageCircle, Phone, Mail, Cake, User } from 'lucide-react';

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {message && (
        <div className="text-green-600 bg-green-100 p-3 rounded-md mb-4 text-sm border-l-4 border-green-500">
          {message}
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border-l-4 border-red-500">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center"
              style={{ backgroundColor: "#FFA725" }}
            >
              <User size={16} />
            </div>
            <span className="font-semibold text-gray-700">User Profile</span>
          </div>

          {isModified && (
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  setUserData(originalData);
                  setFile(null);
                  setIsModified(false);
                }}
                className="px-4 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-1.5 text-sm text-white rounded-md hover:bg-amber-600 transition"
                style={{ backgroundColor: "#FFA725" }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Column - Profile Info */}
          <div className="md:w-1/3 border-r">
            <div className="p-6 flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                  {userData.profilePicture ? (
                    <img
                      src={`http://localhost:7000${userData.profilePicture}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <span className="text-white text-xs font-medium">Change</span>
                </label>
                <input
                  id="profile-picture"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800">{userData.fullName}</h2>
              <p className="text-gray-500 text-sm mb-4">{userData.email}</p>

              {/* Tabs */}
              <div className="flex w-full border-b">
                <button
                  className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === "timeline" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-600 hover:text-gray-800"}`}
                  style={{ borderColor: activeTab === "timeline" ? "#FFA725" : "", color: activeTab === "timeline" ? "#FFA725" : "" }}
                  onClick={() => setActiveTab("timeline")}
                >
                  Bookings
                </button>
                <button
                  className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === "about" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-600 hover:text-gray-800"}`}
                  style={{ borderColor: activeTab === "about" ? "#FFA725" : "", color: activeTab === "about" ? "#FFA725" : "" }}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
              </div>
            </div>

            {/* Left sidebar content */}
            <div className="px-6 py-4">
              <h3 className="text-xs uppercase text-[#FFA725] font-semibold mb-3">Recent Bookings</h3>

              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking._id} className="p-3 bg-gray-50 rounded-lg">
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
          </div>

          {/* Right Column - Content Area */}
          <div className="md:w-2/3">
            <div className="p-6">
              {activeTab === "about" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Favorite Videos</h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex">
                      <div className="w-24 text-gray-500 text-sm">Email:</div>
                      <div className="flex-1 text-sm">
                        <a href={`mailto:${userData.email}`} className="text-amber-500 hover:underline" style={{ color: "#FFA725" }}>
                          {userData.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-24 text-gray-500 text-sm">Name:</div>
                      <div className="flex-1 text-sm">
                        <p className="text-amber-500" style={{ color: "#FFA725" }}>
                          {userData.fullName}
                        </p>
                      </div>
                    </div>

                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Edit Profile</h3>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "timeline" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Your Bookings</h3>

                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">You have no bookings yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition">
                          <div className="flex justify-between items-start">
                          
                            <div>
                              <h4 className="font-semibold">{booking.expertId?.userId?.fullName || "Expert"}</h4>
                              <p className="text-sm text-gray-500">{booking.expertId?.skills.join(', ')}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-amber-100 text-amber-800'
                              }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{booking.preferredTime}</span>
                          </div>

                          {booking.serviceDetails && (
                            <p className="mt-3 text-sm border-t border-gray-100 pt-3">
                              {booking.serviceDetails}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
