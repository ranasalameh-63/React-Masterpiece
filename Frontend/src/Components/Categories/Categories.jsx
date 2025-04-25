import React from 'react';
import { Link } from 'react-router-dom';
import Card1 from '../Assets/card1.jpeg'
import Card2 from '../Assets/card2.jpeg'
import Card3 from '../Assets/card3.jpg'
import Card4 from '../Assets/card4.jpeg'


const Categories = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 opacity-70"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-6">
              Learn to Fix it – One Video at a Time!
            </h1>
            <p className="text-xl  text-gray-800 mb-8">
              Explore our library of step-by-step video tutorials covering everything from simple repairs to complex fixes.
            </p>
            <p className="text-lg text-[#FFA725] mb-10">
              Watch, learn, and take action with confidence – your home repair journey starts here!
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
              Start Learning Now
            </button>
          </div>
        </div>
        {/* Decorative DIY tools pattern overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Popular Repair Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 - Electrical */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/21812146/pexels-photo-21812146/free-photo-of-electrician-in-helmet-working-with-cables.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Electrical repairs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Electrical</h3>
              <p className="text-gray-600 mb-4">Fix wiring issues, outlets, and lighting problems with our expert tutorials.</p>
              <Link
                to={`/category/Electrical`}
                className="inline-block py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-300"
              >
                All Videos
              </Link>

            </div>
          </div>

          {/* Card 2 - Plumbing */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/a4/ec/b4/a4ecb4f713272ef6b592cc16348b8621.jpg"
                alt="Plumbing repairs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Plumbing</h3>
              <p className="text-gray-600 mb-4">Repair leaks, pipes, and bathroom fixtures with step-by-step guidance.</p>
              <Link
                to={`/category/Plumbing`}
                className="inline-block py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-300"
              >
                All Videos
              </Link>

            </div>
          </div>

          {/* Card 3 - Carpentry */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5089149/pexels-photo-5089149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Carpentry repairs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Carpentry</h3>
              <p className="text-gray-600 mb-4">Handle wood repairs, furniture fixes, and installations like a pro.</p>
              <Link
                to={`/category/Carpentry`}
                className="inline-block py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-300"
              >
                All Videos
              </Link>

            </div>
          </div>

          {/* Card 4 - Painting */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6474483/pexels-photo-6474483.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Painting tutorials"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Painting</h3>
              <p className="text-gray-600 mb-4">Learn to paint walls, touch up, and refresh surfaces with perfect results.</p>
              <Link
                to={`/category/Painting`}
                className="inline-block py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-300"
              >
                All Videos
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Learn With Us?</h2>
              <p className="text-gray-600 mb-6">Our step-by-step video tutorials make DIY home repairs accessible to everyone, regardless of experience level.</p>

              <ul className="space-y-4">
                {[
                  "Expert instructors with years of professional experience",
                  "Detailed close-ups of techniques and proper tool usage",
                  "Material lists and time estimates for each project",
                  "Community forum to get your questions answered"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                Browse All Categories
              </button>
            </div>

            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Video placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                  <iframe
                    className="w-full h-90 object-cover"
                    src="https://www.youtube.com/embed/SYPFon69vKs?start=8&autoplay=1&mute=1&loop=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>

                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">Most Popular: Fixing a Leaky Faucet</h3>
                  <p className="text-gray-200">12-minute tutorial • 1.2M views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-[#FFA725] mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Become a DIY Master?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of homeowners who have saved money and gained confidence through our video tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-amber-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;