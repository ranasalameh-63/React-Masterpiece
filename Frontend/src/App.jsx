// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// import Navbar from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';
// import Home from './Components/Homepage/Home';
// import Categories from './Components/Categories/Categories';
// import Hirepro from './Components/Hirepro/Hirepro';
// import AI from './Components/AIHelp/AI';
// import Login from './Components/Login/Login';
// import Signup from './Components/SignUp/SignUp';
// import UserProfile from './Components/Profile/UserProfile';
// import ExpertProfile from './Components/Profile/ExpertProfile';
// import Contact from './Components/ContactUs/Contact';
// import About from './Components/AboutUs/About';
// import Admin from './Components/AdminDashboard/AdminDash';
// import Booking from './Components/Booking/Booking'
// import ExpertPage from './Components/ExpertRegister/Expert';
// import AddVideoForm from './Components/AddVideoForm/AddVideoForm';
// import PaymentForm from './Components/Payment/PaymentForm';
// import CreateVoucher from './Components/CreateVoucher/CreateVoucher'
// import CategoryVideos from './Components/Categories/CategoryVideos'

// /////////////////// AdminDashboard ///////////////
// import Sidebar from "./Components/AdminDashboard/Sidebar";
// import Topbar from "./Components/AdminDashboard/Topbar";
// import Dashboard from "./Components/AdminDashboard/Dashboard";
// import Users from "./Components/AdminDashboard/Users";
// import Experts from "./Components/AdminDashboard/Experts";
// import Bookings from "./Components/AdminDashboard/Bookings";
// import Payments from "./Components/AdminDashboard/Payments";
// import ContactMessages from "./Components/AdminDashboard/ContactMessages";




// // Hide Navbar & Footer from login  
// function Layout({ children }) {
//   const location = useLocation();
//   const hideNavbarAndFooter = ["/login", "/signup"].includes(location.pathname);

//   return (
//     <div>
//       {!hideNavbarAndFooter && <Navbar />}
//       {children}
//       {!hideNavbarAndFooter && <Footer />}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/expertPage" element={<ExpertPage />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/category/:categoryName" element={<CategoryVideos />} />
//           <Route path="/hirepro" element={<Hirepro />} />
//           <Route path="/booking/:id" element={<Booking />} />
//           <Route path="/ai" element={<AI />} />
//           <Route path="/userProfile" element={<UserProfile />} />
//           <Route path="/expertProfile/:id" element={<ExpertProfile />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/addVideoForm" element={<AddVideoForm />} />
//           <Route path="/paymentForm/:bookingId" element={<PaymentForm />} />
//           <Route path="createVoucher/:bookId" element={<CreateVoucher />} />


//           <div className="flex">
//       {/* السايدبار */}
//       <Sidebar />

//       {/* الجزء الرئيسي */}
//       <div className="flex-1">
//         {/* التوب بار */}
//         <Topbar />

//         {/* الصفحات */}
//         <div className="p-4">
//           <Routes>
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/users" element={<Users />} />
//             <Route path="/admin/experts" element={<Experts />} />
//             <Route path="/admin/bookings" element={<Bookings />} />
//             <Route path="/admin/payments" element={<Payments />} />
//             <Route path="/admin/contact-messages" element={<ContactMessages />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Homepage/Home';
import Categories from './Components/Categories/Categories';
import Hirepro from './Components/Hirepro/Hirepro';
import AI from './Components/AIHelp/AI';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/SignUp';
import UserProfile from './Components/Profile/UserProfile';
import ExpertProfile from './Components/Profile/ExpertProfile';
import Contact from './Components/ContactUs/Contact';
import About from './Components/AboutUs/About';
import Admin from './Components/AdminDashboard/AdminDash';
import Booking from './Components/Booking/Booking';
import ExpertPage from './Components/ExpertRegister/Expert';
import AddVideoForm from './Components/AddVideoForm/AddVideoForm';
import PaymentForm from './Components/Payment/PaymentForm';
import CreateVoucher from './Components/CreateVoucher/CreateVoucher';
import CategoryVideos from './Components/Categories/CategoryVideos';

/////////////////// AdminDashboard ///////////////
import Sidebar from './Components/AdminDashboard/Sidebar';
import Topbar from './Components/AdminDashboard/Topbar';
import Dashboard from './Components/AdminDashboard/Statistics';
import Users from './Components/AdminDashboard/Users';
import Experts from './Components/AdminDashboard/Experts';
import Bookings from './Components/AdminDashboard/Bookings';
import Payments from './Components/AdminDashboard/Payments';
import ContactMessages from './Components/AdminDashboard/ContactMessages';
import AdminProfile from './Components/AdminDashboard/AdminProfile';


// Hide Navbar & Footer from login  
function Layout({ children }) {
  const location = useLocation();
  const hideNavbarAndFooter = ['/login', '/signup','/admin/statistics','/admin/profile','/admin/users','/admin/experts','/admin/bookings',
    '/admin/payments' , '/admin/contact-messages'

  ].includes(location.pathname);

  return (
    <div>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expertPage" element={<ExpertPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryVideos />} />
          <Route path="/hirepro" element={<Hirepro />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/expertProfile/:id" element={<ExpertProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/addVideoForm" element={<AddVideoForm />} />
          <Route path="/paymentForm/:bookingId" element={<PaymentForm />} />
          <Route path="createVoucher/:bookId" element={<CreateVoucher />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-4">
          <Routes>
            <Route path="/statistics" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/contact-messages" element={<ContactMessages />} />
            <Route path="/profile" element={<AdminProfile />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
