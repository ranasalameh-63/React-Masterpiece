import React, { useState, useEffect } from "react";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUserId } from "../../Redux/userSlice"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (userId) {
      const token = getCookie("token");
      axios.get(`http://localhost:7000/api/user/details/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);
  

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  };

const handleLogout = () => {
  deleteCookie("token");

  dispatch(clearUserId());
  navigate("/");
};

  

  const defaultLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Hire Pro", href: "/hirepro" },
    { name: "AI Assistant", href: "/ai" },
  ];

  const roleBasedLinks = [];
  if (userRole === "admin") {
    roleBasedLinks.push({ name: "Dashboard", href: "/admin" });
  }
  if (userRole === "expert") {
    roleBasedLinks.push({ name: "Add Video", href: "/addVideoForm" });
  }
  if (userRole === "user") {
    roleBasedLinks.push({ name: "Join Us", href: "/expertPage" });
  }

  useEffect(() => {
    if (location.pathname === "/login" && userRole) {
      if (userRole === "expert") {
        navigate("/expertProfile");
      } else {
        navigate("/userProfile");
      }
    }
  }, [userRole, navigate, location.pathname]);
  


  const navLinks = [...defaultLinks, ...roleBasedLinks];
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-[#FFA725] font-serif">BuildNest</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#FFA725] hover:text-black transition-colors focus:outline-none">
              {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-2 py-1 text-s font-medium transition-colors ${isActive(link.href)
                  ? 'text-[#FFA725] border-b-2 border-[#FFA725]'
                  : 'text-[#FFA725] hover:text-black'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-6 relative">

            {userId ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-[#FFA725] hover:text-black focus:outline-none"
                >
                  <User className="h-6 w-6" />
                  <span>{userData?.name || "Profile"}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
                    <Link
                        to={userRole === "expert" ? `/expertProfile/${userId}` : "/userProfile"}
                        className="block px-4 py-2 text-sm text-[#FFA725] cursor-pointer hover:bg-gray-100 hover:text-black"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/about"
                      className="block px-4 py-2 text-sm text-[#FFA725] cursor-pointer hover:bg-gray-100 hover:text-black"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm text-[#FFA725] cursor-pointer hover:bg-gray-100 hover:text-black"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 cursor-pointer text-sm text-[#FFA725] hover:bg-gray-100 hover:text-black"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 border border-[#FFA725] rounded-md text-[#FFA725] hover:bg-[#FFA725] hover:text-white transition">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu (unchanged) */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-2 px-3 text-base font-medium rounded-md ${isActive(link.href)
                  ? 'text-[#FFA725] bg-gray-100'
                  : 'text-[#FFA725] hover:bg-gray-100 hover:text-black'
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 flex items-center justify-between px-3">


              {userId ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-[#FFA725] hover:text-black space-x-2"
                  >
                    <User className="h-6 w-6" />
                    <span>{userData?.name || "Profile"}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
                      <Link
                        to={userRole === "expert" ? `/expertProfile/${userId}` : "/user-profile"}
                        className="block px-4 py-2 text-sm text-[#FFA725] hover:bg-gray-100 hover:text-black"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#FFA725] hover:bg-gray-100 hover:text-black"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="block py-2 px-3 text-base font-medium text-white bg-[#FFA725] rounded-md text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
