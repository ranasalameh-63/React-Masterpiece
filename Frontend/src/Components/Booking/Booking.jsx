import React from 'react';
import { Calendar, Clock, MapPin, Zap, Award } from 'lucide-react';

const Booking = () => {
  return (
    <div className="container mx-auto p-4 w-200 pt-20 mb-20">
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-6 text-white">
          <h3 className="text-2xl font-bold text-center mb-3">Ahmad Sarrawi</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>Irbid</span>
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-1" />
              <span>Electrician Expert</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-1" />
              <span>+7 Years Experience</span>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-center text-gray-800 mb-6 flex items-center justify-center">
            <Calendar className="mr-2 text-amber-500" size={20} />
            Book an Appointment
          </h4>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-800 mb-2 font-medium">Your Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" 
                id="name" 
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-800 mb-2 font-medium">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" 
                id="email" 
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-gray-800 mb-2 font-medium">Preferred Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" 
                    id="date" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-gray-800 mb-2 font-medium">Preferred Time</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition appearance-none" 
                    id="time"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                  </select>
                  <Clock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-gray-800 mb-2 font-medium">Service Details (Optional)</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" 
                id="notes" 
                rows="3"
                placeholder="Please describe your electrical issue or service needed"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition duration-300 shadow-md flex justify-center items-center font-medium"
                  style={{ backgroundColor: "#FFA725" }}
                >
                  <Calendar size={18} className="mr-2" />
                  Book a Session
                </button>
                
                <button 
                  type="button" 
                  className="flex-1 px-6 py-3 border-2 border-amber-500 text-amber-500 rounded-lg hover:bg-amber-50 transition duration-300 flex justify-center items-center font-medium"
                  style={{ borderColor: "#FFA725", color: "#FFA725" }}
                >
                  <MapPin size={18} className="mr-2" />
                  Book in Home
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;