import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/admin/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  const handleDelete = async (userId, fullName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${fullName}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFA725",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
      background: "#ffffff",
      borderRadius: "10px"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:7000/api/admin/delete/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsers(users.filter((user) => user._id !== userId));

          Swal.fire({
            title: "Deleted!",
            text: "User has been successfully removed.",
            icon: "success",
            confirmButtonColor: "#FFA725"
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
            confirmButtonColor: "#FFA725"
          });
        }
      }
    });
  };


  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "text-white bg-amber-400";
      case "expert":
        return "text-blue-500 bg-blue-100";
      case "user":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100"; 
    }
  };


  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-100 text-red-700 rounded-lg border border-red-300">
      <p className="font-medium">{error}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Users Management</h2>

      <div className="grid grid-cols-1 gap-4">
        {users.length === 0 ? (
          <div className="bg-amber-50 p-4 rounded-lg text-amber-700 text-center">
            No users found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4"
              style={{ borderLeftColor: "#FFA725" }}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                <div className="mt-1 text-black">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    {user.email}
                  </p>
                  <p className="flex items-center mt-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0116 11a13.937 13.937 0 01-10.879-6.804M12 12h.01M16 12h.01M21 12h.01M12 16h.01M16 16h.01M21 16h.01"></path>
                    </svg>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>

                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(user._id, user.fullName)}
                className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;