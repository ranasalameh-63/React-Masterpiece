import React, { useState } from "react";
import { Eye, EyeOff} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/userSlice";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const navigate = useNavigate();
 

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


try {
  const response = await axios.post("http://localhost:7000/api/auth/register", {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
  }, {
    headers: { "Content-Type": "application/json" }
  });

  const result = response.data;
  console.log(response.data);
  console.log(result.user.id);
  dispatch(setUserId(result.user.id));
  setSuccess("Registration successful! Redirecting to Home page...");

// Local storage
  const token = result.token;
  localStorage.setItem("token", result.token);

// Cookies
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60);
  document.cookie = `token=${token};expires=${expires.toUTCString()};path=/;secure`;

  setTimeout(() => navigate("/"), 1500);

} catch (error) {
  console.error(error);
  setError(error.response?.data?.message || "An error occurred while registering. Please try again.");
}

  };

  return (
    <div className="flex h-screen bg-[#F1F1F1] overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-2/5 relative">
        <div className="absolute inset-0 bg-black opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5691531/pexels-photo-5691531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>{/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-between p-8 text-[#F1F1F1]">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#FFA725] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg"></span>
            </div>
            <span className="ml-2 font-semibold text-lg">DIY</span>
          </div>
          <div>
  <h2 className="text-3xl font-bold mb-4 leading-tight">
    Unleash Your <span className="text-[#FFA725]">Creativity</span>
    <br />
    with DIY Projects
  </h2>
  <p className="mb-4 text-[#F1F1F1]/80 text-sm leading-relaxed">
    Join our community of makers and turn your ideas into reality with fun and 
    inspiring DIY projects.
  </p>
  <div className="flex items-center space-x-4 mt-4">
    <div className="w-8 h-1 bg-[#FFA725]"></div>
    <p className="text-xs text-[#F1F1F1]/70">
      Over 10,000 creators have started crafting!
    </p>
  </div>
</div>

          <span className="ml-2 font-semibold text-lg"></span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-3/5 flex flex-col p-4 md:p-0">
        <div className="max-w-md mx-auto w-full px-4 md:px-0 flex flex-col justify-center h-full">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2 text-black">
              Create your account
            </h1>
            <p className="text-s text-black/70">
            Turn your ideas into amazing creations with DIY!
            </p>
          </div>

          {error && (
            <div
              className="p-3 mb-4 text-xs text-black bg-red-100 rounded-lg border-l-4 border-red-500"
              role="alert"
            >
              <p className="font-medium">Registration Error</p>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              className="p-3 mb-4 text-xs text-black bg-green-100 rounded-lg border-l-4 border-green-500"
              role="alert"
            >
              <p className="font-medium">Success!</p>
              <p>{success}</p>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-black/80 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-black/80 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-black/80 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#23120B]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21209C] focus:border-[#21209C] transition-all bg-white text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-black/60 hover:text-black transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-1 text-xs text-black/60">
                Password must be at least 8 characters
              </p>
            </div>

           

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 text-white font-medium rounded-lg transition duration-200 bg-[#FFA725]  focus:ring-4 focus:ring-[#21209C]/30 text-sm"
              >
                Create Account
              </button>
            </div>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#23120B]/10"></div>
              </div>
              
            </div>

           
          </form>

          <div className="text-center mt-3">
            <p className="text-xs text-black/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#21209C] hover:text-[#21209C]/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
