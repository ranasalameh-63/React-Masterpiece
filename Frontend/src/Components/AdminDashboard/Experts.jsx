import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function PendingExperts() {
  const [pendingExperts, setPendingExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchPendingExperts();
  }, []);

  const fetchPendingExperts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:7000/api/admin/pendingExperts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPendingExperts(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const approveExpert = async (userId, name) => {
    const result = await Swal.fire({
      title: 'Approve Expert Application',
      text: `Are you sure you want to approve ${name} as an expert?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FFA725',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      borderRadius: '10px'
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:7000/api/admin/approveExpert/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          title: "Expert Approved!",
          text: "The user has been successfully approved as an expert.",
          icon: "success",
          confirmButtonColor: "#FFA725"
        });
        fetchPendingExperts();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to approve expert application.",
          icon: "error",
          confirmButtonColor: "#FFA725"
        });
      }
    }
  };

  const rejectExpert = async (userId, name) => {
    const result = await Swal.fire({
      title: 'Reject Expert Application',
      text: `Are you sure you want to reject ${name}'s application?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#999',
      confirmButtonText: 'Yes, reject!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      borderRadius: '10px'
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:7000/api/admin/rejectExpert/${userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          title: "Application Rejected!",
          text: "The expert application has been rejected.",
          icon: "success",
          confirmButtonColor: "#d33"
        });
        fetchPendingExperts();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to reject expert application.",
          icon: "error",
          confirmButtonColor: "#d33"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFA725]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center mb-6 pb-3 border-b-2 border-[#FFA725]">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-[#FFA725] shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Expert Applications</h2>
          <p className="text-sm text-gray-500">Review and manage pending expert applications</p>
        </div>
      </div>

      {pendingExperts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-[#FFF5E6] rounded-lg shadow-inner">
          <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-white text-[#FFA725] shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl font-medium text-[#FFA725]">No pending expert applications</p>
          <p className="text-gray-600 mt-2 text-center">All applications have been processed</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingExperts.map((expert) => (
            <div key={expert._id} className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:translate-y-px">
              <div className="p-4 md:p-5 border-b bg-[#FFF5E6] flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-[#FFA725] flex items-center justify-center mr-4 text-white shadow-md">
                    {expert.profileImage ? (
                      <img
                        src={`http://localhost:7000${expert.profileImage}`}
                        alt={expert.userId.fullName}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-xl font-bold">
                        {expert.userId.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{expert.userId.fullName}</h3>
                    <p className="text-gray-600">{expert.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => approveExpert(expert.userId._id, expert.userId.fullName)}
                    className="flex-1 md:flex-none px-4 py-2 rounded-lg text-white bg-[#FFA725] hover:bg-[#e89720] transition-colors duration-300 shadow-md font-medium"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectExpert(expert.userId._id, expert.userId.fullName)}
                    className="flex-1 md:flex-none px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 shadow-md font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-[#FFF5E6] p-3 rounded-lg">
                    <h4 className="text-xs uppercase tracking-wide text-[#FFA725] font-bold mb-1">Location</h4>
                    <p className="text-gray-700 font-medium">{expert.location || "Not specified"}</p>
                  </div>
                  <div className="bg-[#FFF5E6] p-3 rounded-lg">
                    <h4 className="text-xs uppercase tracking-wide text-[#FFA725] font-bold mb-1">Experience</h4>
                    <p className="text-gray-700 font-medium">{expert.experienceYears || 0} years</p>
                  </div>
                  <div className="bg-[#FFF5E6] p-3 rounded-lg">
                    <h4 className="text-xs uppercase tracking-wide text-[#FFA725] font-bold mb-1">Availability</h4>
                    <p className="text-gray-700 font-medium">{expert.availability || "Not specified"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FFF5E6] p-3 rounded-lg">
                    <h4 className="text-xs uppercase tracking-wide text-[#FFA725] font-bold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(expert.skills) ? (
                        expert.skills.length > 0 ? (
                          expert.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white text-[#FFA725] text-xs rounded-full border border-[#FFA725] font-medium">
                              {skill.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No skills specified</span>
                        )
                      ) : typeof expert.skills === 'string' ? (
                        expert.skills.split(',').map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white text-[#FFA725] text-xs rounded-full border border-[#FFA725] font-medium">
                            {skill.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No skills specified</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#FFF5E6] p-3 rounded-lg">
                    <h4 className="text-xs uppercase tracking-wide text-[#FFA725] font-bold mb-2">About</h4>
                    <p className="text-gray-700 text-sm">{expert.aboutYourself || "No description provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pendingExperts.length > 0 && (
        <div className="mt-6 p-4 bg-[#FFF5E6] rounded-lg shadow-inner">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#FFA725]">Note:</span> Review each application carefully before making a decision. Approved experts will immediately gain access to the platform's expert features.
          </p>
        </div>
      )}
    </div>
  );
}

export default PendingExperts;

