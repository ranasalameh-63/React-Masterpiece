import React, { useState } from "react";
import { 
  CheckCircle,
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  HandHeart, 
  Building,
  Send
} from "lucide-react";

export default function Contact() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to manage the success/error message after form submission
  const [status, setStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null); // Clear any previous status

    try {
      // Simulating the original API call (commented out for demo)
      // const response = await axios.post("http://localhost:7000/api/contact/add", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If the request is successful
      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      // Reset the form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      // If the request fails
      setStatus({
        type: "error",
        message: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="bg-[#FFA725] text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4 ">Get In Touch</h1>
          <p className="text-lg sm:text-xl md:text-1xl opacity-90 max-w-3xl mx-auto">
            Ready to make a difference? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            
            {/* Form Section */}
            <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {/* Display success/error message */}
                {status && (
                  <div className={`p-4 mb-6 rounded-lg border-l-4 ${
                    status.type === "success" 
                      ? "bg-green-50 text-green-700 border-green-400" 
                      : "bg-red-50 text-red-700 border-red-400"
                  }`}>
                    <div className="flex items-center">
                      {status.type === "success" && (
                        <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm sm:text-base">{status.message}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-sm sm:text-base"
                      placeholder="Tell us how you'd like to get involved or any questions you have..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg text-white font-semibold bg-[#FFA725] hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-1 bg-[#FFA725] text-white p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="h-full flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
                  Impact at a Glance
                </h3>

                {/* Stats */}
                <div className="space-y-6 mb-8 flex-grow">
  <div className="flex items-center group">
    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
      <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFA725]" />
    </div>
    <div>
      <h4 className="text-xl sm:text-2xl font-bold">50+</h4>
      <p className="text-orange-100 text-sm sm:text-base">Homeowners helped with repairs annually</p>
    </div>
  </div>

  <div className="flex items-center group">
    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
      <HandHeart className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFA725]" />
    </div>
    <div>
      <h4 className="text-xl sm:text-2xl font-bold">20+</h4>
      <p className="text-orange-100 text-sm sm:text-base">Active DIY repair volunteers</p>
    </div>
  </div>

  <div className="flex items-center group">
    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 sm:mr-4 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
      <Building className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFA725]" />
    </div>
    <div>
      <h4 className="text-xl sm:text-2xl font-bold">15</h4>
      <p className="text-orange-100 text-sm sm:text-base">Video offering DIY solutions</p>
    </div>
  </div>
</div>

                {/* Contact Info */}
                <div className="mt-auto">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Direct Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 mt-1 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFA725]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Phone</p>
                        <p className="text-orange-100 text-sm sm:text-base">0775325828</p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 mt-1 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFA725] " />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Email</p>
                        <p className="text-orange-100 text-sm sm:text-base break-all">contact@buildnest.org</p>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 mr-3 mt-1 group-hover:bg-opacity-30 transition-all duration-200 flex-shrink-0">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFA725]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Address</p>
                        <p className="text-orange-100 text-sm sm:text-base">
                          123 Almadina Street<br />
                          City Name, ZIP 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-gray-50 py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Why Get Involved?</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto">
            Your contribution, whether through volunteering, donations, or simply spreading awareness, 
            creates a ripple effect of positive change in our community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#FFA725]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Community Impact</h3>
              <p className="text-gray-600 text-sm sm:text-base">Make a real difference in people's lives</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-8 h-8 text-[#FFA725]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Personal Growth</h3>
              <p className="text-gray-600 text-sm sm:text-base">Develop new skills and experiences</p>
            </div>
            <div className="text-center p-4 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[#FFA725]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Network Building</h3>
              <p className="text-gray-600 text-sm sm:text-base">Connect with like-minded individuals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}