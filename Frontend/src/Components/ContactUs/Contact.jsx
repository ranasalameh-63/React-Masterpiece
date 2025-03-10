import React from "react";
import {
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaHandsHelping,
  FaBuilding,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col mb-30 pt-13">
      <div className="max-w-6xl w-full mx-auto px-6 mt-20 mb-20">
        <div className="bg-white rounded-lg shadow-xl shadow-gray-400 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="p-8 md:p-10 col-span-3 border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-2xl font-bold mb-8  text-gray-800">
                Send Us a Message
              </h2>

              <form className="space-y-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#FFA725]">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="block w-145 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA725]"
                      placeholder="Your first name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#FFA725]">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA725]"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#FFA725]">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA725]"
                    placeholder="Tell us how you'd like to get involved..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-md text-white font-medium bg-[#FFA725] hover:bg-[#ffb84d] focus:outline-none focus:ring-2 focus:ring-[#FFA725]"
                  >
                    Send Your Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="col-span-2 p-8 md:p-10 bg-gray-50">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                How Your Contribution Helps
              </h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#ffecd1]">
                    <FaUsers className="w-6 h-6 text-[#FFA725]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFA725]">5,000+</h4>
                    <p className="text-sm text-gray-800">
                      People helped annually
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#ffecd1]">
                    <FaHandsHelping className="w-6 h-6 text-[#FFA725]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFA725]">200+</h4>
                    <p className="text-sm text-gray-800">Active volunteers</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#ffecd1]">
                    <FaBuilding className="w-6 h-6 text-[#FFA725]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FFA725]">15</h4>
                    <p className="text-sm text-gray-800">Community centers</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Contact Us
                  </h3>
                  <div className="space-y-3 text-gray-800">
                    <div className="flex items-start">
                      <FaPhone className="w-5 h-5 mt-1 mr-3 text-[#FFA725]" />
                      <span>(123) 456-7890</span>
                    </div>

                    <div className="flex items-start">
                      <HiOutlineMail className="w-5 h-5 mt-1 mr-3 text-[#FFA725]" />
                      <span>contact@diy.org</span>
                    </div>

                    <div className="flex items-start">
                      <FaMapMarkerAlt className="w-5 h-5 mt-1 mr-3 text-[#FFA725]" />
                      <span>
                        123 Almadina Street
                        <br />
                        City Name, ZIP 12345
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}