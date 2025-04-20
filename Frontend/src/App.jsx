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
import Booking from './Components/Booking/Booking'
import ExpertPage from './Components/ExpertRegister/Expert';
import AddVideoForm from './Components/AddVideoForm/AddVideoForm';
import PaymentForm from './Components/Payment/PaymentForm';
import CreateVoucher from './Components/CreateVoucher/CreateVoucher'
import CategoryVideos from './Components/Categories/CategoryVideos'



// Hide Navbar & Footer from login  
function Layout({ children }) {
  const location = useLocation();
  const hideNavbarAndFooter = ["/login", "/signup"].includes(location.pathname);

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
          {/* <Route path="/expertProfile" element={<ExpertProfile />} /> */}
          <Route path="/expertProfile/:id" element={<ExpertProfile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addVideoForm" element={<AddVideoForm />} />
          <Route path="/paymentForm" element={<PaymentForm />} />
          <Route path="createVoucher/:bookId" element={<CreateVoucher />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
