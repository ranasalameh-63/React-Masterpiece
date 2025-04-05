import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Zap, Award } from 'lucide-react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


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
  const { id } = useParams();



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        if (userId) {
          const userResponse = await axios.get(`http://localhost:7000/api/user/details/${userId}`);
          setUserData(userResponse.data);
        }
  
        if (id) {  
          const expertResponse = await axios.get(`http://localhost:7000/api/expert/get/${id}`);
          setExpertData(expertResponse.data.expertData);
        }
  
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, [userId, id]); 
  
  
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expertData) {
      setMessage({ type: 'error', text: 'Expert ID is required' });
      return;
    }
  
    try {
      const token = getCookie("token");
      const response = await axios.post(
        'http://localhost:7000/api/booking/create',
        {
          ...formData,
          userId,
          expertId:expertData.expertId, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: 'success', text: response.data.message });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'An error occurred' });
    }
  };
   if (loading){
    return <div> Loading...</div>
   }

  return (
    <div className="container mx-auto p-4 w-200 pt-20 mb-20">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-6 text-white">
        <div className="w-30 h-30 rounded-full bg-opacity-20 flex items-center justify-center mb-4 mx-auto">
                    <img
                      src={
                        expertData.profileImage
                          ? `http://localhost:7000${expertData.profileImage}`
                          : "/images/default-news.jpg"
                      }
                      alt="hello"
                      className="w-full h-full object-cover"
                    />
                  </div>
          <h3 className="text-2xl font-bold text-center mb-3">{expertData.fullName}</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{expertData.location}</span>
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-1" />
              <span>{expertData.skills.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-1" />
              <span>+{expertData.experienceYears} Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-center text-gray-800 mb-6 flex items-center justify-center">
            <Calendar className="mr-2 text-amber-500" size={20} />
            Book an Appointment
          </h4>

          {message && (
            <div className={`text-center p-3 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} mb-4`}>
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
           

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-gray-800 mb-2 font-medium">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-gray-800 mb-2 font-medium">Preferred Time</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition appearance-none"
                  required
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 4PM)</option>
                  <option value="evening">Evening (4PM - 8PM)</option>
                </select>
                <Clock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="serviceDetails" className="block text-gray-800 mb-2 font-medium">Service Details</label>
              <textarea
                id="serviceDetails"
                name="serviceDetails"
                value={formData.serviceDetails}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                rows="3"
                placeholder="Please describe your electrical issue or service needed"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300 shadow-md flex justify-center items-center font-medium"
                style={{ backgroundColor: "#FFA725" }}
              >
                <Calendar size={18} className="mr-2" />
                Book a Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
