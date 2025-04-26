// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useSelector } from "react-redux";

// function PendingExperts() {
//   const [pendingExperts, setPendingExperts] = useState([]);
//   const token = useSelector((state) => state.user.token);

//   useEffect(() => {
//     fetchPendingExperts();
//   }, []);

//   const fetchPendingExperts = async () => {
//     try {
//       const res = await axios.get('http://localhost:7000/api/admin/pendingExperts', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setPendingExperts(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const approveExpert = async (userId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to approve this expert!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#FFA725',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, approve!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.patch(`http://localhost:7000/api/admin/approveExpert/${userId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         Swal.fire({
//           title: "Approved!",
//           text: "User is now an Expert.",
//           icon: "success",
//           confirmButtonColor: "#FFA725"
//         });
//         fetchPendingExperts(); 
//       } catch (error) {
//         Swal.fire({
//           title: "Error!",
//           text: "Failed to approve expert.",
//           icon: "error",
//           confirmButtonColor: "#FFA725"
//         });
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Pending Expert Requests</h2>
//       {pendingExperts.length === 0 ? (
//         <div className="text-gray-500">No pending experts.</div>
//       ) : (
//         <div className="grid gap-4">
//           {pendingExperts.map((expert) => (
//             <div key={expert._id} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm">
//               <div>
//                 <h3 className="font-semibold text-lg">{expert.userId.fullName}</h3>
//                 <p className="text-gray-600 text-sm">{expert.phoneNumber}</p>
//                 <p className="text-gray-600 text-sm">{expert.location}</p>
//                 <p className="text-gray-600 text-sm">{expert.experienceYears}</p>
//                 <p className="text-gray-600 text-sm">{expert.aboutYourself}</p>
//                 <p className="text-gray-600 text-sm">{expert.skills}</p>
//                 <p className="text-gray-600 text-sm">{expert.availability}</p>

//               </div>
//               <button 
//                 onClick={() => approveExpert(expert.userId._id)}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Approve
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PendingExperts;


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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: "#FFA725" }}></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 pb-3 border-b">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "#FFA725" }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Expert Applications</h2>
      </div>
      
      {pendingExperts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg">No pending expert applications at this time</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingExperts.map((expert) => (
            <div key={expert._id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <span className="text-amber-700 font-bold text-lg">
                      {expert.userId.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{expert.userId.fullName}</h3>
                    <p className="text-gray-600 text-sm">{expert.phoneNumber}</p>
                  </div>
                </div>
                <button 
                  onClick={() => approveExpert(expert.userId._id, expert.userId.fullName)}
                  className="px-4 py-2 rounded-lg text-white transition-colors duration-300"
                  style={{ backgroundColor: "#FFA725" }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#F59E0B"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FFA725"}
                >
                  Approve Expert
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Location</h4>
                    <p className="text-gray-700">{expert.location || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Experience</h4>
                    <p className="text-gray-700">{expert.experienceYears || 0} years</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Availability</h4>
                    <p className="text-gray-700">{expert.availability || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Skills</h4>
                    {Array.isArray(expert.skills) ? (
  expert.skills.map((skill, idx) => (
    <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
      {skill.trim()}
    </span>
  ))
) : typeof expert.skills === 'string' ? (
  expert.skills.split(',').map((skill, idx) => (
    <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
      {skill.trim()}
    </span>
  ))
) : (
  <span className="text-gray-500">No skills specified</span>
)}

                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">About</h4>
                    <p className="text-gray-700 text-sm line-clamp-3">{expert.aboutYourself || "No description provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingExperts;
