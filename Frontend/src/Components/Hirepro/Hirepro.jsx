import React from 'react';
import Assistant from '../Assets/assis.png'

const Hirepro = () => {
  const professionals = [
    {
      name: "Ahmad sarrawi",
      location: "Irbid",
      occupation: "Electrician expert",
      experience: "+7 Years of experience",
      href: "booking"
    },
    {
      name: "Majd altelawy",
      location: "Amman",
      occupation: "Carpenter",
      experience: "+3 Years of experience",
      href: "#"
    },
    {
      name: "Samer alali",
      location: "Amman",
      occupation: "Machinist",
      experience: "+8 Years of experience",
      href: "#"
    },
    {
      name: "Ala'a Issa",
      location: "Zarqa",
      occupation: "Painter",
      experience: "+6 Years of experience",
      href: "#"
    },
    {
      name: "Baha'a almasri",
      location: "Ma'an",
      occupation: "Electrician expert",
      experience: "+9 Years of experience",
      href: "#"
    },
    {
      name: "Omar azzam",
      location: "Zarqa",
      occupation: "Electrician expert",
      experience: "+1 Years of experience",
      href: "#"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 ml-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-3/5 pr-0 lg:pr-12 mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
                Easy to <span className="text-[#FFA725]">Hire</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">
                Talented Assistant to help you
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Not every repair can be handled alone – and that's okay! Our trusted network of skilled
                professionals is here to assist with any home fix, big or small you can easily book an expert to get the job done right.
                Fast, reliable, and stress-free – let's get your home back in top shape!
              </p>

              <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="md:w-2/5">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                    />
                  </div>
                  <div className="md:w-2/5">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent">
                      <option>Electrician expert</option>
                      <option>Plumber</option>
                      <option>Carpenter</option>
                      <option>Painter</option>
                    </select>
                  </div>
                  <button className="md:w-1/5 bg-[#FFA725] hover:bg-[#E89620] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5 flex items-center justify-center mb-25 hidden md:block">
              <div className="relative w-full max-h-96">
                <img
                  src={Assistant}
                  alt="Professional service worker"
                  className="relative z-10 w-full max-h-100 object-contain rounded-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Professionals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Professional Experts</h2>
            <div className="w-20 h-1 bg-[#FFA725] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Browse our network of skilled professionals ready to help with any home improvement project
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((professional, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFA725] bg-opacity-20 flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{professional.name}</h3>
                  <div className="flex items-center justify-center text-gray-600 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#FFA725]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {professional.location}
                  </div>
                  <div className="text-center text-[#FFA725] font-medium mb-1">{professional.occupation}</div>
                  <div className="text-center text-gray-600 text-sm mb-4">{professional.experience}</div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <a
                    href={professional.href}
                    className="block w-full text-center bg-white border-2 border-[#FFA725] text-[#FFA725] hover:bg-[#FFA725] hover:text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Book now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hirepro;