import React, { useState } from "react";
import { User, Mail, Lock, Camera, Phone } from "lucide-react";
import Video1 from '../Assets/login.mp4'

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-200  flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

         {/* Left Side - Video Section */}
         <div className="hidden md:block md:w-1/2 relative">
          <video
            src={Video1}
            alt="Luxury Villa"
            className="h-200 w-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/30">
            <h2 className="text-4xl font-bold mb-6">
              {isRegister ? "Start Your Journey" : "Welcome Back"}
            </h2>
            <p className="text-lg opacity-90">
              {isRegister
                ? "Create your account and join our community today."
                : "Sign in to access your personalized experience."}
            </p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {isRegister ? "Create Account" : "Sign In"}
              </h3>
              <p className="text-gray-800">
                {isRegister ? "Fill in your details to get started" : "Enter your information"}
              </p>
            </div>

            <form className="space-y-6">
             

              <div className="space-y-4">
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                          placeholder="+96200 0000 000"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

               
              </div>

              <button
                type="button"
                className="w-full bg-[#FFA725] text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#e6951b] transition-all"
              >
                {isRegister ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-800">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="w-6 h-6"
              />
              Google
            </button>

            <p className="text-center text-gray-800">
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#FFA725] font-semibold hover:text-[#e6951b] transition-all"
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
