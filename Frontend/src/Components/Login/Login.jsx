// import React from "react";
// import { Mail, Lock } from "lucide-react";
// import Video1 from '../Assets/login.mp4';
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//   const navigate = useNavigate(); 

//   const navigateToSignup = () => {
//     navigate("/signup"); 
//   };    
   
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//       <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
//         {/* Left Side - Video Section */}
//         <div className="hidden md:block md:w-1/2 relative">
//           <video
//             src={Video1}
//             className="h-full w-full object-cover"
//             autoPlay
//             loop
//             muted
//           />
//           <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/40">
//             <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
//             <p className="text-lg opacity-90">
//               Sign in to access your personalized experience.
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Form Section */}
//         <div className="w-full md:w-1/2 p-8 md:p-12">
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h3>
//               <p className="text-gray-600">Enter your credentials to continue</p>
//             </div>

//             <form className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="email"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
//                       placeholder="your@email.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                     <input
//                       type="password"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
//                       placeholder="Enter your password"
//                     />
//                   </div>
//                   <div className="flex justify-end mt-2">
//                     <button type="button" className="text-sm text-[#FFA725] hover:text-[#e6951b]">
//                       Forgot password?
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className="w-full bg-[#FFA725] text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#e6951b] transition-all"
//               >
//                 Sign In
//               </button>
//             </form>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-600">Or continue with</span>
//               </div>
//             </div>

//             <button
//               type="button"
//               className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
//             >
//               <img
//                 src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
//                 alt="Google"
//                 className="w-6 h-6"
//               />
//               Google
//             </button>

//             <p className="text-center text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={navigateToSignup}
//                 className="text-[#FFA725] font-semibold hover:text-[#e6951b] transition-all"
//               >
//                 Create Account
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/userSlice";
import logo from '../Assets/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Login failed");
        return;
      }

      const result = await response.json();

      const { token, user } = result;

      // Store both token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        setTimeout(() => navigate("/"), 1200);
      }

      dispatch(setUserId({ userId: user.id, role: user.role }));

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);
      document.cookie = `token=${token};expires=${expires.toUTCString()};path=/;secure`;

      // setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.log(error);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen " style={{ backgroundColor: "#F1F1F1" }}>
      {/* Left side - Background image with cosmic theme */}
      
      <div
        className="hidden lg:flex lg:w-1/2 relative"
        style={{
          background: "linear-gradient(135deg, #21209C 0%, #23120B 100%)",
          backgroundImage:
            "url('https://images.pexels.com/photos/5691521/pexels-photo-5691521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10 flex items-center">
  <div
    className=" rounded-full h-10 w-10 flex items-center justify-center"
    
  >
    <img src= {logo} alt="Logo" className="h-20 w-70" />
  </div>
  <Link to="/" className="ml-2 text-white font-bold text-xl">DIY</Link>
</div>


       {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-24 left-8 right-8 text-white z-10">
  <h1 className="text-4xl font-bold mb-4">
    Unleash Your <span style={{ color: "#FFA725" }}>Creativity</span>
    <br />
    with DIY Projects
  </h1>
  <p className="mb-6 text-lg">
    Join our community of makers and start building, crafting, and innovating
    with easy-to-follow DIY guides.
  </p>
  <div className="flex items-center">
    <div
      className="h-1 w-10 bg-[#FFA725] mr-4"
      style={{ backgroundColor: "#FFA7257" }}
    ></div>
    <span className="text-sm">
      Over 10,000 creators have already joined!
    </span>
  </div>
</div>

      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#23120B" }}>
            Welcome back
          </h2>
          <p className="mb-8" style={{ color: "#23120B" }}>
          Start your creative journey with DIY and build your world!
          </p>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                style={{ color: "#23120B" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border rounded-md outline-none focus:ring-2"
                style={{ borderColor: "#21209C", focusRing: "#FDB827" }}
                required
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium"
                style={{ color: "#23120B" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border rounded-md outline-none focus:ring-2"
                  style={{ borderColor: "#21209C", focusRing: "#FDB827" }}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={toggleShowPassword}
                  style={{ color: "#21209C" }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md font-medium text-white transition-colors"
              style={{ backgroundColor: "#FFA725" }}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#23120B" }}>
              Or continue with
            </p>

            <div className="mt-4">
              <button
                className="w-full py-3 border rounded-md flex items-center justify-center"
                style={{ borderColor: "#21209C" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Sign in with Google
              </button>
            </div>

            <p className="mt-8 text-sm" style={{ color: "#23120B" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium"
                style={{ color: "#21209C" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
