import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { User, MapPin, Calendar, Clock, Star, Mail, Phone, CalendarDays, Info, Pencil} from 'lucide-react';
import Loader from '../Loader/Loader';


function ExpertProfile() {
    const [expertData, setExpertData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("about");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/profile/get/${id}`);
                setExpertData(response.data.expertData);
                setFormData(response.data.expertData);
                setMessage("Profile updated successfully!");
            } catch (error) {
                console.error('Error fetching expert data:', error);
                setError("Failed to update profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchExpert();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/profile/bookings/${id}`);
                setBookings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [id]);

    const handleUpdate = async () => {
        try {
    
                const dataToSend = new FormData();
                dataToSend.append("fullName", formData.fullName);        
                if (formData.profileImage && formData.profileImage instanceof File) {
                    dataToSend.append("profileImage", formData.profileImage);
                }
            await axios.put(`http://localhost:7000/api/profile/update/${id}`, formData,{
                headers: { "Content-Type": "multipart/form-data" },
              });
            setExpertData(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating expert:", error);
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, profileImage: file }));
        }
    };
    
    if (loading) {
        return (
            <Loader />
        );
    }

    if (!expertData) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl bg-white">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <User size={48} className="mx-auto mb-3" style={{ color: "#FFA725" }} />
                    <p className="text-gray-500">Expert not found.</p>
                </div>
            </div>
        );
    }

    const {
        fullName,
        email,
        location,
        experienceYears,
        skills,
        profileImage,
        phoneNumber,
        aboutYourself,
        availability
    } = formData;

    return (
        
        <div className="container mx-auto px-4 py-8 max-w-5xl bg-white">
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {message && (
        <div className="text-green-600 bg-green-100 p-3 rounded-md mb-4 text-sm border-l-4 border-green-500">
          {message}
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm border-l-4 border-red-500">
          {error}
        </div>
      )}
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: "#FFA725" }}>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <User size={16} style={{ color: "#FFA725" }} />
                        </div>
                        <span className="font-semibold text-white">Expert Profile</span>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center text-sm text-white hover:underline"
                    >
                        <Pencil size={16} className="mr-1" />
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                </div>


                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 border-r">
                        <div className="p-6 flex flex-col items-center">
                            <div className="mb-4">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    {profileImage ? (
                                        <img
                                            src={`http://localhost:7000${profileImage}`}
                                            alt={fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <User size={40} style={{ color: "#FFA725" }} />
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="mt-2">
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            className="text-sm w-full"
                                            style={{ color: "#FFA725" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{fullName}</h2>
                            <p className="text-gray-500 text-sm">{email}</p>
                            <div className="mt-2 mb-4 px-3 py-1 rounded-full text-xs font-medium capitalize text-white" style={{ backgroundColor: "#FFA725" }}>
                                Professional Expert
                            </div>

                            <div className="flex w-full border-b mt-4">
                                <button
                                    className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === "experience" ? "border-b-2" : "text-gray-600 hover:text-gray-800"}`}
                                    style={{ borderColor: activeTab === "experience" ? "#FFA725" : "", color: activeTab === "experience" ? "#FFA725" : "" }}
                                    onClick={() => setActiveTab("experience")}
                                >
                                    Experience
                                </button>
                                <button
                                    className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === "about" ? "border-b-2" : "text-gray-600 hover:text-gray-800"}`}
                                    style={{ borderColor: activeTab === "about" ? "#FFA725" : "", color: activeTab === "about" ? "#FFA725" : "" }}
                                    onClick={() => setActiveTab("about")}
                                >
                                    About
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-4">
                            <h3 className="text-xs uppercase font-semibold mb-3" style={{ color: "#FFA725" }}>Expert Details</h3>

                            <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center border hover:shadow-sm transition-shadow">
                                    <MapPin size={14} style={{ color: "#FFA725" }} className="mr-2" />
                                    {isEditing ? (
                                        <input name="location" value={location} onChange={handleInputChange} className="border px-2 py-1 rounded w-full" />
                                    ) : location}
                                </div>

                                <div className="p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center border hover:shadow-sm transition-shadow">
                                    <Clock size={14} style={{ color: "#FFA725" }} className="mr-2" />
                                    {isEditing ? (
                                        <input name="experienceYears" value={experienceYears} onChange={handleInputChange} className="border px-2 py-1 rounded w-full" />
                                    ) : `Experience: ${experienceYears} years`}
                                </div>

                                <div className="p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center border hover:shadow-sm transition-shadow">
                                    <Phone size={14} style={{ color: "#FFA725" }} className="mr-2" />
                                    {isEditing ? (
                                        <input name="phoneNumber" value={phoneNumber} onChange={handleInputChange} className="border px-2 py-1 rounded w-full" />
                                    ) : phoneNumber}
                                </div>

                                <div className="p-3 bg-white rounded-lg text-sm text-gray-700 flex items-center border hover:shadow-sm transition-shadow">
                                    <Mail size={14} style={{ color: "#FFA725" }} className="mr-2" />
                                    {email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <div className="p-6">
                            {activeTab === "about" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Skills</h3>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {isEditing ? (
                                            <input
                                                name="skills"
                                                value={skills}
                                                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value.split(',') }))}
                                                className="border px-2 py-1 rounded w-full"
                                                placeholder="Comma-separated skills"
                                            />
                                        ) : (
                                            skills && skills.map((skill, i) => (
                                                <span key={i} className="px-4 py-2 rounded-lg text-sm font-medium"
                                                    style={{ backgroundColor: "#FFF4E5", color: "#FFA725" }}>
                                                    {skill}
                                                </span>
                                            ))
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability</h3>

                                    <div className="bg-white rounded-lg p-4 border shadow-sm">
                                        {availability && availability.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {availability.map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <CalendarDays size={16} style={{ color: "#FFA725" }} className="flex-shrink-0" />
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center py-6">
                                                <Calendar size={18} style={{ color: "#FFA725" }} className="mr-2" />
                                                <p className="text-gray-500">No availability information provided</p>
                                            </div>
                                        )}
                                    </div>


                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-5">Contact Information</h3>

                                    <div className="space-y-4 bg-white p-4 rounded-lg border shadow-sm">
                                        <div className="flex">
                                            <div className="w-24 text-gray-500 text-sm">Email:</div>
                                            <div className="flex-1 text-sm">
                                                <a href={`mailto:${email}`} className="hover:underline" style={{ color: "#FFA725" }}>
                                                    {email}
                                                </a>
                                            </div>
                                        </div>
                                        {phoneNumber && (
                                            <div className="flex">
                                                <div className="w-24 text-gray-500 text-sm">Phone:</div>
                                                <div className="flex-1 text-sm" style={{ color: "#FFA725" }}>
                                                    {phoneNumber}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex">
                                            <div className="w-24 text-gray-500 text-sm">Location:</div>
                                            <div className="flex-1 text-sm" style={{ color: "#FFA725" }}>
                                                {location}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-5">About Yourself</h3>
                                    {isEditing ? (
                                        <textarea
                                            name="aboutYourself"
                                            value={aboutYourself}
                                            onChange={handleInputChange}
                                            className="border px-3 py-2 rounded w-full"
                                            rows="4"
                                        />
                                    ) : (
                                        <div className="p-4 bg-white rounded-lg text-sm text-gray-600 border shadow-sm">
                                            {aboutYourself}
                                        </div>
                                    )}

                                    {isEditing && (
                                        <div className="mt-6">
                                            <button
                                                onClick={handleUpdate}
                                                className="px-4 py-2 rounded text-white hover:bg-opacity-90 transition-colors"
                                                style={{ backgroundColor: "#FFA725" }}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "experience" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Professional Experience</h3>

                                    <div className="flex items-center mb-4 bg-white p-4 rounded-lg border shadow-sm">
                                        <div className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
                                            style={{ backgroundColor: "#FFF4E5" }}>
                                            <Star size={24} style={{ color: "#FFA725" }} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Experience Level</p>
                                            <p className="text-sm text-gray-600">{experienceYears} years in the field</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 bg-white p-4 rounded-lg border shadow-sm">
                                        <h4 className="text-md font-semibold text-gray-700 mb-3">Skills & Expertise</h4>
                                        <div className="space-y-3">
                                            {skills && skills.length > 0 ? (
                                                skills.map((skill, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#FFA725" }}></div>
                                                        <p className="text-gray-700">{skill}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 italic">No skills specified</p>
                                            )}
                                        </div>
                                    </div>

                                    {aboutYourself && (
                                        <div className="mt-8">
                                            <h4 className="text-md font-semibold text-gray-700 mb-3">About</h4>
                                            <div className="p-4 bg-white rounded-lg border shadow-sm">
                                                <p className="text-gray-600">{aboutYourself}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 p-4 bg-white rounded-lg border shadow-sm">
                                        <div className="flex">
                                            <Info size={20} style={{ color: "#FFA725" }} className="mr-3 flex-shrink-0 mt-1" />
                                            <p className="text-gray-600">
                                                {fullName} is a professional with {experienceYears} years of experience based in {location}.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
                {/* Bookings Section */}
                <div className="bg-white p-6 border-b">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Your Bookings</h2>
                    {bookings.length === 0 ? (
                        <p className="text-gray-500">No bookings yet...</p>
                    ) : (
                        <ul className="space-y-3">
                            {bookings.map((booking) => (
                                <li key={booking._id} className="p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-2">
                                        <Calendar size={16} className="mr-2" style={{ color: "#FFA725" }} />
                                        <p className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <Clock size={16} className="mr-2" style={{ color: "#FFA725" }} />
                                        <p>{booking.preferredTime}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <p>
                                            <span className="text-gray-500">Status:</span>
                                            <span className="ml-1 px-2 py-1 rounded-full text-xs"
                                                style={{
                                                    backgroundColor: booking.status === 'confirmed' ? '#e6f7e6' : '#fff4e5',
                                                    color: booking.status === 'confirmed' ? '#2e7d32' : '#ed6c02'
                                                }}>
                                                {booking.status}
                                            </span>
                                        </p>
                                        <p><span className="text-gray-500">Client Name:</span> <span className="font-medium">{booking.userId.fullName}</span></p>
                                    </div>
                                    {booking.serviceDetails && (
                                        <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                            <span className="font-medium">Details:</span> {booking.serviceDetails}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


            </div>
        </div>
    );
}

export default ExpertProfile;

