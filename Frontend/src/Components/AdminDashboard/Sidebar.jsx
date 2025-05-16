import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: "/admin/statistics", label: "Statistics", icon: "chart-bar" },
    { path: "/admin/users", label: "Users", icon: "users" },
    { path: "/admin/experts", label: "Experts", icon: "briefcase" },
    { path: "/admin/bookings", label: "Bookings", icon: "calendar" },
    { path: "/admin/payments", label: "Payments", icon: "credit-card" },
    { path: "/admin/contact-messages", label: "Contact Messages", icon: "mail" },
    { path: "/admin/profile", label: "Profile", icon: "user" }
  ];

  // Toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Toggle sidebar collapse for desktop
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
  className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out bg-gradient-to-b from-amber-50 to-amber-100 shadow-xl flex flex-col
    ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} 
    ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
    min-h-screen`}
>
        <div className="p-5 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="min-w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-400 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h1 className={`text-xl font-bold text-gray-800 font-serif transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : ''}`}>
              Admin
            </h1>
          </div>
          
          {/* Desktop collapse button */}
          <button 
            onClick={toggleCollapse} 
            className="hidden lg:block text-gray-500 hover:text-amber-600 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"} />
            </svg>
          </button>
          
          {/* Mobile close button */}
          <button 
            onClick={toggleMobileSidebar} 
            className="lg:hidden text-gray-500 hover:text-amber-600 transition-colors"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto">
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-amber-200/50 
                      ${isActive(item.path) 
                        ? "bg-amber-100 text-amber-700 font-medium border-l-4 shadow-sm" 
                        : "text-gray-600 hover:text-amber-600"
                      }`}
                    style={{ borderLeftColor: isActive(item.path) ? "#FFA725" : "transparent" }}
                    onClick={() => {
                      if (isMobileOpen) toggleMobileSidebar();
                    }}
                  >
                    <span className={`inline-block ${isCollapsed ? 'mx-auto' : 'w-6 mr-3'}`}>
                      {renderIcon(item.icon)}
                    </span>
                    <span className={`transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="p-4 border-t border-amber-200">
          <div className={`flex items-center rounded-lg p-2 bg-amber-100/70 text-amber-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center ${isCollapsed ? 'lg:justify-center' : ''}`}>
              <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className={`ml-2 font-medium transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : ''}`}>Admin User</span>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

// Helper function to render icons
function renderIcon(icon) {
  switch (icon) {
    case "chart-bar":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "users":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "credit-card":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "mail":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "user":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    default:
      return null;
  }
}

export default Sidebar;