import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { User, MapPin, Calendar, Clock, Star, Mail, Phone, CalendarDays, Info } from 'lucide-react';

function ExpertProfile() {
    const [expertData, setExpertData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("about");

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/profile/get/${id}`);
                setExpertData(response.data.expertData);
                console.log(response.data.expertData);

            } catch (error) {
                console.error('Error fetching expert data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExpert();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        );
    }

    if (!expertData) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <User size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Expert not found.</p>
                </div>
            </div>
        );
    }

    const {
        userId,
        fullName,
        email,
        location,
        experienceYears,
        skills,
        profileImage,
        phoneNumber,
        aboutYourself,
        availability
    } = expertData;
    console.log("Availability:", availability);


    // Format availability for display
    const formatAvailability = (availability) => {
        if (!availability || !Array.isArray(availability) || availability.length === 0) {
            return "Availability not specified";
        }

        return availability.map(slot => {
            return `${slot.day}: ${slot.startTime} - ${slot.endTime}`;
        }).join(', ');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header Bar */}
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div
                            className="w-8 h-8 rounded-full text-white flex items-center justify-center"
                            style={{ backgroundColor: "#FFA725" }}
                        >
                            <User size={16} />
                        </div>
                        <span className="font-semibold text-gray-700">Expert Profile</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Left Column - Profile Info */}
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
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <User size={40} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">{fullName}</h2>
                            <p className="text-gray-500 text-sm">{email}</p>
                            <div className="mt-2 mb-4 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium capitalize">
                                Professional Expert
                            </div>

                            {/* Tabs */}
                            <div className="flex w-full border-b">
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

                        {/* Left sidebar content */}
                        <div className="px-6 py-4">
                            <h3 className="text-xs uppercase font-semibold mb-3" style={{ color: "#FFA725" }}>Expert Details</h3>

                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center text-sm">
                                        <MapPin size={14} className="mr-2 text-gray-500" />
                                        <span className="text-gray-700">{location}</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center text-sm">
                                        <Clock size={14} className="mr-2 text-gray-500" />
                                        <span className="text-gray-700">Experience: {experienceYears} years</span>
                                    </div>
                                </div>
                                {phoneNumber && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center text-sm">
                                            <Phone size={14} className="mr-2 text-gray-500" />
                                            <span className="text-gray-700">{phoneNumber}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center text-sm">
                                        <Mail size={14} className="mr-2 text-gray-500" />
                                        <a href={`mailto:${email}`} className="text-gray-700 hover:underline">{email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content Area */}
                    <div className="md:w-2/3">
                        <div className="p-6">
                            {activeTab === "about" && (
                                <div>


                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Skills</h3>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {skills && skills.length > 0 ? (
                                            skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-50 border"
                                                    style={{ color: "#FFA725", borderColor: "#FFA725" }}
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">No skills specified</p>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability</h3>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {availability && availability.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                                {availability.map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <CalendarDays size={16} className="text-orange-400 flex-shrink-0" />
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center py-6">
                                                <Calendar size={18} className="text-gray-400 mr-2" />
                                                <p className="text-gray-500">No availability information provided</p>
                                            </div>
                                        )}
                                    </div>


                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-5">Contact Information</h3>

                                    <div className="space-y-4">
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
                                </div>
                            )}

                            {activeTab === "experience" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Professional Experience</h3>

                                    <div className="flex items-center mb-4">
                                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                                            <Star size={24} style={{ color: "#FFA725" }} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Experience Level</p>
                                            <p className="text-sm text-gray-600">{experienceYears} years in the field</p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
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
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <p className="text-gray-600">{aboutYourself}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex">
                                            <Info size={20} className="mr-3 text-gray-500 flex-shrink-0 mt-1" />
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
            </div>
        </div>
    );
}

export default ExpertProfile;
