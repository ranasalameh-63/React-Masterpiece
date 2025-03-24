import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const AddVideoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    category: "",
  });
  
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  
  
  const expertId = useSelector((state) => state.user.userId);
  const userRole = useSelector((state) => state.user.role);

  console.log("Expert ID:", expertId);
console.log("User Role:", userRole);


  useEffect(() => {
    if (expertId) {
      axios.get(`http://localhost:7000/api/user/details/${expertId}`)
        .then((response) => {
          console.log("User Data:", response.data);
          setUserData(response.data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [expertId]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!expertId) {
    return (
      <div className="text-center text-red-500 text-lg font-bold">
        Unauthorized: You must be an expert to add a video.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!expertId || userRole !== "expert") {
      setError("Permission denied. You are not allowed to add videos.");
      return;
    }


    try {
      const token = getCookie("token");
      await axios.post(
        "http://localhost:7000/api/videos/add",
        { ...formData, expertId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      


      Swal.fire({
        title: "Success!",
        text: "Video added successfully!",
        icon: "success",
        confirmButtonColor: "#FFA725",
      });

      setFormData({ title: "", description: "", youtubeUrl: "", category: "" });
    } catch (error) {
      console.error("Error adding video:", error);
      setError("Failed to add video. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#FFA725] p-6 text-white">
            <h2 className="text-2xl font-bold text-center">Add Tutorial Video</h2>
          </div>

          {error && <div className="text-red-500 text-center py-2">{error}</div>}

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter video title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter video description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube URL
              </label>
              <input
                id="youtubeUrl"
                type="url"
                name="youtubeUrl"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA725] focus:border-transparent bg-white"
              >
                <option value="">Select Category</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Painting">Painting</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFA725] text-white py-3 px-4 rounded-md hover:bg-[#E89620] transition-colors duration-300 font-medium text-lg"
            >
              Add Video
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideoForm;
