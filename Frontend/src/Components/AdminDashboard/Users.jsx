import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");

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
        return "text-white bg-amber-500";
      case "expert":
        return "text-amber-900 bg-amber-100";
      case "user":
        return "text-amber-800 bg-amber-50";
      default:
        return "text-gray-500 bg-gray-100"; 
    }
  };

  const getRoleBorderColor = (role) => {
    switch (role) {
      case "Admin":
        return "border-amber-500";
      case "expert":
        return "border-amber-300";
      case "user":
        return "border-amber-200";
      default:
        return "border-gray-200"; 
    }
  };

  const sortUsers = (a, b) => {
    if (sortField === "fullName") {
      return sortDirection === "asc" 
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    } else if (sortField === "role") {
      return sortDirection === "asc" 
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role);
    }
    return 0;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = users
    .filter(user => 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(sortUsers);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200 shadow-md">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-amber-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="bg-amber-500 p-1 rounded mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            Users Management
          </h2>
          <p className="text-gray-500 mt-1">Managing platform users</p>
        </div>
        
        <div className="relative mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-amber-50 p-4 rounded-lg flex items-center">
        <div className="mr-2 text-amber-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-amber-800 text-sm">
          Total users: <span className="font-bold">{users.length}</span> | 
          Showing: <span className="font-bold">{filteredUsers.length}</span> results
        </p>
      </div>

      <div className="overflow-hidden rounded-xl shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => handleSort("fullName")}>
            <span>Name</span>
            {sortField === "fullName" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            )}
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort("role")}>
            <span>Role</span>
            {sortField === "role" && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-amber-100">
          {filteredUsers.length === 0 ? (
            <div className="bg-white p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`bg-white p-5 hover:bg-amber-50 transition-all duration-200 border-l-4 ${getRoleBorderColor(user.role)}`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <span className="text-amber-600 font-bold text-lg">
                          {user.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>

                    <button
                      onClick={() => handleDelete(user._id, user.fullName)}
                      className="bg-white border border-red-500 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label="Delete user"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersList;