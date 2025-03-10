import React from 'react';
import { Link } from "react-router-dom";

function ApplyAsAssiss() {
  return (
    <div className="w-full px-8 py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-4xl md:text-3xl font-extrabold text-gray-800 mb-6 leading-tight">
          Share Your Expertise & Help Homeowners
        </h2>

        <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 mb-10">
          Are you a skilled contractor, experienced DIYer, or home repair specialist? 
          Join our platform to provide valuable guidance, share your knowledge, and 
          connect with homeowners who need your expertise.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFA725]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Profile</h3>
    <p className="text-gray-600">Get a verified expert badge after our review process to build trust with homeowners.</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFA725]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Schedule</h3>
    <p className="text-gray-600">Choose when and how you want to help, whether it's virtual consultations or in-person visits.</p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFA725]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Earn Rewards</h3>
    <p className="text-gray-600">Get compensated for your expertise through our fair payment system and incentive program.</p>
  </div>
</div>


        <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to="/expertPage"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 bg-[#FFA725] px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            <span>Apply as an Expert</span>
            <svg
              className="h-5 w-5 rtl:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L15.586 10l-3.293-3.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          
         
        </div>
      </div>
    </div>
  );
}

export default ApplyAsAssiss;