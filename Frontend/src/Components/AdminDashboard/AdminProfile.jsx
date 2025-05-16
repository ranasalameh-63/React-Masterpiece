import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2

function AdminProfile() {
  const userId = useSelector((state) => state.user.userId);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    if (!userId) return;
    const token = getCookie("token");
    axios
      .get(`http://localhost:7000/api/user/details/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(({ data }) => {
        setUserData(data);
        setFormData({
          fullName: data.fullName,
          email: data.email,
          password: ""
        });
        setPreviewUrl(data.profilePicture); 
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load profile data. Please try again.',
          confirmButtonColor: '#FFA725'
        });
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getCookie("token");

    // Show loading state with SweetAlert
    Swal.fire({
      title: 'Updating Profile',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const body = new FormData();
    body.append("fullName", formData.fullName);
    body.append("email", formData.email);
    if (formData.password) {
      body.append("password", formData.password);
    }
    if (selectedFile) {
      body.append("profilePicture", selectedFile);
    }

    axios
      .patch(
        `http://localhost:7000/api/admin/details/${userId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(({ data }) => {
        setUserData(data);
        setIsEditing(false);
        setFormData((fd) => ({ ...fd, password: "" }));
        setSelectedFile(null);
        
        // Show success with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your profile has been updated successfully!',
          confirmButtonColor: '#FFA725'
        });
      })
      .catch((err) => {
        console.error("Update failed:", err);
        
        // Show error with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: err.response?.data?.message || 'Failed to update profile. Please try again.',
          confirmButtonColor: '#FFA725'
        });
      });
  };

  if (!userData) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white min-h-screen">
      <div className="bg-orange-50 rounded-lg p-4 mb-6 border-l-4 border-orange-400">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-orange-800 font-medium">Admin Control Panel - User Profile Settings</p>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="bg-orange-400 p-3 rounded-full mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Admin Profile</h2>
      </div>

      {!isEditing ? (
        <div className="border border-orange-100 p-8 rounded-lg shadow-md bg-white">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
              {userData.profilePicture ? (
                <img
                 src={`http://localhost:7000${userData.profilePicture}`}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-orange-300"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full mt-4 uppercase font-bold tracking-wider">
                Administrator
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{userData.fullName}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-800">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Password</p>
                    <p className="font-medium text-gray-800">••••••••</p>
                  </div>
                </div>
              </div>
              
              <button
                className="mt-8 px-6 py-3 bg-orange-400 hover:bg-orange-400 text-white rounded-lg font-medium flex items-center transition-colors duration-200"
                onClick={() => setIsEditing(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border border-orange-100 p-8 rounded-lg shadow-md bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-8 md:mb-0 md:mr-8">
              <div className="relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-40 rounded-full object-cover border-4 border-orange-300"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-orange-100 flex items-center justify-center border-4 border-orange-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                <label className="absolute bottom-0 right-0 bg-orange-400 hover:bg-orange-400 p-2 rounded-full text-white cursor-pointer transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full mt-4 uppercase font-bold tracking-wider">
                Administrator
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">New Password (optional)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-orange-400 hover:bg-orange-400 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
                    onClick={() => {
                      // Confirm before canceling with SweetAlert
                      Swal.fire({
                        title: 'Cancel Editing?',
                        text: 'Any unsaved changes will be lost.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#FFA725',
                        cancelButtonColor: '#718096',
                        confirmButtonText: 'Yes, cancel',
                        cancelButtonText: 'Continue editing'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setIsEditing(false);
                          setFormData({
                            fullName: userData.fullName,
                            email: userData.email,
                            password: ""
                          });
                          setPreviewUrl(userData.profilePicture);
                          setSelectedFile(null);
                        }
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminProfile;
