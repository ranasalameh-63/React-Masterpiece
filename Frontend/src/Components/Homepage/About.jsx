import React from 'react';
import Lamp from '../Assets/lamp.png'

const About = () => {
    return (
        <section className="py-16 ">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Column */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative overflow-hidden rounded-lg ">
                            <img
                                src={Lamp}
                                alt="DIY Lamp"
                                className="w-110 h-100 object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                       
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-1/2">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-2 relative inline-block">
                                    We Are DIY
                                    <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-[#FFA725]"></span>
                                </h2>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                At DIY Home Repair Platform, we believe that everyone can be a problem-solver.
                                Join our growing community of homeowners and enthusiasts who are making home
                                improvement simple, affordable, and fun! Let's build, repair, and create together.
                            </p>

                            <div className="pt-4">
                                <a
                                    href="/about"
                                    className="inline-block px-6 py-3 bg-[#FFA725] text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300 hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    About Us
                                </a>
                            </div>

                            {/* Added Features */}
                            <div className="flex flex-wrap gap-4 pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#FFA725] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-black">Quick Solutions</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#FFA725] rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-black">Save Time & Money</span>
                                </div>

                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;