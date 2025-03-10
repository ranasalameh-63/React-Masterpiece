import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Homepage/Home';
import Categories from './Components/Categories/Categories';
import Hirepro from './Components/Hirepro/Hirepro';
import AI from './Components/AIHelp/AI';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import Contact from './Components/ContactUs/Contact';
import About from './Components/AboutUs/About';
import Admin from './Components/AdminDashboard/AdminDash';
import Booking from './Components/Booking/Booking'
import ExpertPage from './Components/ExpertRegister/Expert';


// Hide Navbar & Footer from login  
function Layout({ children }) {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/login";

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
          <Route path="expertPage" element={<ExpertPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/hirepro" element={<Hirepro />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
