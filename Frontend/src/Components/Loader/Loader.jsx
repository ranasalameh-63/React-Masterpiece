import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-5">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner animation */}
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-[#FFA725] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute top-1 left-1 right-1 bottom-1 rounded-full border-4 border-r-[#FFA725] border-t-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-b-[#FFA725] border-t-transparent border-r-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-800">Loading</h3>
          <div className="flex justify-center mt-2">
            <span className="w-2 h-2 bg-[#FFA725] rounded-full mx-1 animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-[#FFA725] rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-[#FFA725] rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;