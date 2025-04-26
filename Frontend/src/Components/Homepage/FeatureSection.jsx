import React from 'react';
import { Wrench, Users, Heart } from 'lucide-react';
import { Link } from "react-router-dom";

export default function EnhancedFeatureSection() {
    return (
        <div className="w-full bg-white py-16 ">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                {/* Main Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Feature 1: Step by Step */}
                    <div className="flex flex-col items-start">
                        <div className="p-4 rounded-full bg-amber-100 mb-6">
                            <Wrench size={32} style={{ color: "#FFA725" }} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Step by Step</h2>
                        <div className="h-1 w-16 bg-amber-500 mb-6" style={{ backgroundColor: "#FFA725" }}></div>
                        <p className="text-gray-700 leading-relaxed">
                            We make it easy to learn how to make anything, one step at a time. From the stovetop to the
                            workshop, you are sure to be inspired by the awesome projects that are shared everyday.
                        </p>
                        <Link
                            to="/categories"
                            className="mt-6 px-5 py-2 rounded-lg text-white font-medium transition-colors duration-300 bg-[#FFA725] hover:bg-amber-500"
                        >
                            Explore Projects
                        </Link>
                    </div>

                    {/* Feature 2: Made by You */}
                    <div className="flex flex-col items-start">
                        <div className="p-4 rounded-full bg-amber-100 mb-6">
                            <Users size={32} style={{ color: "#FFA725" }} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Made by You</h2>
                        <div className="h-1 w-16 bg-amber-500 mb-6" style={{ backgroundColor: "#FFA725" }}></div>
                        <p className="text-gray-700 leading-relaxed">
                            Instructables are created by you. No matter who you are, we all have secret skills to share.
                            Come join our community of curious makers, innovators, teachers, and life long learners who
                            love to share what they make.
                        </p>
                        <Link
                            to="/signup"
                            className="mt-6 px-5 py-2 rounded-lg text-white font-medium transition-colors duration-300 bg-[#FFA725] hover:bg-amber-500"
                        >
                            Join Community
                        </Link>
                    </div>

                    {/* Feature 3: A Happy Place */}
                    <div className="flex flex-col items-start">
                        <div className="p-4 rounded-full bg-amber-100 mb-6">
                            <Heart size={32} style={{ color: "#FFA725" }} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">A Happy Place</h2>
                        <div className="h-1 w-16 bg-amber-500 mb-6" style={{ backgroundColor: "#FFA725" }}></div>
                        <p className="text-gray-700 leading-relaxed">
                            Making things makes people happy. We can't prove it, but we know it to be true. Find your
                            happy place, and join one of the friendliest online communities anywhere.
                        </p>
                        <Link
                            to="/hirepro"
                            className="mt-12 px-5 py-2 rounded-lg text-white font-medium transition-colors duration-300 bg-[#FFA725] hover:bg-amber-500"
                        >
                            Find Inspiration
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="w-full border-t border-gray-200 mt-16"></div>
        </div>
    );
}