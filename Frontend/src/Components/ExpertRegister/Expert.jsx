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
    } else if (name === "profileImage") {
      setFormData((prevState) => ({
        ...prevState,
        profileImage: files[0],
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      setSuccess("Data submitted successfully!");
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error submitting data: " + error.message);
      setSuccess(""); // Clear any previous success messages
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const {password, phone } = formData;
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.location || !formData.password || !formData.confirmPassword) {
        setError("Please fill all required fields in Step 1.");
        setSuccess(""); // Clear any previous success messages
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setSuccess(""); // Clear any previous success messages
        return;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and contain at least one letter and one number.");
      setSuccess(""); // Clear any previous success messages

      return;
    }

    // تحقق من رقم الهاتف
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      setSuccess(""); // Clear any previous success messages

      return;
    }
    } else if (step === 2) {
      if (!formData.skills.carpentry && !formData.skills.plumbing && !formData.skills.electrical && !formData.skills.painting) {
        setError("Please select at least one skill in Step 2.");
        setSuccess(""); // Clear any previous success messages
        return;
      }

      await handleSubmit();
      return; // Prevent further execution
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const jordanGovernorates = [
    'Amman', 'Irbid', 'Zarqa', 'Balqa', 'Madaba', 'Karak',
    'Tafilah', 'Ma\'an', 'Jerash', 'Ajloun', 'Aqaba', 'Mafraq'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <form className="px-8 py-8" onSubmit={handleSubmit} style={{ minWidth: '500px' }}>
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
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
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
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
                  <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    id="experienceYears"
                    name="experienceYears"
                    type="number"
                    min="0"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                    value={formData.experienceYears}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Skills & Expertise</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Skills</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
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
                      <label htmlFor={`availability.${availType}`} className="ml-2 block text-sm text-gray-700 capitalize">
                        {availType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-700">Tell Me about Yourself</label>
                <input
                  id="aboutYourself"
                  name="aboutYourself"
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring focus:ring-amber-500 focus:border-amber-500"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Upload Profile Image</h3>
                <div className="flex justify-center items-center">
                  <label htmlFor="profileImage" className="cursor-pointer relative">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex justify-center items-center">
                      {!formData.profileImage ? (
                        <span className="text-gray-500 text-3xl">+</span>
                      ) : (
                        <img
                          src={formData.profileImage}
                          alt="profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Error and Success Messages */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-md bg-gray-300 text-gray-700"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 rounded-md  bg-amber-600 hover:bg-amber-700 text-white"
            >
              {step === 2 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpertRegistrationForm;
