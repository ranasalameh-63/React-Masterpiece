import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";


function AdminProfile() {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const [userData, setUserData] = useState(null);
    


    useEffect(() => {
      if (userId) {
        const token = getCookie("token");
        axios.get(`http://localhost:7000/api/user/details/${userId}`)
          .then((response) => {
            setUserData(response.data);
            console.log(response.data)
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



    return (
      <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

  {userData ? (
    <div className="border p-6 rounded-lg shadow-md max-w-md">
      <h3 className="text-xl font-semibold mb-2">{userData.name}</h3>
      <p className="mb-1"><span className="font-medium">Email:</span> {userData.email}</p>
      <p className="mb-1"><span className="font-medium">Full Name:</span> {userData.fullName}</p>
      <p className="mb-1"><span className="font-medium">Role:</span> {userData.role}</p>
      
    </div>
  ) : (
    <p>Loading admin data...</p>
  )}
</div>

    );
  }
  
  export default AdminProfile;
  