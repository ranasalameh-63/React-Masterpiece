import React, { useState } from 'react';

const Expert = () => {
  const [formData, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    experience: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const jordanGovernorates = [
    'Amman',
    'Irbid',
    'Zarqa',
    'Balqa',
    'Madaba',
    'Karak',
    'Tafilah',
    'Ma\'an',
    'Jerash',
    'Ajloun',
    'Aqaba',
    'Mafraq'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" w-190 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 py-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-wide">
              DIY Expert Registration
            </h2>
            <p className="mt-2 text-white">Join our community of skilled DIY professionals</p>
          </div>
        </div>
        
        <form className="px-8 py-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="expert@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-800">
              Years of Experience
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              min="0"
              required
              className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="5"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-800">
              Location
            </label>
            <select
              id="location"
              name="location"
              required
              className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="" disabled>Select a governorate</option>
              {jordanGovernorates.map((governorate) => (
                <option key={governorate} value={governorate}>
                  {governorate}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-1 bg-amber-500 mr-3" />
            <span className="text-sm text-gray-500">Your skills</span>
            <div className="flex-grow h-1 bg-amber-500 ml-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {['Carpentry', 'Plumbing', 'Electrical', 'Painting'].map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  id={skill.toLowerCase()}
                  name={skill.toLowerCase()}
                  type="checkbox"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor={skill.toLowerCase()} className="ml-2 block text-sm text-gray-800">
                  {skill}
                </label>
              </div>
            ))}
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-amber-300 group-hover:text-amber-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Register as Expert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Expert;