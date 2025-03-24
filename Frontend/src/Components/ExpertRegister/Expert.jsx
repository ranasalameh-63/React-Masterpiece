import React, { useState } from 'react';

const ExpertRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    bio: '',
    skills: {
      carpentry: false,
      plumbing: false,
      electrical: false,
      painting: false,
      tiling: false,
      drywall: false,
      flooring: false,
      landscaping: false
    },
    specialties: [],
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false
    },
    hourlyRate: '',
    portfolio: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.startsWith('skills.')) {
        const skill = name.split('.')[1];
        setFormData({
          ...formData,
          skills: {
            ...formData.skills,
            [skill]: checked
          }
        });
      } else if (name.startsWith('availability.')) {
        const availType = name.split('.')[1];
        setFormData({
          ...formData,
          availability: {
            ...formData.availability,
            [availType]: checked
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, value]
      });
    } else {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter(specialty => specialty !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Registration successful! We will review your application and contact you soon.');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const jordanGovernorates = [
    'Amman', 'Irbid', 'Zarqa', 'Balqa', 'Madaba', 'Karak',
    'Tafilah', 'Ma\'an', 'Jerash', 'Ajloun', 'Aqaba', 'Mafraq'
  ];

  const specialtiesList = [
    'Kitchen Renovation', 'Bathroom Remodeling', 'Furniture Making', 
    'Home Automation', 'Outdoor Structures', 'Emergency Repairs'
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
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
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                About Yourself
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                placeholder="Tell us about your experience and passion for DIY..."
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">Brief description of your background and expertise</p>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Skills & Expertise</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Skills
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.keys(formData.skills).map((skill) => (
                  <div key={skill} className="flex items-center">
                    <input
                      id={`skills.${skill}`}
                      name={`skills.${skill}`}
                      type="checkbox"
                      checked={formData.skills[skill]}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`skills.${skill}`} className="ml-2 block text-sm text-gray-700 capitalize">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {specialtiesList.map((specialty) => (
                  <div key={specialty} className="flex items-center">
                    <input
                      id={specialty.toLowerCase().replace(/\s+/g, '-')}
                      name="specialty"
                      type="checkbox"
                      value={specialty}
                      checked={formData.specialties.includes(specialty)}
                      onChange={handleSpecialtyChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label 
                      htmlFor={specialty.toLowerCase().replace(/\s+/g, '-')} 
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {specialty}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(formData.availability).map((availType) => (
                  <div key={availType} className="flex items-center">
                    <input
                      id={`availability.${availType}`}
                      name={`availability.${availType}`}
                      type="checkbox"
                      checked={formData.availability[availType]}
                      onChange={handleChange}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label 
                      htmlFor={`availability.${availType}`} 
                      className="ml-2 block text-sm text-gray-700 capitalize"
                    >
                      {availType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                Hourly Rate (JOD)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">JD</span>
                </div>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="0.5"
                  className="pl-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  placeholder="25"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Portfolio & Final Steps</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Personal image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
                    >
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <h4 className="text-base font-medium text-gray-800 mb-3">Review Your Information</h4>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">Personal Details</p>
                  <ul className="mt-1 text-sm text-gray-500">
                    <li>Name: {formData.firstName} {formData.lastName}</li>
                    <li>Email: {formData.email}</li>
                    <li>Phone: {formData.phone || 'Not provided'}</li>
                    <li>Location: {formData.location || 'Not selected'}</li>
                    <li>Experience: {formData.experience} years</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600">Professional Details</p>
                  <ul className="mt-1 text-sm text-gray-500">
                    <li>Skills: {Object.entries(formData.skills)
                      .filter(([_, value]) => value)
                      .map(([skill]) => skill)
                      .join(', ') || 'None selected'}</li>
                    <li>Specialties: {formData.specialties.join(', ') || 'None selected'}</li>
                    <li>Rate: {formData.hourlyRate ? `JD ${formData.hourlyRate}/hour` : 'Not provided'}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-amber-600 hover:underline">terms and conditions</a> and <a href="#" className="text-amber-600 hover:underline">privacy policy</a>
              </label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1 text-gray-500">
                {stepNumber === 1 ? 'Personal' : 
                 stepNumber === 2 ? 'Skills' : 'Portfolio'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className={`h-1 ${step >= 2 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
          <div className={`h-1 ${step >= 3 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              DIY Expert Registration
            </h2>
            <p className="mt-2 text-white">Share your skills with homeowners in Jordan</p>
          </div>
        </div>
        
        <form className="px-8 py-8" onSubmit={handleSubmit}>
          {renderProgressBar()}
          {renderStep()}
          
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className={`${step > 1 ? '' : 'ml-auto'} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpertRegistrationForm;