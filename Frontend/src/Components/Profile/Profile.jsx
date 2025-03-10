import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header with New Color Scheme */}
        <div className="relative h-48 bg-[#FFA725]">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src="/api/placeholder/150/150"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute bottom-0 right-0 bg-[#FFA725] text-white p-2 rounded-full shadow-lg cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 px-8 pb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            User Profile
          </h1>
          
          {/* User Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-[#FFA725] transition-colors bg-gray-50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-[#FFA725] transition-colors bg-gray-50"
                placeholder="(123) 456-7890"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-[#FFA725] transition-colors bg-gray-50"
                placeholder="123 DIY Street"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-[#FFA725] transition-colors bg-gray-50"
                placeholder="Craftville"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button className="flex items-center px-6 py-2 bg-[#FFA725] hover:bg-[#E69420] text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Changes
            </button>

           
          </div>

          {/* Project History Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
             Watched History
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-[#FFA725]">
                <p className="text-gray-800">
                  <strong>Video Name:</strong> Handmade Bookshelf
                </p>
                <p className="text-gray-800">
                  <strong>Watched in:</strong> January 15, 2025
                </p>
               
                <button className="mt-2 bg-[#FFA725] hover:bg-[#E69420] text-white px-4 py-2 rounded-lg transition-all duration-200">
                  View Video
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm border-l-4 border-[#FFA725]">
                <p className="text-gray-800">
                  <strong>Video Name:</strong> Upcycled Coffee Table
                </p>
                <p className="text-gray-800">
                  <strong>Watched in:</strong> February 3, 2025
                </p>
                
                <button className="mt-2 bg-[#FFA725] hover:bg-[#E69420] text-white px-4 py-2 rounded-lg transition-all duration-200">
                  View Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;