
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Zap, Award } from 'lucide-react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from "../Loader/Loader";


const Booking = () => {
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    serviceDetails: ''
  });
  const [message, setMessage] = useState('');

  const [userData, setUserData] = useState(null);
  const [expertData, setExpertData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.userId);
  const { expertId } = useParams();
  const currentDate = new Date().toISOString().split('T')[0];
  console.log("expertId"+ expertId);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userId) {
          const userResponse = await axios.get(`http://localhost:7000/api/user/details/${userId}`);
          setUserData(userResponse.data);
          console.log(userResponse.data);
        }

        if (expertId) {
          const expertResponse = await axios.get(`http://localhost:7000/api/expert/get/${expertId}`);
          setExpertData(expertResponse.data.expertData);
          console.log(expertResponse.data.expertData);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, expertId]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
      console.log("lllll", expertData);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const buttonPressed = e.nativeEvent.submitter.name;
    let bookingType = "session";

    if (buttonPressed === "home") {
      bookingType = "home";
    }

    if (!expertData) {
      setMessage({ type: 'error', text: 'Expert ID is required' });
      return;
    }

    try {
      const token = getCookie("token");
      console.log("lllll", expertData.expertId);
      const response = await axios.post(
        'http://localhost:7000/api/booking/create',
        {
          ...formData,
          userId,
          expertId: expertId, 
          bookingType
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: 'success', text: response.data.message });
      setFormData({
        preferredDate: '',
        preferredTime: '',
        serviceDetails: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' });
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Two-column layout for larger screens */}
        <div className="flex flex-col md:flex-row">
          {/* Expert profile section */}
          <div className="md:w-2/5 bg-gradient-to-br from-amber-500 to-amber-600 text-white p-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6">
                <img
                  src={
                    expertData.profileImage
                      ? `http://localhost:7000${expertData.profileImage}`
                      : "/images/default-news.jpg"
                  }
                  alt={expertData.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-center">{expertData.fullName}</h3>

              <div className="w-16 h-1 bg-white bg-opacity-30 rounded-full mb-6"></div>

              <div className="space-y-4 w-full">
                <div className="flex items-center bg-white text-black bg-opacity-10 p-3 rounded-lg">
                  <MapPin size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm">{expertData.location}</span>
                </div>

                <div className="flex items-center bg-white text-black bg-opacity-10 p-3 rounded-lg">
                  <Zap size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm">{expertData.skills.join(', ')}</span>
                </div>

                <div className="flex items-center bg-white text-black bg-opacity-10 p-3 rounded-lg">
                  <Award size={18} className="mr-3 flex-shrink-0" />
                  <span className="text-sm">+{expertData.experienceYears} Years of Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking form section */}
          <div className="md:w-3/5 p-8">
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="mr-3 text-amber-500" size={24} />
              Schedule Your Appointment
            </h4>

            {message && (
              <div
                className={`p-4 mb-6 rounded-lg flex items-center ${message.type === 'success'
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                  : 'bg-red-50 text-red-700 border-l-4 border-red-500'
                  }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {message.text}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="preferredDate" className="block text-gray-600 text-sm font-medium mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50"
                      required
                      min={currentDate}
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-gray-600 text-sm font-medium mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition appearance-none bg-gray-50"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 8PM)</option>
                    </select>
                    <Clock size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="serviceDetails" className="block text-gray-600 text-sm font-medium mb-2">
                  Service Details
                </label>
                <textarea
                  id="serviceDetails"
                  name="serviceDetails"
                  value={formData.serviceDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-gray-50"
                  rows="4"
                  placeholder="Please describe your electrical issue or service needed"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="submit"
                  name="session"
                  className="w-full px-6 py-4 bg-amber-500 text-white rounded-lg cursor-pointer hover:bg-amber-600 transition duration-300 shadow-md flex justify-center items-center font-medium"
                >
                  <Calendar size={18} className="mr-2" />
                  Book a session
                </button>

                <button
                  type="submit"
                  name="home"
                  className="w-full px-6 py-4 bg-white text-amber-400 border-2 rounded-lg cursor-pointer transition duration-300 shadow-md flex justify-center items-center font-medium"
                >
                  <Calendar size={18} className="mr-2" />
                  Book in Home
                </button>
              </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
