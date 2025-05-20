import { useState, useEffect } from "react";
import axios from "axios";

const ExpertRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experienceYears: '',
    location: '',
    aboutYourself: '',
    skills: {
      carpentry: false,
      plumbing: false,
      electrical: false,
      painting: false
    },
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false
    },
    profileImage: [],
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name.startsWith("skills.")) {
        const skill = name.split(".")[1];
        setFormData((prevState) => ({
          ...prevState,
          skills: { ...prevState.skills, [skill]: checked },
        }));
      } else if (name.startsWith("availability.")) {
        const availType = name.split(".")[1];
        setFormData((prevState) => ({
          ...prevState,
          availability: { ...prevState.availability, [availType]: checked },
        }));
      }
    } else if (name === "profileImage" && files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        profileImage: files[0],
      }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("experienceYears", formData.experienceYears);
    data.append("location", formData.location);
    data.append("aboutYourself", formData.aboutYourself);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);

    const selectedSkills = Object.keys(formData.skills).filter(skill => formData.skills[skill]);
    data.append("skills", JSON.stringify(selectedSkills));

    const selectedAvailability = Object.keys(formData.availability).filter(time => formData.availability[time]);
    data.append("availability", JSON.stringify(selectedAvailability));

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.post("http://localhost:7000/api/expert/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Registration successful! We'll review your application shortly.");
      setError("");
    } catch (error) {
      setError("Error submitting data: " + error.message);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const { password, phone } = formData;
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location || !formData.password || !formData.confirmPassword) {
        setError("Please fill all required fields in Step 1.");
        setSuccess("");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setSuccess("");
        return;
      }
      
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError("Password must be at least 8 characters long and contain at least one letter and one number.");
        setSuccess("");
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        setError("Phone number must be exactly 10 digits.");
        setSuccess("");
        return;
      }
    } else if (step === 2) {
      if (!formData.skills.carpentry && !formData.skills.plumbing && !formData.skills.electrical && !formData.skills.painting) {
        setError("Please select at least one skill in Step 2.");
        setSuccess("");
        return;
      }

      await handleSubmit();
      return;
    }

    setStep(step + 1);
    setError("");
  };

  const prevStep = () => {
    setStep(step - 1);
    setError("");
  };

  const jordanGovernorates = [
    'Amman', 'Irbid', 'Zarqa', 'Balqa', 'Madaba', 'Karak',
    'Tafilah', 'Ma\'an', 'Jerash', 'Ajloun', 'Aqaba', 'Mafraq'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
        {/* Progress bar */}
        <div className="w-full bg-amber-50 p-4">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-200">
                {step === 1 ? "Personal Information" : "Skills & Profile"}
              </div>
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600">
                Step {step} of 2
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
              <div style={{ width: step === 1 ? "50%" : "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        <form className="px-8 py-8" onSubmit={(e) => e.preventDefault()}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-500 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white"
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
                  <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience <span className="text-red-500">*</span></label>
                  <input
                    id="experienceYears"
                    name="experienceYears"
                    type="number"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                  />
                  <p className="text-xs text-gray-500 mt-1">Min. 8 characters with at least one letter and one number</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-500 mb-6">Skills & Expertise</h2>

              <div className="bg-amber-50 p-6 rounded-lg">
                <label className="block text-lg font-medium text-amber-500 mb-4">Which services can you provide? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Object.keys(formData.skills).map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        id={`skills.${skill}`}
                        name={`skills.${skill}`}
                        type="checkbox"
                        checked={formData.skills[skill]}
                        onChange={handleChange}
                        className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`skills.${skill}`} className="ml-3 block text-sm text-gray-700 capitalize">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <label className="block text-lg font-medium text-amber-500 mb-4">When are you available? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(formData.availability).map((availType) => (
                    <div key={availType} className="flex items-center">
                      <input
                        id={`availability.${availType}`}
                        name={`availability.${availType}`}
                        type="checkbox"
                        checked={formData.availability[availType]}
                        onChange={handleChange}
                        className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`availability.${availType}`} className="ml-3 block text-sm text-gray-700 capitalize">
                        {availType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-700 mb-1">Tell us about yourself and your experience <span className="text-red-500">*</span></label>
                <textarea
                  id="aboutYourself"
                  name="aboutYourself"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                  placeholder="Describe your experience, specialties, and why clients should choose you..."
                ></textarea>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-amber-800 mb-4">Profile Image</h3>
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-amber-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <label htmlFor="profileImage" className="cursor-pointer bg-white border border-amber-500 text-amber-600 px-4 py-2 rounded-md hover:bg-amber-50 transition-colors">
                    Upload Photo
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended: Square image, at least 300x300px</p>
                </div>
              </div>
            </div>
          )}

          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    {success}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={nextStep}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg bg-[#FFA725] hover:bg-amber-500 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${step === 1 ? 'ml-auto' : ''} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                step === 2 ? "Submit Application" : "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpertRegistrationForm;
