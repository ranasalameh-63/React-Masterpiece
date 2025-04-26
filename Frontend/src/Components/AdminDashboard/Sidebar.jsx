import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  
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

  return (
    <div className="w-64 min-h-screen bg-amber-50 shadow-lg flex flex-col">
      <div className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FFA725" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 font-serif">Admin Dashboard</h1>
        </div>
      </div>
      
      <div className="flex-grow p-4">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path) 
                      ? "bg-amber-50 text-amber-700 font-medium border-l-4" 
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                  }`}
                  style={{ borderLeftColor: isActive(item.path) ? "#FFA725" : "transparent" }}
                >
                  <span className="inline-block w-6 mr-3">
                    {renderIcon(item.icon)}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="p-4 mt-auto border-t">
        <Link 
          to="/login" 
          className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <span className="inline-block w-6 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
          Logout
        </Link>
      </div>
    </div>
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